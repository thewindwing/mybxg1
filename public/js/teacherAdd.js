define(['jquery','util','template','datepicker','language','validate','form'],function($,util,template){

    //编辑讲师信息
    var tcId=util.qs('tc_id');
    // console.log(tcId)
    if(tcId){

        $.ajax({
            type:'get',
            url:'/api/teacher/edit',
            data:{'tc_id':tcId},
            dataType:'json',
            success:function(data){
                console.log(data);
                //为data.result添加一个属性用来区分编辑还是添加
                data.result.operate='编辑讲师';
                $('#teacherInfo').html(template('teacherTpl',data.result));
                submitForm('/api/teacher/update');
            }
        });
    }else{
    //    添加讲师信息
        $('#teacherInfo').html(template('teacherTpl',{operate:'添加讲师'}));
        submitForm('/api/teacher/add');
    }

//    添加或修改讲师信息---插件做
    function submitForm(url){
        $('#teacherForm').validate({
            sendForm:false,
            valid:function(){
                $(this).ajaxSubmit({//自动提交表单数据不用再data了
                    type:'post',
                    url:url,
                    dataType:'json',
                    success:function(data){
                        if(data.code==200){
                            console.log(1)
                            // location.href='teacher/list';
                        }
                    }
                });
            },
            description:{
                tcName:{
                    required:'用户名不能为空'
                },
                tcPass:{
                    required:'密码不能为空',
                    pattern:'必须是6位以上字符'
                },
                tcJoinDate:{
                    required:'日期不能为空'
                }
            },
            eachValidField : function() {
                $(this).closest('div').removeClass('has-error').addClass('has-success');
            },
            eachInvalidField : function() {
                $(this).closest('div').removeClass('has-success').addClass('has-error');
            }
        });
    }

   /* function submitForm(url){
        $('#teacherBtn').click(function(){
            $.ajax({
                type:"post",
                url:url,
                data:$('#teacherForm').serialize(),
                dataType:'json',
                success:function(data){
                    if(data.code==200){
                        //成功时跳转到列表页，又渲染一次
                        location.href='/teacher/list';
                    }
                    // console.log(data);
                }
            });
        });
    }*/
});