module.exports = {
  plugins: [
    // ...
    require('tailwindcss'),
    require('autoprefixer'),
    require('@fullhuman/postcss-purgecss')({
      // Specify the paths to all of the template files in your project
      content: ['./src/**/*.jsx', './src/**/*.js'],

      // Include any special characters you're using in this regular expression
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    }),
    require('cssnano')
  ]
}
