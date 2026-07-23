/* Single source of truth for the ICT icon set.
 * Coordinate space: 0..100, monoline outline, fill:none, stroke = line colour.
 * Each icon = { id, name, cat, prims:[...] }
 * Primitive types:
 *   {t:'rrect', x,y,w,h,r}            rounded rect
 *   {t:'rect',  x,y,w,h}
 *   {t:'line',  x1,y1,x2,y2}
 *   {t:'circle',cx,cy,r}
 *   {t:'ellipse',cx,cy,rx,ry}
 *   {t:'poly',  pts:[[x,y],...]}      open polyline
 *   {t:'polygon',pts:[[x,y],...]}     closed outline
 *   {t:'p',     cmds:[['M',x,y],['L',x,y],['C',..6],['Q',..4],['Z']]}
 */
(function (root) {
  // ---- helpers -------------------------------------------------------------
  const r2 = (n) => Math.round(n * 100) / 100;

  // six distinct rack cabinets in an oblique 3D row -------------------------
  function isoRacks() {
    const prims = [];
    const W = 9, H = 30, Dx = 5, Dy = -5; // cabinet width/height + depth offset
    const by = 72;
    for (const bx of [22, 36, 50, 64]) {
      const flt = [bx, by - H], frt = [bx + W, by - H];
      const frb = [bx + W, by];
      const brb = [bx + W + Dx, by + Dy], brt = [bx + W + Dx, by - H + Dy], blt = [bx + Dx, by - H + Dy];
      prims.push({ t: 'polygon', pts: [[bx, by], frb, frt, flt] });   // front face
      prims.push({ t: 'polygon', pts: [frb, brb, brt, frt] });        // right side
      prims.push({ t: 'polygon', pts: [flt, frt, brt, blt] });        // top
      prims.push({ t: 'line', x1: bx, y1: by - 10, x2: bx + W, y2: by - 10 });
      prims.push({ t: 'line', x1: bx, y1: by - 20, x2: bx + W, y2: by - 20 });
    }
    return prims;
  }

  // ---- icon definitions ----------------------------------------------------
  const ICONS = [
    {
      id: 'router', name: 'Router', cat: 'Network',
      prims: [
        { t: 'rrect', x: 14, y: 46, w: 72, h: 36, r: 7 },
        // 4-way routing arrows
        { t: 'line', x1: 26, y1: 64, x2: 74, y2: 64 },
        { t: 'poly', pts: [[32, 60], [26, 64], [32, 68]] },
        { t: 'poly', pts: [[68, 60], [74, 64], [68, 68]] },
        { t: 'line', x1: 50, y1: 52, x2: 50, y2: 76 },
        { t: 'poly', pts: [[45, 57], [50, 52], [55, 57]] },
        { t: 'poly', pts: [[45, 71], [50, 76], [55, 71]] },
        // status LEDs
        { t: 'circle', cx: 70, cy: 77, r: 1.8 },
        { t: 'circle', cx: 77, cy: 77, r: 1.8 },
      ],
    },
    {
      id: 'switch', name: 'Switch', cat: 'Network',
      prims: [
        { t: 'rrect', x: 14, y: 34, w: 72, h: 44, r: 6 },
        // four alternating switching arrows
        { t: 'poly', pts: [[26, 44], [70, 44]] },
        { t: 'poly', pts: [[64, 40], [70, 44], [64, 48]] },
        { t: 'poly', pts: [[74, 52], [30, 52]] },
        { t: 'poly', pts: [[36, 48], [30, 52], [36, 56]] },
        { t: 'poly', pts: [[26, 60], [70, 60]] },
        { t: 'poly', pts: [[64, 56], [70, 60], [64, 64]] },
        { t: 'poly', pts: [[74, 68], [30, 68]] },
        { t: 'poly', pts: [[36, 64], [30, 68], [36, 72]] },
      ],
    },
    {
      id: 'cloud', name: 'Cloud', cat: 'Cloud',
      prims: [
        { t: 'p', cmds: [
          ['M', 32, 70],
          ['C', 22, 70, 20, 57, 30, 55],
          ['C', 29, 44, 43, 41, 49, 49],
          ['C', 53, 40, 69, 40, 70, 51],
          ['C', 82, 50, 84, 66, 74, 70],
          ['L', 32, 70],
          ['Z'],
        ] },
      ],
    },
    {
      id: 'cloud-computing', name: 'Cloud Computing', cat: 'Cloud',
      prims: [
        { t: 'p', cmds: [
          ['M', 30, 58],
          ['C', 21, 58, 19, 46, 28, 44],
          ['C', 27, 34, 40, 31, 46, 39],
          ['C', 50, 30, 65, 30, 66, 41],
          ['C', 78, 40, 80, 55, 70, 58],
          ['L', 30, 58],
          ['Z'],
        ] },
        // gear = circle + radial ticks + hub
        { t: 'circle', cx: 50, cy: 74, r: 8 },
        { t: 'circle', cx: 50, cy: 74, r: 2.6 },
        { t: 'line', x1: 50, y1: 62, x2: 50, y2: 66 },
        { t: 'line', x1: 50, y1: 82, x2: 50, y2: 86 },
        { t: 'line', x1: 38, y1: 74, x2: 42, y2: 74 },
        { t: 'line', x1: 58, y1: 74, x2: 62, y2: 74 },
        { t: 'line', x1: 41.5, y1: 65.5, x2: 44.3, y2: 68.3 },
        { t: 'line', x1: 55.7, y1: 79.7, x2: 58.5, y2: 82.5 },
        { t: 'line', x1: 58.5, y1: 65.5, x2: 55.7, y2: 68.3 },
        { t: 'line', x1: 44.3, y1: 79.7, x2: 41.5, y2: 82.5 },
      ],
    },
    {
      id: 'server-1ru', name: 'Server (1 RU)', cat: 'Compute',
      prims: [
        { t: 'rrect', x: 12, y: 60, w: 76, h: 20, r: 4 },
        { t: 'line', x1: 22, y1: 66, x2: 22, y2: 74 },
        { t: 'line', x1: 27, y1: 66, x2: 27, y2: 74 },
        { t: 'line', x1: 32, y1: 66, x2: 32, y2: 74 },
        { t: 'circle', cx: 72, cy: 70, r: 2.4 },
        { t: 'circle', cx: 80, cy: 70, r: 2.4 },
      ],
    },
    {
      id: 'server-5ru', name: 'Server (5 RU)', cat: 'Compute',
      prims: (() => {
        const p = [];
        const ys = [24, 36, 48, 60, 72];
        for (const y of ys) {
          p.push({ t: 'rrect', x: 16, y, w: 68, h: 10, r: 2 });
          p.push({ t: 'circle', cx: 75, cy: y + 5, r: 1.8 });
          p.push({ t: 'line', x1: 23, y1: y + 3, x2: 23, y2: y + 7 });
          p.push({ t: 'line', x1: 27, y1: y + 3, x2: 27, y2: y + 7 });
        }
        return p;
      })(),
    },
    {
      id: 'server-racks-3d', name: '4 Server Racks (3D)', cat: 'Compute',
      prims: isoRacks(),
    },
    {
      id: 'vpn', name: 'VPN', cat: 'Security',
      prims: [
        { t: 'line', x1: 16, y1: 50, x2: 84, y2: 50 },
        { t: 'circle', cx: 16, cy: 50, r: 5 },
        { t: 'circle', cx: 84, cy: 50, r: 5 },
        // padlock straddling the tunnel
        { t: 'rrect', x: 40, y: 46, w: 20, h: 16, r: 3 },
        { t: 'p', cmds: [
          ['M', 44, 46],
          ['L', 44, 41],
          ['C', 44, 34, 56, 34, 56, 41],
          ['L', 56, 46],
        ] },
        { t: 'line', x1: 50, y1: 52, x2: 50, y2: 56 },
      ],
    },
    {
      id: 'database', name: 'Database', cat: 'Data',
      prims: [
        { t: 'ellipse', cx: 50, cy: 28, rx: 26, ry: 9 },
        { t: 'line', x1: 24, y1: 28, x2: 24, y2: 72 },
        { t: 'line', x1: 76, y1: 28, x2: 76, y2: 72 },
        { t: 'p', cmds: [['M', 24, 72], ['C', 24, 77, 76, 77, 76, 72]] },
        { t: 'p', cmds: [['M', 24, 44], ['C', 24, 49, 76, 49, 76, 44]] },
        { t: 'p', cmds: [['M', 24, 58], ['C', 24, 63, 76, 63, 76, 58]] },
      ],
    },
    {
      id: 'browser', name: 'Browser', cat: 'Software',
      prims: [
        { t: 'rrect', x: 14, y: 24, w: 72, h: 52, r: 6 },
        { t: 'line', x1: 14, y1: 38, x2: 86, y2: 38 },
        { t: 'circle', cx: 22, cy: 31, r: 2 },
        { t: 'circle', cx: 29, cy: 31, r: 2 },
        { t: 'circle', cx: 36, cy: 31, r: 2 },
        { t: 'rrect', x: 46, y: 28, w: 32, h: 6, r: 3 },
      ],
    },
    {
      id: 'endpoint', name: 'Computer Endpoint', cat: 'Compute',
      prims: [
        { t: 'rrect', x: 18, y: 22, w: 64, h: 44, r: 5 },
        { t: 'poly', pts: [[43, 66], [40, 80]] },
        { t: 'poly', pts: [[57, 66], [60, 80]] },
        { t: 'line', x1: 34, y1: 80, x2: 66, y2: 80 },
      ],
    },
    // ---- extras --------------------------------------------------------
    {
      id: 'firewall', name: 'Firewall', cat: 'Security',
      prims: (() => {
        const p = [{ t: 'rrect', x: 16, y: 30, w: 68, h: 44, r: 3 }];
        // brick courses
        const rows = [30, 41, 52, 63];
        for (let k = 1; k < rows.length; k++) p.push({ t: 'line', x1: 16, y1: rows[k], x2: 84, y2: rows[k] });
        // staggered vertical joints
        const seg = [
          [35, 30, 41], [57, 30, 41],
          [24, 41, 52], [46, 41, 52], [68, 41, 52],
          [35, 52, 63], [57, 52, 63],
          [24, 63, 74], [46, 63, 74], [68, 63, 74],
        ];
        for (const [x, y1, y2] of seg) p.push({ t: 'line', x1: x, y1, x2: x, y2 });
        return p;
      })(),
    },
    {
      id: 'wifi-ap', name: 'Wireless AP', cat: 'Network',
      prims: [
        { t: 'rrect', x: 30, y: 66, w: 40, h: 16, r: 4 },
        { t: 'circle', cx: 50, cy: 74, r: 2.2 },
        { t: 'p', cmds: [['M', 42, 54], ['C', 46, 50, 54, 50, 58, 54]] },
        { t: 'p', cmds: [['M', 36, 46], ['C', 44, 38, 56, 38, 64, 46]] },
        { t: 'p', cmds: [['M', 30, 38], ['C', 42, 26, 58, 26, 70, 38]] },
      ],
    },
    {
      id: 'laptop', name: 'Laptop', cat: 'Compute',
      prims: [
        { t: 'rrect', x: 26, y: 30, w: 48, h: 32, r: 3 },
        { t: 'polygon', pts: [[18, 74], [82, 74], [76, 66], [24, 66]] },
      ],
    },
    {
      id: 'internet', name: 'Internet / Globe', cat: 'Network',
      prims: [
        { t: 'circle', cx: 50, cy: 50, r: 30 },
        { t: 'ellipse', cx: 50, cy: 50, rx: 12, ry: 30 },
        { t: 'line', x1: 20, y1: 50, x2: 80, y2: 50 },
        { t: 'p', cmds: [['M', 24, 38], ['C', 40, 46, 60, 46, 76, 38]] },
        { t: 'p', cmds: [['M', 24, 62], ['C', 40, 54, 60, 54, 76, 62]] },
      ],
    },
    {
      id: 'load-balancer', name: 'Load Balancer', cat: 'Network',
      prims: [
        { t: 'rrect', x: 40, y: 44, w: 20, h: 14, r: 2 },
        { t: 'line', x1: 40, y1: 51, x2: 26, y2: 51 },
        { t: 'poly', pts: [[26, 51], [26, 26], [40, 26]] },
        { t: 'poly', pts: [[36, 22], [40, 26], [36, 30]] },
        { t: 'line', x1: 60, y1: 51, x2: 74, y2: 51 },
        { t: 'poly', pts: [[74, 51], [74, 76], [60, 76]] },
        { t: 'poly', pts: [[64, 72], [60, 76], [64, 80]] },
        { t: 'poly', pts: [[36, 48], [40, 44], [36, 40]] },
      ],
    },
    {
      id: 'storage', name: 'Storage / NAS', cat: 'Data',
      prims: [
        { t: 'rrect', x: 24, y: 22, w: 52, h: 56, r: 5 },
        { t: 'rrect', x: 32, y: 30, w: 36, h: 12, r: 2 },
        { t: 'circle', cx: 62, cy: 36, r: 2 },
        { t: 'rrect', x: 32, y: 48, w: 36, h: 12, r: 2 },
        { t: 'circle', cx: 62, cy: 54, r: 2 },
        { t: 'line', x1: 34, y1: 68, x2: 44, y2: 68 },
      ],
    },
    {
      id: 'block-storage', name: 'Block Storage', cat: 'Data',
      prims: [
        { t: 'rrect', x: 22, y: 24, w: 24, h: 24, r: 3 },
        { t: 'rrect', x: 54, y: 24, w: 24, h: 24, r: 3 },
        { t: 'rrect', x: 22, y: 56, w: 24, h: 24, r: 3 },
        { t: 'rrect', x: 54, y: 56, w: 24, h: 24, r: 3 },
      ],
    },
    {
      id: 'harddrive', name: 'Hard Drive', cat: 'Data',
      prims: [
        { t: 'rrect', x: 18, y: 28, w: 64, h: 44, r: 5 },
        { t: 'circle', cx: 44, cy: 50, r: 14 },
        { t: 'circle', cx: 44, cy: 50, r: 3 },
        { t: 'circle', cx: 68, cy: 33, r: 2.2 },
        { t: 'line', x1: 67, y1: 34, x2: 51, y2: 45 },
        { t: 'circle', cx: 72, cy: 64, r: 2 },
      ],
    },
    {
      id: 'cdn', name: 'CDN', cat: 'Network',
      prims: [
        { t: 'circle', cx: 50, cy: 50, r: 11 },
        { t: 'circle', cx: 50, cy: 18, r: 5 },
        { t: 'circle', cx: 78, cy: 34, r: 5 },
        { t: 'circle', cx: 78, cy: 66, r: 5 },
        { t: 'circle', cx: 50, cy: 82, r: 5 },
        { t: 'circle', cx: 22, cy: 66, r: 5 },
        { t: 'circle', cx: 22, cy: 34, r: 5 },
        { t: 'line', x1: 50, y1: 39, x2: 50, y2: 23 },
        { t: 'line', x1: 59, y1: 44, x2: 74, y2: 37 },
        { t: 'line', x1: 59, y1: 56, x2: 74, y2: 63 },
        { t: 'line', x1: 50, y1: 61, x2: 50, y2: 77 },
        { t: 'line', x1: 41, y1: 56, x2: 26, y2: 63 },
        { t: 'line', x1: 41, y1: 44, x2: 26, y2: 37 },
      ],
    },
    {
      id: 'cache', name: 'Cache', cat: 'Data',
      prims: [
        { t: 'rrect', x: 28, y: 24, w: 44, h: 52, r: 6 },
        { t: 'polygon', pts: [[54, 30], [38, 54], [48, 54], [44, 70], [62, 44], [52, 44]] },
        { t: 'line', x1: 28, y1: 36, x2: 22, y2: 36 },
        { t: 'line', x1: 28, y1: 50, x2: 22, y2: 50 },
        { t: 'line', x1: 28, y1: 64, x2: 22, y2: 64 },
        { t: 'line', x1: 72, y1: 36, x2: 78, y2: 36 },
        { t: 'line', x1: 72, y1: 50, x2: 78, y2: 50 },
        { t: 'line', x1: 72, y1: 64, x2: 78, y2: 64 },
      ],
    },
    {
      id: 'user', name: 'User', cat: 'People',
      prims: [
        { t: 'circle', cx: 50, cy: 36, r: 13 },
        { t: 'p', cmds: [['M', 24, 76], ['C', 24, 58, 76, 58, 76, 76]] },
      ],
    },
    {
      id: 'identity', name: 'Identity', cat: 'Security',
      prims: [
        { t: 'rrect', x: 16, y: 28, w: 68, h: 44, r: 5 },
        { t: 'circle', cx: 36, cy: 44, r: 8 },
        { t: 'p', cmds: [['M', 25, 62], ['C', 25, 52, 47, 52, 47, 62]] },
        { t: 'line', x1: 56, y1: 42, x2: 74, y2: 42 },
        { t: 'line', x1: 56, y1: 50, x2: 74, y2: 50 },
        { t: 'line', x1: 56, y1: 58, x2: 68, y2: 58 },
      ],
    },
    {
      id: 'secure', name: 'Secure', cat: 'Security',
      prims: [
        { t: 'rrect', x: 30, y: 50, w: 40, h: 32, r: 5 },
        { t: 'p', cmds: [['M', 38, 50], ['L', 38, 42], ['C', 38, 30, 62, 30, 62, 42], ['L', 62, 50]] },
        { t: 'circle', cx: 50, cy: 62, r: 3.5 },
        { t: 'line', x1: 50, y1: 65, x2: 50, y2: 72 },
      ],
    },
    {
      id: 'graphs', name: 'Graphs', cat: 'Observability',
      prims: [
        { t: 'line', x1: 20, y1: 20, x2: 20, y2: 78 },
        { t: 'line', x1: 20, y1: 78, x2: 82, y2: 78 },
        { t: 'rect', x: 30, y: 54, w: 10, h: 24 },
        { t: 'rect', x: 46, y: 42, w: 10, h: 36 },
        { t: 'rect', x: 62, y: 30, w: 10, h: 48 },
      ],
    },
    {
      id: 'analytics', name: 'Analytics', cat: 'Observability',
      prims: [
        { t: 'line', x1: 20, y1: 20, x2: 20, y2: 78 },
        { t: 'line', x1: 20, y1: 78, x2: 82, y2: 78 },
        { t: 'poly', pts: [[26, 66], [42, 54], [54, 60], [74, 34]] },
        { t: 'circle', cx: 26, cy: 66, r: 2.5 },
        { t: 'circle', cx: 42, cy: 54, r: 2.5 },
        { t: 'circle', cx: 54, cy: 60, r: 2.5 },
        { t: 'circle', cx: 74, cy: 34, r: 2.5 },
        { t: 'poly', pts: [[65, 33], [74, 34], [73, 43]] },
      ],
    },
    {
      id: 'logs', name: 'Log Scrolls', cat: 'Observability',
      prims: [
        { t: 'ellipse', cx: 50, cy: 28, rx: 22, ry: 6 },
        { t: 'line', x1: 28, y1: 28, x2: 28, y2: 80 },
        { t: 'line', x1: 72, y1: 28, x2: 72, y2: 80 },
        { t: 'p', cmds: [['M', 28, 80], ['C', 28, 84, 72, 84, 72, 80]] },
        { t: 'circle', cx: 37, cy: 44, r: 1.6 },
        { t: 'line', x1: 43, y1: 44, x2: 64, y2: 44 },
        { t: 'circle', cx: 37, cy: 54, r: 1.6 },
        { t: 'line', x1: 43, y1: 54, x2: 64, y2: 54 },
        { t: 'circle', cx: 37, cy: 64, r: 1.6 },
        { t: 'line', x1: 43, y1: 64, x2: 58, y2: 64 },
      ],
    },
    {
      id: 'alerting', name: 'Alerting', cat: 'Observability',
      prims: [
        { t: 'circle', cx: 50, cy: 24, r: 3 },
        { t: 'p', cmds: [['M', 34, 66], ['C', 34, 48, 38, 40, 50, 38], ['C', 62, 40, 66, 48, 66, 66]] },
        { t: 'line', x1: 28, y1: 66, x2: 72, y2: 66 },
        { t: 'p', cmds: [['M', 44, 72], ['C', 45, 77, 55, 77, 56, 72]] },
      ],
    },
    {
      id: 'datacentre', name: 'Server Rack', cat: 'Compute',
      prims: (() => {
        const p = [{ t: 'rrect', x: 18, y: 24, w: 64, h: 58, r: 4 }];
        for (const y of [32, 46, 60]) {
          p.push({ t: 'rrect', x: 26, y, w: 48, h: 10, r: 2 });
          p.push({ t: 'line', x1: 32, y1: y + 3, x2: 32, y2: y + 7 });
          p.push({ t: 'line', x1: 36, y1: y + 3, x2: 36, y2: y + 7 });
          p.push({ t: 'circle', cx: 64, cy: y + 5, r: 1.8 });
        }
        p.push({ t: 'line', x1: 44, y1: 74, x2: 56, y2: 74 });
        return p;
      })(),
    },
    {
      id: 'office-building', name: 'Office Building', cat: 'Facilities',
      prims: (() => {
        const p = [{ t: 'rrect', x: 28, y: 18, w: 44, h: 64, r: 2 }];
        for (const y of [26, 38, 50, 62]) for (const x of [36, 52]) {
          p.push({ t: 'rect', x, y, w: 12, h: 7 });
        }
        p.push({ t: 'rrect', x: 44, y: 72, w: 12, h: 10, r: 1 });
        return p;
      })(),
    },
    {
      id: 'office-space', name: 'Office Space', cat: 'Facilities',
      prims: [
        { t: 'line', x1: 20, y1: 56, x2: 58, y2: 56 },
        { t: 'line', x1: 24, y1: 56, x2: 24, y2: 78 },
        { t: 'line', x1: 54, y1: 56, x2: 54, y2: 78 },
        { t: 'rrect', x: 28, y: 36, w: 24, h: 16, r: 2 },
        { t: 'line', x1: 40, y1: 52, x2: 40, y2: 56 },
        { t: 'line', x1: 34, y1: 56, x2: 46, y2: 56 },
        { t: 'line', x1: 62, y1: 62, x2: 80, y2: 62 },
        { t: 'p', cmds: [['M', 80, 62], ['C', 84, 62, 84, 44, 79, 44]] },
        { t: 'line', x1: 71, y1: 62, x2: 71, y2: 80 },
        { t: 'line', x1: 64, y1: 80, x2: 78, y2: 80 },
      ],
    },
    {
      id: 'mobile-phone', name: 'Mobile Phone', cat: 'Devices',
      prims: [
        { t: 'rrect', x: 34, y: 14, w: 32, h: 72, r: 6 },
        { t: 'line', x1: 45, y1: 22, x2: 55, y2: 22 },
        { t: 'circle', cx: 50, cy: 79, r: 2.4 },
      ],
    },
    {
      id: 'tablet', name: 'Tablet', cat: 'Devices',
      prims: [
        { t: 'rrect', x: 26, y: 16, w: 48, h: 68, r: 5 },
        { t: 'circle', cx: 50, cy: 23, r: 1.8 },
        { t: 'circle', cx: 50, cy: 77, r: 2.4 },
      ],
    },
    {
      id: 'keyboard-mouse', name: 'Keyboard & Mouse', cat: 'Devices',
      prims: [
        { t: 'rrect', x: 10, y: 44, w: 54, h: 30, r: 4 },
        { t: 'line', x1: 10, y1: 54, x2: 64, y2: 54 },
        { t: 'line', x1: 10, y1: 64, x2: 64, y2: 64 },
        { t: 'line', x1: 24, y1: 44, x2: 24, y2: 74 },
        { t: 'line', x1: 37, y1: 44, x2: 37, y2: 74 },
        { t: 'line', x1: 50, y1: 44, x2: 50, y2: 74 },
        { t: 'line', x1: 24, y1: 69, x2: 50, y2: 69 },
        { t: 'rrect', x: 74, y: 46, w: 16, h: 28, r: 8 },
        { t: 'line', x1: 82, y1: 51, x2: 82, y2: 57 },
      ],
    },
    {
      id: 'money', name: 'Money', cat: 'Business',
      prims: [
        { t: 'rrect', x: 14, y: 32, w: 72, h: 36, r: 5 },
        { t: 'circle', cx: 24, cy: 50, r: 3.5 },
        { t: 'circle', cx: 76, cy: 50, r: 3.5 },
        { t: 'line', x1: 50, y1: 40, x2: 50, y2: 60 },
        { t: 'p', cmds: [['M', 57, 45], ['C', 57, 41, 43, 41, 43, 47], ['C', 43, 52, 57, 51, 57, 56], ['C', 57, 61, 43, 61, 43, 57]] },
      ],
    },
    {
      id: 'satellite', name: 'Satellite', cat: 'Network',
      prims: [
        { t: 'rrect', x: 42, y: 40, w: 16, h: 22, r: 2 },
        { t: 'rect', x: 12, y: 44, w: 22, h: 14 },
        { t: 'line', x1: 19, y1: 44, x2: 19, y2: 58 },
        { t: 'line', x1: 26, y1: 44, x2: 26, y2: 58 },
        { t: 'rect', x: 66, y: 44, w: 22, h: 14 },
        { t: 'line', x1: 73, y1: 44, x2: 73, y2: 58 },
        { t: 'line', x1: 80, y1: 44, x2: 80, y2: 58 },
        { t: 'line', x1: 34, y1: 51, x2: 42, y2: 51 },
        { t: 'line', x1: 58, y1: 51, x2: 66, y2: 51 },
        { t: 'line', x1: 50, y1: 40, x2: 50, y2: 30 },
        { t: 'p', cmds: [['M', 43, 31], ['Q', 50, 24, 57, 31]] },
      ],
    },
    {
      id: 'dish', name: 'Antenna / Dish', cat: 'Network',
      prims: (() => {
        const cx = 48, cy = 43, rx = 27, ry = 14, th = 30 * Math.PI / 180;
        const rot = (x, y) => [Math.round((cx + x * Math.cos(th) - y * Math.sin(th)) * 100) / 100, Math.round((cy + x * Math.sin(th) + y * Math.cos(th)) * 100) / 100];
        const pts = [];
        for (let i = 0; i < 44; i++) { const t = i / 44 * 2 * Math.PI; pts.push(rot(rx * Math.cos(t), ry * Math.sin(t))); }
        const feed = [66, 18], s1 = rot(6, -ry * 0.5), s2 = rot(rx * 0.6, 0), mount = rot(-rx * 0.35, ry * 0.6);
        return [
          { t: 'polygon', pts },
          { t: 'line', x1: s1[0], y1: s1[1], x2: feed[0], y2: feed[1] },
          { t: 'line', x1: s2[0], y1: s2[1], x2: feed[0], y2: feed[1] },
          { t: 'circle', cx: feed[0], cy: feed[1], r: 3 },
          { t: 'line', x1: mount[0], y1: mount[1], x2: 40, y2: 76 },
          { t: 'line', x1: 32, y1: 78, x2: 52, y2: 78 },
        ];
      })(),
    },
    {
      id: 'notebook', name: 'Notebook', cat: 'Business',
      prims: (() => {
        const p = [
          { t: 'rrect', x: 28, y: 18, w: 46, h: 64, r: 3 },
          { t: 'line', x1: 38, y1: 20, x2: 38, y2: 80 },
        ];
        for (const y of [26, 34, 42, 50, 58, 66, 74]) p.push({ t: 'line', x1: 24, y1: y, x2: 34, y2: y });
        for (const y of [34, 44, 54, 64]) p.push({ t: 'line', x1: 44, y1: y, x2: 66, y2: y });
        return p;
      })(),
    },
    {
      id: 'newspaper', name: 'Newspaper', cat: 'Business',
      prims: [
        { t: 'rrect', x: 16, y: 24, w: 68, h: 56, r: 2 },
        { t: 'line', x1: 22, y1: 34, x2: 78, y2: 34 },
        { t: 'rect', x: 22, y: 42, w: 26, h: 22 },
        { t: 'line', x1: 54, y1: 44, x2: 78, y2: 44 },
        { t: 'line', x1: 54, y1: 51, x2: 78, y2: 51 },
        { t: 'line', x1: 54, y1: 58, x2: 78, y2: 58 },
        { t: 'line', x1: 22, y1: 71, x2: 78, y2: 71 },
        { t: 'line', x1: 22, y1: 75, x2: 60, y2: 75 },
      ],
    },
    {
      id: 'cell-tower', name: 'Cell Tower', cat: 'Network',
      prims: [
        { t: 'line', x1: 43, y1: 80, x2: 48, y2: 32 },
        { t: 'line', x1: 57, y1: 80, x2: 52, y2: 32 },
        { t: 'line', x1: 47, y1: 48, x2: 53, y2: 48 },
        { t: 'line', x1: 46, y1: 58, x2: 54, y2: 58 },
        { t: 'line', x1: 45, y1: 68, x2: 55, y2: 68 },
        { t: 'line', x1: 50, y1: 32, x2: 50, y2: 24 },
        { t: 'p', cmds: [['M', 42, 22], ['Q', 37, 28, 42, 34]] },
        { t: 'p', cmds: [['M', 37, 17], ['Q', 29, 28, 37, 39]] },
        { t: 'p', cmds: [['M', 58, 22], ['Q', 63, 28, 58, 34]] },
        { t: 'p', cmds: [['M', 63, 17], ['Q', 71, 28, 63, 39]] },
      ],
    },
    {
      id: 'enterprise-building', name: 'Enterprise Office Building', cat: 'Facilities',
      prims: (() => {
        const p = [{ t: 'rrect', x: 20, y: 22, w: 60, h: 60, r: 2 }];
        for (const y of [28, 38, 48, 58]) for (const x of [27, 39, 51, 63]) p.push({ t: 'rect', x, y, w: 8, h: 6 });
        p.push({ t: 'rrect', x: 44, y: 70, w: 12, h: 12, r: 1 });
        return p;
      })(),
    },
    {
      id: 'cog', name: 'Configuration Cog', cat: 'Tools',
      prims: (() => {
        const cx = 50, cy = 50, rO = 32, rI = 24, n = 8, pts = [];
        const add = (ang, r) => pts.push([Math.round((cx + Math.cos(ang) * r) * 100) / 100, Math.round((cy + Math.sin(ang) * r) * 100) / 100]);
        for (let i = 0; i < n; i++) {
          const a = (i / n) * 2 * Math.PI, seg = 2 * Math.PI / n;
          add(a, rI); add(a + seg * 0.18, rO); add(a + seg * 0.32, rO); add(a + seg * 0.5, rI);
        }
        return [{ t: 'polygon', pts }, { t: 'circle', cx: 50, cy: 50, r: 10 }];
      })(),
    },
    {
      id: 'magnifier', name: 'Magnifying Glass', cat: 'Tools',
      prims: [
        { t: 'circle', cx: 44, cy: 44, r: 20 },
        { t: 'line', x1: 58, y1: 58, x2: 78, y2: 78 },
      ],
    },
    {
      id: 'lightbulb', name: 'Light Bulb', cat: 'Tools',
      prims: [
        { t: 'circle', cx: 50, cy: 40, r: 19 },
        { t: 'line', x1: 43, y1: 57, x2: 43, y2: 64 },
        { t: 'line', x1: 57, y1: 57, x2: 57, y2: 64 },
        { t: 'rrect', x: 43, y: 64, w: 14, h: 9, r: 2 },
        { t: 'line', x1: 44, y1: 69, x2: 56, y2: 69 },
        { t: 'p', cmds: [['M', 45, 42], ['Q', 50, 34, 55, 42]] },
      ],
    },
    {
      id: 'cpu', name: 'CPU', cat: 'Compute',
      prims: (() => {
        const p = [{ t: 'rrect', x: 30, y: 30, w: 40, h: 40, r: 3 }, { t: 'rect', x: 40, y: 40, w: 20, h: 20 }];
        for (const c of [40, 50, 60]) {
          p.push({ t: 'line', x1: c, y1: 30, x2: c, y2: 24 });
          p.push({ t: 'line', x1: c, y1: 70, x2: c, y2: 76 });
          p.push({ t: 'line', x1: 30, y1: c, x2: 24, y2: c });
          p.push({ t: 'line', x1: 70, y1: c, x2: 76, y2: c });
        }
        return p;
      })(),
    },
    {
      id: 'ram', name: 'RAM', cat: 'Compute',
      prims: (() => {
        const p = [{ t: 'rrect', x: 16, y: 34, w: 68, h: 30, r: 2 },
          { t: 'rect', x: 24, y: 40, w: 12, h: 12 }, { t: 'rect', x: 44, y: 40, w: 12, h: 12 }, { t: 'rect', x: 64, y: 40, w: 12, h: 12 }];
        for (let x = 22; x <= 78; x += 5) p.push({ t: 'line', x1: x, y1: 64, x2: x, y2: 70 });
        return p;
      })(),
    },
    {
      id: 'arrow-left', name: 'Arrow Left', cat: 'Arrows',
      prims: [{ t: 'line', x1: 80, y1: 50, x2: 24, y2: 50 }, { t: 'poly', pts: [[36, 38], [22, 50], [36, 62]] }],
    },
    {
      id: 'arrow-right', name: 'Arrow Right', cat: 'Arrows',
      prims: [{ t: 'line', x1: 20, y1: 50, x2: 76, y2: 50 }, { t: 'poly', pts: [[64, 38], [78, 50], [64, 62]] }],
    },
    {
      id: 'arrow-up', name: 'Arrow Up', cat: 'Arrows',
      prims: [{ t: 'line', x1: 50, y1: 80, x2: 50, y2: 24 }, { t: 'poly', pts: [[38, 36], [50, 22], [62, 36]] }],
    },
    {
      id: 'arrow-down', name: 'Arrow Down', cat: 'Arrows',
      prims: [{ t: 'line', x1: 50, y1: 20, x2: 50, y2: 76 }, { t: 'poly', pts: [[38, 64], [50, 78], [62, 64]] }],
    },
    {
      id: 'key', name: 'Key', cat: 'Security',
      prims: [
        { t: 'circle', cx: 32, cy: 50, r: 14 },
        { t: 'circle', cx: 32, cy: 50, r: 5 },
        { t: 'line', x1: 46, y1: 50, x2: 82, y2: 50 },
        { t: 'line', x1: 74, y1: 50, x2: 74, y2: 60 },
        { t: 'line', x1: 66, y1: 50, x2: 66, y2: 58 },
      ],
    },
    {
      id: 'check', name: 'Check', cat: 'Status',
      prims: [
        { t: 'circle', cx: 50, cy: 50, r: 30 },
        { t: 'poly', pts: [[36, 51], [46, 62], [66, 40]] },
      ],
    },
    {
      id: 'spanner', name: 'Spanner', cat: 'Tools',
      prims: (() => {
        const base = [[45, 83], [45, 48], [37, 44], [37, 31], [45, 26], [45, 37], [55, 37], [55, 26], [63, 31], [63, 44], [55, 48], [55, 83]];
        const a = -40 * Math.PI / 180, cx = 50, cy = 56;
        const pts = base.map(([px, py]) => { const dx = px - cx, dy = py - cy; return [Math.round((cx + dx * Math.cos(a) - dy * Math.sin(a)) * 100) / 100, Math.round((cy + dx * Math.sin(a) + dy * Math.cos(a)) * 100) / 100]; });
        return [{ t: 'polygon', pts }];
      })(),
    },
    {
      id: 'pencil-ruler', name: 'Pencil & Ruler', cat: 'Tools',
      prims: (() => {
        const rot = (px, py, deg) => { const a = deg * Math.PI / 180, cx = 50, cy = 50, dx = px - cx, dy = py - cy; return [Math.round((cx + dx * Math.cos(a) - dy * Math.sin(a)) * 100) / 100, Math.round((cy + dx * Math.sin(a) + dy * Math.cos(a)) * 100) / 100]; };
        const map = (arr, deg) => arr.map(q => rot(q[0], q[1], deg));
        const p = [];
        p.push({ t: 'polygon', pts: map([[38, 14], [56, 14], [56, 86], [38, 86]], 45) });
        for (const y of [26, 38, 50, 62, 74]) { const a = rot(38, y, 45), b = rot(46, y, 45); p.push({ t: 'line', x1: a[0], y1: a[1], x2: b[0], y2: b[1] }); }
        p.push({ t: 'polygon', pts: map([[44, 30], [56, 30], [56, 74], [44, 74]], -45) });
        p.push({ t: 'polygon', pts: map([[44, 30], [50, 18], [56, 30]], -45) });
        const g1 = rot(50, 18, -45), g2 = rot(50, 24, -45); p.push({ t: 'line', x1: g1[0], y1: g1[1], x2: g2[0], y2: g2[1] });
        const e1 = rot(44, 66, -45), e2 = rot(56, 66, -45); p.push({ t: 'line', x1: e1[0], y1: e1[1], x2: e2[0], y2: e2[1] });
        return p;
      })(),
    },
    {
      id: 'folder', name: 'Folder', cat: 'Data',
      prims: [
        { t: 'polygon', pts: [[18, 34], [38, 34], [44, 42], [82, 42], [82, 74], [18, 74]] },
        { t: 'line', x1: 18, y1: 50, x2: 82, y2: 50 },
      ],
    },
    {
      id: 'process', name: 'Process', cat: 'Flow',
      prims: (() => {
        const cx = 50, cy = 50, r = 24, D = Math.PI / 180;
        const P = (deg) => [cx + r * Math.cos(deg * D), cy + r * Math.sin(deg * D)];
        const rnd = (a) => a.map(v => Math.round(v * 100) / 100);
        const arc = (a0, a1) => { const pts = []; for (let i = 0; i <= 20; i++) pts.push(rnd(P(a0 + (a1 - a0) * i / 20))); return pts; };
        const head = (deg) => { const tip = P(deg), bx = P(deg - 9), nx = Math.cos(deg * D), ny = Math.sin(deg * D), w = 6; return { t: 'poly', pts: [rnd([bx[0] + nx * w, bx[1] + ny * w]), rnd(tip), rnd([bx[0] - nx * w, bx[1] - ny * w])] }; };
        return [
          { t: 'poly', pts: arc(200, 340) }, head(340),
          { t: 'poly', pts: arc(20, 160) }, head(160),
        ];
      })(),
    },
    {
      id: 'task-list', name: 'Task List', cat: 'Flow',
      prims: (() => {
        const p = [{ t: 'rrect', x: 24, y: 20, w: 52, h: 64, r: 4 }];
        const rows = [32, 46, 60];
        rows.forEach((y, i) => {
          p.push({ t: 'rect', x: 32, y, w: 8, h: 8 });
          p.push({ t: 'line', x1: 46, y1: y + 4, x2: 68, y2: y + 4 });
          if (i === 0) p.push({ t: 'poly', pts: [[33, 36], [35, 39], [40, 33]] });
        });
        return p;
      })(),
    },
    {
      id: 'queue', name: 'Queue System', cat: 'Flow',
      prims: [
        { t: 'rect', x: 14, y: 42, w: 12, h: 16 },
        { t: 'rect', x: 30, y: 42, w: 12, h: 16 },
        { t: 'rect', x: 46, y: 42, w: 12, h: 16 },
        { t: 'line', x1: 58, y1: 50, x2: 70, y2: 50 },
        { t: 'poly', pts: [[64, 46], [70, 50], [64, 54]] },
        { t: 'rrect', x: 70, y: 38, w: 16, h: 24, r: 2 },
      ],
    },
    {
      id: 'certification', name: 'Certification Shield', cat: 'Security',
      prims: [
        { t: 'p', cmds: [['M', 50, 15], ['L', 79, 25], ['L', 79, 47], ['C', 79, 66, 66, 79, 50, 85], ['C', 34, 79, 21, 66, 21, 47], ['L', 21, 25], ['Z']] },
        { t: 'poly', pts: [[37, 49], [46, 60], [64, 38]] },
      ],
    },
  ];

  // ---- SVG renderer --------------------------------------------------------
  function primToSVG(p) {
    const q = (o) => Object.entries(o).map(([k, v]) => `${k}="${v}"`).join(' ');
    switch (p.t) {
      case 'rect': return `<rect ${q({ x: p.x, y: p.y, width: p.w, height: p.h })}/>`;
      case 'rrect': return `<rect ${q({ x: p.x, y: p.y, width: p.w, height: p.h, rx: p.r, ry: p.r })}/>`;
      case 'line': return `<line ${q({ x1: p.x1, y1: p.y1, x2: p.x2, y2: p.y2 })}/>`;
      case 'circle': return `<circle ${q({ cx: p.cx, cy: p.cy, r: p.r })}/>`;
      case 'ellipse': return `<ellipse ${q({ cx: p.cx, cy: p.cy, rx: p.rx, ry: p.ry })}/>`;
      case 'poly': return `<polyline points="${p.pts.map((a) => a.join(',')).join(' ')}"/>`;
      case 'polygon': return `<polygon points="${p.pts.map((a) => a.join(',')).join(' ')}"/>`;
      case 'p': return `<path d="${p.cmds.map((c) => c.join(' ')).join(' ')}"/>`;
      default: return '';
    }
  }
  function iconToSVG(icon, opts) {
    opts = opts || {};
    const sw = opts.strokeWidth != null ? opts.strokeWidth : 2;
    const color = opts.color || 'currentColor';
    const size = opts.size || 100;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}" ` +
      `fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">` +
      icon.prims.map(primToSVG).join('') + `</svg>`;
  }

  // ---- draw.io stencil renderer -------------------------------------------
  function primToStencil(p) {
    switch (p.t) {
      case 'rect': return `<rect x="${p.x}" y="${p.y}" w="${p.w}" h="${p.h}"/><stroke/>`;
      case 'rrect': {
        const arc = Math.round((p.r / Math.min(p.w, p.h)) * 100);
        return `<roundrect x="${p.x}" y="${p.y}" w="${p.w}" h="${p.h}" arcsize="${arc}"/><stroke/>`;
      }
      case 'line': return `<path><move x="${p.x1}" y="${p.y1}"/><line x="${p.x2}" y="${p.y2}"/></path><stroke/>`;
      case 'circle': return `<ellipse x="${p.cx - p.r}" y="${p.cy - p.r}" w="${p.r * 2}" h="${p.r * 2}"/><stroke/>`;
      case 'ellipse': return `<ellipse x="${p.cx - p.rx}" y="${p.cy - p.ry}" w="${p.rx * 2}" h="${p.ry * 2}"/><stroke/>`;
      case 'poly': case 'polygon': {
        let s = `<path><move x="${p.pts[0][0]}" y="${p.pts[0][1]}"/>`;
        for (let i = 1; i < p.pts.length; i++) s += `<line x="${p.pts[i][0]}" y="${p.pts[i][1]}"/>`;
        if (p.t === 'polygon') s += `<close/>`;
        return s + `</path><stroke/>`;
      }
      case 'p': {
        let s = `<path>`;
        for (const c of p.cmds) {
          const k = c[0];
          if (k === 'M') s += `<move x="${c[1]}" y="${c[2]}"/>`;
          else if (k === 'L') s += `<line x="${c[1]}" y="${c[2]}"/>`;
          else if (k === 'C') s += `<curve x1="${c[1]}" y1="${c[2]}" x2="${c[3]}" y2="${c[4]}" x3="${c[5]}" y3="${c[6]}"/>`;
          else if (k === 'Q') s += `<quad x1="${c[1]}" y1="${c[2]}" x2="${c[3]}" y2="${c[4]}"/>`;
          else if (k === 'Z') s += `<close/>`;
        }
        return s + `</path><stroke/>`;
      }
      default: return '';
    }
  }
  function iconToStencil(icon) {
    const body = icon.prims.map(primToStencil).join('');
    return `<shape name="${icon.name}" h="100" w="100" aspect="fixed" strokewidth="inherit">` +
      `<foreground><linecap cap="round"/><linejoin join="round"/>${body}</foreground></shape>`;
  }

  ICONS.sort((a, b) => a.name.localeCompare(b.name));
  const api = { ICONS, iconToSVG, iconToStencil, primToSVG, primToStencil };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.ICON_DATA = api;
})(typeof window !== 'undefined' ? window : globalThis);
