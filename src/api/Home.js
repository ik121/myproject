import ajax from '../util'
// 导入 mock 文件
import '../mock/Home'
// 封装一个获取首页列表数据的接口
export function getProList () {
  return ajax({
    url: '/getProListData',
  })
}
export function login(data) {
  return ajax({
    url: '/login',
    method:'post',
    data
  });
}