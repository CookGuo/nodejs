const db = require('../utlis/database.js');

var Users = db.model('user', { 
		username: String,
		password: String
});

const addUser = ( username, password, callback ) => {
	const user = new Users ({
		username : username,
		password : password
	});
	
	user.save().then(() => {
		callback();
	});
};


const findUser = ( userInfo = {}, callback ) => {
	Users.findOne( userInfo ).then((result) => {
		callback(result);
	});
};


module.exports = {
	addUser,
	findUser
};
