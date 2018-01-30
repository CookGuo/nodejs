function Register(container, btnContainer){
	this.container = container;
	this.btnContainer = btnContainer;
	this.init();
}


Register.Template = `
			<div class="modal fade" id="registerModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 class="modal-title" id="exampleModalLabel">注册</h4>
			      </div>
			      <div class="modal-body">
			        <form>
			          <div class="form-group">
			            <label for="username" class="control-label">用户名</label>
			            <input type="text" class="form-control" id="username">
			          </div>
			          <div class="form-group">
			            <label for="password" class="control-label">密码</label>
			            <input type="password" class="form-control" id="password">
			          </div>
			        </form>
			      </div>
				    <div class="modal-footer">
				        <button type="button" id="registerBtn" class="btn btn-primary">注册</button>
				    </div>
			    <div style="margin:20px;text-align:center" class="alert hide alert-success " id="userSuccess">注册成功</div>
			    <div style="margin:20px;text-align:center" class="alert hide alert-danger" id="userCheck">用户名已存在</div>
			    </div>
			  </div>
			</div>
`;


$.extend(Register.prototype, {
	init: function() {
		this.createDom();
		this.bindEvent();
	},
	
	createDom: function() {
		this.btnContainer.append('<li><a href="javascript:;" data-toggle="modal" data-target="#registerModel" >注册</a></li>');
		this.dom = $(Register.Template);
		this.userSuccess = this.dom.find("#userSuccess");
		this.userCheck = this.dom.find("#userCheck");
		this.username = this.dom.find("#username");
		this.container.append(this.dom);
	},
	
	bindEvent: function(){
		this.registerBtn = this.dom.find("#registerBtn");
		this.registerBtn.on("click", $.proxy(this.handleRegisterBtnClick, this));
		this.username.on("focus", $.proxy(this.handleFocus, this));
	},
	
	handleFocus: function() {
		this.userCheck.addClass("hide");
	},
	
	handleRegisterBtnClick: function(){
		var username = this.dom.find("#username").val(),
			password = this.dom.find("#password").val();
			
		$.ajax({
			type:"post",
			url:"/index/user/register",
			data:{
				username : username,
				password : password
			},
			success: $.proxy(this.handleAjaxSuccess, this)
		});
	},
	
	handleAjaxSuccess: function(res){
		//用户点击按钮之后，返回服务器处理的结果
		if( res.data.register ){
			this.userSuccess.removeClass("hide");
			setTimeout( $.proxy( this.handleSuccessRegister, this ), 3000);
		}else{
			this.dom.find("#userCheck").removeClass("hide");
		}
	},
	
	handleSuccessRegister: function(){
		this.userSuccess.addClass("hide");
		this.dom.modal("hide");
	}
	
});
