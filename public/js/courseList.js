define(['jquery','template','util'],function($,template,util){
    util.setMenu(location.pathname);
    $.ajax({
        type:'get',
        url:'/api/course',
        dataType:'json',
        success:function(data){
            console.log(data);
            $('#courseInfo').html(template('courseTpl',{list:data.result}));
        }
    });
});