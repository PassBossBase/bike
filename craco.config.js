const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': 'rgba(15, 224, 179, 0.897)' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};