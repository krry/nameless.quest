module.exports = {
	plugins: {
		'postcss-import': {},
		'postcss-normalize': {},
		'postcss-advanced-variables': {},
		'postcss-preset-env': {
			stage: 1,
			features: {
				'custom-properties': false,
			},
		},
		'postcss-font-magician': {
			display: 'swap',
			hosted: ['./src/assets/fonts', '/fonts'],
			variants: {
				Quicksand: {
					300: [],
					400: [],
					500: [],
					600: [],
					700: [],
					800: [],
				},
				Inconsolata: {
					400: [],
					700: [],
				},
				MuseoModerno: {
					400: [],
					700: [],
				},
			},
			// foundries: ['google'],
		},
	},
};
