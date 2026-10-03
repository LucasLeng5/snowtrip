const fs = require('fs');
const file = 'src/app/App.tsx';
let lines = fs.readFileSync(file, 'utf8').split('\n');

// Fix 1: Remove stray ");" at line 1359 (0-indexed: 1358)
// This was left by the broken script
if (lines[1358] && lines[1358].trim() === ');') {
  lines.splice(1358, 1); // Remove the line
  console.log('Removed stray ");" at line 1359');
}

// Fix 2: Re-indent BookingPage body (was dedented by broken script)
// After removing line 1358, line numbers shifted by 1
// BookingPage opening is now at line 1361 (0-indexed: 1360)
let bpOpen = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === 'const BookingPage = () => {') { bpOpen = i; break; }
}
if (bpOpen !== -1) {
  // Check if body is at wrong indent (2 spaces instead of 4)
  const nextLine = lines[bpOpen + 1];
  if (nextLine && nextLine.startsWith('  const ') && !nextLine.startsWith('    ')) {
    // Body is at 2-space indent, needs 4-space (add 2 spaces)
    // Find the closing "};"
    let depth = 0;
    let bpClose = -1;
    for (let i = bpOpen; i < lines.length; i++) {
      for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === '{') depth++;
        if (lines[i][j] === '}') { depth--; if (depth === 0) { bpClose = i; break; } }
      }
      if (bpClose !== -1) break;
    }
    if (bpClose !== -1) {
      for (let i = bpOpen + 1; i < bpClose; i++) {
        if (lines[i].trim() !== '') lines[i] = '  ' + lines[i];
      }
      console.log(`Re-indented BookingPage body: lines ${bpOpen+2}-${bpClose} (${bpClose - bpOpen - 1} lines)`);
    }
  }
}

// Fix 3: Check ResortsPage indent
let rpOpen = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === 'const ResortsPage = () => {') { rpOpen = i; break; }
}
if (rpOpen !== -1) {
  const nextLine = lines[rpOpen + 1];
  if (nextLine && nextLine.startsWith('  const ') && !nextLine.startsWith('    ')) {
    let depth = 0, rpClose = -1;
    for (let i = rpOpen; i < lines.length; i++) {
      for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === '{') depth++;
        if (lines[i][j] === '}') { depth--; if (depth === 0) { rpClose = i; break; } }
      }
      if (rpClose !== -1) break;
    }
    if (rpClose !== -1) {
      for (let i = rpOpen + 1; i < rpClose; i++) {
        if (lines[i].trim() !== '') lines[i] = '  ' + lines[i];
      }
      console.log(`Re-indented ResortsPage body`);
    }
  }
}

fs.writeFileSync(file, lines.join('\n'));
console.log('\nFixes applied.');
