"use strict";
const common_vendor = require("./vendor.js");
const common_config = require("./config.js");
function topList() {
  return new Promise(function(resolve, reject) {
    common_vendor.index.request({
      url: `${common_config.baseUrl}/toplist/detail`,
      method: "GET",
      success: (res) => {
        res = res.data.list.slice(0, 4);
        resolve(res);
      }
    });
  });
}
function playList(listId) {
  return new Promise(function(resolve, reject) {
    common_vendor.index.request({
      url: `${common_config.baseUrl}/playlist/detail?id=${listId}`,
      method: "GET",
      success: (res) => {
        resolve(res);
      }
    });
  });
}
function songDetail(songId) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/song/detail?ids=${songId}`,
    method: "GET"
  });
}
function songUrl(songId) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/song/url/v1?id=${songId}&level=lossless`,
    method: "GET"
  });
}
function songLyric(songId) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/lyric?id=${songId}`,
    method: "GET"
  });
}
function songSimi(songId) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/simi/song?id=${songId}`,
    method: "GET"
  });
}
function songComment(songId) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/comment/music?id=${songId}`,
    method: "GET"
  });
}
function searchHot() {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/search/hot/detail`,
    method: "GET"
  });
}
function searchKey(keyWord) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/cloudsearch?keywords=${keyWord}`,
    method: "GET"
  });
}
function searchsuggest(keyword) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/search/suggest?keywords=${keyword}&type=mobile`,
    method: "GET"
  });
}
exports.playList = playList;
exports.searchHot = searchHot;
exports.searchKey = searchKey;
exports.searchsuggest = searchsuggest;
exports.songComment = songComment;
exports.songDetail = songDetail;
exports.songLyric = songLyric;
exports.songSimi = songSimi;
exports.songUrl = songUrl;
exports.topList = topList;
