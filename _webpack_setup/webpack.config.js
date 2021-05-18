const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development', // use .env and process.env to define DEV vs. PROD,
    devServer: { // OPTIONAL
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        // http2: true
    },
};