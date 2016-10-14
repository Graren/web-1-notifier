/* eslint-disable no-var, strict */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
var prod  = require('./webpack.config.production');
var express= require('express');
var app = express();
var morgan = require('morgan');
var path = require('path');

if(process.argv.length > 2 && process.argv[2] === 'prod'){
  app.use(morgan('dev'));
  app.use(express.static(__dirname));
    app.listen(8002,function(){
      console.log("Listening to port 8002");
    });
  }

else{
  new WebpackDevServer(webpack(config), {
      publicPath: config.output.publicPath,
      hot: true,
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
  }).listen(5000, 'localhost', function(err) {
      if (err) {
          console.log(err);
      }
      console.log('Listening at localhost:5000');
  });
}
