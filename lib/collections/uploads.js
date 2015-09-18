Uploads = new FS.Collection('uploads', {
	stores: [new FS.Store.FileSystem('uploads', {path: Meteor.rootPath + '/assets/app/seeds'})]
});