import ajax from '../util';
// 导入 mock 文件
import '../mock/Property/Notice';
import '../mock/Property/Complaint';
// 封装一个获取首页列表数据的接口
export function getNoticeList(data) {
  return ajax({
    url: '/getNotice',
    method: 'post',
    data,
  });
}
// 封装一个添加小区列表数据的接口
export function addNoticeList(data) {
  return ajax({
    url: '/addNotice',
    method: 'post',
    data,
  });
}
// 封装一个修改小区列表数据的接口
export function updateNoticeList(data) {
  return ajax({
    url: '/updateNotice',
    method: 'post',
    data,
  });
}
// 封装一个搜索小区列表数据的接口
export function searchNoticeList(data) {
  return ajax({
    url: '/searchNotice',
    method: 'post',
    data,
  });
}
// 封装一个删除小区列表数据的接口
export function deleteNoticeList(data) {
  return ajax({
    url: '/deleteNotice',
    method: 'post',
    data,
  });
}
export function getComplaintList(data) {
  return ajax({
    url: '/getComplaint',
    method: 'post',
    data,
  });
}
// 封装一个添加小区列表数据的接口
export function addComplaintList(data) {
  return ajax({
    url: '/addComplaint',
    method: 'post',
    data,
  });
}
// 封装一个修改小区列表数据的接口
export function updateComplaintList(data) {
  return ajax({
    url: '/updateComplaint',
    method: 'post',
    data,
  });
}
// 封装一个搜索小区列表数据的接口
export function searchComplaintList(data) {
  return ajax({
    url: '/searchComplaint',
    method: 'post',
    data,
  });
}
// 封装一个删除小区列表数据的接口
export function deleteComplaintList(data) {
  return ajax({
    url: '/deleteComplaint',
    method: 'post',
    data,
  });
}
export function acceptanceList(data) {
  return ajax({
    url: '/acceptance',
    method: 'post',
    data,
  });
}
