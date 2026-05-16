#!/usr/bin/env tsx
import fs from 'fs/promises';
import path from 'path';
import { processImage } from '../lib/image';
import { createPortfolio, getPortfolioBySlug } from '../lib/queries/portfolio';

const WEDDING_DIR = path.join(process.cwd(), 'wedding');

function toSlug(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

async function seed() {
  console.log('Starting seed process...');
  const dirs = await fs.readdir(WEDDING_DIR, { withFileTypes: true });

  let sort_order = 1;

  for (const dir of dirs) {
    if (!dir.isDirectory()) continue;
    
    const folderName = dir.name;
    const folderPath = path.join(WEDDING_DIR, folderName);
    
    let allImages: string[] = [];
    
    // Check if there are subfolders (like in studio concept)
    const subitems = await fs.readdir(folderPath, { withFileTypes: true });
    
    for (const subitem of subitems) {
      if (subitem.isDirectory()) {
         // read files inside subfolder
         const files = await fs.readdir(path.join(folderPath, subitem.name));
         for (const file of files) {
           if (file.match(/\.(jpg|jpeg|png)$/i)) {
             allImages.push(path.join(folderPath, subitem.name, file));
           }
         }
      } else if (subitem.isFile() && subitem.name.match(/\.(jpg|jpeg|png)$/i)) {
         allImages.push(path.join(folderPath, subitem.name));
      }
    }
    
    if (allImages.length === 0) continue;
    
    console.log(`\nProcessing folder: ${folderName} with ${allImages.length} images...`);
    
    // Process images
    const processedUrls: string[] = [];
    for (const imgPath of allImages) {
      try {
        const buffer = await fs.readFile(imgPath);
        const result = await processImage(buffer, 'portfolio');
        processedUrls.push(result.url);
        // console.log(`  Processed: ${path.basename(imgPath)} -> ${result.url}`);
      } catch (e) {
        console.error(`  Error processing ${imgPath}:`, e);
      }
    }
    
    if (processedUrls.length === 0) continue;

    const title = folderName.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const slug = toSlug(folderName);
    
    let style = 'modern';
    if (folderName.includes('vũ garden')) style = 'vintage';
    else if (folderName.includes('studio')) style = 'fineart';
    
    let location_type = 'studio';
    if (folderName.includes('đường phố') || folderName.includes('outdoor')) location_type = 'outdoor';

    const existing = getPortfolioBySlug(slug);
    if (!existing) {
       createPortfolio({
         slug,
         title,
         style: style as any,
         location_type: location_type as any,
         studio_slug: null,
         cover_image: processedUrls[0],
         images: processedUrls,
         video_url: null,
         is_featured: true,
         orientation: 'portrait',
         sort_order: sort_order++
       });
       console.log(`✅ Created portfolio: ${title} with ${processedUrls.length} images.`);
    } else {
       console.log(`⚠️ Portfolio ${title} already exists. Skipping insertion.`);
    }
  }
  
  console.log('\n🎉 Seeding complete!');
}

seed().catch(console.error);
