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
		emialAndemail =[];
		_.each(emailDomains, function(domain){
			var filteredEmails = _.filter(emails, function(emailSet){
				return emailSet[0].replace(/.*@/, "") === domain;
			});
			emialAndemail.push({
				domain: domain,
				emails: filteredEmails.length
			});

		});
		emialAndemail.sort(function a,b){
			if(a.emails < b.emails)
				return 1;
			if(a.emails > b.emails)
				return -1;
			return 0;
			}
		resultObject.push({
			domain: domain,
			emails: emialAndemail.shift().domain
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
			domainsAndemails = [];
			_.each(emailFacultadDomains, function(facultadDomain){
				filteredEmailsFacultad = _.filter(filteredEmails, function(facultadEmail){
					return facultadEmail[0].replace(/.*@/, "") === facultadDomain;
				});
				domainsAndemails.push({
					domain: facultadDomain,
					emails: filteredEmailsFacultad.length
				});
			});

			domainsAndemails.sort(function(a,b) {
				if(a.emails < b.emails)
					return 1;
				if(a.emails > b.emails)
					return -1;
				return 0;				
			});

			resultObject.push({
				facultad: facultad,
				domain: domainsAndemails.shift().domain
			});
		});
		return resultObject;
	}
});