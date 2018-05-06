var config = require('../webpack.config')

var WebpackShellPlugin = require('webpack-shell-plugin')

if (process.env.NODE_ENV !== 'production') {
  config[0].plugins.push(new WebpackShellPlugin({onBuildEnd: [`docker run -p 8080:80 --rm -v ${__dirname}/../dev:/etc/nginx/conf.d -v ${__dirname}/../build:/usr/share/nginx/html:ro nginx`]}))
}

module.exports = config