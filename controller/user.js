const User = require('../model/user.js');
//引入文件的解密核心模块
const Crypto = require('crypto');

const register = ( req, res ) => {
	const { username, password } = req.body;
	
	User.findUser( { username, password }, ( userMessage ) => {
		if( userMessage ) {
			res.json({
				"ret" : true,
				"data" : {
					"register" : false
				}
			});
		}else {
			//将密码密文处理，让管理员无法破解密码
			const hash = Crypto.createHash('sha256');
			hash.update( password );
			//将编译后的密码传给model
			User.addUser( username, hash.digest('hex'), () => {
				res.json({
					"ret" : true,
					"data" : {
						"register" : true
					}
				});
			});
		}
	});
	
}


const login = (req, res) => {
	const {username, password} = req.body;
	
	const hash = Crypto.createHash('sha256');
	hash.update( password );
	
	User.findUser({
		username : username,
		password : hash.digest('hex')
	}, (userMessage) => {
		if( userMessage ){
			//express中的cookie-session模块
			//在session中随机生成一个字段用于存放User
			//在cookie中中一个session.id存放随机生成的字段
			req.session.username = username;
			res.json({
				ret : true ,
				data : {
					login : true
				}
			});
		}else{
			res.json({
				ret : true ,
				data : {
					login : false
				}
			});
		}
	});
}


const islogin = ( req, res ) => {
	if( req.session.username ){
		res.json({
			ret : true,
			data : {
				username : req.session.username,
				islogin : true 
			}
		})
	}else{
		res.json({
			ret : true,
			data : {
				islogin : false 
			}
		})
	}
}


const logout = (req, res) => {
	req.session = null;
	res.json({
		ret : true,
		data : {
			logout : true
		}
	});
}


module.exports = {
	register,
	login,
	islogin,
	logout
}
	
