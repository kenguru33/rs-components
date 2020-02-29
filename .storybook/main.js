const path = require("path");
module.exports = {
  stories: ['../packages/**/*.stories.js'],
  webpackFinal: config => {
    config.module.rules.push( {
      test: /\.css$/,
      use: [
        {
          loader: "postcss-loader",
          options: {
            ident: "postcss",
            plugins: [
              require("tailwindcss"),
              require("autoprefixer")
            ]
          }
        }
      ],
    })
    return config
  }
}
