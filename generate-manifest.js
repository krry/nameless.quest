// GENERATE MANIFEST

// to generate manifest, first convert `./src/config/website.ts` to `.js`
// you may have to add `"type": "module"` to `package.json` as well
// tried to implement this with `ts-node` but it didn't work
// couldn't get `path` to import here

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import website from './src/config/website.js'; // N.B., node requires file extension for esm import

const __dirname = path.resolve();
const staticDirectory = path.join(__dirname, 'public');
const iconsDirectory = path.join(__dirname, 'public/icons');
const manifestFile = path.join(__dirname, 'src/manifest.json');
const { backgroundColor, icon, shortName, longName, description, themeColor } = website;

const androidIconSizes = [36, 48, 72, 96, 144, 192, 512];
const msIconSizes = [24, 48, 50, 88, 300];
const iOSIconSizes = [120, /*144,*/ 152, 167, 180, 1024];
// const msBannerSizes = [
// 	[620, 300],
// 	[1240, 600],
// ];
const DEFAULT_SIZES = androidIconSizes.concat(msIconSizes, iOSIconSizes).sort((a, b) => a - b);
console.log('SIZES', DEFAULT_SIZES);

const iconImage = sharp(staticDirectory + '/' + icon);

const resizeIcon = async ({ size, path }) => {
	iconImage.resize(Number(size)).toFile(path, err => {
		if (err) {
			console.error('error resizing icon', err);
		}
	});
};

const main = async () => {
	try {
		const { height, width } = await iconImage.metadata();
		const maxSize = Math.min(width, height);
		const sizes = DEFAULT_SIZES.filter(element => element <= maxSize);

		// uncomment to replace favicon.ico in browser tabs
		// resizeIcon({ size: 310, path: 'public/favicon.ico' });

		const manifest = {
			name: longName,
			short_name: shortName,
			description: description,
			background_color: backgroundColor,
			theme_color: themeColor,
			display: 'standalone',
			start_url: '/',
			scope: '/',
			icons: sizes.map(size => {
				const path = `icons/icon-${size}x${size}.png`;
				resizeIcon({ size, path: `public/${path}` });

				const iconEntry = {
					src: path,
					sizes: `${size}x${size}`,
					type: 'image/png',
				};

				if (size === 512 || size === 192) {
					iconEntry['purpose'] = 'maskable';
				}

				return iconEntry;
			}),
		};

		fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2));
	} catch (error) {
		console.error('error writing manifest file', error);
	}
};

console.log('Generating manifest.webmanifest');
fs.mkdir(iconsDirectory, { recursive: true }, err => {
	if (err) {
		return console.error('error making icons dir', err);
	}
});

main();
