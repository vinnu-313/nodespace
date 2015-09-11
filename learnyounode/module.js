var fs = require('fs');
var http =  require('http');
var bl = require('bl');

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (position === undefined || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}

module.exports = {
	filterFiles : function(dir, ext, callback){
		fs.readdir(dir, function(err, list) {
			if(err){
				callback(err);
			}else {
				list = list.filter(function(file){
					return file.endsWith('.'+ext);
				});
				callback(null, list);
			}
		});
	},
	getHttp : function(url) {
		http.get(url, function(response){
			response.setEncoding("utf8");
			response.on('data', console.log);
			response.on('error', function(error) {
				console.error(error);
			});
		});
	},
	getAllHttp : function(url) {
		http.get(url, function(response){
			response.pipe(bl(function(err, data){
				if(err){
					return console.error(err);
				}
				data = data.toString();
				console.log(data.length);
				console.log(data);
			}));
		});
	}, 
	getThreeHttp : function (url1, url2, url3) {
		http.get(url1, function(response){
			response.pipe(bl(function(err, data){
				if(err){
					return console.error(err);
				}
				console.log(data.toString());
				http.get(url2, function(response){
					response.pipe(bl(function(err, data){
						if(err){
							return console.error(err);
						}
						console.log(data.toString());
						http.get(url3, function(response){
							response.pipe(bl(function(err, data){
								if(err){
									return console.error(err);
								}
								console.log(data.toString());
							}))
						});
					}));
				})
			}));
		});
	}
};
