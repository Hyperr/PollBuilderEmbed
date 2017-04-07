
var webpack = require('webpack');
var minimize = process.argv.indexOf('--minimize') !== -1;

var obj = {
	
	entry: './src/pollBuilder.js',
	
	output: {
		filename: minimize ? 'hyperr.pollbuilder.min.js' : 'hyperr.pollbuilder.js',
		path: './dist'
	},
	
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				query: {
					cacheDirectory: true,
					presets: ['es2015', 'stage-0']
				}
			}
		],
	},
	
	plugins: minimize ? [
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false }
		})
	] : []
	
}

if (!minimize)
	obj.devtool = "source-map";

module.exports = obj;
