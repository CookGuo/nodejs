function Page(){
	this.container = $("#nav");
	this.init();
}


$.extend(Page.prototype, {
	init: function() {
		this.createDom();
	},
	
	createDom: function() {
		this.header = new Header(this.container);
	}
});
