// @ts-check
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	integrations: [icon()],

	vite: {
		plugins: [tailwindcss()],
	},

	adapter: cloudflare(),
});
