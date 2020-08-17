// Rollup plugins.
import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import rollupPostcssLessLoader from 'rollup-plugin-postcss-webpack-alias-less-loader'
import commonjs from '@rollup/plugin-commonjs'
import autoNamedExports from 'rollup-plugin-auto-named-exports'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import alias from 'rollup-plugin-alias'

import path from 'path'

export default {
  input: 'src/index.js',
  output: {
    dir: 'build',
    format: 'amd'
  },
  manualChunks: {
    vendor: [
      '@babel/polyfill',
      'react',
      'react-dom',
      'classnames',
      'react-router-dom',
      'redux',
      'redux-thunk',
      'react-redux', 'redux-persist',
      'redux-persist-transform-immutable',
      'redux-logger',
      'antd',
      '@ant-design/icons',
      'react-custom-scrollbars'
    ]
  },
  external: [
    {
      'react': 'react',
      'react-dom': 'react-dom',
      'classnames': 'classnames'
    }
  ],
  plugins: [
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    postcss({
      inject: true,
      modules: false,
      extensions: ['.css', '.less'],
      use: [
        ['less', { javascriptEnabled: true }]
      ],
      loaders: [
        rollupPostcssLessLoader({
          nodeModulePath: path.resolve('node_modules'),
          aliases: {
            '@': path.resolve(__dirname, 'src')
          }
        })
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
        [
          '@babel/plugin-proposal-decorators',
          { legacy: true }
        ],
        '@babel/plugin-proposal-class-properties',
        [
          '@babel/plugin-proposal-object-rest-spread',
          { loose: true }
        ]
      ]
    }),
    commonjs(),
    autoNamedExports(),
    globals(),
    resolve({
      browser: true,
      main: true
    }),
    alias({
      resolve: ['.jsx', '.js'],
      entries: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        }
      ]
    })
  ],
  sourcemap: false
}
