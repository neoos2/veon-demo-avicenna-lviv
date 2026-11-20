// One-off: crops the client's own photos (Cloudinary originals) into AVIF + WebP sets in public/img.
// Usage: node scripts/build-images.mjs <folder with originals>
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const src = process.argv[2];
if (!src) { console.error("usage: node scripts/build-images.mjs <src-dir>"); process.exit(1); }
const out = path.resolve("public/img");
fs.mkdirSync(out, { recursive: true });

// name, file, crop {left, top, width, height} or null, output widths
const jobs = [
  ["team-wide", "team1_pflr7c.webp", { left: 0, top: 0, width: 1920, height: 760 }, [640, 960, 1440, 1920]],
  ["team-43", "team1_pflr7c.webp", { left: 110, top: 0, width: 1717, height: 1288 }, [480, 780, 1170]],
  ["child", "child_on_visit2_d14sry.webp", { left: 700, top: 0, width: 1024, height: 1280 }, [480, 720, 1024]],
  ["likar", "dentist_l_ejpzjc.webp", null, [640, 960, 1280]],
  ["microscope", "kb5v6ftflhbxgmlvb1t4.jpg", { left: 0, top: 200, width: 1200, height: 1200 }, [240, 480]],
  ["terapiya", "t0bbbq0975li4cysbxjn.jpg", { left: 0, top: 37, width: 1135, height: 756 }, [640, 1135]],
  ["implant", "patient-help_lfgg0b.webp", null, [640, 1200]],
  ["khirurgiya", "operation_npblaz.webp", null, [640, 1200]],
];

for (const [name, file, crop, widths] of jobs) {
  const base = () => (crop ? sharp(path.join(src, file)).extract(crop) : sharp(path.join(src, file)));
  for (const w of widths) {
    await base().resize({ width: w }).avif({ quality: 52, effort: 5 }).toFile(path.join(out, `${name}-${w}.avif`));
    const info = await base().resize({ width: w }).webp({ quality: 74 }).toFile(path.join(out, `${name}-${w}.webp`));
    console.log(name, w, info.width + "x" + info.height);
  }
}
// Logo (tooth, transparent) for the header and favicon.
for (const w of [48, 96, 192]) {
  await sharp(path.join(src, "logo512.png")).resize({ width: w }).webp({ quality: 90 }).toFile(path.join(out, `logo-${w}.webp`));
}
await sharp(path.join(src, "logo512.png")).resize({ width: 32 }).png().toFile(path.join(out, "favicon-32.png"));
await sharp(path.join(src, "logo512.png")).resize({ width: 180 }).flatten({ background: "#ffffff" }).png().toFile(path.join(out, "apple-touch-icon.png"));
console.log("done");
