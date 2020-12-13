const path = require('path');
 
function resolve (dir) {
  return path.join(__dirname, dir)
}
 
module.exports = {
  chainWebpack: (config) => {   
    config.resolve.alias
    .set('@',resolve('/src'))
    .set('@c',resolve('/components'))
    .set('@s',resolve('/src/service'))
    .set('@v',resolve('/src/views'))
  }
};