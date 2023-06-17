import Mock from 'mockjs';
import { getOwnerList } from '../../api/IDC';
let mess = [];
await getOwnerList().then((res) => {
  mess = res;
});
const { data } = Mock.mock({
  data: [
    {
      Cname: '中山国际',
      'Bulid|4': [
        {
          'Bname|+1': ['1栋', '2栋', '3栋', '4栋'], //楼栋名称
          toward: '南方', //朝向
          height: '1000', //楼高
          structure: '框架', //楼宇结构
          units: 4, //单元数
          floor: 4, //楼层
          'util|32': [
            {
              'units|+1': ['1', '2', '3', '4'],
              'floor|+1': [
                '1',
                '1',
                '1',
                '1',
                '1',
                '1',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '3',
                '3',
                '3',
                '3',
                '3',
                '3',
                '3',
                '3',
                '4',
                '4',
                '4',
                '4',
                '4',
                '4',
                '4',
                '4',
              ],
              'roomNumber|+1': 1,
              roomNumber: function () {
                if (this.roomNumber < 10) {
                  this.roomNumber = '0' + this.roomNumber;
                }
                return this.units + this.floor + '-' + this.roomNumber;
              },
              Owner: function () {
                return mess.filter((item) => {
                  if (
                    (item.Bname === '1栋',
                    this.units === item.units &&
                      this.floor === item.floor &&
                      this.roomNumber === item.roomNumber &&
                      item.Cname === '中山国际')
                  ) {
                    return item;
                  }
                });
              },
              toward: '西南',
              'buildSpace|1-100': 100, //建筑面积
              'InnerSpace|1-100': 100, //套房面积
              'PublicSpace|1-100': 100, //公摊面积
              'chamber|1': ['1', '2', '3', '4'], //室
              'office|1': ['1', '2', '3', '4'], //厅
              'defend|1': ['1', '2', '3', '4'], //卫
            },
          ],
        },
      ],
    },
    {
      Cname: '西山国际',
      'Bulid|3': [
        {
          'Bname|+1': ['1栋', '2栋', '3栋'], //楼栋名称
          toward: '南方', //朝向
          height: '1000', //楼高
          structure: '框架', //楼宇结构
          units: 4, //单元数
          floor: 4, //楼层
          'util|32': [
            {
              'units|+1': ['1', '2', '3', '4'],
              'floor|+1': [
                '1',
                '1',
                '1',
                '1',
                '1',
                '1',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '3',
                '3',
                '3',
                '3',
                '3',
                '3',
                '3',
                '3',
                '4',
                '4',
                '4',
                '4',
                '4',
                '4',
                '4',
                '4',
              ],
              'roomNumber|+1': 1,
              roomNumber: function () {
                if (this.roomNumber < 10) {
                  this.roomNumber = '0' + this.roomNumber;
                }
                return this.units + this.floor + '-' + this.roomNumber;
              },
              Owner: function () {
                return mess.filter((item) => {
                  if (
                    (this.Bname === '1栋',
                    this.units === item.units &&
                      this.floor === item.floor &&
                      this.roomNumber === item.roomNumber &&
                      item.Cname === '西山国际')
                  ) {
                    return item;
                  }
                });
              },
              toward: '西南',
              'buildSpace|1-100': 100, //建筑面积
              'InnerSpace|1-100': 100, //套房面积
              'PublicSpace|1-100': 100, //公摊面积
              'chamber|1': ['1', '2', '3', '4'], //室
              'office|1': ['1', '2', '3', '4'], //厅
              'defend|1': ['1', '2', '3', '4'], //卫
            },
          ],
        },
      ],
    },
  ],
});
Mock.mock('/getBulid', 'get', () => {
  return data;
});
Mock.mock('/pushOwner', 'post', (params) => {
  let flag = 0;
  let body = JSON.parse(params.body);
  body.OwnerState = '1';
  body.validity = '长期';
  body.InTime = body.InTime.slice(0, 10);
  data.forEach((item) => {
    if (item.Cname === body.Cname) {
      item.Bulid.forEach((Bitem) => {
        if (Bitem.Bname === body.Bname) {
          Bitem.util.forEach((uitem) => {
            if (
              uitem.floor == body.floor &&
              uitem.units == body.units &&
              uitem.roomNumber == body.roomNumber
            ) {
              if (!uitem.Owner) {
                uitem.Owner = [];
              }
              uitem.Owner.forEach((Oitem) => {
                if (Oitem.type === '业主' && body.type === '业主') {
                  flag = 1;
                }
              });
            }
          });
        }
      });
    }
  });
  if (flag === 0) {
    return '0';
  } else {
    return '1';
  }
});
Mock.mock('/JoinOwner', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.Cname === body.Cname) {
      item.Bulid.forEach((Bitem) => {
        if (Bitem.Bname === body.Bname) {
          Bitem.util.forEach((uitem) => {
            if (
              uitem.floor == body.floor &&
              uitem.units == body.units &&
              uitem.roomNumber == body.roomNumber
            ) {
              uitem.Owner.push(body);
            }
          });
        }
      });
    }
  });
});
Mock.mock('/BupdateOwner', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.Cname === body.Cname) {
      item.Bulid.forEach((Bitem) => {
        if (Bitem.Bname === body.Bname) {
          Bitem.util.forEach((uitem) => {
            if (
              uitem.floor == body.floor &&
              uitem.units == body.units &&
              uitem.roomNumber == body.roomNumber
            ) {
              uitem.Owner.forEach((Oitem) => {
                if (Oitem.IDcard === body.IDcard) {
                  Object.assign(Oitem, body);
                }
              });
            }
          });
        }
      });
    }
  });
});
Mock.mock('/NoJoinOwner', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.Cname === body.Cname) {
      item.Bulid.forEach((Bitem) => {
        if (Bitem.Bname === body.Bname) {
          Bitem.util.forEach((uitem, index) => {
            if (
              uitem.floor == body.floor &&
              uitem.units == body.units &&
              uitem.roomNumber == body.roomNumber
            ) {
              uitem.Owner.forEach((Oitem, index) => {
                if (Oitem.IDcard === body.IDcard) {
                  uitem.Owner.splice(index, 1);
                }
              });
            }
          });
        }
      });
    }
  });
});
Mock.mock('/addBulid', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.Cname === body.Cname) {
      body.util = [];
      item.Bulid.push(body);
    }
  });
  return '添加成功';
});
Mock.mock('/addCname', 'post', (params) => {
  let body = JSON.parse(params.body);
  body.Bulid = [];
  data.push(body);
  return '添加成功';
});
Mock.mock('/updateCname', 'post', (params) => {
  let body = JSON.parse(params.body);
  console.log(body);
  data.forEach((item) => {
    if (body.item === item.Cname) {
      item.Cname = body.Cname;
    }
  });
  return '添加成功';
});
Mock.mock('/updateBuild', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (body.Cname === item.Cname) {
      item.Bulid.forEach((Bitem) => {
        if (body.form.Bname === Bitem.Bname) {
          Object.assign(Bitem, body.form);
        }
      });
    }
  });
  return '修改成功';
});
Mock.mock('/deleteBulid', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.Cname === body.Cname) {
      item.Bulid.forEach((Bitem, index) => {
        if (Bitem.Bname === body.Bname) {
          item.Bulid.splice(index, 1);
        }
      });
    }
  });
  return '删除成功';
});
Mock.mock('/addUtil', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.Cname === body.Cname) {
      item.Bulid.forEach((list) => {
        if (list.Bname === body.Bname) {
          list.util.push(body.form);
        }
      });
    }
  });
  return '添加成功';
});
Mock.mock('/updateUtil', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.Cname === body.Cname) {
      item.Bulid.forEach((bitem) => {
        if (bitem.Bname === body.Bname) {
          bitem.util.forEach((uitem) => {
            if (
              uitem.units === body.form.units &&
              uitem.floor === body.form.floor &&
              uitem.roomNumber === body.form.roomNumber
            ) {
              Object.assign(uitem, body.form);
            }
          });
        }
      });
    }
  });
  return '修改成功';
});
Mock.mock('/deleteUtil', 'post', (params) => {
  let body = JSON.parse(params.body);
  data.forEach((item) => {
    if (item.Cname === body.Cname) {
      item.Bulid.forEach((bitem) => {
        if (bitem.Bname === body.Bname) {
          bitem.util.forEach((uitem, index) => {
            if (uitem.roomNumber === body.itemChild.roomNumber) {
              bitem.util.splice(index, 1);
            }
          });
        }
      });
    }
  });
  return '删除成功';
});
