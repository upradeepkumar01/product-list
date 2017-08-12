//
// server.js
//

var express = require('express'),
    fs      = require('fs'),    
    bodyParser  = require('body-parser')
    http = require('https');

var boot = function(port) {
  var app;
  app = express()
  products = [],
  promos = [], 

  app.configure(function() {
    app.use(express.static('./web/css'));
    app.use(bodyParser.json());
  });
  
  //configure root url
  app.get('/app', function(req, res) {
    fs.realpath('./web', {} , function (err, resolvedPath) {
    
      if (err) {
        console.log(err.stack);
      }
      console.log('Root is :- ' + resolvedPath);
      console.log('Physical path is :- ' + resolvedPath + '/index.html');
    
    });
    
    fs.createReadStream('./web/index.html').pipe(res);
  });

  app.get('/products', function(req, res) {
    var response = {};

    var options = {
      host: 'm.lowes.com',
      port: 443,
      path: '/CatalogServices/product/nvalue/v1_0?nValue=4294857975&maxResults=6&showURL=1&rollUpVariants=1&showUrl=true&storeNumber=0595&priceFlag=rangeBalance&showMarketingBullets=1',
      method: 'GET'
    };

    var httpReq = http.request(options, function(httpRes) {
      var parsed = '';

      httpRes.on('data', function (chunk) {
        parsed += chunk;
      });

      httpRes.on('error', function (err) {
        console.log(err);
      });

      httpRes.on('end', function() {
        res.send(JSON.parse(parsed));
      });
    });

    httpReq.end();
  });

  console.log('listening on - ' + port);
  console.log('you can now browse localhost...');
  app.listen(port);
  return app;
};

module.exports = {
  boot : boot
};