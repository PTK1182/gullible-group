import type { AstroIntegration } from "astro";
import { promises as fs } from "fs";

const limitChars = 1000;

export default (): AstroIntegration => ({
  name: "font-optimizer",
  hooks: {
    "astro:build:done": async ({ pages }) => {
      for (const page of pages) {
        try {
            console.log(page)
        } catch (error) {
          console.error(
            error
          );
        }
      }
    },
  },
});

