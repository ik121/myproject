import Mock from 'mockjs';
import './Building';
import { addCnameList, updateCnameList } from '../../api/IDC';
const { data } = Mock.mock({
  data: [
    {
      id:'@id',
      Cname: '中山国际',
      province: '浙江', //地址省
      city: '嘉兴',
      county: '平湖',
      place: '新仓',
      head: 'yezai', //负责人
      headIphone: '17858xxxxxx', //负责人电话
      logo: '', //logo
      img: '', //小区图片
      coverSpace: '1000',
      floorSpace: '1000', //建筑面积
      PublicSpace: '100', //公共场所面积
      greenSpace: '10', //绿化面积
      Parking: '10', //车位面积
      garage: '10', //车库面积
      notes: '无', //备注
      time: '2024-5-10',
    },
    {
      id: '@id',
      Cname: '西山国际',
      province: '江苏', //地址省
      city: '苏州',
      county: '吴江',
      place: '不知道',
      head: 'yezai', //负责人
      headIphone: '17858xxxxxx', //负责人电话
      logo: '', //logo
      img: '', //小区图片
      coverSpace: '1000',
      floorSpace: '1000', //建筑面积
      PublicSpace: '100', //公共场所面积
      greenSpace: '10', //绿化面积
      Parking: '10', //车位面积
      garage: '10', //车库面积
      notes: '无', //备注
      time: '2024-5-10',
    },
  ],
});
Mock.mock('/getCommunity', 'get', () => {
  return data;
});
Mock.mock('/addCommunity', 'post', (params) => {
  let body = JSON.parse(params.body);
  body.id = Mock.mock('@id')
  addCnameList({ Cname: body.Cname });
  data.push(body);
  return '添加成功';
});
Mock.mock('/updateCommunity', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.id === body.id) {
      updateCnameList({ item: item.Cname, Cname: body.Cname });
      Object.assign(item, body);
    }
  });
  return '修改成功';
});
Mock.mock('/deleteCommunity', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item, index) => {
    if (item.id === body.id) {
      data.splice(index, 1);
    }
  });
  return data;
});
Mock.mock('/searchCommunity', 'post', (params) => {
  let body = JSON.parse(params.body);
  if (JSON.stringify(body) === '[]') {
    return data;
  } else {
    let dataSearch = [];
    body.forEach((item) => {
      if (data.indexOf(item)) {
        dataSearch.push(item);
      }
    });
    return dataSearch;
  }
});
