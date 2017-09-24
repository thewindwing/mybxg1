define(['jquery','template','util','ckeditor','validate','form'],function($,template,util,CKEDITOR){
$('.navs ul a[href="/course/add"]').addClass('active').closest('ul').show();
    //获取对应课程的id
    var csId=util.qs('cs_id');
    //操作标志位，以区分编辑还是添加课程
    var flag=util.qs('flag');
    $.ajax({
        type:'get',
        url:'/api/course/basic',
        dataType:'json',
        data:{cs_id:csId},
        success:function(data){
            console.log(data);
            if(data.code==200){
                if(flag){
                    data.result.operate='编辑课程';
                }else{
                    data.result.operate='添加课程';
                }
                $('#basicInfo').html(template('basicTpl',data.result));
/*
                var courseId=$('input[type=hidden]').val();
                console.log(courseId)*/

            //    渲染对应的 二级分类
                $('#firstType').change(function(){
                    var cgId=$(this).val();//获取一级id
                    $.ajax({
                        type:'get',
                        url:'/api/category/child',
                        dataType:'json',
                        data:{cg_id:cgId},
                        success:function(data){
                            console.log(data);
                            if(data.code==200){
                                var tpl=' {{each list}}<option value="{{$value.cg_id}}"  {{if $value.cg_id==cgId}}selected{{/if}}>{{$value.cg_name}}</option>{{/each}}';
                               var html=template.render(tpl,{list:data.result});                               
                                $('#secondType').html(html);
                            }

                        }
                    });

                });
            }

        //    富文本
            CKEDITOR.replace('editor');


        //    保存基本信息
            $('#csBasicInfo').validate({
                sendForm:false,
                valid:function(){
                    //更新富文本内容，将iframe内容变成表单数据
                    for(var instance in  CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    $(this).ajaxSubmit({
                        type:'post',
                        url:'/api/update/basic',
                        dataType:'json',
                        success:function(data){
                            console.log(data);

                        }
                    })
                }
            })
        }
    })
});