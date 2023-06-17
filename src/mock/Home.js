// 用来生成首页数据接口用的文件
import Mock from 'mockjs';

// 配置一个请求的接口
Mock.mock('/getProListData', 'get', () => {
  return data;
});
Mock.mock('/login', 'post', (params) => {
  params.body = JSON.parse(params.body);
  if (params.body.admin === 'admin' && params.body.password === '123456') {
    const { data } = Mock.mock({
      data: {
        code: '登录成功',
      },
    });
    return data;
  } else {
    const { data } = Mock.mock({
      data: {
        code: 'error',
      },
    });
    return data;
  }
});

