import Mock from 'mockjs';
const { data } = Mock.mock({
  'data|20': [
    {
      eName: '@id',
      'Cname|1': ['中山国际', '西山国际'],
      LicensePlate: '川A·88888',
      Carowner: '@cname',
      iphone: '17858335483',
      Associated: 'park1',
      startTime: '2023-06-21T16:00:00.000Z',
      endTime: '2023-07-19T16:00:00.000Z',
      VehicleTime: ['2023-06-21T16:00:00.000Z', '2023-07-19T16:00:00.000Z'], //天压保持日期不变。。。。。。。
    },
  ],
});
Mock.mock('/getVehicle', 'post', (params) => {
  let body = JSON.parse(params.body);
  if (JSON.stringify(body) === '{}') {
    return data;
  } else {
    return data.slice((body - 1) * 10, 10 * body);
  }
});
Mock.mock('/addVehicle', 'post', (params) => {
  let body = JSON.parse(params.body);
  body.eName = Mock.mock('@id');
  data.push(body);
  return data;
});
Mock.mock('/updateVehicle', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.eName === body.eName) {
      Object.assign(item, body);
    }
  });
  return '修改成功';
});
Mock.mock('/deleteVehicle', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item, index) => {
    if (item.ParkingId === body.ParkingId) {
      data.splice(index, 1);
    }
  });
  return data;
});
Mock.mock('/searchVehicle', 'post', (params) => {
  let body = params.body
  if (body) {
    let database = [];
    String(body)
      .split('')
      .forEach((item) => {
        data.forEach((list) => {
          if (list.LicensePlate.includes(item)) {
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
