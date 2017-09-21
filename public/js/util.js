define(['jquery'],function($){
   return{
      // 获取url中的传输的id数据
      qs: function(key){
          var urlDate=location.search.substr(1);
          var val=null;
          //确保字符串数据存在------别忘了
          if(urlDate){
              var obj=urlDate.split('&');
              $.each(obj,function(i,item){
                 var item1=item.split('=');
                  if(item1[0]==key){
                      val=item1[1];
                      return false;
                  }
              });
          }
        return val;
      }
   } ;
});