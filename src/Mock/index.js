import Mock from 'mockjs'
import './settingsCore/menu'
Mock.mock('/insuProductType/getAllInsuProductTypeList', 'get', () => {
  return `{
    "code": "0",
    "data": [
        {
            "createId": 1,
            "createTime": "2018-03-13 17:09:03",
            "del": 1,
            "id": 1,
            "info": "测试使用",
            "isLeaf": 2,
            "level": 1,
            "modifyTime": "2018-03-13 17:10:01",
            "sort": 1,
            "typecode": "csbx",
            "typename": "测试保险"
        }
    ],
    "message": "成功！",
    "success": true
}
`
})
