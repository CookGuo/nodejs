function AddPosition(listcontainer){
	this.listContainer = listcontainer;
	this.init();
}


AddPosition.Template = `
			<div class="modal fade" id="addPositionModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 class="modal-title" id="exampleModalLabel">职位管理</h4>
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
				            <label for="image" class="control-label">选择图片</label>
				            <input type="file" class="form-control" id="image">
				        </div>
			        </form>
			      </div>
				    <div class="modal-footer">
				        <button type="button" id="addPositionBtn" class="btn btn-primary">发布信息</button>
				    </div>
			    </div>
			  </div>
			</div>
`;


$.extend(AddPosition.prototype, {
	init: function() {
		this.createDom();
		this.bindEvents();
	},
	
	createDom: function() {
		this.dom = $(AddPosition.Template);
		this.listContainer.append(this.dom);
		this.addPositionBtn = this.dom.find("#addPositionBtn");
	},
	
	bindEvents: function() {
		this.addPositionBtn.on("click", $.proxy(this.handleAddPosition, this));
	},
	
	handleAddPosition: function() {
		
		//创建一个表单对象，formDate
		var formData = new FormData();
		formData.append("name", this.dom.find("#name").val());
		formData.append("company", this.dom.find("#company").val());
		formData.append("salary", this.dom.find("#salary").val());
		formData.append("address", this.dom.find("#address").val());
		formData.append("logo", this.dom.find("#image")[0].files[0]);
//		for( var i = 0; i < 40 ; i ++ ) {
			$.ajax({
				type:"post",
				url:"/index/position/add",
				data:formData,
				cache: false,
				processData: false,
    			contentType: false,
				success:$.proxy(this.handleAddPositionAjax, this)
			});
//		}
		
	},
	
	handleAddPositionAjax: function(res) {
		this.dom.modal("hide");
		setTimeout(function(){
			window.location.reload();
		},1000);
	}
	
});	