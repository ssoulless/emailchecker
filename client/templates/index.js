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
				FlashMessages.sendError(err.reason);
				console.log(err.reason);
				return;
				}
				FlashMessages.sendInfo('File uploaded');
			});
		});
	},
	'click .analyze': function(e, t) {
		if(Session.get('currentUpload')){
			//Disable button while processing
			$(e.currentTarget).addClass('disabled');
			var upload = Uploads.find({}, {sort: {uploadedAt: -1}, limit: 1}).fetch()[0];
			HTTP.get(upload.url(),function(err,result){
			    // this will be async obviously
			    if ( err ) console.log("Error "+err);
			    else {
			      	content = result.content; // the contents of the file
			      	parsedEmailsAndOwnership = content.split('\n');
					parsedEmailsAndOwnership = _.map(parsedEmailsAndOwnership, function(emailAndOwner){
						return emailAndOwner.split('/');
					});
					
					console.log(parsedEmailsAndOwnership);
					//Quickfix, delete last blank space
					parsedEmailsAndOwnership.pop();
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
			    }
			});
		}else{
			FlashMessages.sendWarning('First Upload some file');
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