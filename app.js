var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var pageUrl = 'https://movie.douban.com/top250';
var fileUrl = './data.json';

function getData(pageUrl){
	request({
		url: pageUrl,
		method: 'GET'
	},function(err,req,body){
		var data='';
		var $ = cheerio.load(body);
		var li = $("li");
		for(var i=0;i<li.length;i++){
			var $title = $(li[i]).find(".title");
			var titleStr = $($title).text();
			data = data+"\n"+titleStr;
		}
		fs.appendFile(fileUrl,data,function(err){
			if(err){
				console.log(err);
			}else{
				console.log("read data successfully");
			}
		})
	})
}
getData(pageUrl);