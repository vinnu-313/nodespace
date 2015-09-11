var mymod = require('./module');
mymod.filterFiles(process.argv[2], process.argv[3], function(err, data){
	if(err){
		console.error (err);
		console.error("Something went wrong");
	}else{
		data.forEach(function(item){
			console.log(item);
		});
	}
});