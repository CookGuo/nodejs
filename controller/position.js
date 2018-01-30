const Positions = require('../model/position.js');
const Candidate = require('../model/candidate.js');

const addPosition = (req, res) => {
	const {name, company, salary, address} = req.body;
	const logo = req.file.filename;
	Positions.addposition(name, company, salary, address, logo, () => {
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
	
	Positions.getTotlepage( pageNum, (totlepage) => {
		
		Positions.listMessage(page, pageNum, ( tabListMessage ) => {
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

const deleteItem = (req, res) => {
	Positions.deleteItem( req.query.id, (resulte) => {
		res.json({
			ret:true,
			data:{
				deleteres: resulte
			}
		});
	});
}

const getMessage = (req, res) => {
	Positions.getMessage( req.query.id, (result) => {
		res.json({
			ret: true,
			data:{
				result: result
			}
		});
	})
}


const update = (req, res) => {
	const {id, name, company, salary, address} = req.body;
	const logo = req.file.filename;
	console.log(id);
	Positions.update( id, name, company, salary, address, logo, (result) => {
		if(result){
			res.json({
				ret:true,
				data:{
					result: result
				}
			});
		}
	});
}

const salaryLike = (req, res) => {
	Candidate.salaryLike({salary : req.query.salaryCount}, (result) => {
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


const datails = (req, res) => {

	Candidate.datails( {name : req.query.name}, (result) => {
		res.json({
			ret: true,
			data: {
				datailsItem : result
			}
		});
	});
}


module.exports = {
	addPosition,
	tabList,
	deleteItem,
	getMessage,
	update,
	salaryLike,
	datails
}