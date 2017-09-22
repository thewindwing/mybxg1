define(['jquery','template','uploadify','region'],function($,template){
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
        }
    })
});