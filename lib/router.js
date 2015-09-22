Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
})

Router.route('/',{
	name: 'index'
});

Router.route('/analysis_result', {
	name: 'analysisResult'
});