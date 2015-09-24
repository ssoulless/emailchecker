Meteor.methods({
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
	}
});