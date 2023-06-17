<template>
  <div class="container" v-if="flag">
    <div class="header">
      <div class="header_left">
        <el-button @click="addAdvertisement" type="primary">添加</el-button>
        <el-button type="success">导入</el-button>
        <el-button>删除</el-button>
      </div>
      <div class="header_right">
        <el-input
          size="small"
          v-model="state.searchList"
          @keyup.enter="searchAdvertisement"
          placeholder="搜索广告的名称 "
          :prefix-icon="Search" />
      </div>
    </div>
    <div class="Tab">
      <TableCom
        :selection="selection"
        :tableData="state.tableData"
        :tablist="tablist">
        <template #adverId="scope"> adver{{ scope.row.adverId }} </template>
        <template #adverlarge="scope"> {{ scope.row.adverlarge }}m2 </template>
        <template #Feeamount="scope"> ￥{{ +scope.row.Feeamount }}元 </template>
        <template #operation="scope">
          <span @click="detailsFn(scope)">详情</span>
          <span @click="updateFn(scope)">编辑</span>
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
  <addAdvertisementCom
    v-else
    :tltle="state.tltle"
    :type="state.type"
    @back="back"
    :formList="state.formList"></addAdvertisementCom>
  <dialogCom :dialog="dialog" @cancle="cancle" @confirm="confirm"></dialogCom>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { reactive, ref, watch } from 'vue';
import {
  getAdvertisementList,
  deleteAdvertisementList,
  searchAdvertisementList,
} from '@/api/IDC';
import TableCom from '@/components/Other/tableCom.vue';
import addAdvertisementCom from '@/components/IDC/Advertisement/addAdvertisementCom.vue';
import dialogCom from '@/components/Other/dialogCom.vue';
import paginationCom from '@/components/Other/paginationCom.vue';
import { ElMessage } from 'element-plus';
const flag = ref(true);
const state = reactive({
  tableData: [],
  tabList: [],
  formList: {},
  tltle: '',
  type: '',
  deleteId: '',
  searchList: '',
  Clist: '',
  count: 1,
});
const tablist = reactive([
  {
    prop: 'adverId',
    label: '广告位编号',
  },
  {
    prop: 'adverName',
    label: '广告位名称',
  },
  {
    prop: 'Cname',
    label: '所属小区',
  },
  {
    prop: 'adverState',
    label: '车位状态',
  },
  {
    prop: 'adverlarge',
    label: '广告位面积',
  },
  {
    prop: 'adverprice',
    label: '广告位价格',
  },
  {
    prop: 'operation',
    width: '340',
    label: '操作',
  },
]);
const dialog = reactive({
  dialogVisible: false,
  title: '确定要删除吗？',
  cancleText: '取消',
  confirmText: '确定',
  width: '30%',
});
const detailsFn = (scope) => {
  flag.value = false;
  state.tltle = '详细信息';
  state.formList = scope.row;
  state.type = 'details';
};
//获取车辆记录
const getAdvertisementListFn = (count) => {
  getAdvertisementList().then((res) => {
    state.tabList = res;
  });
  getAdvertisementList(count).then((res) => {
    state.tableData = res;
  });
};
getAdvertisementListFn(state.count);
//删除车辆记录
const deleteFn = (scope) => {
  dialog.dialogVisible = true;
  state.deleteId = scope.row.ParkingId;
};
//弹出框取消
const cancle = () => {
  dialog.dialogVisible = false;
};
//弹出框确认
const confirm = () => {
  dialog.dialogVisible = false;
  state.tabList.forEach((item) => {
    if (item.ParkingId === state.deleteId) {
      deleteAdvertisementList(item).then((res) => {
        ElMessage({
          message: '删除成功',
          type: 'success',
        });
        if (state.searchList) {
          searchAdvertisement();
        } else {
          getAdvertisementListFn(state.count);
        }
      });
    }
  });
};
//搜索车辆记录
const searchAdvertisement = () => {
  searchAdvertisementList(state.searchList).then((res) => {
    if (res) {
      state.tableData = res.slice((state.count - 1) * 10, 10 * state.count);
      state.tabList = res;
    }
  });
};
searchAdvertisement();

//添加车辆记录
const addAdvertisement = () => {
  flag.value = false;
  state.tltle = '添加车位';
  state.formList = '';
  state.type = 'add';
};
//修改车辆记录
const updateFn = (scope) => {
  flag.value = false;
  state.tltle = '编辑车位';
  state.formList = scope.row;
  state.type = 'update';
};

const current = (count) => {
  state.count = count;
  if (state.searchList) {
    searchAdvertisement();
  } else {
    getAdvertisementListFn(state.count);
  }
};

const back = () => {
  flag.value = true;
  if (state.searchList) {
    searchAdvertisement();
  } else {
    getAdvertisementListFn(state.count);
  }
};
</script>

<style scoped lang="scss">
.container {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-input {
      width: 250px;
      height: 30px;
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
    margin-top: 20px;
    width: 100%;
  }
}
</style>
