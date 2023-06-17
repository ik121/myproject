import Mock from 'mockjs';
const { data } = Mock.mock({
  'data|100': [
    {
      'adverId|+1': 1,
      adverName: '美白护肤广告',
      'adverState|1': ['出租中', '空置'], //广告位状态
      'Cname|1': ['中山国际', '西山国际'], //小区名称
      adverAddress: '我不知道', //小区地址
      'adverlarge|1': ['1', '2', '3', '4'], //广告位面积
      'adverprice|1': ['1000', '1200', '1300', '1500'], //广告位收费
    },
  ],
});
Mock.mock('/getAdvertisement', 'post', (params) => {
  let body = JSON.parse(params.body);
  if (JSON.stringify(body) === '{}') {
    return data;
  } else {
    return data.slice((body - 1) * 10, 10 * body);
  }
});
Mock.mock('/addAdvertisement', 'post', (params) => {
  let body = JSON.parse(params.body);
  body.adverId = data.length + 1;
  data.push(body);
  return data;
});
Mock.mock('/updateAdvertisement', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.adverId === body.adverId) {
      Object.assign(item, body);
    }
  });
  return '修改成功';
});
Mock.mock('/deleteAdvertisement', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item, index) => {
    if (item.adverId === body.adverId) {
      data.splice(index, 1);
    }
  });
  return data;
});
Mock.mock('/searchAdvertisement', 'post', (params) => {
  let body = JSON.parse(params.body);
  if (body) {
    let database = [];
    String(body)
      .split('')
      .forEach((item) => {
        data.forEach((list) => {
          if (list.adverName.includes(item)) {
            if (database.indexOf(list)) {
              database.push(list);
            }
          }
        });
      });
    return database;
  } else {
    return data;
  }
});
