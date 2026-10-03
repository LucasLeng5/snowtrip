/**
 * 终极图片优化脚本
 * - 教练照片 → /public/coaches/ (400px宽，高质量mozjpeg)
 * - 二维码   → /public/qr/     (800px宽，高质量保证可扫描)
 * - 雪场图   → /public/images/ (640x400，已有，再压一轮)
 * - Hero    → /public/images/hero.jpg (1280x720)
 */
import sharp from 'sharp';
import { mkdir, stat } from 'fs/promises';

const ROOT = '/workspaces/default/code';

const tasks = [
  // ─── 教练照片 ───────────────────────────────────────────
  // 显示尺寸：桌面 ~300px / 移动 ~100vw；用 400px 足够，mozjpeg q75
  { src: `${ROOT}/src/imports/ANI.jpg`,         dst: `${ROOT}/public/coaches/ANI.jpg`,         w: 400, h: 533, q: 78 },
  { src: `${ROOT}/src/imports/Jeff.jpg`,        dst: `${ROOT}/public/coaches/Jeff.jpg`,        w: 400, h: 533, q: 78 },
  { src: `${ROOT}/src/imports/Max.jpg`,         dst: `${ROOT}/public/coaches/Max.jpg`,         w: 400, h: 533, q: 78 },
  { src: `${ROOT}/src/imports/Wade.jpg`,        dst: `${ROOT}/public/coaches/Wade.jpg`,        w: 400, h: 533, q: 78 },
  { src: `${ROOT}/src/imports/__.jpg`,          dst: `${ROOT}/public/coaches/sasa.jpg`,        w: 400, h: 533, q: 78 },

  // ─── 二维码 (保持可扫描，不能过度压缩) ─────────────────
  { src: `${ROOT}/src/imports/wechat.jpg`,      dst: `${ROOT}/public/qr/wechat.jpg`,           w: 600, q: 88 },
  { src: `${ROOT}/src/imports/alipay.jpg`,      dst: `${ROOT}/public/qr/alipay.jpg`,           w: 600, q: 88 },
  { src: `${ROOT}/src/imports/youngsnow.jpg`,   dst: `${ROOT}/public/qr/youngsnow.jpg`,        w: 600, q: 88 },

  // ─── 雪场图片（再压一轮，更激进） ───────────────────────
  ...['jp1','jp2','jp3','jp4','jp5','jp6','jp7'].map(id=>({
    src: `${ROOT}/public/images/${id}.jpg`, dst: `${ROOT}/public/images/${id}.jpg`, w: 600, h: 375, q: 72,
  })),
  ...['cn1','cn2','cn3','cn4','cn5','cn6','cn7','cn8'].map(id=>({
    src: `${ROOT}/public/images/${id}.jpg`, dst: `${ROOT}/public/images/${id}.jpg`, w: 600, h: 375, q: 72,
  })),
  ...['nz1','nz2','nz3','nz4'].map(id=>({
    src: `${ROOT}/public/images/${id}.jpg`, dst: `${ROOT}/public/images/${id}.jpg`, w: 600, h: 375, q: 72,
  })),
  ...['guide1','guide2','guide3','guide4','guide5','guide6'].map(id=>({
    src: `${ROOT}/public/images/${id}.jpg`, dst: `${ROOT}/public/images/${id}.jpg`, w: 600, h: 375, q: 72,
  })),
  { src: `${ROOT}/public/images/story.jpg`,     dst: `${ROOT}/public/images/story.jpg`,        w: 700, h: 525, q: 78 },
  // Hero 需要高清，只略压
  { src: `${ROOT}/public/images/hero.jpg`,      dst: `${ROOT}/public/images/hero.jpg`,         w: 1200, h: 675, q: 76 },
];

let totalSaved = 0;
for (const t of tasks) {
  try {
    const before = (await stat(t.src)).size;
    let pipe = sharp(t.src, { failOnError: false });
    if (t.w) pipe = pipe.resize(t.w, t.h ?? null, { fit: 'cover', withoutEnlargement: true });
    await pipe.jpeg({ quality: t.q, mozjpeg: true, progressive: true }).toFile(t.dst + '.tmp');

    // 只有更小才替换（避免因源文件小反而变大）
    const after = (await stat(t.dst + '.tmp')).size;
    if (after < before) {
      const { rename } = await import('fs/promises');
      await rename(t.dst + '.tmp', t.dst);
      const saved = before - after;
      totalSaved += saved;
      console.log(`✅ ${t.dst.split('/public/')[1].padEnd(30)} ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB  (-${(saved/1024).toFixed(0)}KB)`);
    } else {
      const { unlink } = await import('fs/promises');
      await unlink(t.dst + '.tmp');
      console.log(`⏭  ${t.dst.split('/public/')[1].padEnd(30)} already optimal (${(before/1024).toFixed(0)}KB)`);
    }
  } catch(e) {
    console.error(`❌ ${t.src}:`, e.message);
  }
}
console.log(`\n💾 Total saved: ${(totalSaved/1024).toFixed(0)} KB`);
console.log('✅ All images optimized to public/');
