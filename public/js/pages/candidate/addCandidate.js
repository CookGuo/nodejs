function AddCandidate(listcontainer){
	this.listContainer = listcontainer;
	this.init();
}


AddCandidate.Template = `
			<div class="modal fade" id="addCandidateModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
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
				        <button type="button" id="addCandidateBtn" class="btn btn-primary">发布信息</button>
				    </div>
			    </div>
			  </div>
			</div>
`;


$.extend(AddCandidate.prototype, {
	init: function() {
		this.createDom();
		this.bindEvents();
	},
	
	createDom: function() {
		this.dom = $(AddCandidate.Template);
		this.listContainer.append(this.dom);
		this.addCandidateBtn = this.dom.find("#addCandidateBtn");
	},
	
	bindEvents: function() {
		this.addCandidateBtn.on("click", $.proxy(this.handleAddCandidate, this));
	},
	
	handleAddCandidate: function() {
		$.ajax({
			url:"/index/candidate/add",
			data: {
				name: this.dom.find("#name").val(),
				age: parseInt(this.dom.find("#age").val(), 10),
				salary: this.dom.find("#salary").val(),
				address: this.dom.find("#address").val()
			},
			success:$.proxy(this.handleAddCandidateAjax, this)
		});
	},
	
	handleAddCandidateAjax: function(res) {
		this.dom.modal("hide");
		setTimeout(function(){
			window.location.reload();
		},1000);
	}
	
});	