Template.index.events({
	'change .fileInput': function (e, t) {
		FS.Utility.eachFile(e, function(file){
			var fileObj = new FS.File(file)
			Uploads.insert(fileObj, function(err){
				console.log(err.reason);
			});
		});
	}
});