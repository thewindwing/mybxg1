define(['jquery','cookie'],function($){

    $('#loginBtn').click(function(){
        $.ajax({
            url:'/api/login',
            type:'post',
            dataType:'json',
            data:$('form').serialize(),
            success:function(data){
                console.log(data,1);
                if(data.code==200){
//通过cookie保存用户名和头像（data返回值中有），因为同一域名下cookie值相同，且cookie每次请求中携带
                    $.cookie('loginInfo',JSON.stringify(data.result),{path:'/'}); //cookie值都是字符串，路径设到根目录下 方便后续获取
                    location.href='/main/index';
                }
            }
        });
        console.log(1);
        return false;
    })
});