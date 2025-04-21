const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'prisma', 'schema');
const outputFile = path.join(__dirname, 'prisma', 'merged.prisma');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.prisma'));

// Ensure schema.prisma comes first
files.sort((a, b) => (a === 'schema.prisma' ? -1 : 1));

let combined = '';
for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf-8');
  combined += `// ${file}\n${content}\n\n`;
}

fs.writeFileSync(outputFile, combined);
console.log('✅ Prisma schema merged to prisma/merged.prisma');
