import { request, config } from "../utils";
import qs from "qs";

//菜单列表
export async function queryMenuList(params) {
  return request(config.host + "/menuManage/getMenuList", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}
// 修改菜单显示状态
export async function updateMenuState(params) {
  return request(config.host + "/menuManage/updateMenuState", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}
// 删除菜单
export async function deleteMenu(params) {
  return request(config.host + "/menuManage/deleteMenu", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

// 修改菜单
export async function updateMenu(params) {
  return request(config.host + "/menuManage/updateMenu", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

// 添加菜单
export async function addMenu(params) {
  return request(config.host + "/menuManage/addMenu", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}
