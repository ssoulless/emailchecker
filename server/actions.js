Meteor.methods({
	readLastUpload: function(){
		var upload = Uploads.find({}, {sort: {uploadedAt: -1}, limit: 1}).fetch()[0];
		var readedFile = Assets.getText('seeds/'+upload.copies.uploads.key);
		return readedFile;
	}
});