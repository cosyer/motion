module.exports = [
  {
    key: "dashboard",
    name: "仪表盘",
    icon: "laptop"
  },
  {
    key: "user",
    name: "用户中心",
    icon: "user",
    child: [
      {
        key: "userManage",
        name: "用户管理"
      },
      {
        key: "menuManage",
        name: "菜单管理"
      },
      {
        key: "roleManage",
        name: "角色管理"
      }
    ]
  },
  {
    key: "app",
    name: "应用中心",
    icon: "appstore",
    child: [
      {
        key: "microapp",
        name: "微应用"
      },
      {
        key: "wisedoctor",
        name: "慧医"
      },
      {
        key: "picture",
        name: "美图"
      },
      {
        key: "handsontable",
        name: "handsontable"
      }
    ]
  },
  {
    key: "navigation",
    name: "测试导航",
    icon: "setting",
    child: [
      {
        key: "charts",
        name: "图表"
      },
      {
        key: "navigation2",
        name: "二级导航2",
        child: [
          {
            key: "navigation21",
            name: "三级导航1"
          },
          {
            key: "navigation22",
            name: "三级导航2"
          }
        ]
      }
    ]
  }
];
