define(['jquery','template','bootstrap'],function($,template){

       $.ajax({
           type:'get',
           url:'/api/teacher',
           dataType:'json',
           success:function(data){
               console.log(data,1);
               if(data.code==200){
                   $('#teacherInfo').html(template('tpl',{list:data.result}));
               }

           //    启用和注销功能
               $('.eod').click(function(){
                    var that=$(this);
                   var td=$(this).closest('td');//查找this最近的父元素td
                  var tcId=td.attr('data-tcId');
                   var tcStatus=td.attr('data-status');
                   $.ajax({
                       type:'post',
                       url:'/api/teacher/handle',
                       data:{tc_id:tcId,tc_status:tcStatus},
                       dataType:'json',
                       success:function(data){
                           console.log(data);
                            if(data.code==200){

                                td.attr('data-status',data.result.tc_status);
                                if(data.result.tc_status==0){
                                 that.html('注销');
                                }else{
                                    that.html('启用');
                                }
                            }

                       }
                   })
               });


           //   查看讲师信息
               $('.preview').click(function(){
                   var td=$(this).closest('td');
                   var tcId=td.attr('data-tcId');
                   $.ajax({
                       type:'get',
                       url:'/api/teacher/view',
                       data:{'tc_id':tcId},
                       dataType:'json',
                       success:function(data){
                           console.log(data);
                           if(data.code==200){
                               $('#modalInfo').html(template('modalTpl',data.result));
                               // data-toggle="modal"由类样式定义模态框显示改成JS自定义显示
                               $('#teacherModal').modal();
                           }
                       }
                   })
               });
           }
       })

});