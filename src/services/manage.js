import request from "../utils/request";
import config from "../utils/config";
import qs from "qs";

//影评信息
export async function getComment(params) {
  return request(config.host + "/manage/getComment", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}
//书籍信息
export async function getBook(params) {
  return request(config.host + "/manage/getBook", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}
//语录信息
export async function getQuotation(params) {
  return request(config.host + "/manage/getQuotation", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}
//帐户信息
export async function getAccount(params) {
  return request(config.host + "/manage/getAccount", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}
//添加影评
export async function addComment(params) {
  return request(config.host + "/manage/addComment", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}
//删除影评
export async function deleteComment(params) {
  return request(config.host + "/manage/deleteComment", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}
//搜索影评
export async function searchComment(params) {
  return request(config.host + "/manage/searchComment", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}
//编辑影评
export async function editComment(params) {
  return request(config.host + "/manage/editComment", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}
