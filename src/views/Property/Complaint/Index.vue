<template>
  <div class="container">
    <div class="header">
      <div class="header_left">
        <el-button @click="addComplaint" type="primary">+录入投诉</el-button>
      </div>
      <div class="header_right">
        <el-input
          size="small"
          v-model="state.searchList"
          @keyup.enter="searchComplaint"
          placeholder="搜索投诉人的名称 "
          :prefix-icon="Search" />
      </div>
    </div>
    <div class="Tab">
      <TableCom :tableData="state.tableData" :tablist="tablist">
        <template #ComplaintState="scope">
          <div
            :class="{
              StateOk: scope.row.ComplaintState === '0' ? true : false,
              StateNo: scope.row.ComplaintState === '1' ? true : false,
            }">
            {{ scope.row.ComplaintState === '0' ? '已处理' : '待受理' }}
          </div>
        </template>
        <template #operation="scope">
          <span @click="Acceptance(scope)">受理</span>
        </template>
      </TableCom>
    </div>
    <div class="bottom">
      <paginationCom
        :total="state.tabList.length"
        @current="current"></paginationCom>
    </div>
  </div>
  <addComplaintCom
    :tltle="state.tltle"
    :type="state.type"
    @back="back"
    :dialog="dialog"
    @cancle="cancle"
    @confirm="confirm"
    :formList="state.formList"></addComplaintCom>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import {
  getComplaintList,
  searchComplaintList,
  addComplaintList,
  acceptanceList,
} from '@/api/Property';
import TableCom from '../../../components/Other/tableCom.vue';
import paginationCom from '../../../components/Other/paginationCom.vue';
import addComplaintCom from '@/components/Property/addComplaintCom.vue';
import { ElMessage } from 'element-plus';
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
    prop: 'Cname',
    label: '小区',
  },
  {
    prop: 'complainant',
    label: '投诉建议人',
  },
  {
    prop: 'ComplaintTime',
    label: '投诉日期',
  },
  {
    prop: 'iphone',
    label: '联系电话',
  },
  {
    prop: 'ComplaintState',
    label: '状态',
  },
  {
    prop: 'ComplaintContent',
    label: '投诉内容',
  },
  {
    prop: 'Publisher',
    label: '受理人',
  },
  {
    prop: 'ProcessingTime',
    label: '受理时间',
  },
  {
    prop: 'operation',
    label: '操作',
  },
]);
const dialog = reactive({
  dialogVisible: false,
  title: '录入投诉',
  cancleText: '取消',
  confirmText: '确定',
  width: '40%',
  name: 'acceptance',
});
//获取公告记录
const getComplaintListFn = (count) => {
  getComplaintList().then((res) => {
    state.tabList = res;
  });
  getComplaintList(count).then((res) => {
    state.tableData = res;
  });
};
getComplaintListFn(state.count);

//弹出框取消
const cancle = () => {
  dialog.dialogVisible = false;
};
//弹出框确认
const confirm = (form) => {
  if (state.type === 'add') {
    addComplaintList(form).then((res) => {
      getComplaintListFn(state.count);
      ElMessage({
        type: 'success',
        message: '添加成功',
      });
    });
  } else {
    console.log(form);
    
    acceptanceList({ form, formList: state.formList }).then((res) => {
      getComplaintListFn(state.count);
      ElMessage({
        type: 'success',
        message: '录入成功',
      });
    });
  }
  dialog.dialogVisible = false;
};
//搜索车辆记录
const searchComplaint = () => {
  searchComplaintList(state.searchList).then((res) => {
    if (res) {
      state.tableData = res.slice((state.count - 1) * 10, 10 * state.count);
      state.tabList = res;
    }
  });
};
searchComplaint();
const addComplaint = () => {
  dialog.dialogVisible = true;
  dialog.tltle = '录入投诉';
  state.formList = '';
  state.type = 'add';
  dialog.name = 'operation';
};
const Acceptance = (scope) => {
  dialog.dialogVisible = true;
  dialog.tltle = '受理';
  state.type = 'acceptance';
  dialog.name = 'acceptance';
  state.formList = scope.row;
};

const current = (count) => {
  state.count = count;
  if (state.searchList) {
    searchComplaint();
  } else {
    getComplaintListFn(state.count);
  }
};

const back = () => {
  flag.value = true;
  if (state.searchList) {
    searchComplaint();
  } else {
    getComplaintListFn(state.count);
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
    .el-button {
      width: 150px;
      height: 40px;
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
.StateOk {
  color: rgb(7, 227, 77);
}
.StateNo {
  color: rgb(254, 136, 1);
}
</style>
