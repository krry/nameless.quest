import fs from 'fs';
import path from 'path';
import website from './src/website';

const iconsDir = path.join(__dirname, 'public/icons');

function manifestIcons() {
	const icons = fs.readdirSync(iconsDir).filter(file => file.endsWith('.png'));
	return icons.map(icon => {
		const size = icon.split('.')[0].split('@')[0];
		return {
			src: `icons/${icon}`,
			type: 'image/png',
			sizes: `${size}x${size}`,
		};
	});
}
export default {
	background_color: website.bgColor,
	description: website.description,
	display: 'standalone',
	icons: manifestIcons(),
	lang: website.lang,
	name: website.longName,
	scope: './',
	short_name: website.shortName,
	start_url: './?source=pwa',
	theme_color: website.themeColor,
};
