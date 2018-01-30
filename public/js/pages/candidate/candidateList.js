function CandidateList( container, listContainer ) {
	this.listContainer = listContainer;
	this.container = container;
	this.init();
}


CandidateList.Template = `
			<div class="modal fade" id="UpdateModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 class="modal-title" id="exampleModalLabel">候选人管理</h4>
			      </div>
			      <div class="modal-body">
			        <form>
				        <div class="form-group">
				            <label for="name" class="control-label">姓名</label>
				            <input type="text" class="form-control" id="name">
				        </div>
				        <div class="form-group">
				            <label for="age" class="control-label">年龄</label>
				            <input type="text" class="form-control" id="age">
				        </div>
			          	<div class="form-group">
				        	<label for="salary" class="control-label">期望薪资</label>
				        	<select id="salary" class="form-control">
							  <option>5000-10000</option>
							  <option>10000-15000</option>
							  <option>15000-25000</option>
							  <option>25000-50000</option>
							</select>
				    	</div>
				    	<div class="form-group">
				            <label for="address" class="control-label">期望工作地点</label>
				            <input type="text" class="form-control" id="address">
				        </div>
			        </form>
			      </div>
				    <div class="modal-footer">
				        <button type="button" id="UpdateBtn" class="btn btn-primary">更新信息</button>
				    </div>
			    </div>
			  </div>
			</div>
	
`;

$.extend(CandidateList.prototype, {
	init: function() {
		this.page = 1;
		this.pageNum = 10;
		this.dom = $(CandidateList.Template);
		this.listContainer.append(this.dom);
		this.updateSend = this.dom.find("#UpdateBtn");
		this.createDom();
		this.bindEvents();
	},
	
	bindEvents: function() {
		//动态添加的dom元素，我们使用事件的代理来完成
		this.container.on("click", ".deleteCan", $.proxy(this.handleDeleteClick, this));
		this.container.on("click", ".update", $.proxy( this.handleUpdateClick, this ));
		this.updateSend.on("click", $.proxy( this.handleUpdateSend, this));
	},
	
	
	handleUpdateSend: function(e) {
		$.ajax({
			url: "/index/candidate/updateItem",
			data: {
				id : this.updateId,
				name : this.dom.find("#name").val(),
				age : this.dom.find("#age").val(),
				salary : this.dom.find("#salary").val(),
				address : this.dom.find("#address").val()
			},
			success: $.proxy(this.handleUpdateSucc, this)
		});
	},
	
	handleUpdateSucc: function(res) {
		this.dom.modal("hide");
		setTimeout(function(){
			window.location.reload();
		},1000);
	},
	
	
	handleUpdateClick: function(e) {
		this.dom.modal("show");
		this.updateId = $(e.target).attr("data-id");
		$.ajax({
			url: "/index/candidate/update",
			data: {
				id: this.updateId
			},
			success: $.proxy(this.handleCandidataClick, this)
		});
	},
	
	handleCandidataClick: function(res) {
		var item = res.data.update;
		this.dom.find("#name").val(item.name);
		this.dom.find("#age").val(item.age);
		this.dom.find("#salary").val(item.salary);
		this.dom.find("#address").val(item.address);
	},
	
	handleDeleteClick: function(e) {
		this.deleteId = $(e.target).attr("data-id");
		$.ajax({
			url:"/index/candidate/delete",
			data:{
				id:this.deleteId
			},
			success:$.proxy(this.handleDeleteSucc, this)
		});
	},
	
	handleDeleteSucc: function(res) {
		this.refreshPage();
	},
	
	createDom: function() {
		$.ajax({
			url:"/index/candidate/tabList",
			data:{
				page :this.page,
				pageNum : this.pageNum
			},
			success:$.proxy(this.handleAjaxTabList, this)
		});
	},
	
	handleAjaxTabList:function(tablist) {
		if( !tablist.data.tabListMessage || !tablist.data.tabListMessage.length ) {
				if( tablist.data.totlepage > 1){
					this.refreshPage( tablist.data.totlepage );
				}else{
					return;
				}
		}
		var str = "";
		var tabListLength = tablist.data.tabListMessage.length;
		for( var i = 0; i < tabListLength; i++ ){
			var item = tablist.data.tabListMessage[i];
			str += `<tr>
						<td>${i+1}</td>
						<td>${item.name}</td>
						<td>${item.age}</td>
						<td>${item.salary}</td>
						<td>${item.address}</td>
						<td><a href="#" style="margin-right:5px" data-id="${item._id}" class="update">修改</a><a href="#" class="deleteCan" data-id="${item._id}">删除</a></td>
					</tr>`;
		}
		
		this.container.html(str);
		
		$(this).trigger(new $.Event("tablist", {
			totlepage : tablist.data.totlepage
		}));
	},
	
	refreshPage: function(currentPage) {
		if( currentPage ){
			this.page = currentPage;
		}
		$.ajax({
			url:"/index/candidate/tabList",
			data:{
				page : this.page,
				pageNum : this.pageNum
			},
			success:$.proxy(this.handleAjaxTabList, this)
		});
	}
});
