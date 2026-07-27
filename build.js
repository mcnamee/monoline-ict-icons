/* Build script — regenerates the distributable icon files from icons-data.js,
 * the single source of truth.
 *
 *   node build.js           # regenerate svg/ and ict-icons.drawio-library.xml
 *   node build.js --check    # verify the committed files are up to date (no writes)
 *
 * Outputs:
 *   - svg/<id>.svg                    one monoline SVG per icon
 *   - ict-icons.drawio-library.xml    draw.io stencil library (<mxlibrary>)
 *
 * Each icon carries its own box (icon.w × icon.h) set by the normalise pass in
 * icons-data.js, so the box hugs the artwork; the outputs below propagate those
 * per-icon dimensions to the SVG viewBox and the draw.io stencil/geometry.
 *
 * IMPORTANT: draw.io loads a library by XML-parsing the whole file first, then
 * JSON.parse()-ing the text content of the <mxlibrary> element. The JSON array
 * therefore lives *inside* an XML text node, so every '&', '<' and '>' in it
 * must be XML-escaped. Emitting the JSON raw makes the embedded <mxGraphModel>
 * markup look like real XML elements, the parse fails, and draw.io reports a
 * "JSON Parse error" on import. xmlEscape() below is what prevents that.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { ICONS, iconToStencil, iconToSVG } = require('./icons-data.js');

const STROKE = '#1F2937'; // default line colour baked into the exported assets

// Escape a string for use as XML text content (draw.io re-parses it as XML).
const xmlEscape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// draw.io stencil style payload: base64( deflateRaw( encodeURIComponent(xml) ) ).
// draw.io decodes it with decodeURIComponent(inflateRaw(...)), so any zlib level
// round-trips; level 0 keeps the diff stable against the original export.
const encodeStencil = (stencilXml) =>
  zlib
    .deflateRawSync(Buffer.from(encodeURIComponent(stencilXml)), { level: 0 })
    .toString('base64');

function buildLibrary() {
  const entries = ICONS.map((icon) => {
    const style =
      `shape=stencil(${encodeStencil(iconToStencil(icon))});` +
      `fillColor=none;strokeColor=${STROKE};strokeWidth=2;html=1;` +
      `verticalLabelPosition=bottom;verticalAlign=top;aspect=fixed;`;
    const xml =
      '<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/>' +
      `<mxCell id="2" value="" style="${style}" vertex="1" parent="1">` +
      `<mxGeometry x="0" y="0" width="${icon.w}" height="${icon.h}" as="geometry"/>` +
      '</mxCell></root></mxGraphModel>';
    return { xml, w: icon.w, h: icon.h, aspect: 'fixed', title: icon.name };
  });
  // The JSON must be XML-escaped because it sits inside the <mxlibrary> element.
  return `<mxlibrary>${xmlEscape(JSON.stringify(entries))}</mxlibrary>`;
}

// Reproduce the committed SVG file style: an XML prolog plus expanded
// (non-self-closing) element tags, as a browser XMLSerializer would emit.
const expandTags = (svg) =>
  svg.replace(/<([a-z]+)([^>]*?)\/>/g, (_, tag, attrs) => `<${tag}${attrs}></${tag}>`);

const buildSVG = (icon) =>
  '<?xml version="1.0"?>\n' + expandTags(iconToSVG(icon, { color: STROKE, strokeWidth: 2 }));

function main() {
  const check = process.argv.includes('--check');
  const targets = [
    { file: 'ict-icons.drawio-library.xml', content: buildLibrary() },
    ...ICONS.map((icon) => ({ file: path.join('svg', `${icon.id}.svg`), content: buildSVG(icon) })),
  ];

  let stale = 0;
  for (const { file, content } of targets) {
    const full = path.join(__dirname, file);
    const current = fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : null;
    if (current === content) continue;
    stale++;
    if (check) console.error(`stale: ${file}`);
    else { fs.writeFileSync(full, content); console.log(`wrote: ${file}`); }
  }

  if (check && stale) {
    console.error(`\n${stale} file(s) out of date — run: node build.js`);
    process.exit(1);
  }
  console.log(
    `${check ? 'up to date' : 'done'} — ${targets.length} files, ${ICONS.length} icons`
  );
}

main();
