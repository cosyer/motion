import request from "../utils/request";
import config from "../utils/config";
import qs from "qs";

//获取文件列表
export async function getFileList(params) {
  return request(config.host + "/upload/getFileList", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

//删除文件
export async function deleteFile(params) {
  return request(config.host + "/upload/deleteFile", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

//获取评论信息
export async function getComment(params) {
  return request(config.host + "/upload/getComment", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

//保存评论信息
export async function saveComment(params) {
  return request(config.host + "/upload/saveComment", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}
