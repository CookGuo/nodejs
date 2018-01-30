const db = require('../utlis/database.js');

//在数据库中新建一张表position，默认是positions，
//如果修改默认的情况，在后面加一个，“position”
var Positions = db.model('position', { 
		name: String,
		company: String,
		salary: String,
		address: String,
		logo: String
});

const addposition = ( name, company, salary, address, logo, callback ) => {
	const position = new Positions({
		name: name,
		company: company,
		salary: salary,
		address: address,
		logo: logo
	});
	
	position.save().then(() => {
		callback();
	});
};


const listMessage = (page, pageNum, callback ) => {
	
	Positions.find({}).limit(pageNum).skip((page - 1) * pageNum ).then((tabListMessage) => {
		callback(tabListMessage);
	});
}


const getTotlepage = (pageNum, callback) => {
	Positions.find({}).count().then((totlepage) => {
		const totleNum = Math.ceil(totlepage / pageNum);
		callback( totleNum );
	});
}

const deleteItem = (deleteId, callback) => {
	Positions.findByIdAndRemove(deleteId, (err, result) => {
		if( !err && result ) {
			callback(true);
		}else{
			callback(false);
		}
	});
}

const getMessage = (id, callback) => {
	Positions.findById(id, (err, result) => {
		if( !err && result ) {
			callback(result);
		}else{
			callback(err);
		}
	});
}

const update = ( id, name, company, salary, address, logo, callback) => {
	Positions.findByIdAndUpdate( id , {
		name:name,
		company:company,
		salary:salary,
		address:address,
		logo : logo
	}, (err, result) => {
		callback(result);
	})
};

module.exports = {
	addposition,
	listMessage,
	getTotlepage,
	deleteItem,
	getMessage,
	update
}