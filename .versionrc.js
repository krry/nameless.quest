module.exports = {
	header: '# Changelog', // the header of the changelog
	types: [
		{ type: 'feat', section: 'Features' },
		{ type: 'fix', section: 'Bug Fixes' },
		{ type: 'chore', hidden: true },
		{ type: 'docs', hidden: true },
		{ type: 'style', hidden: true },
		{ type: 'refactor', hidden: true },
		{ type: 'perf', hidden: true },
		{ type: 'test', hidden: true },
	],
	userUrlFormat: '{{host}}/{{user}}',
	releaseCommitMessageFormat: 'chore(release): {{currentTag}}',
	bumpFiles: ['package.json'],
	sign: true,
	noVerify: true,
};
