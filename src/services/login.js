import request from "../utils/request";
import config from "../utils/config";
import qs from "qs";

//判断登录
export async function isLogin(params) {
  return request(config.host + "/mystery/isLogin", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

//注销用户
export async function logout(params) {
  return request(config.host + "/mystery/logout", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

//注册用户
export async function register(params) {
  return request(config.host + "/mystery/register", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

//修改密码
export async function updatePassword(params) {
  return request(config.host + "/mystery/updatePassword", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

//判断用户名是否存在
export async function judgeUser(params) {
  return request(config.host + "/mystery/judgeUser", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

//忘记密码
export async function sendMail(params) {
  return request(config.host + "/mystery/sendMail", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

//getMenuByUserId
export async function getMenuByUserId(params) {
  return request(config.host + "/menuManage/getMenuByUserId", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}
