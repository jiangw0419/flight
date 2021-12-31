/* eslint-disable */
import store from "@/store";
import {debounce} from "ant-design-vue/lib/vc-table/src/utils";

/**
 * @param url
 */
export const openNewView = debounce(function (url, options = {}) {
    navigateTo(url);
}, 500, true)


function navigateTo(url, params = {}) {
    const closeCount = getLocationParam('closeCount', url)
    const shouldReplace = Number(closeCount) >= 1
    if (url.indexOf('www.') === 0) {
        if (shouldReplace) {
            window.location.replace('http://' + url)
        } else {
            window.location.href = 'http://' + url;
        }
    } else if (url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0) {
        if (shouldReplace) {
            window.location.replace(url)
        } else {
            window.location.href = url;
        }
    } else {
        if (shouldReplace) {
            window.vm.$router.replace(url);
        } else {
            window.vm.$router.push(url);
        }
    }
}

//获取url中的参数
const getLocationParam = (key, url) => {
    let href = url || location.href
    let value = ''
    const index = href.indexOf('?')
    if (index !== -1) {
        href = href.substr(index + 1)
        const arr = href.split('&')
        for (let i = 0; i < arr.length; i++) {
            const param = arr[i].split('=')
            if (param && param[0] === key && param[1]) {
                value = param[1]
                break
            }
        }
    }
    return value
}


//判断账号是否登录了
export const isAccountLogin = async () => {
    const accountInfo = await store.dispatch('user/getAccountInfo');
    console.log("isAccountLogin--------->", accountInfo)
    return !!(accountInfo && accountInfo.userAccount)
}

//从web里面获取账户信息
export function getAccountInfoFromWeb() {
    return new Promise((resolve) => {
        //user在state的持久化关键字----->>>createPersistedState
        const user = store.state.user
        console.log("getAccountInfoFromWeb---user->", user)
        resolve({
            userAccount: user.userInfo.userAccount,
            userPassword: user.userInfo.userPassword,
            accessToken: user.userInfo.accessToken,
        });
    })
}