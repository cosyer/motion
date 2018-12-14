import request from "../utils/request";
import config from "../utils/config";
import qs from "qs";

//获取用户列表
export async function getUserList(params) {
  return request(config.host + "/userManage/getUserList", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

//关键字查询
export async function searchByKey(params) {
  return request(config.host + "/userManage/searchByKey", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

//修改用户信息
export async function updateUser(params) {
  return request(config.host + "/userManage/updateUser", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

//删除用户
export async function deleteUser(params) {
  return request(config.host + "/userManage/deleteUser", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

//用户角色信息
export async function getUserRole(params) {
  return request(config.host + "/roleManage/getUserRole", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

//增加用户角色
export async function addUserRole(params) {
  return request(config.host + "/roleManage/addUserRole", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}
