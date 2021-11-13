import website from '../website';

const {
	title,
	subtitle,
	description,
	themeColor,
	bgColor,
	msIcon,
	appleIcon,
	icon,
	favicon,
	shortName,
	longName,
	categories,
	image,
	base,
	author,
	statusBarStyle,
	msConfig,
	root,
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
		// microsoft
		{ name: 'msapplication-TileColor', content: bgColor },
		{ name: 'msapplication-TileImage', content: root + msIcon },
		{ name: 'msapplication-config', content: root + msConfig },
		{ name: 'mobile-web-app-capable', content: 'yes' },
		// apple
		{ name: 'apple-mobile-web-app-capable', content: 'yes' },
		{ name: 'apple-mobile-web-app-title', content: shortName },
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
		{ rel: 'icon', type: 'image/svg+xml', href: root + icon },
		{ rel: 'shortcut icon', type: 'image/x-icon', href: root + favicon },
		{ rel: 'alternate icon', type: 'image/png', sizes: '16x16', href: root + favicon },
		{ rel: 'mask-icon', type: 'image/svg', href: root + icon },
		{ rel: 'apple-touch-icon', sizes: '180x180', href: root + appleIcon },
		// { rel: 'apple-touch-startup-image', href: root + appleStartup },
	],
};
