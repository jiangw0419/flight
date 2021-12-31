import {createStore} from "vuex";
import * as modules from "./modules"
import createPersistedState from "vuex-persistedstate";


export default createStore({
    actions: {},
    mutations: {},
    modules,
    plugins: [
        createPersistedState({
            key: location.origin + location.pathname,
            paths: ['user'],
            storage: window.sessionStorage,
        })],
})

