<template>
  <dialogCom
    :dialog="props.dialog"
    :before-close="closeDialog"
    @cancle="cancle"
    @confirm="confirm">
    <template #operation>
      <el-form
        :model="form"
        ref="ruleFormRef"
        :rules="rules"
        label-width="100px">
        <el-form-item label="楼栋名称:" prop="Bname">
          <el-input
            :disabled="isOk"
            v-model="form.Bname"
            placeholder="请输入楼栋名称" />
        </el-form-item>
        <el-form-item label="楼宇朝向:">
          <el-input v-model="form.toward" placeholder="请输入楼宇朝向" />
        </el-form-item>
        <el-form-item label="楼高:">
          <el-input v-model="form.height" placeholder="请输入楼高" />
        </el-form-item>
        <el-form-item label="楼宇结构:">
          <el-input v-model="form.structure" placeholder="请输入楼高" />
        </el-form-item>
        <el-form-item label="单元数:" prop="units">
          <el-input
            v-model="form.units"
            placeholder="请输入单元数(最多为4单元)" />
        </el-form-item>
        <el-form-item label="楼层:" prop="floor">
          <el-input v-model="form.floor" placeholder="请输入楼层数" />
        </el-form-item>
      </el-form>
    </template>
  </dialogCom>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import dialogCom from '@/components/Other/dialogCom.vue';
const ruleFormRef = ref();
import {
  addBulidList,
  deleteBulidList,
  getBulidList,
  updateBuildList,
} from '@/api/IDC.js';
const props = defineProps({
  dialog: Object,
  Cname: String,
  Bname: String,
  type: Object,
  isBuild: Boolean,
});
const isOk = ref(false);
const form = reactive({
  Bname: '', //楼栋名称
  toward: '', //朝向
  height: '', //楼高
  structure: '', //楼宇结构
  units: '', //单元数
  floor: '', //楼层
});
const emits = defineEmits(['close']);
const rules = reactive({
  units: [{ required: true, message: '请输入单元号', trigger: 'blur' }],
  floor: [
    {
      required: true,
      message: '请输入楼层',
      trigger: 'blur',
    },
  ],
  Bname: [
    {
      required: true,
      message: '请输入楼栋名称',
      trigger: 'blur',
    },
  ],
});

watch(
  () => props.isBuild,
  () => {
    if (props.type === '修改') {
      getBulidList().then((res) => {
        res.forEach((item) => {
          if (props.Cname === item.Cname) {
            item.Bulid.forEach((Bitem) => {
              if (props.Bname === Bitem.Bname) {
                Object.assign(form, Bitem);
              }
            });
          }
        });
      });
      isOk.value = true;
    } else if (props.type === '添加') {
      form.Bname = ''; //楼栋名称
      form.toward = ''; //朝向
      form.height = ''; //楼高
      form.structure = ''; //楼宇结构
      form.units = ''; //单元数
      form.floor = ''; //楼层
      isOk.value = false;
    }
  }
);

const confirm = () => {
  if (!ruleFormRef) return;
  if (props.type === '添加') {
    ruleFormRef.value.validate(async (valid) => {
      if (valid) {
        if (Number(form.units) > 4) {
          ElMessage({
            message: '单元号最多为4单元',
            type: 'error',
          });
          return;
        }
        await getBulidList().then((res) => {
          for (let i = 0; i < res.length; i++) {
            if (res[i].Cname === props.Cname) {
              for (let j = 0; j < res[i].Bulid.length; j++) {
                if (res[i].Bulid[j].Bname === form.Bname) {
                  ElMessage({
                    message: '楼宇名称已经存在',
                    type: 'error',
                  });
                  return
                }
              }
            }
          }
          addBulidList({ Cname: props.Cname, ...form }).then((res) => {
            ElMessage({
              message: '添加成功',
              type: 'success',
            });
            emits('close', props.type);
          });
        });
      }
    });
  } else if (props.type === '删除') {
    deleteBulidList({ Bname: props.Bname, Cname: props.Cname }).then((res) => {
      ElMessage({
        message: '删除成功',
        type: 'success',
      });
      emits('close', props.type);
    });
  } else if (props.type === '修改') {
    updateBuildList({ Cname: props.Cname, form }).then((res) => {
      ElMessage({
        message: '修改成功',
        type: 'success',
      });
      emits('close', props.type, form);
    });
  }
};
const cancle = () => {
  ruleFormRef.value.clearValidate();
  emits('close');
};
const closeDialog = () => {
  ruleFormRef.value.clearValidate();
  emits('close');
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 480px;
}
</style>
