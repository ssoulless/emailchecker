var Base = "";
if (Meteor.isServer) {
  Base = process.env.PWD;
}

Uploads = new FS.Collection('uploads', {
	stores: [new FS.Store.FileSystem('uploads', {path: Base + '/private/seeds'})]
});

