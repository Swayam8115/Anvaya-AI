import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');
const studyBaseDir = path.join(publicDir, 'QC Anonymized Study Files');
const outputFile = path.join(publicDir, 'study-index.json');

console.log(`Scanning ${studyBaseDir}...`);

try {
  const studyFolders = fs.readdirSync(studyBaseDir).filter(file => {
    return fs.statSync(path.join(studyBaseDir, file)).isDirectory();
  });

  const studyIndex = studyFolders.map(folder => {
    const folderPath = path.join(studyBaseDir, folder);
    const files = fs.readdirSync(folderPath).filter(f => !f.startsWith('.') && f.endsWith('.xlsx'));
    
    // Extract a cleaner name (e.g., "Study 1" from "Study 1_CPID...")
    let name = folder;
    const match = folder.match(/Study\s*\d+/i) || folder.match(/STUDY\s*\d+/i);
    if (match) {
      name = match[0].toUpperCase().replace(/\s+/, ' ');
    }

    return {
      id: folder.replace(/\s+/g, '-').toLowerCase(),
      name: name,
      folder: folder,
      files: files
    };
  });

  // Sort by name for nicer display
  studyIndex.sort((a, b) => {
    const numA = parseInt(a.name.match(/\d+/)?.[0] || '0');
    const numB = parseInt(b.name.match(/\d+/)?.[0] || '0');
    return numA - numB;
  });

  fs.writeFileSync(outputFile, JSON.stringify(studyIndex, null, 2));
  console.log(`Generated index for ${studyIndex.length} studies at ${outputFile}`);

} catch (error) {
  console.error('Error scanning directories:', error);
}
