import Mock from 'mockjs';
const { data } = Mock.mock({
  'data|100': [
    {
      NoticeId: '@id',
      NoticeName: '端午放到过年假期通知',
      'Cname|1': ['中山国际', '西山国际'], //小区名称
      'NoticeContent|1': ['你好', '123'],
      Publisher: 'Yezai',
      'Topping|1': [true, false, false, false],
      PublishTime: '2023-06-11',
    },
  ],
});
Mock.mock('/getNotice', 'post', (params) => {
  let body = JSON.parse(params.body);
  function dateData(property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return Date.parse(value1) -Date.parse(value2) ;
    };
  }
  data.sort(dateData('PublishTime'));
  data.forEach((item, index) => {
    if (item.Topping === true) {
      data.splice(index, 1);
      data.unshift(item);
    }
  });
  data.Publisher = 'Yezai'
  if (JSON.stringify(body) === '{}') {
    return data;
  } else {
    return data.slice((body - 1) * 10, 10 * body);
  }
});
Mock.mock('/addNotice', 'post', (params) => {
  let body = JSON.parse(params.body);
  body.NoticeId = Mock.mock('@id');
  body.Publisher = 'Yezai';
  let date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    strDate = date.getDate();
  if (month < 10) month = `0${month}`;
  if (strDate < 10) strDate = `0${strDate}`;
  body.PublishTime = `${year}-${month}-${strDate}`;
  data.push(body);
  return data;
});
Mock.mock('/updateNotice', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.NoticeId === body.NoticeId) {
      Object.assign(item, body);
    }
  });
  return '修改成功';
});
Mock.mock('/deleteNotice', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item, index) => {
    if (item.NoticeId === body.NoticeId) {
      data.splice(index, 1);
    }
  });
  return data;
});
Mock.mock('/searchNotice', 'post', (params) => {
  let body = params.body
  if (body) {
    let database = [];
    String(body)
      .split('')
      .forEach((item) => {
        data.forEach((list) => {
          if (list.NoticeName.includes(item)) {
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
