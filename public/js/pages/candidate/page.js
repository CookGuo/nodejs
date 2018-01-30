function Page(){
	this.headerContainer = $("#nav");
	this.listContainer = $("#content");
	this.tbodyContainer = $("#tbody");
	this.listBoxContainter = $("#listBox");
	this.init();
}

$.extend(Page.prototype, {
	init: function() {
		this.createDom();
		this.createaddCandidate();
		this.createCandidateList();
		this.creareCandidateSelect();
		this.bindEvents();
	},
	
	createDom: function() {
		this.header = new Header(this.headerContainer);
	},
	
	createaddCandidate: function() {
		this.addcandidate = new AddCandidate(this.listContainer);
	},
	
	createCandidateList: function() {
		this.candidatelist = new CandidateList( this.tbodyContainer, this.listContainer );
	},
	
	creareCandidateSelect: function() {
		this.candidateselect = new CandidateSelect(this.listBoxContainter);
	},
	
	bindEvents: function() {
		$(this.candidatelist).on("tablist", $.proxy(this.handleSuccessGettotle, this));
		$(this.candidateselect).on("currentChange", $.proxy(this.handleCurrentChange, this));
	},
	
	handleSuccessGettotle: function(e) {
		this.candidateselect.setTotlepage(e.totlepage);
	},
	
	handleCurrentChange: function(e) {
		this.candidatelist.refreshPage(e.currentPage);
	}
});
