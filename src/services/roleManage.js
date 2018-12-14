import { request, config } from "../utils";
import qs from "qs";

export async function getRoleList(params) {
  return request(config.host + "/roleManage/getRoleList", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

export async function queryMenu(params) {
  return request(config.host + "/menuManage/getMenuByRoleId", {
    method: "get",
    body: qs.stringify(params),
    data: params
  });
}

export async function add(params) {
  return request(config.host + "/roleManage/addRole", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

/*查询树结构*/
export async function getMenuByRoleId(params) {
  return request(config.host + "/menuManage/getMenuByRoleId", {
    method: "get",
    body: qs.stringify(params),
    data: params
  });
}

/* 添加角色菜单表数据 */
export async function addMenuToRole(params) {
  return request(config.host + "/roleManage/addMenuToRole", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

export async function updateRole(params) {
  return request(config.host + "/roleManage/updateRole", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

//条件查询
export async function searchByKeyword(params) {
  return request(config.host + "/roleManage/searchByKeyword", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}

//隐藏用户
export async function deleteRole(params) {
  return request(config.host + "/roleManage/deleteRole", {
    method: "post",
    body: qs.stringify(params),
    data: params
  });
}
