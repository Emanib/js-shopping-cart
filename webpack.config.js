const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: 'todo.js',
        path: path.resolve(__dirname, 'dist/js'),
    },
};