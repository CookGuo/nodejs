function Login(container, btnContainer, btnLogout){
	this.container = container;
	this.btnContainer = btnContainer;
	this.btnLogout = btnLogout;
	this.init();
}


Login.Template = `
	<div class="modal fade" id="loginModel" role="dialog" aria-labelledby="loginLabel">
 		<div class="modal-dialog" role="document">
    		<div class="modal-content">
      			<div class="modal-header">
        			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
        				<span aria-hidden="true">&times;</span>
        			</button>
        			<h4 class="modal-title" id="loginLabel">登录</h4>
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
        			<button type="button" id="loginBtn" class="btn btn-primary">登录</button>
      			</div>
                <div style="margin:20px;" class="alert hide alert-success" id="userSuccess">恭喜您登录成功！</div>
                <div style="margin:20px;" class="alert hide alert-danger" id="userCheck">sorry, 用户名密码错误</div>
    		</div>
  		</div>
	</div>
`;


$.extend(Login.prototype, {
	init: function() {
		this.createDom();
		this.bindEvent();
	},
	
	createDom: function() {
		this.btnContainer.append('<li><a href="#" data-toggle="modal" data-target="#loginModel">登录</a></li>');
		this.btnLogout.append('<li><a href="javascript:;" id="loginUser"></a></li><li><a href="javascripot:;" id="logout">退出</a></li>');
		this.dom = $(Login.Template);
		this.userSuccess = this.dom.find("#userSuccess");
		this.userCheck = this.dom.find("#userCheck");
		this.username = this.dom.find("#username");
		this.container.append(this.dom);
	},
	
	bindEvent: function(){
		this.loginBtn = this.dom.find("#loginBtn");
		this.loginBtn.on("click", $.proxy(this.handleLoginSuccessClick, this));
		this.username.on("focus", $.proxy(this.handleFocus, this));
		this.logoutBtn = this.btnLogout.find("#logout");
		this.logoutBtn.on("click", $.proxy(this.handleLogoutClick, this));
	},
	
	handleLogoutClick: function() {
		$.ajax({
			url:"/index/user/logout",
			success : $.proxy(this.handleLogoutSuccess, this)
		});
	},
	
	handleLogoutSuccess: function(res) {
		if(res.data.logout) {
			window.location.reload();
		}else{
			alert("服务器错误！");
		}
	},
	
	handleFocus: function() {
		this.userCheck.addClass("hide");
	},
	
	handleLoginSuccessClick: function(){
		var username = this.dom.find("#username").val(),
			password = this.dom.find("#password").val();
			
		$.ajax({
			type:"post",
			url:"/index/user/login",
			data:{
				username : username,
				password : password
			},
			success: $.proxy(this.handleAjaxSuccess, this)
		});
	},
	
	handleAjaxSuccess: function(res){
		//用户点击按钮之后，返回服务器处理的结果
		if( res.data.login ){
			this.handleSuccessLogin();
		}else{
			this.dom.find("#userCheck").removeClass("hide");
		}
	},
	
	handleSuccessLogin: function(){
		this.userSuccess.addClass("hide");
		this.dom.modal("hide");
		
	},
	
	setUser: function(username) {
		this.element = this.btnLogout.find("#loginUser");
		this.element.text(username);
	}
	
});
