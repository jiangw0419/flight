const actions = {
    saveAppInfo(context, appInfo) {
        console.log("saveAppInfo----->", appInfo)
        context.commit('SAVE_APP_INFO', appInfo)
    },

}

const mutations = {
    SAVE_APP_INFO(state, appInfo) {
        console.log("SAVE_APP_INFO----->", appInfo)
        state.appInfos.push(appInfo)
    },
}

const state = {
    appInfos: [
        // {
        //     appId:''
        //     appName:'',
        //     appDesc:'',
        //     packageName:'',
        //     bundId:''
        // }
    ],

}

export default {
    namespaced: true,//开启命名空间,调用方法时，需要添加命名 例如"appInfo/getAccountInfo"
    actions,
    mutations,
    state
}
