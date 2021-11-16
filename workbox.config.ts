export default {
	cleanupOutdatedCaches: true,
	globDirectory: 'public/',
	globPatterns: ['**/*.{svg,jpg,xml,png,ico,json}'],
	ignoreURLParametersMatching: [/^utm_/, /^fbclid$/, /^source/],
	maximumFileSizeToCacheInBytes: 4800000,
	swDest: 'dist/sw.js',
};
