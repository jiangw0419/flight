import dayjs from "dayjs";

const platformMap = {
    "1": "Android",
    "2": "iOS",
    "-1": "未知"
}

export const getPlatform = (type) => platformMap[type]

export const getDate = (str) => {
    return dayjs(str).format("YYYY-MM-DD HH:mm:ss")
}