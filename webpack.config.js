const path=require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports={
    entry:"./src/index.js",
    output:{
        filename:"main.js",
        path:path.resolve(__dirname,"dist"),
        publicPath: ""
    },
    mode: "production",
    module:{
        rules:[
            {
                use: "babel-loader",
                test: /.js$/,
                exclude: /node_modules/
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./public/index.html",
            
        })
    ]
}