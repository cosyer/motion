import request from "../utils/request";
import config from "../utils/config";
import qs from "qs";

//项目列表
export async function getProjectList(params) {
  return request(config.host + "/project/getProjectList", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

//项目详细信息
export async function getProjectDetail(params) {
  return request(config.host + "/project/getProjectDetail", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}
