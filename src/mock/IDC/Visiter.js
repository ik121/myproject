import Mock from 'mockjs';
const { data } = Mock.mock({
  'data|50': [
    {
      'Vid|+1': '@id',
      Vname: '@cname',
      'sex|1': ['女', '男'],
      iphone: /^1(5|3|7|8)[0-9]{9}$/,
      'Cname|1': ['中山国际', '西山国际'],
      'Bname|1': ['1栋', '2栋', '3栋', '4栋'],
      uitl: '1',
      floor: '1',
    },
  ],
});
Mock.mock('/getVisiter', 'post', (params) => {
  let body = JSON.parse(params.body);
  if (JSON.stringify(body) === '{}') {
    return data;
  } else {
    return data.slice((body - 1) * 10, 10 * body);
  }
});
Mock.mock('/addVisiter', 'post', (params) => {
  let body = JSON.parse(params.body);
  body.Vid = Mock.mock('@id');
  data.push(body);
  return data;
});
Mock.mock('/updateVisiter', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.Vid === body.Vid) {
      Object.assign(item, body);
    }
  });
  return '修改成功';
});
Mock.mock('/deleteVisiter', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item, index) => {
    if (item.Vid === body.Vid) {
      data.splice(index, 1);
    }
  });
  return data;
});
Mock.mock('/searchVisiter', 'post', (params) => {
  let body = params.body;
  console.log(body);
  if (body) {
    let database = [];
    String(body)
      .split('')
      .forEach((item) => {
        data.forEach((list) => {
          if (list.Vname.includes(item)) {
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
