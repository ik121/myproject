<template>
  <div class="container">
    <h2>{{ tltle }}</h2>
    <div class="main">
      <el-form
        :model="form"
        label-width="120px"
        ref="ruleFormRef"
        :rules="rules"
        :disabled="isDflag">
        <el-form-item label="选择小区*:" prop="Cname">
          <el-select v-model="form.Cname" placeholder="请选择">
            <el-option
              v-for="item in state.CommunityList"
              :key="item.id"
              :value="item.Cname">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车位号*:" prop="ParkingId">
          <el-input
            :disabled="type === 'update' ? true : false"
            v-model="form.ParkingId"
            placeholder="请输入" />
        </el-form-item>
        <el-form-item label="产权面积*:">
          <el-input v-model="form.ParkingSpace" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="车位状态:">
          <el-select v-model="form.ParkingState" placeholder="请选择">
            <el-option value="空置" />
            <el-option value="自用" />
            <el-option value="出租" />
          </el-select>
        </el-form-item>
        <el-form-item label="车位类型:">
          <el-select v-model="form.ParkingType" placeholder="请选择">
            <el-option value="公共车位" />
            <el-option value="产权车位" />
          </el-select>
        </el-form-item>
        <el-form-item label="收费标准金额:">
          <el-input v-model="form.Feeamount" placeholder="请输入" />
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
import { addCarList, updateCarList, getCommunityList } from '../../../api/IDC';
const ruleFormRef = ref();
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
const rules = reactive({
  Cname: [{ required: true, message: '请选中小区名称', trigger: 'blur' }],
  ParkingId: [{ required: true, message: '请输入车位id', trigger: 'blur' }],
});
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
  if (!ruleFormRef) return;
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      if (props.type === 'add') {
        await addCarList(form).then((res) => {
          ElMessage({
            message: '添加成功',
            type: 'success',
          });
        });
      } else {
        await updateCarList(form).then((res) => {
          ElMessage({
            message: '修改成功',
            type: 'success',
          });
        });
      }
      emits('back');
    }
  });
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
