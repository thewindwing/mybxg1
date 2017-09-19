define(['jquery','template','cookie'],function($,template){//有返回值的写在前面，没有返回值的写在后面
/*	NProgress.start();

	NProgress.done();*/

	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	// 退出登录
	$('#logoutBtn').click(function(){
		$.ajax({
			type:'post',
			url:'/api/logout',
			dateType:'json',
			success:function(data){
				console.log(data,1);
				if(data.code==200){
					location.href='/main/login';
					//此时的logout响应报文中 Set-Cookie:PHPSESSID=deleted; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/
				}
			}
		})
	});
	//验证用户是否登录了
	var flag=$.cookie('PHPSESSID');//{PHPSESSID: "cema45lu5eidc3purjlf0qf9u4", loginInfo: "{"tc_name":"admin","tc_avatar":"http://static.botue.com/images/avatar/58d3d54990dea.png"}"}
	if(!flag&&location.pathname!='/main/login'){
		location.href='/main/login';
	}

	//填充用户头像信息
	var cookie=JSON.parse($.cookie('loginInfo'));
	console.log(cookie);
	$('.img-circle img').attr('src',cookie.tc_avatar);
	$('.profile h4').html(cookie.tc_name);
});
	