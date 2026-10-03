/**
 * 下载所有雪场/攻略用到的 Unsplash 图片到本地，并压缩
 * 运行：node scripts/download-resort-images.mjs
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

const OUT = '/workspaces/default/code/public/images';
await mkdir(OUT, { recursive: true });

const images = [
  // 日本雪场
  { id: 'jp1',  url: 'https://images.unsplash.com/photo-1517918558653-3a2c5ab393a2', w: 640, h: 400 },
  { id: 'jp2',  url: 'https://images.unsplash.com/photo-1705264897382-fecff64d27e4', w: 640, h: 400 },
  { id: 'jp3',  url: 'https://images.unsplash.com/photo-1610957386668-dd266c45734d', w: 640, h: 400 },
  { id: 'jp4',  url: 'https://images.unsplash.com/photo-1600041161228-519e6dd27bac', w: 640, h: 400 },
  { id: 'jp5',  url: 'https://images.unsplash.com/photo-1565992441121-4367c2967103', w: 640, h: 400 },
  { id: 'jp6',  url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256', w: 640, h: 400 },
  { id: 'jp7',  url: 'https://images.unsplash.com/photo-1703080138499-f1f0dbc7da42', w: 640, h: 400 },
  // 中国雪场
  { id: 'cn1',  url: 'https://images.unsplash.com/photo-1465220183275-1faa863377e3', w: 640, h: 400 },
  { id: 'cn2',  url: 'https://images.unsplash.com/photo-1680114015093-b1975c470331', w: 640, h: 400 },
  { id: 'cn3',  url: 'https://images.unsplash.com/photo-1516352267226-f5f3e4c53781', w: 640, h: 400 },
  { id: 'cn4',  url: 'https://images.unsplash.com/photo-1611279607611-d6dd93331c6e', w: 640, h: 400 },
  { id: 'cn5',  url: 'https://images.unsplash.com/photo-1673751243582-6d3d33cf136d', w: 640, h: 400 },
  { id: 'cn6',  url: 'https://images.unsplash.com/photo-1600332303415-5d6a43eef133', w: 640, h: 400 },
  { id: 'cn7',  url: 'https://images.unsplash.com/photo-1600476018895-b66342d8592d', w: 640, h: 400 },
  { id: 'cn8',  url: 'https://images.unsplash.com/photo-1711066444012-f918e6b448d8', w: 640, h: 400 },
  // 纽西兰雪场
  { id: 'nz1',  url: 'https://images.unsplash.com/photo-1598525024848-f2d50bbbfe03', w: 640, h: 400 },
  { id: 'nz2',  url: 'https://images.unsplash.com/photo-1551524559-8af4e6624178', w: 640, h: 400 },
  { id: 'nz3',  url: 'https://images.unsplash.com/photo-1600476019922-fb69c71b0b53', w: 640, h: 400 },
  { id: 'nz4',  url: 'https://images.unsplash.com/photo-1600476018895-b66342d8592d', w: 640, h: 400 },
  // 其他（hero / 品牌故事 / 攻略）
  { id: 'hero',    url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256', w: 1280, h: 720 },
  { id: 'story',   url: 'https://images.unsplash.com/photo-1565992441121-4367c2967103', w: 800, h: 600 },
  { id: 'guide1',  url: 'https://images.unsplash.com/photo-1517918558653-3a2c5ab393a2', w: 640, h: 400 },
  { id: 'guide2',  url: 'https://images.unsplash.com/photo-1600476019922-fb69c71b0b53', w: 640, h: 400 },
  { id: 'guide3',  url: 'https://images.unsplash.com/photo-1711066444012-f918e6b448d8', w: 640, h: 400 },
  { id: 'guide4',  url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256', w: 640, h: 400 },
  { id: 'guide5',  url: 'https://images.unsplash.com/photo-1565992441121-4367c2967103', w: 640, h: 400 },
  { id: 'guide6',  url: 'https://images.unsplash.com/photo-1680114015093-b1975c470331', w: 640, h: 400 },
];

for (const img of images) {
  const outFile = join(OUT, `${img.id}.jpg`);
  const fetchUrl = `${img.url}?w=${img.w}&h=${img.h}&fit=crop&auto=format&q=75`;
  try {
    const res = await fetch(fetchUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf)
      .resize(img.w, img.h, { fit: 'cover', withoutEnlargement: true })
      .jpeg({ quality: 78, progressive: true, mozjpeg: true })
      .toFile(outFile);
    const { size } = await import('fs').then(m => m.promises.stat(outFile));
    console.log(`✅ ${img.id}.jpg  ${(size/1024).toFixed(0)}KB`);
  } catch (e) {
    console.error(`❌ ${img.id}: ${e.message}`);
  }
}

console.log('\n📁 Images saved to:', OUT);
console.log('Next: update image paths in App.tsx to /images/*.jpg');
