<template>
  <div class="container" v-if="flag">
    <div class="header">
      <div class="header_left">
        <el-button @click="addNotice" type="primary">+发布公告</el-button>
      </div>
      <div class="header_right">
        <el-input
          size="small"
          v-model="state.searchList"
          @keyup.enter="searchNotice"
          placeholder="搜索公告的名称 "
          :prefix-icon="Search" />
      </div>
    </div>
    <div class="Tab">
      <TableCom :tableData="state.tableData" :tablist="tablist">
        <template #Topping="scope">
          {{ scope.row.Topping === true ? '是' : '否' }}
        </template>
        <template #NoticeState="scope">
          {{ scope.row.NoticeState === '0' ? '草稿' : '已发布' }}
        </template>
        <template #operation="scope">
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
  <addNoticeCom
    v-else
    :tltle="state.tltle"
    :type="state.type"
    @back="back"
    :formList="state.formList"></addNoticeCom>
  <dialogCom :dialog="dialog" @cancle="cancle" @confirm="confirm"></dialogCom>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import {
  getNoticeList,
  deleteNoticeList,
  searchNoticeList,
} from '@/api/Property';
import TableCom from '../../../components/Other/tableCom.vue';
import dialogCom from '../../../components/Other/dialogCom.vue';
import paginationCom from '../../../components/Other/paginationCom.vue';
import addNoticeCom from '@/components/Property/addNoticeCom.vue';
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
    prop: 'NoticeName',
    label: '公告名称',
    width: '340',
  },
  {
    prop: 'PublishTime',
    label: '发布时间',
    width: '150',
  },
  {
    prop: 'Cname',
    label: '所属小区',
    width: '150',
  },
  {
    prop: 'Publisher',
    label: '发布人',
    width: '150',
  },
  {
    prop: 'Topping',
    label: '是否置顶',
    width: '150',
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
//获取公告记录
const getNoticeListFn = (count) => {
  getNoticeList().then((res) => {
    state.tabList = res;
  });
  getNoticeList(count).then((res) => {
    state.tableData = res;
  });
};
getNoticeListFn(state.count);
//删除公告记录
const deleteFn = (scope) => {
  dialog.dialogVisible = true;
  state.type = 'delete';
  state.deleteId = scope.row.NoticeId;
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
      if (item.NoticeId === state.deleteId) {
        deleteNoticeList(item).then((res) => {
          ElMessage({
            message: '删除成功',
            type: 'success',
          });
          if (state.searchList) {
            searchNotice();
          } else {
            getNoticeListFn(state.count);
          }
        });
      }
    });
  }
};
//搜索车辆记录
const searchNotice = () => {
  searchNoticeList(state.searchList).then((res) => {
    if (res) {
      state.tableData = res.slice((state.count - 1) * 10, 10 * state.count);
      state.tabList = res;
    }
  });
};
searchNotice();

//添加车辆记录
const addNotice = () => {
  flag.value = false;
  state.tltle = '添加公告';
  state.formList = '';
  state.type = 'add';
};
//修改车辆记录
const updateFn = (scope) => {
  flag.value = false;
  state.tltle = '编辑公告';
  state.formList = scope.row;
  state.type = 'update';
};

const current = (count) => {
  state.count = count;
  if (state.searchList) {
    searchNotice();
  } else {
    getNoticeListFn(state.count);
  }
};

const back = () => {
  flag.value = true;
  if (state.searchList) {
    searchNotice();
  } else {
    getNoticeListFn(state.count);
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
</style>
