<template>
  <div class="container" v-if="flag">
    <div class="header">
      <h4>租客管理</h4>
      <p>
        无关联房屋住户进入待审核列表；住户迁入房屋后进入已迁入列表；审核不通过进入未通过列表；管理员将住户迁出房屋后，住户进入已迁出列表。
      </p>
    </div>
    <div class="tabs">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="已迁入" name="first">
          <div class="tabs_header">
            <div class="button">
              <el-button type="primary" @click="addOwner">添加</el-button>
              <el-button @click="moveOutAll()">迁出</el-button>
            </div>
            <div class="search">
              <el-input
                size="small"
                v-model="state.searchList"
                @keyup.enter="searchVisitor"
                placeholder="请输业主名称"
                :prefix-icon="Search" />
            </div>
          </div>
          <div class="Tab">
            <TableCom
              :selection="selection"
              :tableData="state.inTableData"
              :tablist="tablist">
              <template #OwnerState="scope">
                <div class="OwnerState">已迁入</div>
              </template>
              <template #operation="scope">
                <span @click="detailFn(scope)">详情</span>
                <span @click="updateFn(scope)">修改</span>
                <span @click="moveOutFn(scope)">迁出</span>
              </template>
            </TableCom>
          </div>
          <div class="bottom">
            <paginationCom
              :total="state.inDataList.length"
              @current="current"></paginationCom>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待审核" name="second">
          <div class="tabs_header">
            <div class="button">
              <el-button type="primary" @click="passAll">通过</el-button>
              <el-button @click="nopassAll">不通过</el-button>
            </div>
            <div class="search">
              <el-input
                size="small"
                v-model="state.searchList"
                @keyup.enter="searchVisitor"
                placeholder="请输业主名称"
                :prefix-icon="Search" />
            </div>
          </div>
          <div class="Tab">
            <TableCom
              :selection="selection"
              :tableData="state.inTableData"
              :tablist="ExamineTablist">
              <template #units="scope"> {{ scope.row.units }}单元 </template>
              <template #OwnerState="scope">
                <div class="wait">待审核</div>
              </template>
              <template #operation="scope">
                <span @click="pass(scope)">审核</span>
              </template>
            </TableCom>
          </div>
          <div class="bottom">
            <paginationCom
              :total="state.inDataList.length"
              @current="current"></paginationCom>
          </div>
        </el-tab-pane>
        <el-tab-pane label="未通过" name="third">
          <div class="tabs_header">
            <div class="button">
              <el-button type="primary" @click="deleteAll">删除</el-button>
            </div>
            <div class="search">
              <el-input
                size="small"
                v-model="state.searchList"
                @keyup.enter="searchVisitor"
                placeholder="请输业主名称"
                :prefix-icon="Search" />
            </div>
          </div>
          <div class="Tab">
            <TableCom
              :selection="selection"
              :tableData="state.inTableData"
              :tablist="ExamineTablist">
              <template #units="scope"> {{ scope.row.units }}单元 </template>
              <template #OwnerState="scope">
                <div class="no">未通过</div>
              </template>
              <template #operation="scope">
                <span @click="deleteFn(scope)">删除</span>
              </template>
            </TableCom>
          </div>
          <div class="bottom">
            <paginationCom
              :total="state.inDataList.length"
              @current="current"></paginationCom>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已迁出" name="fourth">
          <div class="tabs_header">
            <div class="button">
              <el-button type="primary" @click="deleteAll">删除</el-button>
              <el-button @click="moveInAll">迁入</el-button>
            </div>
            <div class="search">
              <el-input
                size="small"
                v-model="state.searchList"
                @keyup.enter="searchVisitor"
                placeholder="请输业主名称"
                :prefix-icon="Search" />
            </div>
          </div>
          <div class="Tab">
            <TableCom
              :selection="selection"
              :tableData="state.inTableData"
              :tablist="OutTablist">
              <template #OwnerState="scope">
                <div class="out">已迁出</div></template
              >
              <template #operation="scope">
                <span @click="detailFn(scope)">详情</span>
                <span @click="moveInFn(scope)">迁入</span>
              </template>
            </TableCom>
          </div>
          <div class="bottom">
            <paginationCom
              :total="state.inDataList.length"
              @current="current"></paginationCom>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <addOwnerCom
    v-else
    :Cname="state.Cname"
    :BulidList="state.BulidList"
    :formList="state.formList"
    :title="state.title"
    :type="state.type"
    @confirm="confirm"
    @cancle="cancle"></addOwnerCom>
  <DialogCom :dialog="dialog" @confirm="confirm" @cancle="cancle"></DialogCom>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { watch, reactive, ref } from 'vue';
