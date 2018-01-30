function List(container){
	this.container = container;
	this.init();
}


$.extend(List.prototype, {
	init: function() {
		this.bindEvents();
	},
	
	setTotlepage: function(totlepage) {
		var str = "";
		for(var i = 0; i < totlepage; i++ ) {
			str += `
				<li><a href="#" class="currentPage" >${i+1}</a></li>
			`;
		}
		this.container.html(str);
	},
	
	bindEvents: function() {
		this.container.on("click", ".currentPage", $.proxy(this.handleClick, this));
	},
	
	handleClick: function(e) {
		var currentPage = $(e.target).html();
		$(this).trigger(new $.Event("currentChange", {
			currentPage : currentPage
		}));
	}
});
