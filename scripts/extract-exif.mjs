/**
 * Extract EXIF data + blur placeholders from all images in /public/XT5/
 * Run: node scripts/extract-exif.mjs
 * Outputs: src/data/photos.json
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import exifr from "exifr";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const photosDir = path.join(root, "public", "XT5");
const outputPath = path.join(root, "src", "data", "photos.json");

const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".tiff"]);

function formatShutter(exposureTime) {
  if (!exposureTime) return null;
  if (exposureTime >= 1) return `${exposureTime}s`;
  const denominator = Math.round(1 / exposureTime);
  return `1/${denominator}s`;
}

async function generateBlurDataURL(filePath) {
  try {
    const buffer = await sharp(filePath)
      .resize(16, undefined, { fit: "inside" })
      .jpeg({ quality: 40 })
      .toBuffer();
    return `data:image/jpeg;base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

async function main() {
  if (!fs.existsSync(photosDir)) {
    console.log("No /public/XT5/ directory found. Creating empty photos.json.");
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
    return;
  }

  const files = fs
    .readdirSync(photosDir)
    .filter((f) => SUPPORTED.has(path.extname(f).toLowerCase()))
    .sort();

  if (files.length === 0) {
    console.log("No images found in /public/XT5/. Creating empty photos.json.");
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
    return;
  }

  console.log(`Found ${files.length} images. Extracting EXIF + blur placeholders…`);

  const photos = [];

  for (const file of files) {
    const filePath = path.join(photosDir, file);
    let exif = null;

    try {
      exif = await exifr.parse(filePath, {
        pick: ["FocalLength", "FocalLengthIn35mmFormat", "FNumber", "ExposureTime", "ISO", "Orientation"],
      });
    } catch {
      // No EXIF data
    }

    // Use sharp for reliable dimensions (handles orientation automatically)
    const metadata = await sharp(filePath).metadata();
    const finalWidth = metadata.width || 0;
    const finalHeight = metadata.height || 0;

    // Generate blur placeholder
    const blurDataURL = await generateBlurDataURL(filePath);

    photos.push({
      filename: file,
      src: `/XT5/${file}`,
      width: finalWidth,
      height: finalHeight,
      focalLength: exif?.FocalLengthIn35mmFormat
        ? `${Math.round(exif.FocalLengthIn35mmFormat)}mm`
        : exif?.FocalLength
        ? `${Math.round(exif.FocalLength)}mm`
        : null,
      aperture: exif?.FNumber ? `f/${exif.FNumber}` : null,
      shutterSpeed: formatShutter(exif?.ExposureTime),
      iso: exif?.ISO ? `ISO ${exif.ISO}` : null,
      blurDataURL,
    });

    console.log(`  ✓ ${file} (${finalWidth}×${finalHeight})`);
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(photos, null, 2));
  console.log(`\nWrote ${photos.length} entries to src/data/photos.json`);
}

main().catch(console.error);
