const path = require('path');

module.exports = {
    mode: 'production',
    entry: [
      './src/js/libs/p5.js',
      './src/js/libs/gsap.js',
      './src/js/index.js'
    ],
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'public', 'js'),
      publicPath: './public/'
    },
    /* devtool: 'source-map' */
  };