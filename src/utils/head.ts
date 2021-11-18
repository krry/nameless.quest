import website, { assets } from '../config/website';

const { iconSvgPath, faviconPath, icon16Path, icon32Path, appleIconPath, safariSvgPath } = assets;

const {
	title,
	subtitle,
	description,
	themeColor,
	backgroundColor,
	shortName,
	longName,
	categories,
	image,
	base,
	author,
	statusBarStyle,
} = website;

export const appHeadTags = {
	title: `${title} ✵ ${subtitle}`,
	base: {
		href: base,
	},
	meta: [
		{ name: 'description', content: description },
		{ name: 'application-name', content: shortName },
		{ name: 'theme-color', content: themeColor },
		{ name: 'background-color', content: backgroundColor },
		{ name: 'msapplication-TileColor', content: '#00aba9' },
		{ name: 'mobile-web-app-capable', content: 'yes' },
		// apple
		{ name: 'apple-mobile-web-app-capable', content: 'yes' },
		{ name: 'apple-mobile-web-app-title', content: longName },
		{ name: 'apple-mobile-web-app-status-bar-style', content: statusBarStyle },
		// google
		{ itemprop: 'name', content: title },
		{ itemprop: 'description', content: description },
		// twitter
		{ name: 'twitter:title', content: title },
		{ name: 'twitter:description', content: description.substr(0, 200) },
		{ name: 'twitter:image', content: image },
		{ name: 'twitter:url', content: base },
		{ name: 'twitter:site', content: longName },
		{ name: 'twitter:creator', content: author.twitter },
		// facebook
		{ property: 'og:title', content: title },
		{ property: 'og:type', content: categories },
		{ property: 'og:description', content: description },
		{ property: 'og:url', content: base },
		{ property: 'og:image', content: image },
		{ property: 'og:site_name', content: shortName },
	],
	link: [
		{ rel: 'author', href: 'https://kerrbe.ar', undo: false },
		{ rel: 'icon', href: `/${iconSvgPath}`, type: 'image/svg+xml' },
		{ rel: 'shortcut icon', href: `/${faviconPath}`, sizes: 'any' },
		{ rel: 'icon', type: 'image/png', sizes: '16x16', href: `/${icon16Path}` },
		{ rel: 'icon', type: 'image/png', sizes: '32x32', href: `/${icon32Path}` },
		{
			rel: 'apple-touch-icon',
			type: 'image/png',
			sizes: '180x180',
			href: `/${appleIconPath}`,
		}, // 180×180
		{
			rel: 'mask-icon',
			href: `/${safariSvgPath}`,
			color: '#e21d9d',
			type: 'image/svg+xml',
		},
	],
	script: [
		{
			defer: true,
			'data-domain': 'nameless.quest',
			src: 'https://plausible.io/js/plausible.js',
		},
	],
};
