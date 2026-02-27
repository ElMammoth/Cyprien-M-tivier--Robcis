/**
 * Extract EXIF data from all images in /public/XT5/
 * Run: node scripts/extract-exif.mjs
 * Outputs: src/data/photos.json
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import exifr from "exifr";
import { createRequire } from "module";

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

async function getImageDimensions(filePath) {
  // Read first bytes to detect dimensions from file header
  const buf = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".jpg" || ext === ".jpeg") {
    // Parse JPEG SOF markers for dimensions
    let offset = 2;
    while (offset < buf.length) {
      if (buf[offset] !== 0xff) break;
      const marker = buf[offset + 1];
      const length = buf.readUInt16BE(offset + 2);
      // SOF markers: 0xC0-0xCF except 0xC4, 0xC8, 0xCC
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        const height = buf.readUInt16BE(offset + 5);
        const width = buf.readUInt16BE(offset + 7);
        return { width, height };
      }
      offset += 2 + length;
    }
  }

  if (ext === ".png") {
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    return { width, height };
  }

  return { width: 0, height: 0 };
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

  console.log(`Found ${files.length} images. Extracting EXIF…`);

  const photos = [];

  for (const file of files) {
    const filePath = path.join(photosDir, file);
    let exif = null;

    try {
      exif = await exifr.parse(filePath, {
        pick: ["FocalLength", "FocalLengthIn35mmFormat", "FNumber", "ExposureTime", "ISO", "ImageWidth", "ImageHeight", "ExifImageWidth", "ExifImageHeight", "Orientation"],
      });
    } catch {
      // No EXIF data
    }

    const dims = await getImageDimensions(filePath);
    const width = exif?.ExifImageWidth || exif?.ImageWidth || dims.width;
    const height = exif?.ExifImageHeight || exif?.ImageHeight || dims.height;

    // Handle orientation — swap dimensions for rotated images
    const orientation = exif?.Orientation || 1;
    const isRotated = orientation >= 5 && orientation <= 8;
    const finalWidth = isRotated ? height : width;
    const finalHeight = isRotated ? width : height;

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
    });

    console.log(`  ✓ ${file} (${finalWidth}×${finalHeight})`);
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(photos, null, 2));
  console.log(`\nWrote ${photos.length} entries to src/data/photos.json`);
}

main().catch(console.error);
