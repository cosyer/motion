export default function jqAjax(payload, test) {
  $.ajax({
    async: false,
    url: "http://www.runoob.com/try/ajax/jsonp.php",
    type: "POST",
    dataType: "jsonp",
    jsonp: "callback",
    processData: false, // 告诉jQuery不要去处理发送的数据
    contentType: false, // 告诉jQuery不要去设置Content-Type请求头
    success: function(data) {
      console.log(data);
      test(data);
    },
    error: function(data) {
      console.log(data);
    }
  });
}
