// Rollup plugins.
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'

// Import the development configuration.
import config from './rollup.config'

// Inject the production settings.
config.output.file = 'build/app.min.js'
config.plugins[5] = replace({ 'process.env.NODE_ENV': JSON.stringify('production') })
config.plugins.push(uglify())

export default config
