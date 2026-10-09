import sharp from "sharp";

async function icon(size, out) {
  const mark = await sharp("public/images/logo-white.png")
    .trim()
    .resize(Math.round(size * 0.62), Math.round(size * 0.62), { fit: "inside" })
    .toBuffer();
  const circle = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#111111"/></svg>`,
  );
  await sharp(circle)
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toFile(out);
}

await icon(512, "src/app/icon.png");
await icon(180, "src/app/apple-icon.png");
