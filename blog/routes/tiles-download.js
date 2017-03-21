/**
 * 百度切片下载
 * @authors Kerry W (wangxuan@eastcom-sw.com)
 * @date    2016-11-22 09:58:33
 * @version $Id$
 */
 var fs = require('fs');
 //百度地图切片下载
 function downloadTiles(x,y,z){
 	const download = require('download');
 	const url = 'http://online0.map.bdimg.com/tile/?qt=tile&x=' + x + '&y=' + y+ '&z=' + z + '&styles=pl';
 	mkdirSync(z + '/' + x);
 	download(url).then((data) => {
 		const fileUrl = z + '/' + x + '/' + y + '.jpg';
 	    console.log('download ' + fileUrl + ' success');
 	    fs.writeFileSync(fileUrl, data);
 	});
 }
 //创建文件夹,允许重复创建
 function mkdirSync(url,mode,cb){
 	var arr = url.split("/");
 	mode = mode || 0755;
 	cb = cb || function(){};
 	if(arr[0]==="."){
 		arr.shift();
 	}
 	if(arr[0] == ".."){
 		arr.splice(0,2,arr[0]+"/"+arr[1])
 	}
 	function inner(cur){
 		if(!fs.existsSync(cur)){
 			fs.mkdirSync(cur, mode);
 		}
 		if(arr.length){
 			inner(cur + "/"+arr.shift());
 		}else{
 			cb();
 		}
 	}
 	arr.length && inner(arr.shift());
 }
 downloadTiles(1645,436,13);
