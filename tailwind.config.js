import { palettes, rounded, shade, animations, components } from "@tailus/themer"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tailus/themer/dist/components/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: palettes.romance,
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Adiciona a fonte Inter como padrão
      },
    },
  },
  plugins: [
    rounded,
    shade,
    animations,
    components
  ],
}
