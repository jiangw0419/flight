import {message} from "ant-design-vue";
import Urls from "@/utils/api";

const handleAxiosConfig = (axios) => {
    axios.defaults.timeout = 10000
    axios.defaults.withCredentials = true
    axios.defaults.headers.post['Content-Type'] = 'application/json'

    axios.interceptors.request.use((config) => {
            console.log('request config: ', config.params, config.data)
            //隐藏loading等等
            const _config = {...config}
            let params = config.params || {}
            const headers = config.headers
            if (config.url.includes(Urls.fileUpload)) {
                headers['Content-Type'] = 'multipart/form-data'
            }
            return {..._config, params, headers}
        },
        (error) => {
            // 对请求错误做些什么
            //隐藏loading等等
            // store.dispatch('hideLoading')
            return Promise.reject(error)
        })

    axios.interceptors.response.use(response => {
            console.log('response: ', response.data)
            //隐藏loading
            const {status, data: {data, error_no, error_info} = {}} = response
            if (200 === status && "0" === error_no) {
                return data || response
            } else {
                console.log("error_info------", error_info)
                message.error(error_info)
                return {error_no, error_info}
                // return Promise.reject({error_no,error_info})
            }
        },
        error => {
            // 对请求错误做些什么
            //隐藏loading
            return Promise.reject(error)
        })
}

export default handleAxiosConfig