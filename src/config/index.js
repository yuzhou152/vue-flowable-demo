const IpConfig = {
  develop: {
    flowableapi: 'http://localhost:8080/flowable-rest/service/'
    // uploadSetting: 'http://192.168.89.223:8081/files-web-rest/',
    // browseUrlSetting: 'http://192.168.89.223/getfile/',
    // ossFile: 'http://oss-staging.zhiguoguo.cn/fastdfs/',
    // adminCrm: 'http://192.168.89.215/',
    // adminProject: 'http://192.168.89.215/'
  },
  staging: {
    flowableapi: 'http://localhost:8080/flowable-rest/service/'
  },
  production: {
    flowableapi: 'http://localhost:8080/flowable-rest/service/'
  }
}

if (process.env.NODE_ENV === 'development') {
  module.exports.config = IpConfig.develop
// 编译环境
} else {
  // 测试环境
  if (process.env.type === 'staging') {
    module.exports.config = IpConfig.staging
    // 开发环境
  } else if (process.env.type === 'development') {
    module.exports.config = IpConfig.develop
    // 正式环境
  } else {
    module.exports.config = IpConfig.production
  }
}
