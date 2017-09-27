define(['jquery','template','util','uploadify','Jcrop','form'],function($,template,util){
//    设置侧边栏对应菜单高亮显示
    util.setMenu('/course/add');
    // 获取地址栏中的cs_id
    var csId=util.qs('cs_id');
    var flag=util.qs('flag');//编辑时flag=1
    //获取上传的图片
    var img=$('.preview img');
    //确保裁切实例（区域）的唯一性
    var nowCrop=null;

    $.ajax({
        type:'get',
        url:'/api/course/picture',
        data:{cs_id:csId},
        dataType:'json',
        success:function(data){
            console.log(data);
            if(data.code==200){
                if(flag){
                    data.result.operate='编辑课程';
                    data.result.tog=1;
                }else{
                    data.result.operate='添加课程';
                }
                var html=template('pictureTpl',data.result);
                $('#pictureInfo').html(html);

                //图片上传
                $('#myFile').uploadify({
                   swf:'/public/assets/uploadify/uploadify.swf',
                    uploader:'/api/uploader/cover',//接口
                    buttonText:'上传图片',//按钮内容
                    buttonClass:'btn btn-success btn-sm',//按钮样式
                    width:88,//按钮大小
                    height:'auto',//设置auto文字上下居中
                    itemTemplate:'<span></span>',//不显示进度条
                    fileObjName:'cs_cover_original',//指定后台接收的这个图片的名字
                    formData:{'cs_id':csId},//传到后台的额外数据
                    onUploadSuccess:function(a,b){
                        console.log(b);//获取的是字符串
                        var obj=JSON.parse(b);
                        if(obj.code==200){
                            $(".preview img").attr('src',obj.result.path);//渲染到页面

                        //    当图片上传成功后应该显示裁切图片的选取
                            cropImage();
                        //    对应按钮变成 保存图片
                            $('#cropBtn').text('保存图片').attr('data-flag',true);
                        }
                    }
                });
            }

            //    裁切
            $('#cropBtn').click(function(){
                var flagCrop=$(this).attr('data-flag');
                if(flagCrop){
                //  //第二次点击提交 裁切好的页面
                    $('#cropForm').ajaxSubmit({
                        type:'post',
                        url:'/api/course/update/picture',
                        dataType:'json',
                        data:{cs_id:csId},
                        success:function(data){
                            console.log(data);
                            if(data.code==200){
                                if(flag){//编辑页
                                    location.href='/course/lesson?cs_id='+data.result.cs_id+'&flag=1';
                                }else{
                                    location.href='/course/lesson?cs_id='+data.result.cs_id;
                                }
                            }
                        }
                    });
                }else{//第一次点击按钮，显示保存图片
                    $(this).text('保存图片').attr('data-flag',true);
                    cropImage();
                }



            });
            function cropImage(){
                $('.thumb').html('');//隐藏其已有元素
                 $(".preview img").Jcrop({//用img变量不行！！！
                     aspectRatio:2,//设置选取等比例2:1缩放，因为在放缩略图的元素宽高时2:1尺寸
                     boxWidth: 400//设置图片盒子的最大宽度
                 },function(){
                     //销毁当前实例
                     nowCrop&&nowCrop.destory();
                     nowCrop=this;

                     this.initComponent('Thumbnailer',{width:240,height:120,mythumb:'.thumb'});
                     //根据图片的宽度来设置默认选取的大小
                     // console.log(this);
                     var width=this.ui.stage.width;//图片的宽度
                     var height=this.ui.stage.height;
                     var w=width;
                     var h=width/2;
                     var x=0;
                     var y=(height-h)/2;
                     //    创建一个选区，并设置默认大小
                     this.newSelection();
                     this.setSelect([x,y,w,h]);
                 });
            }

            //    监控选区的变化
            $(".preview img").parent().on('cropstart cropmove cropend',function(e,s,c){//用第三个参数，若选区移动，就会记录移动的坐标和宽高,将数据存储到form隐藏表单中，以便提交
                console.log(c);
               var input=$('#cropForm').find('input');
                input.eq(0).val(c.x);
                input.eq(1).val(c.y);
                input.eq(2).val(c.w);
                input.eq(3).val(c.h);
            })
        }
    })
});