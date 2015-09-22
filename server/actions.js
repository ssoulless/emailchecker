Meteor.methods({
	readLastUpload: function(){
		var upload = Uploads.find({}, {sort: {uploadedAt: -1}, limit: 1}).fetch()[0];
		var readedFile = Assets.getText('seeds/'+upload.copies.uploads.key);
		return readedFile;
	},
	emailsPerDomain: function(emails){
		var emailDomains = [];
		_.each(emails, function(emailSet){
			var domain = emailSet[0].replace(/.*@/, "");
			emailDomains.push(domain);
		});
		emailDomains.sort();
		emailDomains = _.uniq(emailDomains);
		resultObject = {};
		_.each(emailDomains, function(domain){
			var filteredEmails = _.filter(emails, function(emailSet){
				return emailSet[0].replace(/.*@/, "") === domain;
			});
			resultObject[domain] = filteredEmails.length;
		});
		return resultObject;
	}
});