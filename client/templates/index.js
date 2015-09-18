Template.index.events({
	'change .fileInput': function (e, t) {
		FS.Utility.eachFile(e, function(file){
			var fileObj = new FS.File(file)
			Session.set('currentUpload', true);
			Uploads.insert(fileObj, function(err){
				console.log(err.reason);
			});
		});
	},
	// 'click .analyze': function(e, t) {
	// 	var emails = Assets.getText('seeds/'+Uploads.find({sort: {createdAt: -1}, limit: 1}).fetch()[0].name)
	// 	//TODO: leer el archivo en un parser de texto plano
	// 	//TODO: crear funcionalidades
	// }
});

Template.index.helpers({
	upload: function(){
		if (Session.get('currentUpload')){
				return Uploads.find({},{sort: {uploadedAt: -1}, limit: 1});
		}else{
			return [];
		}
	}
});