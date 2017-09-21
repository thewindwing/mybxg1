define(['jquery','util','template','datepicker','language'],function($,util,template){

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

//    添加或修改讲师信息
    function submitForm(url){
        $('#teacherBtn').click(function(){
            $.ajax({
                type:"post",
                url:url,
                data:$('#teacherForm').serialize(),
                dataType:'json',
                success:function(data){
                    if(data.code==200){
                        location.href='/teacher/list';
                    }
                    console.log(data);
                }
            });
        });
    }
});