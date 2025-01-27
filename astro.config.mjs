import { defineConfig } from 'astro/config'
import localIntegration from './src/integrations/font-optimizer';
import compress from 'astro-compress';

export default defineConfig({
  integrations: [compress(),localIntegration()]
})