const robots = 'robots.txt';
const icon = 'icons/icon.svg';
const favicon = 'icons/favicon.ico';
const msIcon = 'icons/ms-144x144.png';
const maskIcon = 'icons/maskable-512x512.png';
const appleIcon = 'icons/apple-touch-icon.png';
const androidIcon = 'icons/android-chrome-192x192.png';
// const appleStartup = 'icons/apple-touch-startup-image-640x1136.png';

export const assets = [icon, favicon, msIcon, appleIcon, maskIcon, androidIcon, robots];

export default {
	root: '/',
	lang: 'en',
	ogLanguage: 'en_US',
	siteLanguage: 'en-US',
	shortName: 'Nameless',
	longName: 'Nameless Oracle',
	title: 'Nameless Quest ✵ Yìjīng Oracle',
	subtitle: 'A Paean to 易經, I Ching, the Classic of Changes',
	description:
		'An interactive, graphic resource for and paean to 易經 (Yìjīng, and often I Ching, or the Classic Book of Changes) wherein you can see the glorious symmetries of the perfect Octals, decode the binary of the hexagrams, pronounce the Pinyin, and peruse scholarly interpretations.',
	categories: 'metaphysical oracle and divination tool',
	base: '/',
	image:
		'https://og.easeness.biz/Nameless%20%E2%80%A2%20I%20Ching.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fatmanaut.sirv.com%2Flogos%2Fbagua-white-mono.svg&widths=450&heights=450',
	bgColor: '#043422',
	themeColor: '#E21D9D',
	statusBarStyle: 'black-translucent',
	author: {
		name: 'Kerry Snyder',
		github: '@krry',
		twitter: '@kerryourself',
		email: 'kerry@easeness.biz',
	},
	manifest: 'manifest.webmanifest',
	msConfig: 'browserconfig.xml',
	icon,
	favicon,
	msIcon,
	maskIcon,
	appleIcon,
	androidIcon,
};
