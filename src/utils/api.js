const Urls = {
    //user
    queryUserInfo: "/serverProxy/user/queryUserByParams",
    //app基本信息
    addApp: "/serverProxy/app/addApp",
    queryAllApps: "/serverProxy/app/queryAllApps",
    queryAppById: "/serverProxy/app/queryAppById",
    updateAppById: "/serverProxy/app/updateAppById",
    //文件上传
    fileUpload: "/serverProxy/file/fileUpload",
    //app列表相关操作
    queryAppListByAppId: "/serverProxy/appList/queryAppListByAppId",
    queryAppDetailById: "/serverProxy/appList/queryAppDetailById",
    updateAppDescById: "/serverProxy/appList/updateAppDescById",//更新版本描述
    queryAppListByPlatform: "/serverProxy/appList/queryAppListByPlatform",
}

export default Urls
