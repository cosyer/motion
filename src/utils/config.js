var debug = false;

var config = {
  host: "https://cloud.mydearest.cn"
  //host: 'http://111.231.121.29:8080/'
};

if (debug) {
  config.host = "http://localhost:8080";
}

module.exports = config;
