
const ruleForStyles = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
}

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
const rules = [rulesForJavascript, ruleForStyles]

module.exports = {
    // entry: './src/indexjs',
    // output: {
    //     path: path.resolve(__dirname, 'build')
    // }
    module: {rules}
}