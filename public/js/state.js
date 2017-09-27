define(['jquery'],function($){
   //遮罩
 $(document).ajaxStart(function(){
     $('.overlay').show();// 显示遮罩层
 }).ajaxStop(function(){
     setTimeout(function(){//等会再隐藏
         $('.overlay').hide();
     },500);
 })
});