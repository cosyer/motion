const Ajax = require("robe-ajax");

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  var params = {
    url: url,
    method: options.method || "GET",
    data: options.data || {},
    dataType: "json"
  };
  return Ajax.ajax(params).done(data => {
    //console.log(data);
    return data;
  });
}
