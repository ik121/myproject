<template>
  <div class="container">
    <h2>{{props.tltle}}</h2>
    <div class="main">
      <el-form
        :model="form"
        label-width="120px"
        ref="ruleFormRef"
        :rules="rules">
        <el-form-item label="公告标题*:" prop="NoticeName">
          <el-input
            v-model="form.NoticeName"
            placeholder="请输入" />
        </el-form-item>
        <el-form-item label="相关小区*:" prop="Cname">
          <el-select v-model="form.Cname" placeholder="请选择">
            <el-option
              v-for="item in state.CommunityList"
              :key="item.id"
              :value="item.Cname">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公告内容*:">
          <el-input
            rows="10"
            type="textarea"
            v-model="form.NoticeContent"
            placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否置顶:">
          <el-switch v-model="form.Topping" size="large" />
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
import { getCommunityList } from '@/api/IDC';
import { addNoticeList, updateNoticeList } from '@/api/Property';
const ruleFormRef = ref();
const state = reactive({
  CommunityList: [],
});
const form = reactive({
  NoticeName: '',
  Cname: '',
  NoticeState: '',
  Publisher: '',
  Topping: false,
});
const props = defineProps({
  formList: Object,
  tltle: String,
  type: String,
});
const emits = defineEmits(['back']);
const rules = reactive({
  NoticeName: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
});
if (props.formList) {
  Object.assign(form, props.formList);
}
getCommunityList().then((res) => {
  state.CommunityList = res;
});
const next = async () => {
  if (!ruleFormRef) return;
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      if (props.type === 'add') {
        await addNoticeList(form).then((res) => {
          ElMessage({
            message: '添加成功',
            type: 'success',
          });
        });
      } else {
        await updateNoticeList(form).then((res) => {
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
    width: 1190px;
    padding: 20px;
    background-color: white;
    .el-form {
      width: 80%;
      margin: auto;
    }
    .el-form-item {
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
  .textarea {
    height: 100px;
  }
}
</style>
