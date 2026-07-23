/* Build script — regenerates the draw.io stencil library from icons-data.js,
 * the single source of truth.
 *
 *   node build.js           # regenerate ict-icons.drawio-library.xml
 *   node build.js --check    # verify the committed file is up to date (no writes)
 *
 * IMPORTANT: draw.io loads a library by XML-parsing the whole file first, then
 * JSON.parse()-ing the text content of the <mxlibrary> element. The JSON array
 * therefore lives *inside* an XML text node, so every '&', '<' and '>' in it
 * must be XML-escaped. Emitting the JSON raw makes the embedded <mxGraphModel>
 * markup look like real XML elements, the parse fails, and draw.io reports a
 * "JSON Parse error" on import. xmlEscape() below is what prevents that.
 *
 * (The SVGs in svg/ are also derived from icons-data.js via iconToSVG(), but
 * were exported through a browser XML serializer; they are not managed here.)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { ICONS, iconToStencil } = require('./icons-data.js');

const OUTPUT = path.join(__dirname, 'ict-icons.drawio-library.xml');
const STROKE = '#1F2937'; // default line colour baked into the exported stencils

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
      '<mxGeometry x="0" y="0" width="100" height="100" as="geometry"/>' +
      '</mxCell></root></mxGraphModel>';
    return { xml, w: 100, h: 100, aspect: 'fixed', title: icon.name };
  });
  // The JSON must be XML-escaped because it sits inside the <mxlibrary> element.
  return `<mxlibrary>${xmlEscape(JSON.stringify(entries))}</mxlibrary>`;
}

function main() {
  const check = process.argv.includes('--check');
  const content = buildLibrary();
  const current = fs.existsSync(OUTPUT) ? fs.readFileSync(OUTPUT, 'utf8') : null;

  if (check) {
    if (current === content) {
      console.log(`up to date — ${ICONS.length} icons`);
    } else {
      console.error('stale: ict-icons.drawio-library.xml — run: node build.js');
      process.exit(1);
    }
    return;
  }

  fs.writeFileSync(OUTPUT, content);
  console.log(`wrote ict-icons.drawio-library.xml — ${ICONS.length} icons`);
}

main();
