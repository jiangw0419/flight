import {getAccountInfoFromWeb} from "@/utils/bridges";

//异步操作
const actions = {
    logout(context) {
        return new Promise(resolve => {
            context.commit("LOGOUT")
            resolve(true)
        })
    },

    saveUserInfo(context, userInfo) {
        console.log("saveUserInfo----->", userInfo.userAccount)
        context.commit("SAVE_USER_INFO", userInfo)
    },
    getAccountInfo() {
        return new Promise(resolve => {
            //从session中获取数据
            getAccountInfoFromWeb()
                .then(data => {
                    if (data.userAccount) {
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

//同步操作
const mutations = {
    SAVE_USER_INFO(state, userInfo) {
        state.userInfo.userAccount = userInfo.userAccount
    },
    LOGOUT(state) {
        state.userInfo = {}
        console.log("-------LOGOUT-->", state.userInfo)
    }
}

const state = {
    userInfo: {
        userAccount: '',
        accessToken: ''
    }
}

export default {
    namespaced: true,//开启命名空间,调用方法时，需要添加命名 例如"user/getAccountInfo"
    actions,
    mutations,
    state
}