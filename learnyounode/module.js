var fs = require('fs');

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

module.exports = function(dir, ext, callback){
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
};