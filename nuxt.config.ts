import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
	Modules: ['@nuxtjs/tailwindcss'],

	// your Tailwind css directory
	css: ['~/assets/css/tailwind.css'],
	build: {
		postcss: {
			postcssOptions: {
				plugins: {
					tailwindcss: {},
					autoprefixer: {}
				}
			}
		}
	}
})
