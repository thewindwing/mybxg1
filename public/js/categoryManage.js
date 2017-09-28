define(['jquery','template','util','form','validate'],function($,template,util){
   util.setMenu('/category/list');
    var cgId=util.qs('cg_id');

    if(cgId){//编辑
        $.ajax({
            type:'get',
            url:'/api/category/edit',
            data:{cg_id:cgId},
            dataType:'json',
            success:function(data){
                console.log(data);
                data.result.operate='编辑分类';
                if(data.code==200){
                    $('#manageInfo').html(template('manageTpl',data.result));
                    //    编辑后提交数据
                    $("#categoryBtn").click(function(){
                        formSubmit('/api/category/modify',{cg_id:cgId});
                    });
                }
            }
        })
    }else{
        //添加
        $.ajax({
           type:'get',
            url:'/api/category/top',
            datType:'json',
            success:function(data){
                console.log(data);
                if(data.code==200){
                    $('#manageInfo').html(template('manageTpl',{operate:'添加分类',top:data.result,cg_is_hide:1}));
                }
                //    添加后提交数据
                $("#categoryBtn").click(function(){
                        formSubmit('/api/category/add');
                });
            }
        });
    }

//    提交表单数据
function formSubmit(url,data){
    $('#categoryForm').validate({
        sendForm:false,
        description:{
            infoOrder:{
                required:'不能为空',
                pattern:'必须是数字'
            }
        },
        valid:function(){
            $(this).ajaxSubmit({
                type:'post',
                url:url,
                data:data,
                dataType:'json',
                success:function(data){
                    console.log(data);
                    if(data.code==200){
                        location.href='/category/list';
                    }
                }
            })
        }
    });
}

});