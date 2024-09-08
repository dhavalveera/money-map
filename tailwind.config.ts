import type { Config } from 'tailwindcss'

// Flowbite-React
import {
  content as flowbiteReactContent,
  plugin as flowbiteReactPlugin
} from 'flowbite-react/tailwind'

export default {
  content: [
    './src/renderer/index.html',
    './src/renderer/src/*.{js,jsx,ts,tsx}',
    './src/renderer/src/**/*.{js,jsx,ts,tsx}',
    './src/renderer/src/**/**/*.{js,jsx,ts,tsx}',
    './src/renderer/src/**/**/**/*.{js,jsx,ts,tsx}',
    './src/renderer/src/**/**/**/**/*.{js,jsx,ts,tsx}',
    './src/renderer/src/**/**/**/**/**/*.{js,jsx,ts,tsx}',

    flowbiteReactContent()
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
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(to right, rgb(130, 86, 208) 0%, var(--primary-color) 100%)'
      }
    }
  },
  plugins: [flowbiteReactPlugin()]
} satisfies Config
