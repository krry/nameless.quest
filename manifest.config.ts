import { version } from './package.json';
import website from './src/config/website';

export default {
	background_color: website.backgroundColor,
	description: website.description,
	display: 'standalone',
	icons: [
		{
			src: `android-chrome-192x192.png?v=${version}`,
			sizes: '192x192',
			type: 'image/png',
			purpose: 'maskable',
		},
		{
			src: `android-chrome-512x512.png?v=${version}`,
			sizes: '512x512',
			type: 'image/png',
			purpose: 'any',
		},
	],
	lang: website.lang,
	name: website.longName,
	scope: './',
	short_name: website.shortName,
	start_url: 'https://nameless.quest/?source=pwa',
	theme_color: website.themeColor,
};
