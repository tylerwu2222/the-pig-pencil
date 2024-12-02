import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		// "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		// "./src/app/**/*.{js,ts,jsx,tsx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				backgroundWhite: '#FDFBF8',
				highlightWhite: '#FDFDFD',
				borderGrey: '#E1E1E1',
				hoverLightPink: '#f2b0ca',
				hoverDeepPink: '#f081ab',
				textGrey: '#696969',
				textLightGrey: '#aaaaaa',
				buttonGrey: '#aaaaaa'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				'sans': ['"Open Sans"'],
				'display': ['Oswald'],
				'body': ['"Open Sans"']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
