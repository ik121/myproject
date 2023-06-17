import Mock from 'mockjs';
const { data } = Mock.mock({
  data: [
    {
      id: '0',
      name: '浙江',
      children: [
        {
          id: '0-1',
          name: '嘉兴',
          children: [
            {
              id: '0-1-1',
              name: '平湖',
            },
            {
              id: '0-1-2',
              name: '海盐',
            },
          ],
        },
        {
          id: '0-2',
          name: '杭州',
          children: [
            {
              id: '0-2-1',
              name: '西湖区',
            },
            {
              id: '0-2-2',
              name: '上城区',
            },
          ],
        },
      ],
    },{
      id: '1',
      name: '江苏',
      children: [
        {
          id: '0-1',
          name: '南京',
          children: [
            {
              id: '0-1-1',
              name: '栖霞',
            },
            {
              id: '0-1-2',
              name: '六合',
            },
          ],
        },
        {
          id: '0-2',
          name: '苏州',
          children: [
            {
              id: '0-2-1',
              name: '姑苏',
            },
            {
              id: '0-2-2',
              name: '吴江',
            },
          ],
        },
      ],
    },
  ],
});
Mock.mock('/address', 'get', () => {
  return data;
});
