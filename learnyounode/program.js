var mymod = require('./module');
mymod(process.argv[2], process.argv[3], function(err, data){
	if(err){
		console.error("Something went wrong");
	}else{
		data.forEach(function(item){
			console.log(item);
		});
	}
});