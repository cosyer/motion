import request from "../utils/request";

export async function queryExample(params) {
  return request("/api/example", {
    method: "get",
    body: JSON.stringify(params),
    data: params
  });
}
