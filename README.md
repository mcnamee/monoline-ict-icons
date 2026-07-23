# Monoline ICT Icons

A monoline (single-weight outline) icon set for **ICT and solutions-architecture diagrams** — network, compute, cloud, data, security and more. The set ships as a [draw.io](https://www.drawio.com/) stencil library so you can drop icons onto a canvas and recolour them, plus standalone SVGs for use anywhere else.

Every icon is drawn as an **outline stencil**: the fill is always empty, and the shape follows the diagram's **Line** colour. Change the line colour (and stroke weight) in draw.io and the whole icon recolours to match.

![Preview of the icon grid](screenshots/01-v6.png)

## Contents

**59 icons** across 15 categories:

| Category | Count | Examples |
| --- | --- | --- |
| Network | 9 | Router, Switch, VPN, Firewall, Load Balancer, Wireless AP, CDN, Antenna / Dish, Cell Tower |
| Compute | 8 | Server (1 RU / 5 RU), Server Racks, CPU, RAM, Cloud Computing |
| Data | 6 | Database, Storage / NAS, Block Storage, Hard Drive, Cache, Queue System |
| Security | 6 | Firewall, VPN, Identity, Secure, Key, Certification Shield |
| Tools | 5 | Configuration Cog, Spanner, Pencil & Ruler, Magnifying Glass, Light Bulb |
| Arrows | 4 | Arrow Left / Right / Up / Down |
| Observability | 4 | Graphs, Analytics, Log Scrolls, Alerting |
| Business | 3 | Office Building, Office Space, Money |
| Devices | 3 | Laptop, Mobile Phone, Tablet |
| Facilities | 3 | Enterprise Office Building, Datacentre / Server Rack |
| Flow | 3 | Process, Task List, Folder |
| Cloud | 2 | Cloud, Internet / Globe |
| People | 1 | User |
| Software | 1 | Browser |
| Status | 1 | Check |

## Using the icons

### In draw.io / diagrams.net

The library is a standard draw.io shape library — an `<mxlibrary>` file with the `.xml` extension. This is still the current, correct format; draw.io does **not** use a separate `.json` file for libraries (the JSON array simply lives inside the `<mxlibrary>` tag).

**Web app** ([app.diagrams.net](https://app.diagrams.net/)):

1. Go to **File ▸ Open Library from… ▸ Device…**
2. Select [`ict-icons.drawio-library.xml`](ict-icons.drawio-library.xml).

Or import it directly from a URL — **File ▸ Open Library from… ▸ URL…**, then paste:

```
https://raw.githubusercontent.com/mcnamee/monoline-ict-icons/main/ict-icons.drawio-library.xml
```

Importing from the URL avoids the most common failure below (accidentally saving GitHub's web page instead of the raw file).

**Desktop app:**

1. Go to **File ▸ Open Library…**
2. Select [`ict-icons.drawio-library.xml`](ict-icons.drawio-library.xml).

The icons then appear as a new shape palette in the left sidebar (below the Scratchpad). Because each icon is a stencil that inherits its stroke, you recolour it by selecting the shape and changing the **Line** colour in the Style panel — the fill stays empty.

> **Use "Open Library", not "Open".** This is the usual reason an import appears to "not work". **File ▸ Open** expects a *diagram* (`<mxfile>`) and will reject a library file, sometimes in a way that looks like it wanted a different/JSON format. A shape library must always go through **Open Library** (**Open Library from…** on the web app).

#### Troubleshooting

- **`JSON Parse error` on import:** make sure you have the current version of `ict-icons.drawio-library.xml`. draw.io parses the library as XML *first*, so the embedded shape markup inside it must be XML‑escaped (the file begins with `<mxlibrary>[{"xml":"&lt;mxGraphModel&gt;…`). If you have an older copy where the shapes start with a literal `<mxGraphModel>` (unescaped), re‑download the raw file — the escaping is required.
- **Nothing happens / "not a valid file":** make sure you used **Open Library** (web: **Open Library from… ▸ Device…**), not **Open**.
- **The file picker won't let you select the file:** it filters to `.xml`. This file's full name is `ict-icons.drawio-library.xml`, so its extension *is* `.xml` — but if your OS hid or altered the extension on download, rename it to a plain `something.xml` and try again.
- **Downloading the file:** use the URL import above, or click **“Download raw file”** on GitHub — don't use the browser's *Save As* on the file page, which saves the HTML page instead of the file.

### As SVGs

The [`svg/`](svg/) directory contains all 59 icons as standalone `.svg` files. Each uses a `0 0 100 100` viewBox with `fill="none"` and a `stroke` colour, so you can restyle them with CSS or by editing the `stroke` / `stroke-width` attributes.

```html
<img src="svg/firewall.svg" width="48" alt="Firewall">
```

## Interactive preview

[`index.html`](https://mcnamee.github.io/monoline-ict-icons/) is a live preview page that renders the full grid and lets you experiment with the **line colour** and **stroke weight** (Extra Thin → Bold) before importing. Open it in a browser to see the icons rendered from the shared source data.

## Project structure

| Path | Description |
| --- | --- |
| `icons-data.js` | Single source of truth — each icon defined as normalised primitives (`rect`, `line`, `circle`, `poly`, `path`, …) in a `0..100` coordinate space, plus `iconToSVG()` / `iconToStencil()` renderers. |
| `build.js` | Regenerates `ict-icons.drawio-library.xml` from `icons-data.js`. |
| `ict-icons.drawio-library.xml` | The draw.io stencil library (importable). Generated — do not edit by hand. |
| `svg/` | 59 standalone SVG icons. |
| `index.html` | Interactive preview page. |
| `support.js` | Generated runtime for the preview component. |
| `screenshots/` | Preview screenshots. |

## Development

Icon geometry lives in `icons-data.js` — that's the place to add or adjust an icon. The draw.io library is generated from it:

```
node build.js          # regenerate ict-icons.drawio-library.xml
node build.js --check   # verify the committed library is up to date
```

> The library is emitted as an `<mxlibrary>` element whose JSON payload is **XML-escaped** (`&amp;`, `&lt;`, `&gt;`). This is required: draw.io XML-parses the whole file before reading the JSON, so an unescaped payload fails to import with a "JSON Parse error". `build.js` handles the escaping — regenerate with it rather than editing the `.xml` directly.
