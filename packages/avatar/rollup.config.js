// rollup.config.js
const babel = require('rollup-plugin-babel')
const postcss = require('rollup-plugin-postcss')
const { terser } = require('rollup-plugin-terser')
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.jsx'],

  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
})
const cssnano = require('cssnano')({
  preset: 'default'
})
const sourcemaps = require('rollup-plugin-sourcemaps')

export default {
  input: 'src/avatar.jsx',
  output: [
    {
      file: 'dist/avatar.mjs',
      format: 'esm',
      globals: {
        react: 'React'
      },
      sourcemap: true
    }
  ],
  external: ['react'],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      rootMode: 'upward'
    }),
    sourcemaps(),
    postcss({
      plugins: [
        require('tailwindcss')('../../tailwind.config.js'),
        require('autoprefixer'),
        purgecss,
        cssnano
      ]
    })
  ]
}
