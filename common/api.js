import {baseUrl} from './config.js'
export function topList(){
	return new Promise (function(resolve,reject){
		uni.request({
		url:`${baseUrl}/toplist/detail`,
		method:'GET',
		success:res=>{
			res=res.data.list.slice(0,4)
			resolve(res)
		}
	})
	} )
}

export function playList(listId){
	return new Promise (function(resolve,reject){
		 uni.request({
		url:`${baseUrl}/playlist/detail?id=${listId}`,
		method:"GET",
		success:res=>{
			resolve(res)
		}
		
	})
	})
	
}
export function songDetail(songId){
	return uni.request({
		url:`${baseUrl}/song/detail?ids=${songId}`,
		method:"GET"
	})
}
export function songUrl(songId){
	return uni.request({
		url:`${baseUrl}/song/url/v1?id=${songId}&level=lossless`,
		method:"GET"
	})
}
export function songLyric(songId){
	return uni.request({
		url:`${baseUrl}/lyric?id=${songId}`,
		method:"GET"
	})
}
export function songSimi(songId){
	return uni.request({
		url:`${baseUrl}/simi/song?id=${songId}`,
		method:"GET"
	})
}
export function songComment(songId){
	return uni.request({
		url:`${baseUrl}/comment/music?id=${songId}`,
		method:"GET"
	})
}
export function searchHot(){
	return uni.request({
		url:`${baseUrl}/search/hot/detail`,
		method:"GET"
	})
}
export function searchKey(keyWord){
	return uni.request({
		url:`${baseUrl}/cloudsearch?keywords=${keyWord}`,
		method:"GET"
	})
}
export function searchsuggest(keyword){
	return uni.request({
		url:`${baseUrl}/search/suggest?keywords=${keyword}&type=mobile`,
		method:"GET"
	})
}