/*
* @Author: ASD
* @Date:   2016-07-30 20:25:48
* @Last Modified by:   ASD
* @Last Modified time: 2016-07-30 21:09:23
*/

'use strict';

(function  (window,document,undefine) {
	var jsonp = function  (url,data,callback) {
		//定义一个回调函数名的后缀 为了防止出现重复的函数名 这里
		//使用了随机数的方式
		var fnSuffix = Math.random().toString().replace(".","");
		//前缀加上后缀就是回调函数名
		var cbFuncName = "my_jsonp_cb_" + fnSuffix;
		//将回调函数放在window对象下，使其成为window对象的一个属性
		window[cbFuncName] = callback;
		//queryString代表的是url后面的由参数组成的字符串 以?开始
		var queryString = url.indexOf("?") == -1 ? "?" : "&";
		//将传进来的参数遍历 拼接成字符串
		for(var key in data){
			queryString += key + "=" + data[key] + "&"; 
		}
		//将回调函数名拼接到queryString上面
		queryString += 'callback=' + cbFuncName;
		//创建一个script标签并追加到页面上
		var scriptElement = document.createElement("script");
		scriptElement.src = url + queryString;
		document.body.appendChild('scriptElement');
	}

	window.$jsonp = jsonp;
})(window,document);