/*
  为什么要二次封装数据请求：
  1. 因为我们数据请求的时候需要给请求的域名或者叫 ip 地址，该地址可能后期会发生改变
     那么如果不封装会导致我们需要手动的修改所有的请求地址
  2. 因为请求 get 和 post 或者其他请求，传参的方式不统一，所以我们用的时候可能会产生
    用错用混的情况，所以我们封装一套可以使用统一传参方式
*/
import axios from 'axios'

// 封装 baseUrl
// 开发环境(写代码的阶段)       生产环境(代码部署之后)       测试环境(代码写好后还没有部署)
// development                production                  production
// isDev 为真的时候是 开发环境，为假的时候是生产环境或者测试环境
const isDev = process.env.NODE_ENV === 'development'
// baseURL: isDev ? '写的是后端程序员给的地址' : '服务器的地址'
const request = axios.create({
  // baseURL: isDev ? 'http://121.89.205.189:3000/admin' : 'http://121.89.205.189:3000/admin',
  // 如果数据是 mock 的那么这里的 baseURL 改为 /
  baseURL: '/',
  // 配置请求超时的时间
  timeout: 60000
})



// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 添加 token
  // 1. 先在存储中获取到 token
  const token = localStorage.getItem('token') || ''

  // 2. 在头部设置 token
  config.headers.token = token
  // console.log('11111111111111111111', config, token);

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});


// 封装各种数据请求的方法
export default function ajax (config) {
  // 1. 先获取到请求的一些必要参数
  const { url = '', method = 'GET', data = {}, headers = {} } = config

  // 2. 判断我们请求的类型
  // get  GET Get gEt,post POST  Post

  switch (method.toUpperCase()) {
    case 'GET':
      return request.get(url, { params: data })

    case 'POST':
      // 1. 表单提交的数据
      if (headers['content-type'] == 'application/x-www-form-url-encoded') {
        // 转换参数类型，格式化数据
        const obj = new URLSearchParams()
        for (const key in data) {
          obj.append(key, data[key])
        }
        return request.post(url, obj, { headers })
      }
      // 2. 文件数据
      if (headers['content-type'] == 'multipart/form-data') {
        // 转换参数类型，格式化数据
        const obj = new FormData()
        for (const key in data) {
          obj.append(key, data[key])
        }
        return request.post(url, obj, { headers })
      }
      // 3. json 数据
      return request.post(url, data)

    case 'PUT':
      // 修改数据 --- 数据的更新
      return request.put(url, data)

    case 'DELETE':
      // 删除数据
      return request.delete(url, { data })
    case 'PATCH':
      // 更新局部资源
      return request.patch(url, data)
    default:
      // 如果前面都不是的情况下
      return request.request(config)
  }


}
