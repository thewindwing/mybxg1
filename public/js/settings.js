define(['jquery','template','ckeditor','uploadify','region','validate','form','datepicker','language'],function($,template,CKEDITOR){
    $.ajax({
        type:'get',
        url:'/api/teacher/profile',
        dataType:'json',
        success:function(data){
            console.log(data);
            $('#settingsInfo').html(template('settingsTpl',data.result));
            
        //    上传头像
            $('#upfile').uploadify({
               swf:'/public/assets/uploadify/uploadify.swf',
                uploader:'/api/uploader/avatar',//发送的地址
                fileObjName:'tc_avatar',//传后台的参数
                //设置按钮的大小,不加单位
                width:120,
                height:120,
                buttonText:'',//按钮文字
                itemTemplate:'<span></span>',//不显示进度条
                onUploadSuccess:function(a,b,c){
                    console.log(b);
                    var obj=JSON.parse(b);
                    console.log(obj);
                    if(obj.code==200){
                        $('.preview img').attr('src',obj.result.path);
                    }
                }
            });
            
        //    省市区联动
            $('#pwd').region({
               url:'/public/assets/jquery-region/region.json'
            });
            
        //    富文本   必须用id
            CKEDITOR.replace('editor',{
                toolbarGroups : [
                { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
                { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
                { name: 'tools', groups: [ 'tools' ] },
                { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
                { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                { name: 'colors', groups: [ 'colors' ] },
                { name: 'about', groups: [ 'about' ] }]
            });

        //    更新个人资料
            $('#settingForm').validate({
                sendForm:false,
                description:{
                    roster:{
                        required:'昵称不能为空'
                    }  
                },
                valid:function(){//提交表单

                    //根据选择的家乡地址，拼接成家乡字符串
                  var p=$('#p').find('option:selected').text();
                  var c=$('#c').find('option:selected').text();
                  var d=$('#d').find('option:selected').text();
                    var hometown=p+'|'+c+'|'+d;

                    //更新富文本内容，将iframe内容变成表单数据
                    for(var instance in  CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }

                    $(this).ajaxSubmit({
                        type:'post',
                        url:'/api/teacher/modify',
                        dataType:'json',
                        data:{tc_hometown:hometown},//这里传一下表单之外的数据
                        success:function(data){
                            // console.log(data);
                            if(data.code==200){
                                // location.reload();
                                location.href='/main/index';
                            }
                        }
                    });
                }
            })
        }
    })
});