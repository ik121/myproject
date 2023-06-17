import Mock from 'mockjs';
const { data } = Mock.mock({
  'data|100': [
    {
      'Cname|1': ['中山国际', '西山国际'], //小区名称
      ComplaintId: '@id',
      complainant: '@cname',
      iphone: /^1(5|3|7|8)[0-9]{9}$/,
      'ComplaintState|1': ['0', '1'],
      ComplaintContent: '小区卫生情况糟糕',
      ComplaintTime: '2023-05-11',
      Publisher: function () {
        if (this.ComplaintState === '0') {
          return 'Yezai';
        }
      },
      ProcessingTime: function () {
        if (this.ComplaintState === '0') {
          return '2023-06-16';
        }
      },
    },
  ],
});
Mock.mock('/getComplaint', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item, index) => {
    if (item.ComplaintState === '1') {
      data.splice(index, 1);
      data.unshift(item);
    }
  });
  function dateData(property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return Date.parse(value2) - Date.parse(value1);
    };
  }
  data.sort(dateData('ComplaintTime'));
  if (JSON.stringify(body) === '{}') {
    return data;
  } else {
    return data.slice((body - 1) * 10, 10 * body);
  }
});
Mock.mock('/addComplaint', 'post', (params) => {
  let body = JSON.parse(params.body);
  if (JSON.stringify(body) === '{}') {
    return;
  }
  body.ComplaintId = Mock.mock('@id');
  body.ComplaintState = '1';
  body.ComplaintTime = body.ComplaintTime.slice(0, 10);
  data.push(body);
  return data;
});
Mock.mock('/acceptance', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.ComplaintId === body.formList.ComplaintId) {
      item.ComplaintState = '0';
      if (!body.form.Publisher) body.form.Publisher = 'yezai';
      item.Publisher = body.form.Publisher;
      let date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        strDate = date.getDate();
      if (month < 10) month = `0${month}`;
      if (strDate < 10) strDate = `0${strDate}`;
      item.ProcessingTime = `${year}-${month}-${strDate}`;
    }
  });
  return data;
});
Mock.mock('/searchComplaint', 'post', (params) => {
  let body = params.body;
  console.log(body);
  if (body) {
    let database = [];
    String(body)
      .split('')
      .forEach((item) => {
        data.forEach((list) => {
          if (list.complainant.includes(item)) {
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
