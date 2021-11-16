import fs from 'fs';
import path from 'path';
import website from './src/website';

const __dirname = path.resolve();
const iconsDir = path.join(__dirname, 'public/icons');

function manifestIcons() {
	// looks in ./public/icons/ for png files
	const icons = fs.readdirSync(iconsDir).filter(file => file.endsWith('.png'));
	// and creates an array of objects with the format:
	// 	{
	// 		src: `icons/{filename}`,
	// 		type: 'image/png',
	// 		sizes: `${filename}x${filename}`,
	// },
	return icons.map(icon => {
		return {
			src: `icons/${icon}`,
			type: 'image/png',
			sizes: `${icon}x${icon}`,
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
