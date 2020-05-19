const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	mode: process.env.NODE_ENV || 'development',
	entry: {
		script: './src/js/index.js',
		style: './src/styles/style.styl'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'assets'),
		publicPath: '/assets/'
	},
	module: {
		rules: [
			{
				test: /.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /.styl$/,
				use:[
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								autoprefixer({
									browsers:['ie >= 8', 'last 4 version']
								})
							],
							sourceMap: true
						}
					},
					'stylus-loader'
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin('style.css')
	],
	optimization: {
		minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})]
	},
	devServer: {
		compress: true,
		port: 3000
	}
}