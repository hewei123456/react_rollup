// Rollup plugins.
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import autoNamedExports from 'rollup-plugin-auto-named-exports'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import alias from 'rollup-plugin-alias'

export default {
  input: 'src/index.js',
  output: {
    file: 'build/app.js',
    format: 'iife'
  },
  plugins: [
    babel({
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
    commonjs({
      include: 'node_modules/**',
      exclude: [
        'node_modules/process-es6/**'
      ],
      namedExports: {
        'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement', 'createContext', 'useRef', 'useState', 'useEffect', 'useMemo'],
        'node_modules/react-dom/index.js': ['render', 'findDOMNode'],
        'node_modules/react-is/index.js': ['isFragment', 'isMemo']
      }
    }),
    autoNamedExports(),
    globals(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    resolve({
      browser: true,
      main: true
    }),
    alias({
      '@': require('path').resolve(__dirname, 'src')
    })
  ],
  sourcemap: true
}
