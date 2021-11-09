import axios from 'axios';
import baseURLConfig from './config-baseURL';
import {Message} from 'element-ui'

console.log(baseURLConfig)

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = baseURLConfig.baseURL
// 跨域加 cookie 保持登录状态
axios.defaults.withCredentials = true

export default function request(url, type = 'GET', data = {}){
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
      validateStatus(status){
        return (status >= 200 && status < 300) || status === 400
      }
    }
    if(type.toLowerCase() === 'get'){
      option.parmas = data
    }else{
      option.data = data
    }
    axios(option).then(res => {
      if(res.status === 200) {
        resolve(res.data)
      }else {
        Message.error(res.data.msg)
        reject(res.data)
      }
    }).catch(err => {
      Message.error(res.data.msg)
      reject({msg: '网络异常'})
    })
  })
}
