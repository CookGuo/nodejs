function Page(){
	this.headerContainer = $("#nav");
	this.listContainer = $("#content");
	this.tbodyContainer = $("#tbody");
	this.listBoxContainter = $("#listBox");
	this.candidateBox = $("#candidateBox");
	this.init();
}


$.extend(Page.prototype, {
	init: function() {
		this.createDom();
		this.createAddPosition();
		this.createTabList();
		this.createList();
		this.bindEvents();
	},
	
	createDom: function() {
		this.header = new Header(this.headerContainer);
	},
	
	createAddPosition: function() {
		this.addposition = new AddPosition(this.listContainer);
	},
	
	createTabList: function() {
		this.tablist = new TabList(this.tbodyContainer, this.listContainer, this.candidateBox);
	},
	
	createList: function() {
		this.listMessage = new List(this.listBoxContainter);
	},
	
	bindEvents: function() {
		$(this.tablist).on("tablist", $.proxy(this.handleTabListSucc, this));
		$(this.listMessage).on("currentChange", $.proxy(this.handleCurrentChange, this));
	},
	
	handleTabListSucc: function(e) {
		var totlepage = e.totlepage;
		this.listMessage.setTotlepage(totlepage);
	},
	
	handleCurrentChange: function(e) {
		this.tablist.refreshPage(e.currentPage);
	}
});
