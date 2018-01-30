const Candidate = require('../model/candidate.js');


const addCandidate = (req, res) => {
	const {name, age, salary, address} = req.query;
	Candidate.addcandidate(name, age, salary, address, () => {
		res.json({
			ret : true,
			data : {
				position : true
			}
		});
	});
}


const tabList = (req, res) => {
	const page = req.query.page ? parseInt( req.query.page, 10 ) : 1;
	const pageNum = req.query.pageNum ? parseInt( req.query.pageNum, 10 ) : 10;
	
	Candidate.getTotlepage( pageNum, (totlepage) => {
		
		Candidate.listMessage(page, pageNum, ( tabListMessage ) => {
			console.log(totlepage);
			if(tabListMessage) {
				res.json({
					ret: true,
					data: {
						tabListMessage : tabListMessage,
						totlepage : totlepage
					}
				});
			}
		});
		
		
	});
	
}

const salaryLike = (req, res) => {
	Candidate.salaryLike(req.salaryCount, (result) => {
		if( result ) {
			res.json({
				ret: true,
				data:{
					result: result
				}
			});
		}
	});
}

const deleteItem = (req, res) => {
	Candidate.deleteItem(req.query.id, (result) => {
		res.json({
			ret:true,
			data:{
				deleteSucc: true
			}
		});
	});
}


const updateItem = (req, res) => {
	Candidate.updateItem( req.query.id, (result) => {
		res.json({
			ret: true,
			data: {
				update : result
			}
		});
	});
}


const update = (req, res) => {
	const {id, name, age, salary, address} = req.query;
	
	Candidate.update(id, name, age, salary, address, (result) => {
		res.json({
			ret: true,
			data: {
				updateItem: true
			}
		});
	});
}


module.exports = {
	addCandidate,
	tabList,
	salaryLike,
	deleteItem,
	updateItem,
	update
}