import {createStore} from "vuex";
import * as modules from "./modules"
import createPersistedState from "vuex-persistedstate";


export default createStore({
    actions: {},
    mutations: {},
    modules,
    plugins: [
        createPersistedState({
            key: location.origin + location.pathname + 'user',
            paths: ['user'],
            storage: window.sessionStorage,
        }),
        createPersistedState({
            key: location.origin + location.pathname + 'appInfo',
            paths: ['appInfo'],
            storage: window.sessionStorage,
        }),

    ],
})

