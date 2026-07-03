import fs from "fs";
import path from "path";

const dirPath = path.join(process.cwd(), "public", "images", "mau-do");
const outputPath = path.join(process.cwd(), "constants", "mau-do.ts");

try {
  const files = fs.readdirSync(dirPath)
    .filter(file => file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".webp"))
    .sort();

  const fileListString = JSON.stringify(files, null, 2);

  const fileContent = `// Automatically generated list of dress and vest images from public/images/mau-do
export const mauDoImages = ${fileListString};
`;

  fs.writeFileSync(outputPath, fileContent, "utf-8");
  console.log(`Successfully generated ${files.length} images into constants/mau-do.ts`);
} catch (error) {
  console.error("Error generating mau-do images:", error);
}
