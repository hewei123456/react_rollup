// Rollup plugins.
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'

// Import the development configuration.
import config from './rollup.dev.config'

// Inject the production settings.
config.plugins[0] = replace({ 'process.env.NODE_ENV': JSON.stringify('production') })
config.plugins.push(terser())

export default config
