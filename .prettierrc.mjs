/** @type {import("prettier").Config} */
export default {
	printWidth: 120,
	useTabs: true,
	singleQuote: true,
	semi: true,
	plugins: ['prettier-plugin-astro', 'prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
	overrides: [
		{
			files: ['**/*.astro'],
			options: {
				parser: 'astro',
			},
		},
	],
};
