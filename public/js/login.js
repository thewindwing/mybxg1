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
                    //cookie值是字符串，必须把对象转为字符串
                    $.cookie('loginInfo',JSON.stringify(data.result),{path:'/'});//存储到根目录下 方便使用
//                        console.log($.cookie('loginInfo'));
                    location.href='/main/index';
                }
            }
        });
        return false;
    })
});