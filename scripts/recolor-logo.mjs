import sharp from "sharp";

const { data, info } = await sharp("public/images/logo.png")
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const black = Buffer.from(data);
const white = Buffer.from(data);

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const isMark = r - b > 25 && r > 120 && g > 80;

  if (isMark) {
    black[i] = 17;
    black[i + 1] = 17;
    black[i + 2] = 17;
    black[i + 3] = 255;
    white[i] = 255;
    white[i + 1] = 255;
    white[i + 2] = 255;
    white[i + 3] = 255;
  } else {
    black[i + 3] = 0;
    white[i + 3] = 0;
  }
}

const raw = { raw: { width: info.width, height: info.height, channels: 4 } };
await sharp(black, raw).png().toFile("public/images/logo-black.png");
await sharp(white, raw).png().toFile("public/images/logo-white.png");
console.log(info.width, info.height);
