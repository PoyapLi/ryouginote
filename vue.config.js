module.exports = {
  chainWebpack: config => {
    config.when(process.env.NODE_ENV = 'production', config => {
      config.set('externals', {
        'vue':'Vue',
        'axios':'axios',
        'element-ui': 'ELEMENT'
      })
    })
  }

}
