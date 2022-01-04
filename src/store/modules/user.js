import {getAccountInfoFromWeb} from "@/utils/bridges";

const actions = {
    saveUserInfo(context, userInfo) {
        console.log("saveUserInfo----->", userInfo.userAccount, userInfo.userPassword)
        context.commit("SAVE_USER_INFO", userInfo)
    },
    getAccountInfo() {
        return new Promise(resolve => {
            //从session中获取数据
            getAccountInfoFromWeb()
                .then(data => {
                    if (data.userAccount && data.userPassword) {
                        resolve(data)
                    } else {
                        resolve({})
                    }
                })
                .catch(error => {
                    console.log("getAccountInfoFromWeb---error", error)
                    resolve({})
                })
        })
    }
}

const mutations = {
    SAVE_USER_INFO(state, userInfo) {
        state.userInfo.userAccount = userInfo.userAccount
        state.userInfo.userPassword = userInfo.userPassword
    }
}

const state = {
    userInfo: {
        userAccount: '',
        userPassword: '',
        accessToken: ''
    }
}

export default {
    namespaced: true,//开启命名空间,调用方法时，需要添加命名 例如"user/getAccountInfo"
    actions,
    mutations,
    state
}