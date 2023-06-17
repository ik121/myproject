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
        <el-form-item label="等级车牌*:">
          <el-input v-model="form.LicensePlate" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="车主名称*:">
          <el-input v-model="form.Carowner" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="form.iphone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="绑定的车辆:" v-if="isDflag">
          <el-input v-model="form.Associated" placeholder="请绑定车辆" />
        </el-form-item>
        <el-form-item label="选择时间:">
          <el-config-provider :locale="zhCn">
            <el-date-picker
              v-model="form.VehicleTime"
              type="daterange"
              range-separator="To"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :size="size" />
          </el-config-provider>
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
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import {
  addVehicleList,
  updateVehicleList,
  getCommunityList,
} from '../../../api/IDC';
const state = reactive({
  CommunityList: [],
});
const form = reactive({
  Cname: '',
  LicensePlate: '',
  Carowner: '',
  iphone: '',
  Associated: '',
  VehicleTime: '',
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
  form.startTime = form.VehicleTime[0];
  form.endTime = form.VehicleTime[1];
  if (props.type === 'add') {
    await addVehicleList(form).then((res) => {
      ElMessage({
        message: '添加成功',
        type: 'success',
      });
    });
  } else {
    await updateVehicleList(form).then((res) => {
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
