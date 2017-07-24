
// $ webpack --testing --watch
// ^ for dev sent to poll builder repo testing folder

require('node-env-file')('.env');
var webpack = require('webpack');
var minimize = process.argv.indexOf('--minimize') !== -1;
var toTesting = process.argv.indexOf('--testing') !== -1;

var testingPrefix = toTesting ? process.env.TESTING_URL : ''; // specific to Bryan local testing setup

var obj = {
	
	entry: './src/pollBuilder.js',
	
	output: {
		filename: minimize ? testingPrefix+'hyperr.pollbuilder.min.js' : testingPrefix+'hyperr.pollbuilder.js',
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
