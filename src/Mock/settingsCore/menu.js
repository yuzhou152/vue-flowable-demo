import Mock from 'mockjs'
Mock.mock('/sysMenus/getSourceTreeNode', 'get', () => {
  return `{
    "code": "0",
    "data": [
        {
        "id": 2,
        "name": "业务管理",
        "type": "cd",
        "children": [
            {
                "id": 14,
                "name": "非商标注册业务",
                "parentId": 2,
                "type": "cd",
                "children": [
                    {
                    "id": 1,
                    "name": "尊享商标注册",
                    "parentId": 14,
                    "type": "cp"
                    }
                ]
            }
        ]
      }],
    "message": "成功！",
    "success": true
}`
})
Mock.mock('/sysPost/department', 'get', () => {
  return `{
    "code": "0",
    "data": [
        {
  "id": "1",
  "label": "北京知果科技有限公司",
  "type": "1",
  "children": [
  {
    "id": "01",
    "parentId": "1",
    "label":"总裁办",
    "type":"1",
    "children": [
      {
        "id": "0001",
        "label": "陈妮",
        "type": "2"
      },{
        "id": "0002",
        "label": "陈雷",
        "type": "2"
      },{
        "id": "0003",
        "label": "刘思思",
        "type": "2"
      },{
        "id": "0004",
        "label": "万贵龙",
        "type": "2"
      }
    ]
  },{
    "id": "02",
    "parentId": "1",
      "type":"1",
    "label":"顾问体系",
      "children": [
        {
          "id": "0011",
          "parentId": "04",
          "type": "1",
          "label":"顾问部"
        },{
          "id": "0022",
          "parentId": "04",
          "type": "1",
          "label":"渠道部"
        },{
          "id": "0023",
          "parentId": "04",
          "type": "1",
          "label":"研发部"
        },{
          "id": "0034",
          "parentId": "04",
          "type": "1",
          "label":"客服部"
        },{
          "id": "005",
          "parentId": "04",
          "type": "1",
          "label":"市场部"
        }
      ]
  },{
    "id": "03",
    "parentId": "1",
    "type":"1",
    "label":"业务服务体系",
      "children": [
        {
          "id": "01011",
          "parentId": "04",
          "type": "1",
          "label":"人力行政部"
        },{
          "id": "0102",
          "parentId": "04",
          "type": "1",
          "label":"财务部"
        },{
          "id": "0103",
          "parentId": "04",
          "type": "1",
          "label":"研发部"
        },{
          "id": "0104",
          "parentId": "04",
          "type": "1",
          "label":"客服部"
        },{
          "id": "0105",
          "parentId": "04",
          "type": "1",
          "label":"市场部"
        }
      ]
  },{
    "id": "04",
    "parentId": "1",
    "type":"1",
    "label":"支撑体系",
    "children": [
      {
        "id": "03201",
        "parentId": "04",
        "type": "1",
        "label":"人力行政部",
        "children": [
          {
            "id": "0201",
            "parentId": "04",
            "type": "1",
            "label":"人力行政部"
          },{
            "id": "0302",
            "parentId": "04",
            "type": "1",
            "label":"财务部"
          }]
      },{
        "id": "0402",
        "parentId": "04",
        "type": "1",
        "label":"财务部",
        "children": [
          {
            "id": "0401",
            "parentId": "04",
            "type": "1",
            "label":"人力行政部"
          }]
      },{
        "id": "003",
        "parentId": "04",
        "type": "1",
        "label":"研发部",
        "children": [
          {
            "id": "0601",
            "parentId": "04",
            "type": "1",
            "label":"人力行政部"
          },{
            "id": "0602",
            "parentId": "04",
            "type": "1",
            "label":"财务部"
          },{
            "id": "0603",
            "parentId": "04",
            "type": "1",
            "label":"研发部"
          },{
            "id": "0604",
            "parentId": "04",
            "type": "1",
            "label":"客服部"
          }]
      },{
        "id": "06304",
        "parentId": "04",
        "type": "1",
        "label":"客服部",
        "children": [
          {
            "id": "0601",
            "parentId": "04",
            "type": "1",
            "label":"人力行政部"
          },{
            "id": "0602",
            "parentId": "04",
            "type": "1",
            "label":"财务部"
          },{
            "id": "0703",
            "parentId": "04",
            "type": "1",
            "label":"研发部"
          }
        ]
      },{
        "id": "0805",
        "parentId": "04",
        "type": "1",
        "label":"市场部"
      }
    ]
  }
]
}
      ],
    "message": "成功！",
    "success": true
}`
})
