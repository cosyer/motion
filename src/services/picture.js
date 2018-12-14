import request from "../utils/request";
import config from "../utils/config";
import qs from "qs";

//图片列表
export async function getPictureList(params) {
  return request(config.host + "/picture/getPictureList", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

//图片列表(id)
export async function getPictureListById(params) {
  return request(config.host + "/picture/getPictureListById", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

// handson数据
export async function getData(params) {
  return request(config.host + "/handsontable/getData", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

// 百度天气
export async function getWeather(params) {
  return request(config.host + "/wisedoctor/getWeather", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}
