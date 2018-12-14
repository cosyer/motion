import request from "../utils/request";
import config from "../utils/config";
import qs from "qs";

//图片列表
export async function getDrugList(params) {
  return request(config.host + "/wisedoctor/getDrugList", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

//图片列表(id)
export async function getDrugListById(params) {
  return request(config.host + "/wisedoctor/getDrugListById", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}
