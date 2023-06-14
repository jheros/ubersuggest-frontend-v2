const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@common-ui': path.resolve(__dirname, 'common-ui/dist/'),
    },
    configure: (webpackConfig) => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin',
      )

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1)

      return webpackConfig
    },
  },
}
