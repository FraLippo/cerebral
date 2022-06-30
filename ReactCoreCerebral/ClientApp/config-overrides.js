
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
   style: true,
  }),
addLessLoader({
   javascriptEnabled: true,
   modifyVars: { "@layout-body-background": "#ffffff",
     "@layout-header-background" : "#afe4e2",
    "@menu-bg" : "#afe4e2",
    "@font-size-base" : "16px"},
  }),
);