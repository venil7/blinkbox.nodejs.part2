var express = require('express');
var fs 		= require('fs');
var request	= require('request');
var url 	= require('url');
var engine	= require('ejs-locals');

var app = new express();

app.use(express.bodyParser());
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); 

app.get(/^\/|\/index.html$/i, function(req, res){
	fs.createReadStream('./index.html').pipe(res);
});

app.post('/submit', function(req, res)  {
	var name = req.body.name;
	var opts = {
	    protocol:'http',
	    host:'ajax.googleapis.com',
	    pathname:'ajax/services/search/images',
	    query: {v:'1.0', q:name}
	};
	var address = url.format(opts);
	request(address, function(err, res2, body) {
		if (!err && res2.statusCode == 200) {
		    var images = JSON.parse(body);
    	    res.render('cats.ejs', images.responseData);
		}
  	});
});

app.listen(3000);