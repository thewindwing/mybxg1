define(['jquery','template','util','bootstrap','form'],function($,template,util){
    util.setMenu('/course/add');
    var csId=util.qs('cs_id');
    var flag=util.qs('flag');
    $.ajax({
        type:'get',
        url:'/api/course/lesson',
        data:{cs_id:csId},
        dataType:'json',
        success:function(data){

            if(flag){
                data.result.operate='编辑课程';
                data.result.tog=1;
            }else{
                data.result.operate='添加课程';
            }
            console.log(data);
            var html=template('lessonTpl',data.result);
            $('#lessonInfo').html(html);

        //    编辑课时
            $('.editorLesson').click(function(){
                var ctId=$(this).parent().attr('data-ct-id');
                $.ajax({
                    type:'get',
                    url:'/api/course/chapter/edit',
                    data:{ct_id:ctId},
                    dataType:'json',
                    success:function(data){
                        console.log(data);
                        data.result.operate='编辑课时';
                        data.result.submit='编辑';
                        var html=template('modalTpl',data.result);
                        $('#modalInfo').html(html);
                        $('#chapterModal').modal();//显示模态框
                        $('#submitBtn').click(function(){
                            //向后台提交编辑后的内容
                            $('#lessonForm').ajaxSubmit({
                                type:'post',
                                url:'/api/course/chapter/modify',
                                data:{ct_cs_id:csId,ct_id:ctId},
                                success:function(data){
                                    // console.log(data)
                                    if(data.code==200){
                                        location.reload();
                                    }
                                }
                            });
                        })
                    }
                });
            });
            
        //    添加课时
            $('#addLesson').click(function(){
                var html=template('modalTpl',{operate:'添加课时',submit:'添加'});
                $('#modalInfo').html(html);
                $('#chapterModal').modal();//显示模态框
                $('#submitBtn').click(function() {
                    //向后台提交添加的内容
                    $('#lessonForm').ajaxSubmit({
                        type:'post',
                        url:'/api/course/chapter/add',
                        data:{ct_cs_id:csId},
                        success:function(data){
                            if(data.code==200){
                                location.reload();
                            }
                        }
                    });
                });
            });
        }

    })
});