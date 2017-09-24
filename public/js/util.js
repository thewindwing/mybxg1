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
      },
       setMenu:function(path){//根据跳转页面的a的url和跳转地址栏的URL进行匹配
           $('.navs ul a[href="'+path+'"]').addClass('active').closest('ul').show();//当点击a时，对应的背景高亮，且若是下拉列表时，其父元素处于展开状态
       }
   } ;
});