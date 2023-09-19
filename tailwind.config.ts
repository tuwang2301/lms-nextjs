import type { Config } from 'tailwindcss'

// --font - family: 'Roboto Slab', serif;

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "color-bg": "#f1f1f9c9",
        "color-footer": "#393D3F",
        "color-button": "#62929E",
        "color-text": "#393D3F",
        "color-subtext": "#546A7B",
      },
    },
  },
  plugins: [],
}
export default config
