function TabList(container, listContainer, candidateBox) {
	this.container = container;
	this.candidateBox = candidateBox;
	this.listContainer = listContainer;
	this.page = 1;
	this.pageNum = 10;
	this.init();
}


TabList.Template = `
			<div class="modal fade" id="UpdateModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 class="modal-title" id="exampleModalLabel">职位更改</h4>
			      </div>
			      <div class="modal-body">
			        <form>
				        <div class="form-group">
				            <label for="name" class="control-label">职位名称</label>
				            <input type="text" class="form-control" id="name">
				        </div>
				        <div class="form-group">
				            <label for="company" class="control-label">公司名称</label>
				            <input type="text" class="form-control" id="company">
				        </div>
			          	<div class="form-group">
				        	<label for="salary" class="control-label">薪资范围</label>
				        	<select id="salary" class="form-control">
							  <option>5000-10000</option>
							  <option>10000-15000</option>
							  <option>15000-25000</option>
							  <option>25000-50000</option>
							</select>
				    	</div>
				    	<div class="form-group">
				            <label for="address" class="control-label">公司地址</label>
				            <input type="text" class="form-control" id="address">
				        </div>
				        <div class="form-group">
				            <label for="image" class="control-label">请选择图片</label>
				            <input type="file" class="form-control" id="image">
				        </div>
			        </form>
			      </div>
				    <div class="modal-footer">
				        <button type="button" id="UpdateBtn" class="btn btn-primary">修改</button>
				    </div>
			    </div>
			  </div>
			</div>
`;


TabList.TemplateModal = `
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">候选人信息表</h4>
	      </div>
	      <table class="table table-striped">
			<tr>
				<th style="padding:20px">姓名</th>
				<th style="padding:20px">年龄</th>
				<th style="padding:20px">期望薪资</th>
				<th style="padding:20px">期望工作地点</th>
			</tr>
			<tbody id="candidataList">
				<tr>
					<td id="name" style="padding:20px"></td>
					<td id="age" style="padding:20px"></td>
					<td id="salary" style="padding:20px"></td>
					<td id="address" style="padding:20px"></td>
				</tr>
			</tbody>
		  </table>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	      </div>
	    </div>
	  </div>
	</div>

`;



