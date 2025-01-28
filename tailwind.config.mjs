/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {colors:{
			primary: {
				'50': '#fffaeb',
				'100': '#fdf1c8',
				'200': '#fbe08c',
				'300': '#f9ca50',
				'400': '#f8b62d',
				'500': '#f2920e',
				'600': '#d66e09',
				'700': '#b14b0c',
				'800': '#903a10',
				'900': '#763011',
				'950': '#441704'
			},
		}},
	},
	plugins: [],
}
