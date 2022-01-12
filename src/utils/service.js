import axios from "axios";
import Urls from "@/utils/api";

//查询用户信息
export const queryUserInfo = async (data = {}) => {
    return axios.post(Urls.queryUserInfo, data)
}
//添加app
export const addApp = async (data = {}) => {
    return axios.post(Urls.addApp, data)
}
//查询所有的应用列表
export const queryAllApps = async (data = {}) => {
    return axios.post(Urls.queryAllApps, data)
}
//根据id查询应用基本信息
export const queryAppById = async (data = {}) => {
    return axios.post(Urls.queryAppById, data)
}
//根据Id修改应用其他信息
export const updateAppById = async (data = {}) => {
    return axios.post(Urls.updateAppById, data)
}
//上传app
export const fileUpload = async (data = {}, config = {}) => {
    return axios.post(Urls.fileUpload, data, config)
}
//查询app列表
export const  queryAppListByAppId = async (data = {}) => {
    return axios.post(Urls.queryAppListByAppId, data)
}