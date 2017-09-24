define(['jquery','util'],function($,util){
    util.setMenu(location.pathname);
    $('#courseBtn').click(function(){
        $.ajax({
            type:'post',
            data:$('#courseForm').serialize(),
            url:'/api/course/create',
            success:function(data){
                // console.log(data);
                if(data.code==200){
                    location.href='/course/basic?cs_id='+data.result.cs_id+'';//跳转到对应课程id的编辑页
                }
            }
        })
    });
});