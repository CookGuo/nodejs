const express = require('express');
const router = express.Router();
const CandidateController = require('../controller/candidate.js');

//用户走add的路由
router.get( '/add', CandidateController.addCandidate );
//用户走列表的路由
router.get( '/tabList', CandidateController.tabList );
//用户走删除的路由
router.get( '/delete', CandidateController.deleteItem );
//用户走查询数据的路由
router.get( '/update', CandidateController.updateItem );
//用户走
router.get( '/updateItem', CandidateController.update );

module.exports = router;
