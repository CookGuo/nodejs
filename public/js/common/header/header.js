function Header (container){
	this.container = container;
	this.init();
}

Header.Template = `
	<nav class="navbar navbar-default">
		  <div class="container-fluid">
		    <!-- Brand and toggle get grouped for better mobile display -->
		    <div class="navbar-header">
		      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
		        <!--<span class="sr-only">Toggle navigation</span>盲人的标签，盲人通过阅读器可以看到页面的内容-->
		        <!---->
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		      <a class="navbar-brand" href="#">职位管理器</a>
		    </div>
		
		    <!-- Collect the nav links, forms, and other content for toggling -->
		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      <ul class="nav navbar-nav">
		        <li class="active"><a href="#">首页 <span class="sr-only">(current)</span></a></li>
		        <li><a href="/list.html">职位管理</a></li>
		        <li><a href="/candidate.html">候选人管理</a></li>
		      </ul>
			      <ul class="nav navbar-nav navbar-right hide" id="btnContainer"></ul>
			      <ul class="nav navbar-nav navbar-right hide" id="btnLogout"></ul>
			</nav>
`;

$.extend(Header.prototype, {
	init: function() {
		this.createDom();
		this.createRegister();
		this.createLogin();
		this.checkLogin();
	},
	
	createDom: function(){
		this.dom = $(Header.Template);
		this.btnContainer = this.dom.find("#btnContainer");
		this.btnLogout = this.dom.find("#btnLogout");
		this.container.append(this.dom);
	},
	
	createRegister: function() {
		this.register = new Register(this.dom, this.btnContainer);
	},
	
	createLogin: function() {
		this.login = new Login(this.dom, this.btnContainer, this.btnLogout);
	},
	
	//header做ajax请求判断用户是否登录
	checkLogin: function() {
		$.ajax({
			url:"/index/user/islogin",
			success:$.proxy(this.handleCheckLogin, this)
		});
	},
	
	handleCheckLogin: function(res) {
		if( !res.data.islogin ) {
			this.btnContainer.removeClass("hide");
		}else{
			this.btnLogout.removeClass("hide");
			this.login.setUser(res.data.username);
		}
	}
});
