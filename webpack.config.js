const webpack = require('webpack');
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const package = require('./package.json');

function packageVersion() {
	const [major = 0, minor = 0] = package.version.split('.');
	return `${major}.${minor}`;
}

module.exports = (env, argv) => {
	const isDev = argv.mode === 'development';

	return {
		entry: './src/index.js',
		output: {
			path: path.resolve(
				__dirname,
				'dist',
				isDev ? 'dev' : 'live',
				packageVersion()
			),
			filename: 'mojo.js'
		},
		watch: isDev,
		module: {
			rules: [
				{
					test: /\.js$/,
					use: 'babel-loader',
					exclude: /node_modules/
				}
			]
		},
		plugins: [new LodashModuleReplacementPlugin()]
	};
};
