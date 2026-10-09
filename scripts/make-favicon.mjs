import { writeFileSync } from "node:fs";
import sharp from "sharp";

const sizes = [16, 32, 48];
const images = await Promise.all(
  sizes.map((size) =>
    sharp("src/app/icon.png").resize(size, size).png().toBuffer(),
  ),
);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);

let offset = 6 + 16 * images.length;
const entries = images.map((data, i) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(sizes[i] % 256, 0);
  entry.writeUInt8(sizes[i] % 256, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(data.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += data.length;
  return entry;
});

writeFileSync("src/app/favicon.ico", Buffer.concat([header, ...entries, ...images]));
