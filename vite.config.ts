import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'

export default defineConfig(({ command }) => ({
	base: command === 'serve' ? '/' : '/currency-converter/',
	plugins: [
		vue(),
		tailwindcss(),
		{
			name: 'copy-index-as-404',
			closeBundle() {
				fs.copyFileSync('dist/index.html', 'dist/404.html')
			},
		},
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
}))
