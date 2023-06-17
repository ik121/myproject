<template>
  <dialogCom
    :dialog="dialog"
    @cancle="cancle"
    :before-close="closeDialog"
    @confirm="confirm">
    <template #operation>
      <el-form
        ref="ruleFormRef"
        :rules="rules"
        :model="form"
        label-width="100px">
        <el-form-item label="选择单元号:" prop="units">
          <el-select
            :disabled="isOk"
            v-model="form.units"
            placeholder="请选择单元号"
            size="large">
            <el-option
              v-for="(item, index) in Number(props.BulidList.units)"
              :key="index"
              :value="String(index + 1)"
              :label="index + 1 + '单元'" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择楼号:" prop="floor">
          <el-select
            :disabled="isOk"
            v-model="form.floor"
            placeholder="请选择楼号"
            size="large">
            <el-option
              v-for="(item, index) in Number(props.BulidList.floor)"
              :key="index"
              :value="String(index + 1)"
              :label="index + 1 + '楼'" />
          </el-select>
        </el-form-item>
        <el-form-item label="输入房号:" prop="roomNumber">
          <el-input
            :disabled="isOk"
            v-model="form.roomNumber"
            placeholder="请输入房号" />
        </el-form-item>
        <el-form-item label="输入朝向:">
          <el-input v-model="form.toward" placeholder="请输入朝向" />
        </el-form-item>
        <el-form-item label="建筑面积:">
          <el-input v-model="form.buildSpace" placeholder="请输入建筑面积" />
        </el-form-item>
        <el-form-item label="套房面积:">
          <el-input v-model="form.InnerSpace" placeholder="请输入套房面积" />
        </el-form-item>
        <el-form-item label="公摊面积:">
          <el-input v-model="form.PublicSpace" placeholder="请输入公摊面积" />
        </el-form-item>
        <el-form-item label="房屋户型:">
          <div class="small">
            <el-input v-model="form.chamber" />
            <span>室</span>
          </div>
          <div class="small">
            <el-input v-model="form.office" />
            <span>厅</span>
          </div>
          <div class="small">
            <el-input v-model="form.defend" />
            <span>卫</span>
          </div>
        </el-form-item>
      </el-form>
    </template>
  </dialogCom>
</template>

<script setup>
import { reactive, watch, ref } from 'vue';
const isOk = ref(false);
const ruleFormRef = ref();
const props = defineProps({
  BulidList: Object,
  dialog: Object,
  isDetail: Boolean,
  type: String,
  itemChild: Object,
});
const form = reactive({
  units: '',
  floor: '',
  roomNumber: '',
  toward: '',
  buildSpace: '', //建筑面积
  InnerSpace: '', //套房面积
  PublicSpace: '', //公摊面积
  chamber: '', //室
  office: '', //厅
  defend: '', //卫
});
const rules = reactive({
  units: [{ required: true, message: '请输入单元号', trigger: 'blur' }],
  floor: [
    {
      required: true,
      message: '请输入楼层',
      trigger: 'blur',
    },
  ],
  roomNumber: [
    {
      required: true,
      message: '请输入房间号',
      trigger: 'blur',
    },
  ],
});
watch(
  () => props.isDetail,
  () => {
    if (props.type === '添加') {
      form.units = '';
      form.floor = '';
      form.roomNumber = '';
      form.toward = '';
      form.buildSpace = ''; //建筑面积
      form.InnerSpace = ''; //套房面积
      form.PublicSpace = ''; //公摊面积
      form.chamber = ''; //室
      form.office = ''; //厅
      form.defend = ''; //卫
      isOk.value = false;
    } else {
      isOk.value = true;
      Object.assign(form, props.itemChild);
    }
  }
);

const emits = defineEmits(['cancle', 'confirm']);
const confirm = () => {
  if (!ruleFormRef) return;
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      emits('confirm', form);
    }
  });
};
const cancle = () => {
  ruleFormRef.value.clearValidate();
  emits('cancle');
};
const closeDialog = () => {
  ruleFormRef.value.clearValidate();
  emits('cancle');
};
</script>
<style lang="scss" scoped>
.el-input {
  width: 480px;
}
.small {
  display: flex;
  margin-right: 30px;
  padding-right: 10px;
  border: 1px solid rgb(202, 202, 202);
  .el-input {
    width: 60px;
    margin-right: 10px;
    border-right: 1px solid rgb(207, 207, 207);
    :deep(.el-input__wrapper) {
      box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
        inset;
    }
  }
}
</style>
