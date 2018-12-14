import "./index.html";
import "./index.less";
import dva from "dva";

// 加载动画
$(window).load(function() {
  $("#loading").fadeOut(500);
  // $("#loading").delay(1000).fadeOut(500);
});

// 1. Initialize
const app = dva();

// 2. Plugins
//app.use({});

// 3. Model
app.model(require("./models/appModel"));
app.model(require("./models/indexPage"));
app.model(require("./models/game"));
app.model(require("./models/manage"));
app.model(require("./models/upload"));
app.model(require("./models/login"));

//cms
app.model(require("./models/userManage"));
app.model(require("./models/menuManage"));
app.model(require("./models/roleManage"));
app.model(require("./models/picture"));
app.model(require("./models/wisedoctor"));
// 4. Router
app.router(require("./router"));

// 5. Start
app.start("#root");
