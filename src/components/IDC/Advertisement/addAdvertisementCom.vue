<template>
  <div class="container">
    <h2>{{ tltle }}</h2>
    <div class="main">
      <el-form :model="form" label-width="120px" :disabled="isDflag">
        <el-form-item label="选择小区*:">
          <el-select v-model="form.Cname" placeholder="请选择">
            <el-option
              v-for="item in state.CommunityList"
              :key="item.id"
              :value="item.Cname">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告昵称*:">
          <el-input
            :disabled="type === 'update' ? true : false"
            v-model="form.adverName"
            placeholder="请输入" />
        </el-form-item>
        <el-form-item label="广告位状态:">
          <el-select v-model="form.adverState" placeholder="请选择">
            <el-option value="出租中" />
            <el-option value="空置" />
          </el-select>
        </el-form-item>
        <el-form-item label="小区地址:">
          <el-input v-model="form.adverAddress" placeholder="请输入小区地址" />
        </el-form-item>
        <el-form-item label="广告位面积:">
          <el-input v-model="form.adverlarge" placeholder="请输入广告位状态" />
        </el-form-item>
        <el-form-item label="广告位价格:">
          <el-input v-model="form.adverprice" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <div class="bottom">
        <el-button @click="next" type="primary">保存</el-button>
        <el-button @click="back">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import {
  addAdvertisementList,
  updateAdvertisementList,
  getCommunityList,
} from '@/api/IDC';
const state = reactive({
  CommunityList: [],
});
const form = reactive({
  ParkingId: '',
  Cname: '',
  ParkingType: '',
  ParkingState: '',
  ParkingSpace: '',
  Feeamount: '',
});
const isDflag = ref(false);
const props = defineProps({
  formList: Object,
  tltle: String,
  type: String,
});
const emits = defineEmits(['back']);
if (props.formList) {
  Object.assign(form, props.formList);
  if (props.type === 'details') {
    isDflag.value = true;
  } else {
    isDflag.value = false;
  }
}
getCommunityList().then((res) => {
  state.CommunityList = res;
});

const next = async () => {
  if (props.type === 'add') {
    await addAdvertisementList(form).then((res) => {
      ElMessage({
        message: '添加成功',
        type: 'success',
      });
    });
  } else {
    await updateAdvertisementList(form).then((res) => {
      ElMessage({
        message: '修改成功',
        type: 'success',
      });
    });
  }
  emits('back');
};
const back = () => {
  emits('back');
};
</script>

<style scoped lang="scss">
.container {
  flex-direction: column;
  h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .main {
    width: 800px;
    padding: 20px;
    background-color: white;
    .el-form-item {
      border-bottom: 1px solid rgb(236, 236, 236);
      padding: 20px;
    }
    .el-select {
      width: 180px;
      margin-right: 10px;
    }
    .place {
      width: 200px;
    }
  }
  .bottom {
    display: flex;
    justify-content: center;
    padding-bottom: 30px;
  }
  .address {
    display: flex;
  }
}
</style>
