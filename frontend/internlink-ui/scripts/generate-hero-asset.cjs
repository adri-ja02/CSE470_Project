const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const width = 1800;
const height = 1150;
const bytesPerPixel = 3;
const data = Buffer.alloc((width * bytesPerPixel + 1) * height);

const clamp = (value, min = 0, max = 255) => Math.max(min, Math.min(max, value));
const mix = (a, b, t) => a + (b - a) * t;
const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};
const noise = (x, y) => {
  const value = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

const addColor = (base, light, amount) => [
  mix(base[0], light[0], amount),
  mix(base[1], light[1], amount),
  mix(base[2], light[2], amount)
];

const moon = { x: width * 0.52, y: height * 0.2, radius: 70 };
const arch = { x: width * 0.52, y: height * 0.36, rx: 590, ry: 410 };
const stalactites = [
  { x: 180, w: 140, h: 250 },
  { x: 410, w: 95, h: 180 },
  { x: 730, w: 120, h: 210 },
  { x: 1160, w: 150, h: 240 },
  { x: 1500, w: 120, h: 220 }
];

for (let y = 0; y < height; y += 1) {
  const row = y * (width * bytesPerPixel + 1);
  data[row] = 0;

  for (let x = 0; x < width; x += 1) {
    const nx = x / width;
    const ny = y / height;
    const grain = noise(x * 0.035, y * 0.035);
    const archValue = ((x - arch.x) ** 2) / (arch.rx ** 2) + ((y - arch.y) ** 2) / (arch.ry ** 2);
    const inOpening = archValue < 1 && y < height * 0.66;
    const rim = smoothstep(0.88, 1.05, archValue) * (y < height * 0.72 ? 1 : 0);
    const vignette = smoothstep(0.25, 0.98, Math.hypot(nx - 0.52, ny - 0.48));

    let color;

    if (inOpening) {
      const skyT = smoothstep(0, height * 0.62, y);
      color = [
        mix(8, 24, skyT),
        mix(20, 42, skyT),
        mix(38, 70, skyT)
      ];

      const star = noise(x * 1.9, y * 1.9);
      if (star > 0.997 && y < height * 0.36) {
        const sparkle = (star - 0.997) / 0.003;
        color = addColor(color, [235, 244, 255], sparkle * 0.9);
      }

      const moonDistance = Math.hypot(x - moon.x, y - moon.y);
      const moonDisk = smoothstep(moon.radius, moon.radius - 14, moonDistance);
      const moonGlow = smoothstep(moon.radius + 300, moon.radius, moonDistance);
      color = addColor(color, [185, 220, 235], moonGlow * 0.42);
      color = addColor(color, [237, 245, 242], moonDisk * 0.96);
    } else {
      const stone = 10 + grain * 16 + noise(x * 0.012, y * 0.018) * 22;
      color = [
        stone * 0.34,
        stone * 0.42,
        stone * 0.48
      ];

      const sideShadow = smoothstep(0.34, 0.03, nx) + smoothstep(0.66, 0.98, nx);
      color = addColor(color, [1, 2, 5], clamp(sideShadow, 0, 1) * 0.75);
      color = addColor(color, [2, 4, 7], vignette * 0.55);
    }

    const shaftWidth = 82 + Math.max(y - moon.y, 0) * 0.31;
    const shaftCenter = moon.x + Math.sin(ny * 5.4) * 18;
    const shaft = smoothstep(shaftWidth, 0, Math.abs(x - shaftCenter)) *
      smoothstep(moon.y - 20, height * 0.82, y) *
      smoothstep(height * 0.97, height * 0.62, y);
    color = addColor(color, [119, 196, 200], shaft * 0.28);

    const floor = smoothstep(height * 0.65, height * 0.9, y);
    if (floor > 0) {
      const floorLight = smoothstep(520, 0, Math.abs(x - arch.x)) * floor;
      color = addColor(color, [35, 48, 44], floor * 0.42);
      color = addColor(color, [115, 167, 152], floorLight * 0.34);
    }

    if (rim > 0) {
      color = addColor(color, [1, 2, 5], rim * 0.55);
      color = addColor(color, [54, 72, 75], (1 - rim) * 0.12);
    }

    for (const spike of stalactites) {
      const distance = Math.abs(x - spike.x);
      const spikeY = spike.h * (1 - distance / spike.w);
      if (distance < spike.w && y < spikeY) {
        const darkness = smoothstep(spikeY, 0, y);
        color = addColor(color, [1, 2, 5], 0.88 + darkness * 0.08);
      }
    }

    const ledgeLeft = smoothstep(0.28, 0.02, nx) * smoothstep(0.15, 0.85, ny);
    const ledgeRight = smoothstep(0.72, 0.98, nx) * smoothstep(0.12, 0.86, ny);
    color = addColor(color, [1, 2, 5], clamp(ledgeLeft + ledgeRight, 0, 1) * 0.7);

    const offset = row + 1 + x * bytesPerPixel;
    data[offset] = clamp(color[0]);
    data[offset + 1] = clamp(color[1]);
    data[offset + 2] = clamp(color[2]);
  }
}

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n += 1) {
  let c = n;
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

const crc32 = (buffer) => {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
};

const chunk = (type, payload) => {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  const crc = Buffer.alloc(4);
  length.writeUInt32BE(payload.length, 0);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, payload])), 0);
  return Buffer.concat([length, typeBuffer, payload, crc]);
};

const header = Buffer.alloc(13);
header.writeUInt32BE(width, 0);
header.writeUInt32BE(height, 4);
header[8] = 8;
header[9] = 2;

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', header),
  chunk('IDAT', zlib.deflateSync(data, { level: 9 })),
  chunk('IEND', Buffer.alloc(0))
]);

const outputPath = path.join(__dirname, '..', 'public', 'hero-cave-moonlight.png');
fs.writeFileSync(outputPath, png);
console.log(`Wrote ${outputPath}`);
