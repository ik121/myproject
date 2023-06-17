import ajax from '../util';
// 导入 mock 文件
import '../mock/IDC/Community';
import '../mock/IDC/Car';
import '../mock/IDC/Building';
import '../mock/IDC/Visiter';
import '../mock/IDC/Advertisement';
import '../mock/IDC/Vehicle';
import '../mock/IDC/Owner';
// 封装一个获取小区列表数据的接口
export function getCommunityList() {
  return ajax({
    url: '/getCommunity',
  });
}
// 封装一个添加小区列表数据的接口
export function addCommunityList(data) {
  return ajax({
    url: '/addCommunity',
    method: 'post',
    data,
  });
}
// 封装一个修改小区列表数据的接口
export function updateCommunityList(data) {
  return ajax({
    url: '/updateCommunity',
    method: 'post',
    data,
  });
}
// 封装一个搜索小区列表数据的接口
export function searchCommunityList(data) {
  return ajax({
    url: '/searchCommunity',
    method: 'post',
    data,
  });
}
// 封装一个删除小区列表数据的接口
export function deleteCommunityList(data) {
  return ajax({
    url: '/deleteCommunity',
    method: 'post',
    data,
  });
}
//封装一个获取车位列表数据的接口
export function getCarList(data) {
  return ajax({
    url: '/getCar',
    method: 'post',
    data,
  });
}
//封装一个新增车位列表数据的接口
export function addCarList(data) {
  return ajax({
    url: '/addCar',
    method: 'post',
    data,
  });
}
//封装一个修改车位列表数据的接口
export function updateCarList(data) {
  return ajax({
    url: '/updateCar',
    method: 'post',
    data,
  });
}
//封装一个删除车位列表数据的接口
export function deleteCarList(data) {
  return ajax({
    url: '/deleteCar',
    method: 'post',
    data,
  });
}
// 封装一个搜索车位列表数据的接口
export function searchCarList(data) {
  return ajax({
    url: '/searchCar',
    method: 'post',
    data,
  });
}
// 封装一个获取楼房列表数据的接口
export function getBulidList() {
  return ajax({
    url: '/getBulid',
  });
}
// 封装一个添加楼房列表数据的接口
export function addBulidList(data) {
  return ajax({
    url: '/addBulid',
    method: 'post',
    data,
  });
}
// 封装一个修改楼房列表数据的接口
export function updateBuildList(data) {
  return ajax({
    url: '/updateBuild',
    method: 'post',
    data,
  });
}
// 封装一个删除楼房列表数据的接口
export function deleteBulidList(data) {
  return ajax({
    url: '/deleteBulid',
    method: 'post',
    data,
  });
}
// 封装一个添加小区名称数据的接口
export function addCnameList(data) {
  return ajax({
    url: '/addCname',
    method: 'post',
    data,
  });
}
// 封装一个修改小区名称数据的接口
export function updateCnameList(data) {
  return ajax({
    url: '/updateCname',
    method: 'post',
    data,
  });
}
// 封装一个添加房间名称数据的接口
export function addUtilList(data) {
  return ajax({
    url: '/addUtil',
    method: 'post',
    data,
  });
}
// 封装一个修改房间名称数据的接口
export function updateUtilList(data) {
  return ajax({
    url: '/updateUtil',
    method: 'post',
    data,
  });
}
// 封装一个删除房间名称数据的接口
export function deleteUtilList(data) {
  return ajax({
    url: '/deleteUtil',
    method: 'post',
    data,
  });
}
//封装一个获取访客的数接口
export function getVisiterList(data) {
  return ajax({
    url: '/getVisiter',
    method: 'post',
    data,
  });
}
//封装一个新增访客列表数据的接口
export function addVisiterList(data) {
  return ajax({
    url: '/addVisiter',
    method: 'post',
    data,
  });
}
//封装一个修改访客列表数据的接口
export function updateVisiterList(data) {
  return ajax({
    url: '/updateVisiter',
    method: 'post',
    data,
  });
}
//封装一个删除访客列表数据的接口
export function deleteVisiterList(data) {
  return ajax({
    url: '/deleteVisiter',
    method: 'post',
    data,
  });
}
//封装一个搜索访客列表数据的接口
export function searchVisiterList(data) {
  return ajax({
    url: '/searchVisiter',
    method: 'post',
    data,
  });
}
//封装一个获取广告位列表数据的接口
export function getAdvertisementList(data) {
  return ajax({
    url: '/getAdvertisement',
    method: 'post',
    data,
  });
}
//封装一个添加广告位列表数据的接口
export function addAdvertisementList(data) {
  return ajax({
    url: '/addAdvertisement',
    method: 'post',
    data,
  });
}
//封装一个修改广告位列表数据的接口
export function updateAdvertisementList(data) {
  return ajax({
    url: '/updateAdvertisement',
    method: 'post',
    data,
  });
}
//封装一个删除广告位列表数据的接口
export function deleteAdvertisementList(data) {
  return ajax({
    url: '/deleteAdvertisement',
    method: 'post',
    data,
  });
}
//封装一个搜索广告位列表数据的接口
export function searchAdvertisementList(data) {
  return ajax({
    url: '/searchAdvertisement',
    method: 'post',
    data,
  });
}
//封装一个获取业主位列表数据的接口
export function getOwnerList(data) {
  return ajax({
    url: '/getOwner',
    method: 'post',
    data,
  });
}
//封装一个添加业主位列表数据的接口
export function addOwnerList(data) {
  return ajax({
    url: '/addOwner',
    method: 'post',
    data,
  });
}
//封装一个修改业主位列表数据的接口
export function updateOwnerList(data) {
  return ajax({
    url: '/updateOwner',
    method: 'post',
    data,
  });
}
//封装一个删除业主位列表数据的接口
export function deleteOwnerList(data) {
  return ajax({
    url: '/deleteOwner',
    method: 'post',
    data,
  });
}
//封装一个搜索业主位列表数据的接口
export function searchOwnerList(data) {
  return ajax({
    url: '/searchOwner',
    method: 'post',
    data,
  });
}
//封装一个获取业主位列表数据的接口
export function getVehicleList(data) {
  return ajax({
    url: '/getVehicle',
    method: 'post',
    data,
  });
}
//封装一个添加业主位列表数据的接口
export function addVehicleList(data) {
  return ajax({
    url: '/addVehicle',
    method: 'post',
    data,
  });
}
//封装一个修改业主位列表数据的接口
export function updateVehicleList(data) {
  return ajax({
    url: '/updateVehicle',
    method: 'post',
    data,
  });
}
//封装一个删除业主位列表数据的接口
export function deleteVehicleList(data) {
  return ajax({
    url: '/deleteVehicle',
    method: 'post',
    data,
  });
}
//封装一个搜索业主位列表数据的接口
export function searchVehicleList(data) {
  return ajax({
    url: '/searchVehicle',
    method: 'post',
    data,
  });
}
//封装一个审核业主通过位列表数据的接口
export function passOwnerList(data) {
  return ajax({
    url: '/passOwner',
    method: 'post',
    data,
  });
}
//封装一个审核业主不通过位列表数据的接口
export function noPassOwnerList(data) {
  return ajax({
    url: '/noPassOwner',
    method: 'post',
    data,
  });
}
//封装一个迁出业主位列表数据的接口
export function moveOutOwnerList(data) {
  return ajax({
    url: '/moveOutOwner',
    method: 'post',
    data,
  });
}
//封装一个迁入业主位列表数据的接口
export function moveInOwnerList(data) {
  return ajax({
    url: '/moveInOwner',
    method: 'post',
    data,
  });
}
//封装一个迁入业主位列表数据的接口
export function pushOwnerList(data) {
  return ajax({
    url: '/pushOwner',
    method: 'post',
    data,
  });
}
//封装一个迁入业主位列表数据的接口
export function JoinOwnerList(data) {
  return ajax({
    url: '/JoinOwner',
    method: 'post',
    data,
  });
}
export function NoJoinOwnerList(data) {
  return ajax({
    url: '/NoJoinOwner',
    method: 'post',
    data,
  });
}
export function BupdateOwnerList(data) {
  return ajax({
    url: '/BupdateOwner',
    method: 'post',
    data,
  });
}
export function updateParkingStateList(data) {
  return ajax({
    url: '/updateParkingState',
    method: 'post',
    data,
  });
}