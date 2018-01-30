const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.js');
//用户注册路由
router.post( '/register', UserController.register );
//用户登录路由
router.post( '/login', UserController.login );
//检查用户是否登录
router.get( '/islogin', UserController.islogin );
//用户退出的路由
router.get( '/logout', UserController.logout );
module.exports = router;
