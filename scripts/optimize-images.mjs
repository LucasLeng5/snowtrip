import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';

const SRC = '/workspaces/default/code/src/imports';
const OUT = '/workspaces/default/code/src/imports/optimized';

// 根据文件用途设置不同参数
const configs = {
  // 教练卡片 (大图，保持可读性)
  'ANI.jpg':      { width: 600, quality: 82 },
  'Jeff.jpg':     { width: 600, quality: 82 },
  'Max.jpg':      { width: 600, quality: 82 },
  'Wade.jpg':     { width: 600, quality: 82 },
  '__.jpg':       { width: 600, quality: 82 },
  // 二维码 (必须清晰可扫，不缩放，只压缩)
  'wechat.jpg':      { quality: 90 },
  'alipay.jpg':      { quality: 90 },
  'youngsnow.jpg':   { quality: 90 },
  // 老文件
  '79a7effe0dc35ca60067aa1c76a0e63b.jpg': { quality: 85 },
};

await mkdir(OUT, { recursive: true });

const files = await readdir(SRC);
const jpgs = files.filter(f => /\.(jpe?g|png)$/i.test(f) && f !== '.' && f !== '..');

for (const file of jpgs) {
  const inPath  = join(SRC, file);
  const outPath = join(OUT, file);
  const cfg = configs[file] || { quality: 82 };

  const inStat = await stat(inPath);
  const inKB   = (inStat.size / 1024).toFixed(1);

  try {
    let pipeline = sharp(inPath, { failOnError: false });

    if (cfg.width) {
      const meta = await pipeline.metadata();
      // 只缩小，不放大
      if (meta.width && meta.width > cfg.width) {
        pipeline = pipeline.resize(cfg.width, null, { withoutEnlargement: true, fit: 'inside' });
      }
    }

    await pipeline
      .jpeg({ quality: cfg.quality ?? 82, mozjpeg: true, progressive: true })
      .toFile(outPath);

    const outStat = await stat(outPath);
    const outKB   = (outStat.size / 1024).toFixed(1);
    const saving  = (100 - (outStat.size / inStat.size) * 100).toFixed(0);
    console.log(`✅ ${file.padEnd(50)} ${inKB}KB → ${outKB}KB  (-${saving}%)`);
  } catch (e) {
    console.error(`❌ ${file}: ${e.message}`);
  }
}

console.log('\n📁 Optimized images saved to:', OUT);
