define(['jquery','template','cookie','state'],function($,template){

	/*NProgress.start();

	NProgress.done();

	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});*/


	//验证用户是否登录，没登录直接跳转到登录页
	console.log($.cookie());
	var flag=$.cookie('PHPSESSID');
	if(!flag&&location.pathname!='/main/login'){
		location.href='/main/login';
	}



	//动态创建头像
	var loginInfo=$.cookie('loginInfo');

	loginInfo=loginInfo&&JSON.parse(loginInfo);
	var tpl='<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>';
//        方法一‘
//        var render=template.compile(tpl);
//        var html=render(loginInfo);
//       或 方法二
	var html=template.render(tpl,loginInfo);
	$('.aside .profile').html(html);


//        退出登录
	$('#logoutBtn').click(function(){
		$.ajax({
			type:'post',
			url:'/api/logout',
			success:function(data){
//                    console.log(data);
				location.href='/main/login';
			}
		})
	});

//	侧边栏课程管理切换
	$('.navs ul').prev('a').click(function(){
		console.log($(this))
		$(this).next('ul').slideToggle();

	});
	/*$('#toggle').click(function(){
		console.log($(this))
		$(this).next('ul').slideToggle();})*/

});
