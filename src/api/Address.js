import ajax from '../util'
// 导入 mock 文件
import '../mock/Address'
// 封装一个获取小区列表数据的接口
export function getAddressList () {
  return ajax({
    url: '/address',
  })
}
