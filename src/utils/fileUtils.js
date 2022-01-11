const ApkParser = require('app-info-parser/src/apk')
const IpaParser = require('app-info-parser/src/ipa')

export const isIpa = (file) => {
    return file && file.name && file.name.indexOf(".") > 0 && file.name.split(".")[1].toLowerCase() === "ipa"
}

export const isApk = (file) => {
    return file && file.name && file.name.indexOf(".") > 0 && file.name.split(".")[1].toLowerCase() === "apk"
}

export const parser = (file) => {
    if (isApk(file)) {
        return new ApkParser(file)
            .parse()
            .then(result => {
                console.log("------apk===>>>", result)
                return result
            }).catch(err => {
                console.log("------apk=err==>>>", err)
                return null
            })
    } else if (isIpa(file)) {
        return new IpaParser(file)
            .parse()
            .then(result => {
                console.log("------ipa===>>>", result)
                return result
            }).catch(err => {
                console.log("------ipa=err==>>>", err)
                return null
            })
    } else {
        console.log("不支持的文件格式")
        return null
    }
}
