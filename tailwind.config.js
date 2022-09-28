/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			textColor: {
				color: {
					base: 'var(--color-text-base)',
					accent: 'var(--color-text-accent)',
				},
			},
			backgroundColor: {
				color: {
					base: 'var(--color-background-base)',
				},
			},
		},
	},
	plugins: [],
};
