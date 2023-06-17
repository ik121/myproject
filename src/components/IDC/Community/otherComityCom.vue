<template>
  <div
    class="container"
    v-if="flag"
    v-loading="loading"
    element-loading-text="Loading..."
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50">
    <h2>其它信息</h2>
    <div class="main">
      <el-form :model="form" label-width="120px">
        <el-form-item label="占地面积:">
          <el-input v-model="form.coverSpace" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="建筑面积:">
          <el-input v-model="form.floorSpace" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="公共场所面积:">
          <el-input v-model="form.PublicSpace" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="绿化面积:">
          <el-input v-model="form.greenSpace" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="设计车位面积:">
          <el-input v-model="form.Parking" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="车库面积:">
          <el-input v-model="form.garage" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="form.notes" placeholder="请输入" />
        </el-form-item>
        <div class="bottom">
          <el-button @click="next">保存</el-button>
          <el-button>去支付</el-button>
          <el-button @click="back">返回</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { addCommunityList, updateCommunityList } from '@/api/IDC';
const store = useStore();
const flag = ref(true);
const loading = ref(false);
const form = reactive({
  coverSpace: '',
  floorSpace: '', //建筑面积
  PublicSpace: '', //公共场所面积
  greenSpace: '', //绿化面积
  Parking: '', //车位面积
  garage: '', //车库面积
  notes: '', //备注
  time: '',
});
if (store.state.idc.CommunityType === 'update') {
  Object.assign(form, store.state.idc.Community);
} else {
  form.coverSpace = '';
  form.floorSpace = '';
  form.PublicSpace = '';
  form.greenSpace = '';
  form.Parking = '';
  form.garage = '';
  form.notes = '';
}
const emits = defineEmits(['isflag']);

const next = () => {
  store.commit('idc/setCommunity', {
    ...form,
  });
  loading.value = true;
  if (store.state.idc.CommunityType === 'update') {
    updateCommunityList(store.state.idc.Community).then((res) => {
      ElMessage({
        message: '修改成功',
        type: 'warning',
      });
    });
  } else {
    store.commit('idc/setCommunity', {
      time:
        new Date().getFullYear() +
        1 +
        '-' +
        new Date().getMonth() +
        '-' +
        new Date().getDate(),
    });
    addCommunityList(store.state.idc.Community).then((res) => {
      console.log(store.state.idc.Community);
      ElMessage({
        message: '新增成功',
        type: 'success',
      });
    });
  }
  //添加成功后的事件
  setTimeout(() => {
    store.commit('idc/setCommunityflag', true);
    flag.value = false;
    loading.value = false;
  }, 500);
};
const back = () => {
  emits('isflag');
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .main {
    width: 1200px;
    padding: 30px;
    background-color: white;
    .el-form-item {
      border-bottom: 1px solid rgb(236, 236, 236);
      padding: 20px;
    }
  }
  .bottom {
    display: flex;
    padding-bottom: 50px;
    justify-content: center;
  }
  .address {
    display: flex;
  }
}
</style>
