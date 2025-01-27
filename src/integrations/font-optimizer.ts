import type { AstroIntegration } from "astro";
import { promises as fs } from "fs";
import path from "path";
import * as fontkit from 'fontkit';

const limitChars = 1000;

export default (): AstroIntegration => ({
  name: "font-optimizer",
  hooks: {
    "astro:build:done": async ({ pages }) => {
      for (const page of pages) {
        try {
            // Construct the full path to the HTML file
            const filePath = path.join('dist', page.pathname, 'index.html');
            const htmlContent = await fs.readFile(filePath, 'utf-8');
            const bodyContent = extractBodyContent(htmlContent);
            const textContent = extractTextFromHTML(bodyContent);
            console.log(textContent);

            const font = fontkit.openSync("public/fonts/MPLUS1-Regular.woff2");
            const subset = createFontSubset(font, textContent);
            await fs.writeFile("dist/fonts/MPLUS1-Regular-subset.woff2", subset);

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
  glyphs.forEach(glyph => subset.includeGlyph(glyph));
  return subset.encode();
}

