import type { AstroIntegration } from "astro";
import { promises as fs } from "fs";
import path from "path";
import * as fontkit from 'fontkit';
import Fontmin from 'fontmin';
import rename from 'gulp-rename';

export default (): AstroIntegration => ({
  name: "font-optimizer",
  hooks: {
    "astro:build:done": async ({ pages }) => {
      // public/fonts ディレクトリを削除
      try {
        await fs.rm('public/fonts', { recursive: true, force: true });
        console.log('public/fonts directory removed');
      } catch (error) {
        console.error('Error removing public/fonts directory:', error);
      }

      for (const page of pages) {
        try {
            // Construct the full path to the HTML file
            const filePath = path.join('dist', page.pathname, 'index.html');
            const htmlContent = await fs.readFile(filePath, 'utf-8');
            const bodyContent = extractBodyContent(htmlContent);
            const textContent = extractTextFromHTML(bodyContent);
            console.log(textContent);

            // 重複する文字を削除
            const uniqueTextContent = Array.from(new Set(textContent)).join('');
            console.log(uniqueTextContent);

            const inputPath=`origin-fonts/MPLUS1-Regular.ttf`;
            const outputPath=`./dist/fonts/`;

            const filename = `${page.pathname === '' ? 'index' : page.pathname.replace('/', '')}.woff2`;
            console.log(filename);
            await createFontSubsetWithFontmin(inputPath, uniqueTextContent, outputPath,filename);

        } catch (error) {
          console.error(
            error
          );
        }
      }
    },
  },
});

// Helper function to extract body content from HTML
function extractBodyContent(html: string): string {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : '';
}

// Helper function to extract text content from HTML
function extractTextFromHTML(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

// Function to create a font subset
function createFontSubset(font: any, text: string): Buffer {
  const glyphs = font.layout(text).glyphs;
  const subset = font.createSubset();
  glyphs.forEach((glyph: any) => subset.includeGlyph(glyph));
  return subset.encode();
}

async function createFontSubsetWithFontmin(inputPath: string, text: string, outputPath: string,filename:string): Promise<void> {
    return new Promise((resolve, reject) => {
      const fontmin = new Fontmin()
        .src(inputPath)
        .use(Fontmin.glyph({ text })) // 指定されたテキストのグリフを抽出
        .use(Fontmin.ttf2woff2()) // WOFF2形式に変換
        // @ts-ignore: 型の不一致を無視
        .use(rename(filename))
        .dest(outputPath);
  
      fontmin.run((err: Error | null) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
}

