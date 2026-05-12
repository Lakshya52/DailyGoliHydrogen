import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to scan for images
const DIRS_TO_SCAN = ['public', 'app'];
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function optimizeImages() {
  const images = [];

  async function scanDir(dir) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          // Ignore node_modules and .git
          if (entry.name !== 'node_modules' && entry.name !== '.git') {
            await scanDir(fullPath);
          }
        } else {
          const ext = path.extname(entry.name).toLowerCase();
          if (EXTENSIONS.has(ext)) {
            images.push(fullPath);
          }
        }
      }
    } catch (e) {
      if (e.code !== 'ENOENT') {
        console.error(`Error scanning ${dir}:`, e);
      }
    }
  }

  console.log('Scanning directories for images...');
  for (const dirName of DIRS_TO_SCAN) {
    const dir = path.join(__dirname, dirName);
    await scanDir(dir);
  }

  console.log(`Found ${images.length} images to optimize.`);

  let optimizedCount = 0;
  let totalSaved = 0;

  for (const file of images) {
    try {
      const stats = await fs.stat(file);
      const originalSize = stats.size;

      const ext = path.extname(file).toLowerCase();
      
      const buffer = await fs.readFile(file);
      let sharpInstance = sharp(buffer);
      
      if (ext === '.jpg' || ext === '.jpeg') {
        sharpInstance = sharpInstance.jpeg({ quality: 80, mozjpeg: true });
      } else if (ext === '.png') {
        sharpInstance = sharpInstance.png({ quality: 80, compressionLevel: 9 });
      } else if (ext === '.webp') {
        sharpInstance = sharpInstance.webp({ quality: 80 });
      }
      
      const outputBuffer = await sharpInstance.toBuffer();
      const newSize = outputBuffer.length;
      
      if (newSize < originalSize) {
        await fs.writeFile(file, outputBuffer);
        const saved = originalSize - newSize;
        totalSaved += saved;
        optimizedCount++;
        console.log(`✅ Optimized ${path.basename(file)} (-${(saved / 1024).toFixed(2)} KB)`);
      } else {
        console.log(`⏩ Skipped ${path.basename(file)} (Already optimized)`);
      }
    } catch (e) {
      console.error(`❌ Error optimizing ${path.basename(file)}:`, e.message);
    }
  }

  console.log('\n--- Optimization Complete ---');
  console.log(`Images optimized: ${optimizedCount} / ${images.length}`);
  console.log(`Total size saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

optimizeImages();
