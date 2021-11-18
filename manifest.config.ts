import { version } from './package.json';
import website from './src/config/website';

const iconFiles = [website.icon192Path.substr(1), website.icon512Path.substr(1)];

function manifestIcons() {
	return iconFiles.map(file => {
		const size = file.split('x')[1].split('.')[0];
		const iconEntry = {
			src: `${file}?v=${version}`,
			sizes: `${size}x${size}`,
			type: 'image/png',
			purpose: 'maskable',
		};
		return iconEntry;
	});
}

export default {
	background_color: website.backgroundColor,
	description: website.description,
	display: 'standalone',
	icons: manifestIcons(),
	lang: website.lang,
	name: website.longName,
	scope: './',
	short_name: website.shortName,
	start_url: 'https://nameless.quest/?source=pwa',
	theme_color: website.themeColor,
};
