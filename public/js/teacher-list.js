define(['jquery'],function($){
   $.ajax({
       type:'get',
       url:'/api/teacher',
       success:function(data){
           console.log(data);
       }
   }) ;
});