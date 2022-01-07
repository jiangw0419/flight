import axios from "axios";
import Urls from "@/utils/api";

export const queryUserInfo = async (data = {}) => {
    return axios.post(Urls.queryUserInfo, data)
}