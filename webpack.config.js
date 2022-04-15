const rulesForJavascript = {
    test: /\.js$/,
    loader: 'babel-loader',
    options: {
        presets: [
            [
                '@babel/preset-react',
                {
                    runtime: 'automatic'
                }
            ]
        ]
    }
};
const rules = [rulesForJavascript]

module.exports = {
    // entry: './src/indexjs',
    // output: {
    //     path: path.resolve(__dirname, 'build')
    // }
    module: {rules}
}