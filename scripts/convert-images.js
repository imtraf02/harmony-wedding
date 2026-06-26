const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function convertFolder(folderName) {
  const dir = path.join(__dirname, '../public/images/wedding', folderName);
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    return;
  }
  
  // Find all jpg/jpeg files
  const files = fs.readdirSync(dir)
    .filter(file => file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg'))
    .sort(); // Sort alphabetically
    
  console.log(`Found ${files.length} JPG files in ${folderName}`);
  
  if (files.length === 0) {
    return;
  }
  
  // First, convert each file to webp with a temporary name (to avoid collision if renaming)
  const converted = [];
  files.forEach((file, index) => {
    const inputPath = path.join(dir, file);
    const tempName = `temp_${index}.webp`;
    const tempPath = path.join(dir, tempName);
    
    try {
      console.log(`Converting ${file} to WebP...`);
      // Using ffmpeg to convert to webp with quality 85
      execSync(`ffmpeg -y -i "${inputPath}" -q:v 85 "${tempPath}"`, { stdio: 'ignore' });
      converted.push({ inputPath, tempPath });
    } catch (err) {
      console.error(`Failed to convert ${file}:`, err.message);
    }
  });
  
  // Now delete the original JPG files
  converted.forEach(({ inputPath }) => {
    try {
      fs.unlinkSync(inputPath);
    } catch (err) {
      console.error(`Failed to delete original file ${inputPath}:`, err.message);
    }
  });
  
  // Now rename temp files to final index-based names: 1.webp, 2.webp...
  converted.forEach(({ tempPath }, index) => {
    const finalName = `${index + 1}.webp`;
    const finalPath = path.join(dir, finalName);
    try {
      fs.renameSync(tempPath, finalPath);
    } catch (err) {
      console.error(`Failed to rename temp file ${tempPath} to ${finalPath}:`, err.message);
    }
  });
  
  console.log(`Successfully converted and renamed ${converted.length} files in ${folderName}\n`);
}

convertFolder('sunny-garden');
convertFolder('duong-pho-ho-chi-minh-2');
