const db = require('../utlis/database.js');

//在数据库中新建一张表position，默认是positions，
//如果修改默认的情况，在后面加一个，“position”
var Candidates = db.model('candidate', { 
		name: String,
		age: String,
		salary: String,
		address: String
});

const addcandidate = ( name, age, salary, address, callback ) => {
	const candidate = new Candidates({
		name: name,
		age: age,
		salary: salary,
		address: address
	});
	
	candidate.save().then(() => {
		callback();
	});
};


const listMessage = (page, pageNum, callback ) => {
	
	Candidates.find({}).limit(pageNum).skip((page - 1) * pageNum ).then((tabListMessage) => {
		callback(tabListMessage);
	});
}


const getTotlepage = (pageNum, callback) => {
	Candidates.find({}).count().then((totlepage) => {
		const totleNum = Math.ceil(totlepage / pageNum);
		callback( totleNum );
	});
}

const salaryLike = ( userInfo = {}, callback) => {
	Candidates.find(userInfo).limit(10).then((result) => {
		callback(result);
	});
}

const deleteItem = (id, callback) => {
	Candidates.findByIdAndRemove(id, (err, result) => {
		if( !err && result ) {
			callback(result);
		}else{
			return;
		}
	});
}


const updateItem = (id, callback) => {
	Candidates.findById(id, (err, result) => {
		if( !err && result ) {
			callback( result );
		}else{
			return;
		}
	});
}

const update = (id, name, age, salary, address, callback) => {
	Candidates.findByIdAndUpdate(id, {
		name : name,
		age : age,
		salary : salary,
		address : address
	}, (err, result) => {
		if( !err && result ) {
			callback(result);
		}else {
			return;
		}
	})
}


const datails = (name = {}, callback) => {
	Candidates.find(name).then((result) => {
		callback(result);
	});
}


module.exports = {
	addcandidate,
	listMessage,
	getTotlepage,
	salaryLike,
	deleteItem,
	updateItem,
	update,
	datails
}