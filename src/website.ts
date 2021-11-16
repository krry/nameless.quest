const robots = 'robots.txt';
const icon = 'icons/icon.svg';
const favicon = 'icons/favicon.ico';
const msIcon = 'icons/144.png';
const maskIcon = 'icons/512.png';
const appleIcon = 'icons/180.png';
const androidIcon = 'icons/192.png';

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
		'A digital oracle, based on the Classic Book of Change, the I Ching (or Yìjīng), that will accept your burning questions and offer you perspective on the true nature of the given moment and how it might unfold.Built for any modern browser, and available as a progressive web app to be downloaded and used offline.',
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
