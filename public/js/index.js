define(['jquery','util','echarts'],function($,util,echarts){
    util.setMenu(location.pathname);
//   初始化eacharts
    var myChart=echarts.init($('#main').get(0));//必须是DOM元素
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["HTML","CSS","Mobile","Angular","vue","Nodejs"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
});