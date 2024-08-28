import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/renderer/index.html',
    './src/renderer/src/*.{js,jsx,ts,tsx}',
    './src/renderer/src/**/*.{js,jsx,ts,tsx}',
    './src/renderer/src/**/**/*.{js,jsx,ts,tsx}',
    './src/renderer/src/**/**/**/*.{js,jsx,ts,tsx}',
    './src/renderer/src/**/**/**/**/*.{js,jsx,ts,tsx}',
    './src/renderer/src/**/**/**/**/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        primaryFont: [
          'Nunito',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ]
      },
      colors: {
        primaryColor: '#2fb34b'
      }
    }
  },
  plugins: []
} satisfies Config
