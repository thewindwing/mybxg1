define(['jquery','template'],function($,template){

       $.ajax({
           type:'get',
           url:'/api/teacher',
           success:function(data){
               console.log(data,1);
               $('#teacherInfo').html(template('tpl',data));
           }
       })

});