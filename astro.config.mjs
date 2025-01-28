import { defineConfig } from 'astro/config'
import localIntegration from '/src/integrations/font-optimizer';

import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [localIntegration(), tailwind()]
})