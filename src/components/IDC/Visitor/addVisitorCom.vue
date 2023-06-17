<template>
  <dialog-com :dialog="props.dialog" @cancle="cancle" @confirm="confirm">
    <template #operation>
      <div class="container">
        <div class="main">
          <div class="main_title">访客</div>
          <el-form :model="form" label-width="120px" :disabled="isDflag">
            <el-form-item label="姓名:">
              <el-input v-model="form.Vname" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="性别:">
              <el-input v-model="form.sex" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="联系方式:">
              <el-input v-model="form.iphone" placeholder="请输入联系方式" />
            </el-form-item>
            <div class="main_message">被访人信息</div>
            <el-form-item label="访问小区:">
              <el-select
                @change="changeCname"
                v-model="form.Cname"
                placeholder="请选择访问小区">
                <el-option
                  v-for="item in props.Cname"
                  :key="item"
                  :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item label="访问楼号:">
              <el-select
                v-model="form.Bname"
                @change="changeBname"
                placeholder="请选择访问楼号">
                <el-option
                  v-for="item in state.BulidSelect"
                  :key="item"
                  :value="item.Bname" />
              </el-select>
            </el-form-item>
            <el-form-item label="访问单元号:">
              <el-select v-model="form.uitl" placeholder="访问单元号">
                <el-option
                  v-for="item in Number(state.utilSelect)"
                  :key="item"
                  :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item label="访问楼层号:">
              <el-select v-model="form.floor" placeholder="访问楼层号">
                <el-option
                  v-for="item in Number(state.floorSelect)"
                  :key="item"
                  :value="item" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </template>
  </dialog-com>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { getCommunityList, addVisiterList } from '../../../api/IDC';
const state = reactive({
  CommunityList: [],
  BulidSelect: [],
  utilSelect: [],
  floorSelect: [],
  formList: '',
});
const form = reactive({
  Vname: '',
  sex: '',
  iphone: '',
  Cname: '',
  Bname: '',
  uitl: '',
  floor: '',
});
const props = defineProps({
  tltle: String,
  type: String,
  Cname: Object,
  BulidList: Object,
  formList: Object,
});
const emits = defineEmits(['confirm', 'cancle']);
getCommunityList().then((res) => {
  state.CommunityList = res;
});
watch(
  () => props.formList,
  () => {
    Object.assign(form, props.formList);
    if (props.type === '添加') {
      form.Vname = '';
      form.sex = '';
      form.iphone = '';
      form.Cname = '';
      form.Bname = '';
      form.uitl = '';
      form.floor = '';
    }
    CnameFn(props.formList.Cname);
    BnameFn(props.formList.Bname);
  }
);
const CnameFn = (val) => {
  props.BulidList.forEach((item) => {
    if (item.Cname === val) {
      state.BulidSelect = item.Bulid;
    }
  });
};
const BnameFn = (val) => {
  state.BulidSelect.forEach((item) => {
    if (item.Bname === val) {
      state.utilSelect = item.units;
      state.floorSelect = item.floor;
    }
  });
};
//搜索框选择
const changeCname = (val) => {
  CnameFn(val);
  form.Bname = '';
  form.uitl = '';
  form.floor = '';
};
const changeBname = (val) => {
  BnameFn(val);
  form.uitl = '';
  form.floor = '';
};
//弹出框取消
const cancle = () => {
  emits('cancle');
};
//弹出框确认
const confirm = () => {
  emits('confirm', form);
};
</script>

<style scoped lang="scss">
.container {
  flex-direction: column;
  h2 {
    font-size: 20px;
    width: 100%;
    border-bottom: 1px solid rgb(194, 194, 194);
  }
  .main {
    width: 100%;
    background-color: white;
    .main_title {
      font-size: 16px;
      font-weight: 700;
      padding: 10px;
      border-bottom: 1px solid rgb(194, 194, 194);
      margin-bottom: 20px;
    }
    .main_message {
      font-size: 16px;
      font-weight: 700;
      border-top: 1px solid rgb(194, 194, 194);
      padding: 10px;
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
  }
  .address {
    display: flex;
  }
}
</style>
