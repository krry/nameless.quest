import website from './src/website';

export default {
	background_color: website.bgColor,
	description: website.description,
	display: 'standalone',
	icons: [
		{
			src: 'icons/icon-16x16.png',
			type: 'image/png',
			sizes: '16x16',
		},
		{
			src: 'icons/icon-32x32.png',
			type: 'image/png',
			sizes: '32x32',
		},
		{
			src: 'icons/icon-57x57.png',
			type: 'image/png',
			sizes: '57x57',
		},
		{
			src: 'icons/icon-60x60.png',
			type: 'image/png',
			sizes: '60x60',
		},
		{
			src: 'icons/icon-70x70.png',
			type: 'image/png',
			sizes: '70x70',
		},
		{
			src: 'icons/icon-72x72.png',
			type: 'image/png',
			sizes: '72x72',
		},
		{
			src: 'icons/icon-76x76.png',
			type: 'image/png',
			sizes: '76x76',
		},
		{
			src: 'icons/icon-96x96.png',
			type: 'image/png',
			sizes: '96x96',
		},
		{
			src: 'icons/icon-114x114.png',
			type: 'image/png',
			sizes: '114x114',
		},
		{
			src: 'icons/icon-120x120.png',
			type: 'image/png',
			sizes: '120x120',
		},
		{
			src: 'icons/icon-128x128.png',
			type: 'image/png',
			sizes: '128x128',
		},
		{
			src: 'icons/ms-144x144.png',
			type: 'image/png',
			sizes: '144x144',
		},
		{
			src: 'icons/icon-150x150.png',
			type: 'image/png',
			sizes: '150x150',
		},
		{
			src: 'icons/icon-152x152.png',
			type: 'image/png',
			sizes: '152x152',
		},
		{
			src: 'icons/apple-touch-icon.png',
			type: 'image/png',
			sizes: '180x180',
		},
		{
			src: 'icons/android-chrome-192x192.png',
			type: 'image/png',
			sizes: '192x192',
		},
		{
			src: 'icons/icon-310x310.png',
			type: 'image/png',
			sizes: '310x310',
		},
		{
			src: 'icons/icon-384x384.png',
			type: 'image/png',
			sizes: '384x384',
		},
		{
			src: 'icons/maskable-512x512.png',
			type: 'image/png',
			sizes: '512x512',
			purpose: 'any maskable',
		},
	],
	lang: website.lang,
	name: website.longName,
	scope: './',
	short_name: website.shortName,
	start_url: './?source=pwa',
	theme_color: website.themeColor,
};
