<template>
  <div class="container" v-if="flag">
    <div class="header">
      <div class="header_left">
        <el-button @click="addCar" type="primary">添加</el-button>
        <el-button type="success">导入</el-button>
        <el-button @click="removeCar">删除</el-button>
      </div>
      <div class="header_right">
        <el-input
          size="small"
          v-model="state.searchList"
          @keyup.enter="searchCar"
          placeholder="搜索车位状态 "
          :prefix-icon="Search" />
      </div>
    </div>
    <div class="Tab">
      <TableCom
        :selection="selection"
        :tableData="state.tableData"
        :tablist="tablist">
        <template #ParkingSpace="scope">
          {{ scope.row.ParkingSpace }}m2
        </template>
        <template #ParkingState="scope">
          
          {{ scope.row.ParkingState }}
        </template>
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
  <addCarCom
    v-else
    :tltle="state.tltle"
    :type="state.type"
    @back="back"
    :formList="state.formList"></addCarCom>
  <dialogCom :dialog="dialog" @cancle="cancle" @confirm="confirm"></dialogCom>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { reactive, ref, watch } from 'vue';
import { getCarList, deleteCarList, searchCarList } from '../../../api/IDC';
import TableCom from '../../../components/Other/tableCom.vue';
import addCarCom from '../../../components/IDC/Car/addCarCom.vue';
import dialogCom from '../../../components/Other/dialogCom.vue';
import paginationCom from '../../../components/Other/paginationCom.vue';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
const selection = ref(true);
const flag = ref(true);
const store = useStore();
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
    prop: 'ParkingId',
    label: '车位编号',
    width: '180',
  },
  {
    prop: 'Cname',
    label: '所属小区',
    name: 'text',
  },
  {
    prop: 'ParkingType',
    label: '车位类型',
  },
  {
    prop: 'ParkingState',
    label: '车位状态',
  },
  {
    prop: 'ParkingSpace',
    label: '车位面积',
  },
  {
    prop: 'Feeamount',
    label: '收费标准金额',
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
const getCarListFn = (count) => {
  getCarList().then((res) => {
    state.tabList = res;
  });
  getCarList(count).then((res) => {
    state.tableData = res;
  });
};
getCarListFn(state.count);
//删除车辆记录
const deleteFn = (scope) => {
  dialog.dialogVisible = true;
  state.type = 'delete';
  state.deleteId = scope.row.ParkingId;
};
//弹出框取消
const cancle = () => {
  dialog.dialogVisible = false;
};
//弹出框确认
const confirm = () => {
  dialog.dialogVisible = false;
  if (state.type === 'delete') {
    state.tabList.forEach((item) => {
      if (item.ParkingId === state.deleteId) {
        deleteCarList(item).then((res) => {
          ElMessage({
            message: '删除成功',
            type: 'success',
          });
          if (state.searchList) {
            searchCar();
          } else {
            getCarListFn(state.count);
          }
        });
      }
    });
  } else if (state.type === 'alldelete') {
    store.state.idc.selectCar.forEach((sitem) => {
      deleteCarList(sitem).then((res) => {
        if (state.searchList) {
          searchCar();
        } else {
          getCarListFn(state.count);
        }
      });
    });
  }
};
//搜索车辆记录
const searchCar = () => {
  searchCarList(state.searchList).then((res) => {
    if (res) {
      state.tableData = res.slice((state.count - 1) * 10, 10 * state.count);
      state.tabList = res;
    }
  });
};
searchCar();

//添加车辆记录
const addCar = () => {
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
const removeCar = () => {
  dialog.dialogVisible = true;
  state.type = 'alldelete';
};

const current = (count) => {
  state.count = count;
  if (state.searchList) {
    searchCar();
  } else {
    getCarListFn(state.count);
  }
};

const back = () => {
  flag.value = true;
  if (state.searchList) {
    searchCar();
  } else {
    getCarListFn(state.count);
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
