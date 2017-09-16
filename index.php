<?php
header('content-type:text/html;charset=utf8');


//默认目录名称
$dir='main';
//默认文件名称
$filename='index';

//处理url中的路径
if(array_key_exists('PATH_INFO',$_SERVER)){
	//路径存在'PATH_INFO'
	//请求路径
	$path=$_SERVER['PATH_INFO']; //   /main/login
	//截取字符串
	$str=substr($path,1); // main/login
	//路径分隔 分隔字符串
	$ret=explode('/',$str); 
	//
	if(count($ret)==2){
		//两层路径，则覆盖默认路径
		$dir=$ret[0];
		//覆盖默认文件名称
		$filename=$ret[1];
	}else{
		//其他情况统一跳到登录页
		$filename='login';
	}
}
//嵌入子页面
include('./views/'.$dir.'/'.$filename.'.html');
?>