$.extend(TabList.prototype, {
	init: function() {
		this.dom = $(TabList.Template);
		this.domModal = $(TabList.TemplateModal);
		this.listContainer.append(this.dom);
		this.listContainer.append(this.domModal);
		this.createDom();
		this.bindEvents();
	},
	
	createDom: function() {
		
		$.ajax({
			url:"/index/position/tabList",
			data:{
				page : this.page,
				pageNum : this.pageNum
			},
			success:$.proxy(this.handleAjaxTaList, this)
		});
	},
	
	bindEvents: function() {
		this.container.on("click", ".delete", $.proxy(this.handleDeleteClick, this));
		this.container.on("click", ".update", $.proxy(this.handleUpdateClick, this));
		this.dom.find("#UpdateBtn").on("click", $.proxy(this.handleSendUpdate, this));
		this.container.on("click", "#salaryClick", $.proxy(this.handleSalaryClick, this));
		$(document).on("click", $.proxy(this.handleDocumentClick, this));
		this.candidateBox.on("mouseenter", "#datails", $.proxy(this.handleMouseenter, this));
		this.candidateBox.on("click", "#datails", $.proxy(this.handleDatailsClick, this));
	},
	
	handleMouseenter: function(e) {
		$(e.target).css({"background":"#ccc"})
				   .siblings().css("background","#fff");
	},
	

	handleDatailsClick: function(e) {
		this.candidateName = $(e.target).html();
		this.domModal.modal("show");
		$.ajax({
			url:"/index/position/datails",
			data:{
				name : this.candidateName
			},
			success: $.proxy(this.handleDatailsSucc, this)
		})
	},
	
	handleDatailsSucc: function(res) {
		var item = res.data.datailsItem[0];
		this.domModal.find("#name").html(item.name);
		this.domModal.find("#age").html(item.age);
		this.domModal.find("#salary").html(item.salary);
		this.domModal.find("#address").html(item.address);
	},
	

	handleDocumentClick: function(e) {
		this.candidateBox.addClass("hide");
	},
	
	
	handleSalaryClick: function(e) {
		var e = e || event ;
		e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true ;
		var salaryCount = $(e.target).attr("data-id");
		$.ajax({
			url:"/index/position/findlike",
			data:{
				salaryCount: salaryCount
			},
			success:$.proxy(this.handleSalarySucc, this)
		});
	},
	
	handleSalarySucc: function(res) {
		var str = "";
		var length = res.data.result.length;
		for( var i = 0; i < length ; i++) {
			var item = res.data.result[i];
			if( i === 0 ) {
				str += `<li class="list-group-item" style="height:50px;">部分候选人</li>`;
			}else{
				str += `
					<li class="list-group-item" style="height:48px;" ><a href="#" id="datails">${item.name}</a></li>
				`;
			}
		}
		this.candidateBox.html(str);
		this.candidateBox.removeClass("hide");
	},
	
	
	//修改用post请求，上传图片
	
	handleSendUpdate: function() {
		
		//创建一个formData的对象，用于提交表单数据，文件
		var formData = new FormData();
		
		formData.append( "id", this.updateId );
		formData.append( "name", this.dom.find("#name").val() );
		formData.append( "company", this.dom.find("#company").val() );
		formData.append( "salary", this.dom.find("#salary").val() );
		formData.append( "address", this.dom.find("#address").val() );
		formData.append( "logo", this.dom.find("#image")[0].files[0] );
		
		$.ajax({
			type: "post",
			url: "/index/position/update",
			data: formData,
			cache: false,
			processData: false,
    		contentType: false,
			success: $.proxy(this.handleUpdateSucc, this)
		});
	},
	
	
	handleUpdateSucc: function(res) {
		console.log(res);
		this.dom.modal("hide");
		if( res ){
			this.refreshPage();
		}
	},
	
	
	handleUpdateClick: function(e) {
		this.dom.modal("show");
		
		this.updateId = $(e.target).attr("data-id");
		$.ajax({
			url:"/index/position/getMessage",
			data:{
				id: this.updateId 
			},
			success:$.proxy(this.handleUpdateGet, this)
		});
	},
	
	handleUpdateGet: function(res) {
		this.item = res.data.result;
		this.dom.find("#name").val(this.item.name);
		this.dom.find("#company").val(this.item.company);
		this.dom.find("#salary").val(this.item.salary);
		this.dom.find("#address").val(this.item.address);
	},
	
	handleDeleteClick: function(e) {
		this.deleteId = $(e.target).attr("data-id");
		$.ajax({
			url:"/index/position/delete",
			data:{
				id:this.deleteId
			},
			success: $.proxy(this.handleDeleteSuccess, this)
		});
	},
	
	handleDeleteSuccess: function(res) {
		this.refreshPage();
	},
	
	
	handleAjaxTaList:function(tablist) {
		if( !tablist.data.tabListMessage || !tablist.data.tabListMessage.length ) {
				if( tablist.data.totlepage > 1) {
					this.refreshPage(tablist.data.totlepage);
				}else {
					return;
				}
		}
		var str = "";
		var tabListLength = tablist.data.tabListMessage.length;
		for( var i = 0; i < tabListLength; i++ ){
			var item = tablist.data.tabListMessage[i];
			var imgSrc = item.logo ? item.logo : 'select3.jpg';
			str += `<tr>
						<td>${i+1}</td>
						<td><img src="/uploads/${imgSrc}" width="40" height="40" style="border-radius:50%"></td>
						<td>${item.name}</td>
						<td>${item.company}</td>
						<td>${item.salary}</td>
						<td id="salaryClick"><a href="#" style="text-align:center;line-height:40px;" data-id="${item.salary}">查询候选人</a></td>
						<td>${item.address}</td>
						<td><a href="#" style="margin-right:5px" data-id="${item._id}" class="update">修改</a><a href="#" data-id="${item._id}" class="delete" >删除</a></td>
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
			url:"/index/position/tabList",
			data:{
				page : this.page,
				pageNum : this.pageNum
			},
			success:$.proxy(this.handleAjaxTaList, this)
		});
	}
});
