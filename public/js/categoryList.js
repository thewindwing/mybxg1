define(['jquery','template','util'],function($,template,util){
    util.setMenu('/category/list');
    $.ajax({
        type:'get',
        url:'/api/category',
        dataType:'json',
        success:function(data){
            console.log(data);
            var html=template('categoryTpl',{list:data.result});
            $('#categoryList').html(html);
        }
    })
});