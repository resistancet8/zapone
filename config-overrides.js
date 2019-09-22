const { override, useBabelRc, addLessLoader } = require('customize-cra');
module.exports = override(
       useBabelRc(),
       addLessLoader({
              javascriptEnabled: true,
              modifyVars: {
                     '@primary-color': '#31b8ff',
                     '@layout-sider-background': '#fff',
                     '@layout-body-background': '#fbfbfb',
                     '@layout-header-background': '#fbfbfb'
              },
       })
);