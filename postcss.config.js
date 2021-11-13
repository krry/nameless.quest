module.exports = {
	plugins: {
		'postcss-import': {},
		'postcss-normalize': {},
		'postcss-advanced-variables': {},
		'postcss-extend-rule': {},
		'postcss-preset-env': {
			stage: 1,
			features: {
				'custom-properties': false,
			},
		},
		'postcss-nested': {},
	},
};
