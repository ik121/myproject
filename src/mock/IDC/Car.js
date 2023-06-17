import Mock from 'mockjs';
const { data } = Mock.mock({
  'data|100': [
    {
      ParkingId: '@id',
      'Cname|1': ['西山国际', '中山国际'],
      'ParkingType|1': ['公共车位', '产权车位'], //车位类型 ：公共/产权
      'ParkingState|1': ['出租', '自用', '空置'], //车位状态 ： 自用出租空置
      'ParkingSpace|10-20': 20, //车位面积
      'Feeamount|1-400': 400, //收费金额
      Car: [],
    },
  ],
});
Mock.mock('/getCar', 'post', (params) => {
  let body = JSON.parse(params.body);
  if (JSON.stringify(body) === '{}') {
    return data;
  } else {
    return data.slice((body - 1) * 10, 10 * body);
  }
});
Mock.mock('/addCar', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.push(body);
  return data;
});
Mock.mock('/updateCar', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.ParkingId === body.ParkingId) {
      Object.assign(item, body);
    }
  });
  return '修改成功';
});
Mock.mock('/deleteCar', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item, index) => {
    if (item.ParkingId === body.ParkingId) {
      data.splice(index, 1);
    }
  });
  return data;
});
Mock.mock('/searchCar', 'post', (params) => {
  let body = params.body;
  console.log(body);
  if (body) {
    let database = [];
    String(body)
      .split('')
      .forEach((item) => {
        data.forEach((list) => {
          if (list.ParkingState.includes(item)) {
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
Mock.mock('/updateParkingState', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.Car) {
      if (item.Car.indexOf(body.eName) !== -1) {
        item.ParkingState = '空置';
        item.Car.splice(item.Car.indexOf(body.eName), 1);
      }
    }
    if (item.ParkingId == body.Associated) {
      item.ParkingState = '自用';
      item.Car.push(body.eName);
    }
  });
  return data;
});
