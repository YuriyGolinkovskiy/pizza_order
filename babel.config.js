module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/pizza_order/'
    : '/',
  presets: [
    '@vue/app'
  ]
}
