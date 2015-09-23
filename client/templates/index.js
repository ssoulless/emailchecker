Template.index.events({
	'click .disabled': function(e, t) {
		return false;
	},
	'change .fileInput': function (e, t) {
		FS.Utility.eachFile(e, function(file){
			var fileObj = new FS.File(file)
			Session.set('currentUpload', true);
			Uploads.insert(fileObj, function(err, result){
				if (err) {
				Messages.send('alert', err.reason);
				console.log(err.reason);
				return;
				}
				Messages.send('info', 'File uploaded')
			});
		});
	},
	'click .analyze': function(e, t) {
		if(Session.get('currentUpload')){
			//Disable button while processing
			$(e.currentTarget).addClass('disabled');
			Meteor.call('getRootPath');
			Meteor.call('readLastUpload', function(err, result){
				if (err){
					return console.log(err);
				}
				parsedEmailsAndOwnership = result.split('\n');
				parsedEmailsAndOwnership = _.map(parsedEmailsAndOwnership, function(emailAndOwner){
					return emailAndOwner.split('/');
				});
				Meteor.call('emailsPerDomain', parsedEmailsAndOwnership, function(err, result){
					if(err){
						console.log(err);
					}
					Session.set('emailsPerDomain', result);
					Meteor.call('emailFacultad', parsedEmailsAndOwnership, function(err, result){
						if(err){
						console.log(err);
						}
						Session.set('emailFacultad', result);
						Router.go('analysisResult');
					});
				});
			});
		}else{
			Messages.send('warning', 'First Upload some file');
		}
		//TODO: leer el archivo en un parser de texto plano
		//TODO: crear funcionalidades
	}
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