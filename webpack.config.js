module.exports = config => {
  config.resolve = {
    alias: {
      '@': require('path').resolve(__dirname, 'src')
    }
  }
  return config
}
