# Monoline ICT Icons

A **mono line icon set for ICT solutions architecture**, designed for use with
[draw.io](https://www.drawio.com) (also known as diagrams.net).

The icons share a single, consistent line weight — a clean "monoline" style — so
that architecture diagrams read clearly and look cohesive whether you're
sketching a network topology, a cloud deployment, or an end-to-end solution
design.

> ⚠️ **Status:** This repository is in its early stages. Icons and library files
> are being added over time. If something you need is missing, please open an
> issue or contribute (see [Contributing](#contributing)).

## Why monoline?

Solutions architecture diagrams often mix icon sets with different fills,
colours, and stroke weights, which makes them look inconsistent and busy. A
monoline set uses:

- A **single stroke weight** across every icon
- **No fills** (or minimal, consistent fills), so icons inherit your diagram's
  colour scheme
- **Simple, recognisable shapes** that stay legible when scaled down

This keeps large architecture diagrams tidy and easy to follow.

## Using the icons in draw.io

draw.io lets you load custom shape libraries. To use these icons:

1. Open [draw.io](https://app.diagrams.net).
2. Go to **File → Open Library from → Device…** (or **URL…**) and select the
   library file from this repository.
3. The icons appear in a new palette in the left-hand shapes panel, ready to
   drag onto the canvas.

Because the icons are monoline SVGs, you can recolour and resize them directly
in draw.io to match your diagram's style.

## Repository structure

```
.
├── README.md      # This file
└── ...            # Icon assets and draw.io library files (added over time)
```

As content lands, this section will be updated to describe the folders for raw
SVGs, draw.io library files, and any tooling.

## Contributing

Contributions are welcome! To add or improve an icon:

1. Fork the repository and create a feature branch.
2. Follow the existing monoline style — a consistent stroke weight, no fixed
   fills, and simple shapes.
3. Include both the source SVG and, where relevant, the draw.io library entry.
4. Open a pull request describing what you've added or changed.

If you're not sure where to start, open an issue to discuss the icon or category
you'd like to see.

## License

No license has been specified yet. Until one is added, all rights are reserved
by the repository owner. If you intend to reuse these icons, please open an
issue to clarify licensing.
