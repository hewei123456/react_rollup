// Rollup plugins.
import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import autoNamedExports from 'rollup-plugin-auto-named-exports'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import alias from 'rollup-plugin-alias'

import path from 'path'

export default {
  input: './src/index.js',
  output: {
    file: 'build/app.js',
    format: 'iife'
  },
  external: [
    {
      'react': 'react',
      'react-dom': 'react-dom',
      'classnames': 'classnames'
    }
  ],
  plugins: [
    postcss({
      inject: true,
      modules: false,
      extensions: ['.css', '.less'],
      use: [
        ['less', { javascriptEnabled: true }]
      ]
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/preset-env',
          { modules: false }
        ],
        '@babel/preset-react'
      ],
      plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-react-jsx',
        '@babel/plugin-external-helpers',
        '@babel/plugin-proposal-class-properties',
        [
          '@babel/plugin-proposal-decorators',
          { legacy: true }
        ],
        [
          '@babel/plugin-proposal-object-rest-spread',
          { loose: true }
        ]
      ]
    }),
    commonjs(),
    autoNamedExports(),
    globals(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    resolve({
      browser: true,
      main: true
    }),
    alias({
      resolve: ['.jsx', '.js'],
      entries: [
        {
          find: '@',
          replacement: path.resolve(__dirname, '../src')
        }
      ]
    })
  ],
  sourcemap: true
}
