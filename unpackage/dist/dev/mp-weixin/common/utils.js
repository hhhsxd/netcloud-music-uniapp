"use strict";
const formateTime = (time) => {
  let formater = new Date(time);
  return formater.getFullYear() + "年" + (formater.getMonth() + 1) + "月" + formater.getDay() + "日";
};
const formateCount = (count) => {
  if (count > 1e4 && count < 1e8) {
    return (count /= 1e3).toFixed(1) + "万";
  }
  if (count > 1e8) {
    return (count /= 1e8).toFixed(1) + "亿";
  }
  return count;
};
exports.formateCount = formateCount;
exports.formateTime = formateTime;
