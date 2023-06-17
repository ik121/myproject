import Mock from 'mockjs';
const { data } = Mock.mock({
  data: [
    {
      ownerId: '@id',
      ownerName: '@cname',
      iphone: /^1(5|3|7|8)[0-9]{9}$/,
      'sex|1': ['男', '女'],
      Cname: '中山国际',
      type: '业主',
      Bname: '1栋',
      units: '1',
      floor: '1',
      OwnerState: '0',
      age: function () {
        if (this.IDcard.length == 15) {
          var org_birthday = this.IDcard.substring(6, 12);
          var yearBirth = '19' + org_birthday.substring(0, 2);
          var monthBirth = org_birthday.substring(2, 4);
          var dayBirth = org_birthday.substring(4, 6);
        } else if (this.IDcard.length == 18) {
          yearBirth = this.IDcard.substring(6, 10);
          monthBirth = this.IDcard.substring(10, 12);
          dayBirth = this.IDcard.substring(12, 14);
        }
        var myDate = new Date();
        var monthNow = myDate.getMonth() + 1;
        var dayNow = myDate.getDate();
        var age = myDate.getFullYear() - yearBirth;
        if (
          monthNow < monthBirth ||
          (monthNow == monthBirth && dayNow < dayBirth)
        ) {
          age--;
        }
        return age;
      },
      'career|1': ['上班族', '全职妈妈', '学生', '自由职业', '其它'],
      InTime: '@date("yyyy-MM-dd")',
      ownerCard: '800080000',
      wx: '17918918919',
      IDcard: '@id',
      domicile: '中国浙江',
      notes: '无',
      roomNumber: '11-01',
      identity: '业主本人',
      validity: '长期',
    },
    {
      ownerId: '@id',
      ownerName: '@cname',
      iphone: /^1(5|3|7|8)[0-9]{9}$/,
      'sex|1': ['男', '女'],
      Cname: '中山国际',
      'type|1': '租客',
      Bname: '1栋',
      units: '1',
      floor: '1',
      OwnerState: '0',
      age: function () {
        if (this.IDcard.length == 15) {
          var org_birthday = this.IDcard.substring(6, 12);
          var yearBirth = '19' + org_birthday.substring(0, 2);
          var monthBirth = org_birthday.substring(2, 4);
          var dayBirth = org_birthday.substring(4, 6);
        } else if (this.IDcard.length == 18) {
          yearBirth = this.IDcard.substring(6, 10);
          monthBirth = this.IDcard.substring(10, 12);
          dayBirth = this.IDcard.substring(12, 14);
        }
        var myDate = new Date();
        var monthNow = myDate.getMonth() + 1;
        var dayNow = myDate.getDate();
        var age = myDate.getFullYear() - yearBirth;
        if (
          monthNow < monthBirth ||
          (monthNow == monthBirth && dayNow < dayBirth)
        ) {
          age--;
        }
        return age;
      },
      'career|1': ['上班族', '全职妈妈', '学生', '自由职业', '其它'],
      InTime: '@date("yyyy-MM-dd")',
      ownerCard: '800080000',
      wx: '17918918919',
      IDcard: '@id',
      domicile: '中国浙江',
      notes: '无',
      roomNumber: '11-05',
      identity: '业主本人',
      validity: '长期',
    },
    {
      ownerId: '@id',
      ownerName: '@cname',
      iphone: /^1(5|3|7|8)[0-9]{9}$/,
      'sex|1': ['男', '女'],
      Cname: '中山国际',
      type: '业主',
      Bname: '1栋',
      units: '2',
      floor: '1',
      OwnerState: '0',
      age: function () {
        if (this.IDcard.length == 15) {
          var org_birthday = this.IDcard.substring(6, 12);
          var yearBirth = '19' + org_birthday.substring(0, 2);
          var monthBirth = org_birthday.substring(2, 4);
          var dayBirth = org_birthday.substring(4, 6);
        } else if (this.IDcard.length == 18) {
          yearBirth = this.IDcard.substring(6, 10);
          monthBirth = this.IDcard.substring(10, 12);
          dayBirth = this.IDcard.substring(12, 14);
        }
        var myDate = new Date();
        var monthNow = myDate.getMonth() + 1;
        var dayNow = myDate.getDate();
        var age = myDate.getFullYear() - yearBirth;
        if (
          monthNow < monthBirth ||
          (monthNow == monthBirth && dayNow < dayBirth)
        ) {
          age--;
        }
        return age;
      },
      'career|1': ['上班族', '全职妈妈', '学生', '自由职业', '其它'],
      InTime: '@date("yyyy-MM-dd")',
      ownerCard: '800080000',
      wx: '17918918919',
      IDcard: '@id',
      domicile: '中国浙江',
      notes: '无',
      roomNumber: '21-02',
      identity: '业主本人',
      validity: '长期',
    },
    {
      ownerId: '@id',
      ownerName: '@cname',
      iphone: /^1(5|3|7|8)[0-9]{9}$/,
      'sex|1': ['男', '女'],
      Cname: '中山国际',
      type: '业主',
      Bname: '1栋',
      units: '2',
      floor: '1',
      OwnerState: '0',
      age: function () {
        if (this.IDcard.length == 15) {
          var org_birthday = this.IDcard.substring(6, 12);
          var yearBirth = '19' + org_birthday.substring(0, 2);
          var monthBirth = org_birthday.substring(2, 4);
          var dayBirth = org_birthday.substring(4, 6);
        } else if (this.IDcard.length == 18) {
          yearBirth = this.IDcard.substring(6, 10);
          monthBirth = this.IDcard.substring(10, 12);
          dayBirth = this.IDcard.substring(12, 14);
        }
        var myDate = new Date();
        var monthNow = myDate.getMonth() + 1;
        var dayNow = myDate.getDate();
        var age = myDate.getFullYear() - yearBirth;
        if (
          monthNow < monthBirth ||
          (monthNow == monthBirth && dayNow < dayBirth)
        ) {
          age--;
        }
        return age;
      },
      'career|1': ['上班族', '全职妈妈', '学生', '自由职业', '其它'],
      InTime: '@date("yyyy-MM-dd")',
      ownerCard: '800080000',
      wx: '17918918919',
      IDcard: '@id',
      domicile: '中国浙江',
      notes: '无',
      roomNumber: '21-06',
      identity: '业主本人',
      validity: '长期',
    },
    {
      ownerId: '@id',
      ownerName: '@cname',
      iphone: /^1(5|3|7|8)[0-9]{9}$/,
      'sex|1': ['男', '女'],
      Cname: '中山国际',
      type: '业主',
      Bname: '1栋',
      units: '3',
      floor: '1',
      OwnerState: '0',
      age: function () {
        if (this.IDcard.length == 15) {
          var org_birthday = this.IDcard.substring(6, 12);
          var yearBirth = '19' + org_birthday.substring(0, 2);
          var monthBirth = org_birthday.substring(2, 4);
          var dayBirth = org_birthday.substring(4, 6);
        } else if (this.IDcard.length == 18) {
          yearBirth = this.IDcard.substring(6, 10);
          monthBirth = this.IDcard.substring(10, 12);
          dayBirth = this.IDcard.substring(12, 14);
        }
        var myDate = new Date();
        var monthNow = myDate.getMonth() + 1;
        var dayNow = myDate.getDate();
        var age = myDate.getFullYear() - yearBirth;
        if (
          monthNow < monthBirth ||
          (monthNow == monthBirth && dayNow < dayBirth)
        ) {
          age--;
        }
        return age;
      },
      'career|1': ['上班族', '全职妈妈', '学生', '自由职业', '其它'],
      InTime: '@date("yyyy-MM-dd")',
      ownerCard: '800080000',
      wx: '17918918919',
      IDcard: '@id',
      domicile: '中国浙江',
      notes: '无',
      roomNumber: '31-03',
      identity: '业主本人',
      validity: '长期',
    },
    {
      ownerId: '@id',
      ownerName: '@cname',
      iphone: /^1(5|3|7|8)[0-9]{9}$/,
      'sex|1': ['男', '女'],
      Cname: '中山国际',
      type: '租客',
      Bname: '1栋',
      units: '4',
      floor: '1',
      OwnerState: '0',
      age: function () {
        if (this.IDcard.length == 15) {
          var org_birthday = this.IDcard.substring(6, 12);
          var yearBirth = '19' + org_birthday.substring(0, 2);
          var monthBirth = org_birthday.substring(2, 4);
          var dayBirth = org_birthday.substring(4, 6);
        } else if (this.IDcard.length == 18) {
          yearBirth = this.IDcard.substring(6, 10);
          monthBirth = this.IDcard.substring(10, 12);
          dayBirth = this.IDcard.substring(12, 14);
        }
        var myDate = new Date();
        var monthNow = myDate.getMonth() + 1;
        var dayNow = myDate.getDate();
        var age = myDate.getFullYear() - yearBirth;
        if (
          monthNow < monthBirth ||
          (monthNow == monthBirth && dayNow < dayBirth)
        ) {
          age--;
        }
        return age;
      },
      'career|1': ['上班族', '全职妈妈', '学生', '自由职业', '其它'],
      InTime: '@date("yyyy-MM-dd")',
      ownerCard: '800080000',
      wx: '17918918919',
      IDcard: '@id',
      domicile: '中国浙江',
      notes: '无',
      roomNumber: '41-04',
      identity: '业主本人',
      validity: '长期',
    },
    {
      ownerId: '@id',
      ownerName: '@cname',
      iphone: /^1(5|3|7|8)[0-9]{9}$/,
      'sex|1': ['男', '女'],
      Cname: '中山国际',
      type: '亲属',
      Bname: '1栋',
      units: '4',
      floor: '1',
      OwnerState: '0',
      age: function () {
        if (this.IDcard.length == 15) {
          var org_birthday = this.IDcard.substring(6, 12);
          var yearBirth = '19' + org_birthday.substring(0, 2);
          var monthBirth = org_birthday.substring(2, 4);
          var dayBirth = org_birthday.substring(4, 6);
        } else if (this.IDcard.length == 18) {
          yearBirth = this.IDcard.substring(6, 10);
          monthBirth = this.IDcard.substring(10, 12);
          dayBirth = this.IDcard.substring(12, 14);
        }
        var myDate = new Date();
        var monthNow = myDate.getMonth() + 1;
        var dayNow = myDate.getDate();
        var age = myDate.getFullYear() - yearBirth;
        if (
          monthNow < monthBirth ||
          (monthNow == monthBirth && dayNow < dayBirth)
        ) {
          age--;
        }
        return age;
      },
      'career|1': ['上班族', '全职妈妈', '学生', '自由职业', '其它'],
      InTime: '@date("yyyy-MM-dd")',
      ownerCard: '800080000',
      wx: '17918918919',
      IDcard: '@id',
      domicile: '中国浙江',
      notes: '无',
      roomNumber: '41-04',
      identity: '业主本人',
      validity: '长期',
    },
    {
      ownerId: '@id',
      ownerName: '@cname',
      iphone: /^1(5|3|7|8)[0-9]{9}$/,
      'sex|1': ['男', '女'],
      Cname: '西山国际',
      type: '业主',
      Bname: '1栋',
      units: '1',
      floor: '1',
      OwnerState: '0',
      age: function () {
        if (this.IDcard.length == 15) {
          var org_birthday = this.IDcard.substring(6, 12);
          var yearBirth = '19' + org_birthday.substring(0, 2);
          var monthBirth = org_birthday.substring(2, 4);
          var dayBirth = org_birthday.substring(4, 6);
        } else if (this.IDcard.length == 18) {
          yearBirth = this.IDcard.substring(6, 10);
          monthBirth = this.IDcard.substring(10, 12);
          dayBirth = this.IDcard.substring(12, 14);
        }
        var myDate = new Date();
        var monthNow = myDate.getMonth() + 1;
        var dayNow = myDate.getDate();
        var age = myDate.getFullYear() - yearBirth;
        if (
          monthNow < monthBirth ||
          (monthNow == monthBirth && dayNow < dayBirth)
        ) {
          age--;
        }
        return age;
      },
      'career|1': ['上班族', '全职妈妈', '学生', '自由职业', '其它'],
      InTime: '@date("yyyy-MM-dd")',
      ownerCard: '800080000',
      wx: '17918918919',
      IDcard: '@id',
      domicile: '中国浙江',
      notes: '无',
      roomNumber: '11-01',
      identity: '业主本人',
      validity: '长期',
    },
    {
      ownerId: '@id',
      ownerName: '@cname',
      iphone: /^1(5|3|7|8)[0-9]{9}$/,
      'sex|1': ['男', '女'],
      Cname: '西山国际',
      type: '业主',
      Bname: '1栋',
      units: '1',
      floor: '1',
      OwnerState: '0',
      age: function () {
        if (this.IDcard.length == 15) {
          var org_birthday = this.IDcard.substring(6, 12);
          var yearBirth = '19' + org_birthday.substring(0, 2);
          var monthBirth = org_birthday.substring(2, 4);
          var dayBirth = org_birthday.substring(4, 6);
        } else if (this.IDcard.length == 18) {
          yearBirth = this.IDcard.substring(6, 10);
          monthBirth = this.IDcard.substring(10, 12);
          dayBirth = this.IDcard.substring(12, 14);
        }
        var myDate = new Date();
        var monthNow = myDate.getMonth() + 1;
        var dayNow = myDate.getDate();
        var age = myDate.getFullYear() - yearBirth;
        if (
          monthNow < monthBirth ||
          (monthNow == monthBirth && dayNow < dayBirth)
        ) {
          age--;
        }
        return age;
      },
      'career|1': ['上班族', '全职妈妈', '学生', '自由职业', '其它'],
      InTime: '@date("yyyy-MM-dd")',
      ownerCard: '800080000',
      wx: '17918918919',
      IDcard: '@id',
      domicile: '中国浙江',
      notes: '无',
      roomNumber: '11-05',
      identity: '业主本人',
      validity: '长期',
    },
  ],
});
Mock.mock('/getOwner', 'post', (params) => {
  let body = JSON.parse(params.body);
  let newData = [];
  if (JSON.stringify(body) !== '{}') {
    if (body.count === '') {
      if (body.type === '业主') {
        if (body.OwnerState === '0') {
          data.forEach((item) => {
            if (item.OwnerState === '0' && item.type === '业主') {
              newData.push(item);
            }
          });
        } else if (body.OwnerState === '1') {
          data.forEach((item) => {
            if (item.OwnerState === '1' && item.type === '业主') {
              newData.push(item);
            }
          });
        } else if (body.OwnerState === '2') {
          data.forEach((item) => {
            if (item.OwnerState === '2' && item.type === '业主') {
              newData.push(item);
            }
          });
        } else if (body.OwnerState === '3') {
          data.forEach((item) => {
            if (item.OwnerState === '3' && item.type === '业主') {
              newData.push(item);
            }
          });
        }
      } else {
        if (body.OwnerState === '0') {
          data.forEach((item) => {
            if (item.OwnerState === '0' && item.type !== '业主') {
              newData.push(item);
            }
          });
        } else if (body.OwnerState === '1') {
          data.forEach((item) => {
            if (item.OwnerState === '1' && item.type !== '业主') {
              newData.push(item);
            }
          });
        } else if (body.OwnerState === '2') {
          data.forEach((item) => {
            if (item.OwnerState === '2' && item.type !== '业主') {
              newData.push(item);
            }
          });
        } else if (body.OwnerState === '3') {
          data.forEach((item) => {
            if (item.OwnerState === '3' && item.type !== '业主') {
              newData.push(item);
            }
          });
        }
      }
      return newData;
    } else {
      if (body.type === '业主') {
        if (body.OwnerState === '0') {
          data.forEach((item) => {
            if (item.OwnerState === '0' && item.type === '业主') {
              newData.push(item);
            }
          });
        } else if (body.OwnerState === '1') {
          data.forEach((item) => {
            if (item.OwnerState === '1' && item.type === '业主') {
              newData.push(item);
            }
          });
        } else if (body.OwnerState === '2') {
          data.forEach((item) => {
            if (item.OwnerState === '2' && item.type === '业主') {
              newData.push(item);
            }
          });
        } else if (body.OwnerState === '3') {
          data.forEach((item) => {
            if (item.OwnerState === '3' && item.type === '业主') {
              newData.push(item);
            }
          });
        }
      } else {
        if (body.OwnerState === '0') {
          data.forEach((item) => {
            if (item.OwnerState === '0' && item.type !== '业主') {
              newData.push(item);
            }
          });
        } else if (body.OwnerState === '1') {
          data.forEach((item) => {
            if (item.OwnerState === '1' && item.type !== '业主') {
              newData.push(item);
            }
          });
        } else if (body.OwnerState === '2') {
          data.forEach((item) => {
            if (item.OwnerState === '2' && item.type !== '业主') {
              newData.push(item);
            }
          });
        } else if (body.OwnerState === '3') {
          data.forEach((item) => {
            if (item.OwnerState === '3' && item.type !== '业主') {
              newData.push(item);
            }
          });
        }
      }
      return newData.slice((body.count - 1) * 10, 10 * body.count);
    }
  } else {
    return data;
  }
});
Mock.mock('/addOwner', 'post', (params) => {
  let body = JSON.parse(params.body);
  body.OwnerState = '1';
  body.validity = '长期';
  body.InTime = body.InTime.slice(0, 10);
  data.push(body);
});
Mock.mock('/updateOwner', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.ownerId === body.ownerId) {
      Object.assign(item, body);
    }
  });
  return '修改成功';
});
Mock.mock('/passOwner', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.ownerId === body.ownerId) {
      item.OwnerState = '0';
    }
  });
  return '修改成功';
});
Mock.mock('/noPassOwner', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.ownerId === body.ownerId) {
      item.OwnerState = '2';
    }
  });
  return '修改成功';
});
Mock.mock('/moveOutOwner', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.ownerId === body.ownerId) {
      item.OwnerState = '3';
    }
  });
  return '修改成功';
});
Mock.mock('/moveInOwner', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.ownerId === body.ownerId) {
      item.OwnerState = '0';
    }
  });
  return '修改成功';
});
Mock.mock('/deleteOwner', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item, index) => {
    if (item.ownerId === body.ownerId) {
      data.splice(index, 1);
    }
  });
  return data;
});
Mock.mock('/searchOwner', 'post', (params) => {
  let body = JSON.parse(params.body);
  let newData = [];
  if (body.type === '业主') {
    if (body.OwnerState === '0') {
      data.forEach((item) => {
        if (item.OwnerState === '0' && item.type === '业主') {
          newData.push(item);
        }
      });
    } else if (body.OwnerState === '1') {
      data.forEach((item) => {
        if (item.OwnerState === '1' && item.type === '业主') {
          newData.push(item);
        }
      });
    } else if (body.OwnerState === '2') {
      data.forEach((item) => {
        if (item.OwnerState === '2' && item.type === '业主') {
          newData.push(item);
        }
      });
    } else if (body.OwnerState === '3') {
      data.forEach((item) => {
        if (item.OwnerState === '3' && item.type === '业主') {
          newData.push(item);
        }
      });
    }
  } else {
    if (body.OwnerState === '0') {
      data.forEach((item) => {
        if (item.OwnerState === '0' && item.type !== '业主') {
          newData.push(item);
        }
      });
    } else if (body.OwnerState === '1') {
      data.forEach((item) => {
        if (item.OwnerState === '1' && item.type !== '业主') {
          newData.push(item);
        }
      });
    } else if (body.OwnerState === '2') {
      data.forEach((item) => {
        if (item.OwnerState === '2' && item.type !== '业主') {
          newData.push(item);
        }
      });
    } else if (body.OwnerState === '3') {
      data.forEach((item) => {
        if (item.OwnerState === '3' && item.type !== '业主') {
          newData.push(item);
        }
      });
    }
  }
  if (body.searchList) {
    let database = [];
    String(body.searchList)
      .split('')
      .forEach((item) => {
        newData.forEach((list) => {
          if (list.ownerName.includes(item) || list.iphone.includes(item)) {
            if (database.indexOf(list)) {
              database.push(list);
            }
          }
        });
      });
    return database;
  } else {
    return newData;
  }
});
