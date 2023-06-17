<template>
  <div class="container" v-if="flag">
    <div class="header">
      <div class="header_left">
        <el-button @click="addVehicle" type="primary">添加</el-button>
        <el-button type="success">导入</el-button>
      </div>
      <div class="header_right">
        <el-input
          size="small"
          v-model="state.searchList"
          @keyup.enter="searchVehicle"
          placeholder="搜索车位号的名称 "
          :prefix-icon="Search" />
      </div>
    </div>
    <div class="Tab">
      <TableCom :tableData="state.tableData" :tablist="tablist">
        <template #startTime="scope">
          {{ scope.row.startTime.slice(0, 10) }}
        </template>
        <template #endTime="scope">
          {{ scope.row.endTime.slice(0, 10) }}
        </template>
        <template #Associated="scope">
          {{ scope.row.Associated || '暂无' }}
        </template>
        <template #operation="scope">
          <span @click="detailsFn(scope)">详情</span>
          <span @click="bindingFn(scope)">绑定车位</span>
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
    <el-drawer
      v-model="drawer"
      :direction="direction"
      :before-close="handleClose">
      <el-radio-group v-model="radio1" class="radio" size="large">
        <el-radio-button
          v-for="item in state.CarList"
          :key="item.ParkingId"
          :label="item.ParkingId"
          @change="radioChange">
          <template #default>
            <div>{{ item.Cname }}</div>
            <div>{{ item.ParkingType }}</div>
            <div>{{ item.ParkingId }}</div>
          </template>
        </el-radio-button>
      </el-radio-group>
    </el-drawer>
  </div>
  <addVehicleCom
    v-else
    :tltle="state.tltle"
    :type="state.type"
    @back="back"
    :formList="state.formList"></addVehicleCom>
  <dialogCom :dialog="dialog" @cancle="cancle" @confirm="confirm"></dialogCom>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { reactive, ref, watch } from 'vue';
import {
  getVehicleList,
  deleteVehicleList,
  searchVehicleList,
  getCarList,
  updateVehicleList,
  updateParkingStateList,
} from '../../../api/IDC';
import TableCom from '../../../components/Other/tableCom.vue';
import addVehicleCom from '../../../components/IDC/Vehicle/addVehicleCom.vue';
import dialogCom from '../../../components/Other/dialogCom.vue';
import paginationCom from '../../../components/Other/paginationCom.vue';
import { ElMessage } from 'element-plus';
const flag = ref(true);
const drawer = ref(false);
const radio1 = ref();
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
  CarList: [],
  Vehicle: '',
});
const tablist = reactive([
  {
    prop: 'eName',
    label: '车位编号',
    width: '200',
  },
  {
    prop: 'Cname',
    label: '所属小区',
    name: 'text',
  },
  {
    prop: 'LicensePlate',
    label: '登记车牌',
  },
  {
    prop: 'Carowner',
    label: '车主',
  },
  {
    prop: 'iphone',
    label: '手机号',
    width: '120',
  },
  {
    prop: 'Associated',
    label: '绑定车位',
    width: '190',
  },
  {
    prop: 'startTime',
    label: '开始时间',
  },
  {
    prop: 'endTime',
    label: '结束时间',
  },
  {
    prop: 'operation',
    width: '200',
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
  console.log(scope.row);

  state.type = 'details';
};
//获取车辆记录
const getVehicleListFn = (count) => {
  getVehicleList().then((res) => {
    state.tabList = res;
  });
  getVehicleList(count).then((res) => {
    state.tableData = res;
    console.log(res);
  });
};
getVehicleListFn(state.count);
//删除车辆记录
const deleteFn = (scope) => {
  dialog.dialogVisible = true;
  state.deleteId = scope.row.ParkingId;
};
//弹出框取消
const cancle = () => {
  dialog.dialogVisible = false;
};
const bindingFn = (scope) => {
  drawer.value = true;
  state.Vehicle = scope.row;
  state.CarList = [];
  getCarList().then((res) => {
    res.forEach((item) => {
      if (scope.row.Cname === item.Cname && item.ParkingState === '空置') {
        state.CarList.push(item);
      }
    });
  });
};
const radioChange = () => {
  state.Vehicle.Associated = radio1.value;
  updateVehicleList(state.Vehicle).then((res) => {
    ElMessage({
      message: '绑定成功',
      type: 'success',
    });
    updateParkingStateList({
      Associated: state.Vehicle.Associated,
      eName: state.Vehicle.eName,
    }).then((res) => {});
    drawer.value = false;
  });
};
//弹出框确认
const confirm = () => {
  dialog.dialogVisible = false;
  state.tabList.forEach((item) => {
    if (item.ParkingId === state.deleteId) {
      deleteVehicleList(item).then((res) => {
        ElMessage({
          message: '删除成功',
          type: 'success',
        });
        if (state.searchList) {
          searchVehicle();
        } else {
          getVehicleListFn(state.count);
        }
      });
    }
  });
};
//搜索车辆记录
const searchVehicle = () => {
  searchVehicleList(state.searchList).then((res) => {
    if (res) {
      state.tableData = res.slice((state.count - 1) * 10, 10 * state.count);
      state.tabList = res;
    }
  });
};
searchVehicle();

//添加车辆记录
const addVehicle = () => {
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
    searchVehicle();
  } else {
    getVehicleListFn(state.count);
  }
};

const back = () => {
  flag.value = true;
  if (state.searchList) {
    searchVehicle();
  } else {
    getVehicleListFn(state.count);
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
      width: 15.625rem;
      height: 1.875rem;
    }
  }
  .Tab {
    margin-top: 1.875rem;
    text-align: center;

    span {
      font-size: 0.75rem;
      margin-left: 0.625rem;
      color: rgb(97, 97, 246);
      cursor: pointer;
    }
  }
  .bottom {
    margin-top: 1.25rem;
    width: 100%;
  }
  .radio {
    display: flex;
    flex-direction: column;
    .el-radio-button {
      margin-top: 10px;
      border: 1px solid rgb(223, 221, 221);
      div {
        margin-top: 10px;
      }
    }
  }
}
</style>
