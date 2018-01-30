const express = require('express');
const router = express.Router();
const upload = require('../utlis/uploads.js');

const PositionController = require('../controller/position.js');

//用户走add的路由
router.post( '/add',  upload.single('logo'), PositionController.addPosition );
//用户走列表的路由
router.get( '/tabList', PositionController.tabList );
//用户走delete的路由
router.get( '/delete', PositionController.deleteItem );
//用户走查询点击的数据行
router.get( '/getMessage', PositionController.getMessage );
//用户更新数据的操作
router.post( '/update', upload.single('logo'), PositionController.update );
//用户查询候选人的路由
router.get( '/findlike', PositionController.salaryLike );
//点击候选人显示具体的信息
router.get( '/datails', PositionController.datails );
module.exports = router;
