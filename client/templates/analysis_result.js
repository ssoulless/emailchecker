Template.analysisResult.helpers({
	emailsPerDomain: function(){
		return Session.get('emailsPerDomain');
	},
	emailFacultad: function(){
		return Session.get('emailFacultad');
	}
});