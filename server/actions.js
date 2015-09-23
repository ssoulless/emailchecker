Meteor.methods({
	readLastUpload: function(){
		var upload = Uploads.find({}, {sort: {uploadedAt: -1}, limit: 1}).fetch()[0];
		var fs = Npm.require('fs');
		var readedFile = fs.readFileSync(process.env.PWD+'/public/'+upload.copies.uploads.key, 'utf8');
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
		resultObject = [];
		_.each(emailDomains, function(domain){
			var filteredEmails = _.filter(emails, function(emailSet){
				return emailSet[0].replace(/.*@/, "") === domain;
			});
			resultObject.push({
				domain: domain,
				emails: filteredEmails.length
			});
		});
		return resultObject;
	},
	emailFacultad: function(emails){
		var emailsfacultad = [];
		_.each(emails, function(emailSet){
			var facultad = emailSet[1];
			emailsfacultad.push(facultad);
		});

		emailsfacultad.sort();
		emailsfacultad = _.uniq(emailsfacultad);

		resultObject = [];
		_.each(emailsfacultad, function(facultad){
			var filteredEmails = _.filter(emails, function(emailSet){
				return emailSet[1] === facultad;
			});

			var emailFacultadDomains = [];
			_.each(filteredEmails, function(emailSet){
				var domain = emailSet[0].replace(/.*@/, "");
				emailFacultadDomains.push(domain);
			});
			emailFacultadDomains.sort();
			emailFacultadDomains = _.uniq(emailFacultadDomains);

			var filteredEmailsFacultad;
			_.each(emailFacultadDomains, function(facultadDomain){
				filteredEmailsFacultad = _.filter(filteredEmails, function(facultadEmail){
					return facultadEmail[0].replace(/.*@/, "") === facultadDomain;
				});
			});	

			resultObject.push({
				facultad: facultad,
				emails: filteredEmailsFacultad.length
			});
		});
		return resultObject;
	}
});