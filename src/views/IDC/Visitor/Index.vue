<template>
  <div class="container">
    <div class="header">
      <div class="box">
        <p>所有访客</p>
        <span>{{ state.tabList.length }}</span>
      </div>
      <div class="addVister" @click="addVisiter">
        <p>+</p>
        <h3>新增访客</h3>
      </div>
    </div>
    <div class="search">
      <el-input
        size="small"
        v-model="state.searchList"
        @keyup.enter="searchVisitor"
        placeholder="请输入访客名称"
        :prefix-icon="Search" />
    </div>
    <div class="Tab">
      <TableCom :tableData="state.tableData" :tablist="tablist">
        <template #room="scope">
          {{ scope.row.Bname }} {{ scope.row.uitl }}单元{{ scope.row.floor }}楼
        </template>
        <template #operation="scope">
          <span @click="updateFn(scope)">修改</span>
          <span @click="deleteFn(scope)">删除</span>
        </template>
      </TableCom>
    </div>
    <div class="bottom">
      <paginationCom
        :total="state.tabList.length"
        @current="current"></paginationCom>
    </div>
  </div>
  <addVisitorCom
    :tltle="state.tltle"
    :Cname="state.Cname"
    :BulidList="state.BulidList"
    :formList="state.formList"
    :type="state.type"
    :dialog="dialog"
    @confirm="confirm"
    @cancle="cancle"></addVisitorCom>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { reactive, ref, watch } from 'vue';
import TableCom from '@/components/Other/tableCom.vue';
import paginationCom from '../../../components/Other/paginationCom.vue';
import { ElMessage } from 'element-plus';
import {
  getVisiterList,
  getCommunityList,
  getBulidList,
  addVisiterList,
  updateVisiterList,
  deleteVisiterList,
  searchVisiterList,
} from '../../../api/IDC';
const state = reactive({
  tableData: [],
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
  title: '添加访客',
  cancleText: '取消',
  confirmText: '确定',
  width: '40%',
  name: 'operation',
});
const tablist = reactive([
  {
    prop: 'Vname',
    label: '姓名',
  },
  {
    prop: 'sex',
    label: '性别',
  },
  {
    prop: 'iphone',
    label: '手机号',
  },
  {
    prop: 'Cname',
    label: '访问小区',
  },
  {
    prop: 'room',
    label: '房号',
  },
  {
    prop: 'operation',
    label: '操作',
  },
]);
const getVisiterFn = (count) => {
  getVisiterList().then((res) => {
    state.tabList = res;
  });
  getVisiterList(count).then((res) => {
    state.tableData = res;
  });
};
getVisiterFn(state.count);
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
const addVisiter = () => {
  dialog.dialogVisible = true;
  dialog.title = '添加访客';
  dialog.name = 'operation';
  state.title = '添加访客';
  state.type = '添加';
  state.formList = '';
};
//修改
const updateFn = (scope) => {
  dialog.dialogVisible = true;
  dialog.title = '修改访客';
  dialog.name = 'operation';
  state.tltle = '编辑车位';
  state.formList = scope.row;
  state.title = '修改访客';
  state.type = '修改';
};
//删除
const deleteFn = (scope) => {
  dialog.dialogVisible = true;
  dialog.title = '删除访客';
  state.type = '删除';
  state.formList = scope.row;
  dialog.name = '';
};
//搜索
const searchVisitor = () => {
  searchVisiterList(state.searchList).then((res) => {
    if (res) {
      state.tableData = res.slice((state.count - 1) * 10, 10 * state.count);
      state.tabList = res;
    }
  });
};
searchVisitor();
const confirm = async (form) => {
  if (state.type === '添加') {
    addVisiterList(form).then((res) => {
      getVisiterFn(state.count);
      ElMessage({
        message: '添加成功',
        type: 'success',
      });
    });
  } else if (state.type === '修改') {
    updateVisiterList(form).then((res) => {
      getVisiterFn(state.count);
      ElMessage({
        message: '修改成功',
        type: 'success',
      });
    });
  } else if (state.type === '删除') {
    deleteVisiterList(form).then((res) => {
      getVisiterFn(state.count);
      ElMessage({
        message: '删除成功',
        type: 'success',
      });
    });
  }
  dialog.dialogVisible = false;
};
const cancle = () => {
  dialog.dialogVisible = false;
};
const current = (count) => {
  state.count = count;
  if (state.searchList) {
    searchVisitor();
  } else {
    getVisiterFn(state.count);
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 800px;
  .header {
    display: flex;
  }
  .box {
    width: 300px;
    height: 150px;
    margin-right: 30px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    p {
      font-size: 18px;
      color: rgb(148, 153, 155);
    }
    span {
      font-size: 30px;
      font-weight: 600;
      color: rgb(51, 153, 242);
    }
  }
  .addVister {
    width: 300px;
    height: 150px;
    margin-right: 30px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px dashed rgb(255, 255, 255);
    cursor: pointer;
    p {
      font-size: 26px;
      color: rgb(148, 153, 155);
    }
    h3 {
      font-size: 20px;
    }
  }
  .addVister:hover {
    border: 1px dashed black;
  }
  .search {
    margin-top: 10px;

    .el-input {
      float: right;
      width: 300px;
      height: 30px;
      margin-bottom: 10px;
    }
  }
  .Tab {
    margin-top: 30px;
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
}
</style>
