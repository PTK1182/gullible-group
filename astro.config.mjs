import { defineConfig } from 'astro/config'
import localIntegration from './src/integrations/font-optimizer';

export default defineConfig({
  integrations: [
    localIntegration()
  ]
})
