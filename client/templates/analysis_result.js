Template.analysisResult.helpers({
	emailsPerDomain: function(){
		return Session.get('emailsPerDomain');
	},
	emailsPerFacultad: function(){
		return Session.get('emailsPerFacultad');
	}
});