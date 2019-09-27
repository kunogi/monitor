module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['last 2 version', 'Android >= 4.0', 'ios >= 6']
        }),
        require('cssnano')
    ]
};
