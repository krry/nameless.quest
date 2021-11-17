module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'prettier',
		'plugin:@typescript-eslint/recommended',
		'@vue/typescript',
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 2021,
		sourceType: 'module',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		// disable the rule for all files
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'vue/multi-word-component-names': 1,
	},
	overrides: [
		{
			// enable the rule specifically for TypeScript files
			files: ['*.ts', '*.tsx', '*.vue'],
			rules: {
				'@typescript-eslint/explicit-module-boundary-types': ['error'],
			},
		},
	],
};