import TableCom from '@/components/Other/tableCom.vue';
import paginationCom from '../../../components/Other/paginationCom.vue';
import addOwnerCom from '../../../components/IDC/Owner/addOwnerCom.vue';
import { ElMessage } from 'element-plus';
import {
  getOwnerList,
  getCommunityList,
  getBulidList,
  addOwnerList,
  updateOwnerList,
  deleteOwnerList,
  searchOwnerList,
  passOwnerList,
  noPassOwnerList,
  moveOutOwnerList,
  moveInOwnerList,
  pushOwnerList,
  JoinOwnerList,
  NoJoinOwnerList,
  BupdateOwnerList,
} from '../../../api/IDC';
import DialogCom from '../../../components/Other/dialogCom.vue';
import { useStore } from 'vuex';
const store = useStore();
const activeName = ref('first');
const selection = ref('selection');
const flag = ref(true);
const state = reactive({
  inTableData: [],
  inDataList: [],
  tabList: [],
  tltle: '',
  type: '',
  Cname: [],
  BulidList: [],
  searchList: '', //搜索
  Clist: '', //搜索
  count: 1,
});
const dialog = reactive({
  dialogVisible: false,
  title: '确定要删除吗？',
  cancleText: '取消',
  confirmText: '确定',
  width: '30%',
});
const tablist = reactive([
  {
    prop: 'ownerName',
    label: '姓名',
    width: '100',
  },
  {
    prop: 'iphone',
    label: '手机号',
    width: '180',
  },
  {
    prop: 'Cname',
    label: '小区',
    width: '120',
  },
  {
    prop: 'Bname',
    label: '楼宇',
    width: '120',
  },
  {
    prop: 'roomNumber',
    label: '房号',
    width: '120',
  },
  {
    prop: 'validity',
    label: '有效期',
    width: '120',
  },
  {
    prop: 'type',
    label: '业主身份',
  },
  {
    prop: 'OwnerState',
    label: '状态',
  },
  {
    prop: 'operation',
    label: '操作',
    width: '200',
  },
]);
const ExamineTablist = reactive([
  {
    prop: 'ownerName',
    label: '姓名',
    width: '100',
  },
  {
    prop: 'iphone',
    label: '手机号',
    width: '180',
  },
  {
    prop: 'Cname',
    label: '小区',
    width: '120',
  },
  {
    prop: 'Bname',
    label: '楼宇',
    width: '100',
  },
  {
    prop: 'units',
    label: '单元',
    width: '100',
  },
  {
    prop: 'roomNumber',
    label: '房间号',
    width: '120',
  },
  {
    prop: 'InTime',
    label: '申请时间',
    width: '150',
  },
  {
    prop: 'OwnerState',
    label: '状态',
  },
  {
    prop: 'notes',
    label: '备注',
  },
  {
    prop: 'operation',
    label: '操作',
    width: '200',
  },
]);
const OutTablist = reactive([
  {
    prop: 'ownerName',
    label: '姓名',
  },

  {
    prop: 'Cname',
    label: '小区',
  },
  {
    prop: 'iphone',
    label: '手机号',
  },
  {
    prop: 'roomNumber',
    label: '房间号',
  },
  {
    prop: 'InTime',
    label: '注册时间',
  },
  {
    prop: 'OwnerState',
    label: '状态',
  },
  {
    prop: 'operation',
    label: '操作',
  },
]);
//获取数据
const getOwnerFn = (count) => {
  if (activeName.value === 'first') {
    OwnerFn(count, '0', '租客');
  } else if (activeName.value === 'second') {
    OwnerFn(count, '1', '租客');
  } else if (activeName.value === 'third') {
    OwnerFn(count, '2', '租客');
  } else if (activeName.value === 'fourth') {
    OwnerFn(count, '3', '租客');
  }
};
const OwnerFn = (count, OwnerState, type) => {
  getOwnerList({ count: '', OwnerState, type }).then((res) => {
    state.inDataList = res; 
  });
  getOwnerList({ count, OwnerState, type }).then((res) => {
    state.inTableData = res;
  });
};
getOwnerFn(state.count);
//页面改变时获取数据
watch(
  () => activeName.value,
  () => {
    getOwnerFn(state.count);
    state.searchList = '';
  }
);
//获取小区名称
getCommunityList().then((res) => {
  let arr = [];
  res.forEach((item) => {
    arr.push(item.Cname);
  });
  state.Cname = arr;
});
getBulidList().then((res) => {
  state.BulidList = res;
});
//添加
const addOwner = () => {
  flag.value = false;
  state.title = '添加住户';
  state.type = '添加';
  state.formList = '';
};
//详情
const detailFn = (scope) => {
  flag.value = false;
  state.title = '住户详情';
  state.type = '详情';
  state.formList = scope.row;
};
//修改
const updateFn = (scope) => {
  flag.value = false;
  state.tltle = '修改住户';
  state.type = '修改';
  state.formList = scope.row;
};
//审核
const pass = (scope) => {
  dialog.dialogVisible = true;
  state.type = '审核';
  dialog.title = '审核通过吗';
  dialog.cancleText = '不通过';
  dialog.confirmText = '通过';
  state.formList = scope.row;
};
//删除
const deleteFn = (scope) => {
  dialog.dialogVisible = true;
  state.type = '删除';
  dialog.title = '是否要删除该业主信息';
  dialog.cancleText = '取消';
  dialog.confirmText = '删除';
  state.formList = scope.row;
};
//删除全部
const deleteAll = () => {
  dialog.dialogVisible = true;
  state.type = '全部删除';
  dialog.title = '是否删除所有选中的业主信息';
  dialog.cancleText = '取消';
  dialog.confirmText = '删除';
  state.formList = scope.row;
};
//迁入
const moveInFn = (scope) => {
  dialog.dialogVisible = true;
  state.type = '迁入';
  dialog.title = '是否迁入该业主？';
  dialog.cancleText = '取消';
  dialog.confirmText = '迁入';
  state.formList = scope.row;
};
const moveInAll = () => {
  dialog.dialogVisible = true;
  state.type = '全部迁入';
  dialog.title = '是否迁入全部选中的内容？';
  dialog.cancleText = '取消';
  dialog.confirmText = '迁入';
  state.formList = scope.row;
};
//迁出
const moveOutFn = (scope) => {
  dialog.dialogVisible = true;
  state.type = '迁出';
  dialog.title = '是否迁出？';
  dialog.cancleText = '取消';
  dialog.confirmText = '迁出';
  state.formList = scope.row;
};
//全部迁出
const moveOutAll = (scope) => {
  dialog.dialogVisible = true;
  state.type = '全部迁出';
  dialog.title = '是否迁出所有选中的业主？';
  dialog.cancleText = '取消';
  dialog.confirmText = '迁出';
};
//全部通过
const passAll = () => {
  dialog.dialogVisible = true;
  state.type = '全部通过';
  dialog.title = '是否通过所有选中的业主？';
  dialog.cancleText = '取消';
  dialog.confirmText = '通过';
};
//全部不通过
const nopassAll = () => {
  dialog.dialogVisible = true;
  state.type = '全部不通过';
  dialog.title = '是否不通过所有选中的业主？';
  dialog.cancleText = '取消';
  dialog.confirmText = '通过';
};
//搜索
const searchFn = (OwnerState) => {
  searchOwnerList({ searchList: state.searchList, OwnerState }).then((res) => {
    if (res) {
      state.inTableData = res.slice((state.count - 1) * 10, 10 * state.count);
      state.inDataList = res;
    }
  });
};
const searchVisitor = () => {
  if (activeName.value === 'first') {
    searchFn('0', '业主');
  } else if (activeName.value === 'second') {
    searchFn('1', '业主');
  } else if (activeName.value === 'third') {
    searchFn('2', '业主');
  } else if (activeName.value === 'fourth') {
    searchFn('3', '业主');
  }
};
searchVisitor();
const confirm = async (form) => {
  if (state.type === '添加') {
    let flag = 0;
    await pushOwnerList(form).then((res) => {
      if (res === '0') {
        addOwnerList(form).then((res) => {
          getOwnerFn(state.count);
          ElMessage({
            message: '添加成功',
            type: 'success',
          });
        });
      } else {
        ElMessage({
          message: '户主已经存在,请将其添加为租客或亲属',
          type: 'error',
        });
        flag = 1;
      }
    });
    if (flag === 1) return;
  } else if (state.type === '修改') {
    BupdateOwnerList(form).then((res) => {
      updateOwnerList(form).then((res) => {
        getOwnerFn(state.count);
        ElMessage({
          message: '修改成功',
          type: 'success',
        });
      });
    });
  } else if (state.type === '删除') {
    deleteOwnerList(state.formList).then((res) => {
      getOwnerFn(state.count);
      ElMessage({
        message: '删除成功',
        type: 'success',
      });
    });
  } else if (state.type === '全部删除') {
    if (store.state.idc.selectCar.length === 0) {
      ElMessage({
        message: '没有选中业主信息',
        type: 'warning',
      });
      dialog.dialogVisible = false;
      return;
    }
    store.state.idc.selectCar.forEach((item) => {
      deleteOwnerList(item).then((res) => {
        getOwnerFn(state.count);
      });
    });
    ElMessage({
      message: '删除成功',
      type: 'success',
    });
  } else if (state.type === '审核') {
    JoinOwnerList(state.formList).then((res) => {
      passOwnerList(state.formList).then((res) => {
        getOwnerFn(state.count);
        ElMessage({
          message: '审核成功',
          type: 'success',
        });
      });
    });
  } else if (state.type === '全部通过') {
    if (store.state.idc.selectCar.length === 0) {
      ElMessage({
        message: '没有选中业主信息',
        type: 'warning',
      });
      dialog.dialogVisible = false;
      return;
    }
    store.state.idc.selectCar.forEach((item) => {
      JoinOwnerList(state.formList).then((res) => {
        passOwnerList(item).then((res) => {
          getOwnerFn(state.count);
        });
      });
    });
    ElMessage({
      message: '审核成功',
      type: 'success',
    });
  } else if (state.type === '全部不通过') {
    if (store.state.idc.selectCar.length === 0) {
      ElMessage({
        message: '没有选中业主信息',
        type: 'warning',
      });
      dialog.dialogVisible = false;
      return;
    }
    store.state.idc.selectCar.forEach((item) => {
      noPassOwnerList(item).then((res) => {
        getOwnerFn(state.count);
      });
    });
    ElMessage({
      message: '审核成功',
      type: 'success',
    });
  } else if (state.type === '迁出') {
    NoJoinOwnerList(state.formList).then((res) => {
      moveOutOwnerList(state.formList).then((res) => {
        getOwnerFn(state.count);
        ElMessage({
          message: '迁出成功',
          type: 'success',
        });
      });
    });
  } else if (state.type === '全部迁出') {
    if (store.state.idc.selectCar.length === 0) {
      ElMessage({
        message: '没有选中业主信息',
        type: 'warning',
      });
      dialog.dialogVisible = false;
      return;
    }
    store.state.idc.selectCar.forEach((item) => {
      NoJoinOwnerList(state.formList).then((res) => {
        moveOutOwnerList(item).then((res) => {
          getOwnerFn(state.count);
        });
      });
    });
    ElMessage({
      message: '全部迁出成功',
      type: 'success',
    });
  } else if (state.type === '迁入') {
    JoinOwnerList(state.formList).then((res) => {
      moveInOwnerList(state.formList).then((res) => {
        getOwnerFn(state.count);
        ElMessage({
          message: '迁入成功',
          type: 'success',
        });
      });
    });
  } else if (state.type === '全部迁入') {
    if (store.state.idc.selectCar.length === 0) {
      ElMessage({
        message: '没有选中业主信息',
        type: 'warning',
      });
      dialog.dialogVisible = false;
      return;
    }
    store.state.idc.selectCar.forEach((item) => {
      JoinOwnerList(state.formList).then((res) => {
        moveInOwnerList(item).then((res) => {
          getOwnerFn(state.count);
        });
      });
    });
    ElMessage({
      message: '全部迁入成功',
      type: 'success',
    });
  }
  dialog.dialogVisible = false;
  flag.value = true;
};
const cancle = () => {
  flag.value = true;
  dialog.dialogVisible = false;
  if (state.type === '审核') {
    getOwnerFn(state.count);
    ElMessage({
      message: '审核成功',
      type: 'success',
    });
  }
};
const current = (count) => {
  state.count = count;
  if (state.searchList) {
    searchVisitor();
  } else {
    getOwnerFn(state.count);
  }
};
</script>

<style lang="scss" scoped>
.container {
  .header {
    h4 {
      margin-bottom: 10px;
    }
    p {
      margin-top: 10px;
      font-size: 14px;
    }
  }
  .tabs_header {
    display: flex;
    height: 50px;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;
    .el-button {
      width: 100px;
      height: 35px;
    }
    .search {
      display: flex;
      align-items: center;
      margin-top: 10px;
    }
    .el-input {
      height: 35px;
    }
  }
}
.search {
  .el-input {
    float: right;
    width: 300px;
    height: 30px;
    margin-bottom: 10px;
  }
}
.Tab {
  text-align: center;
  span {
    font-size: 12px;
    margin-left: 10px;
    color: rgb(97, 97, 246);
    cursor: pointer;
  }
}
.bottom {
  display: block;
  margin-top: 10px;
}
.OwnerState {
  color: rgb(100, 231, 100);
  font-size: 14px;
}
.wait {
  color: rgb(120, 116, 1);
  font-size: 14px;
}
.no {
  color: rgb(245, 0, 0);
  font-size: 14px;
}
.out {
  color: rgb(245, 131, 0);
  font-size: 14px;
}
</style>
