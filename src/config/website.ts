const robotsTxt = 'robots.txt';
const iconSvgPath = '/icon.svg';
const faviconPath = '/favicon.ico'; // 32
const icon16Path = '/favicon-16x16.png';
const icon32Path = '/favicon-32x32.png';
const icon192Path = '/android-chrome-192x192.png';
const icon512Path = '/android-chrome-512x512.png';
const appleIconPath = '/apple-touch-icon.png';

export const assets = [
	iconSvgPath,
	faviconPath,
	icon192Path,
	icon512Path,
	appleIconPath,
	robotsTxt,
];

export default {
	root: '/',
	base: '/',
	lang: 'en',
	ogLanguage: 'en_US',
	siteLanguage: 'en-US',
	shortName: 'Nameless',
	longName: 'Nameless Oracle',
	title: 'Nameless Quest ✵ Yìjīng Oracle',
	subtitle: 'A Paean to 易經, I Ching, the Classic of Changes',
	description:
		'A digital oracle, based on the Classic Book of Change, the I Ching (or Yìjīng), who receives burning questions and offers perspective on the true nature of the given moment and how it might unfold. Built for any modern browser, and available as a progressive web app to be downloaded and used offline.',
	categories: 'metaphysical oracle and divination tool',
	image:
		'https://og.easeness.biz/Nameless%20%E2%80%A2%20I%20Ching.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fatmanaut.sirv.com%2Flogos%2Fbagua-white-mono.svg&widths=450&heights=450',
	backgroundColor: '#E4EDF1',
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
	robotsTxt,
	iconSvgPath,
	faviconPath,
	icon16Path,
	icon32Path,
	icon192Path,
	icon512Path,
	appleIconPath,
};
