<template>
  <div class="container" v-if="flag">
    <h2>新增/修改小区</h2>
    <div class="main">
      <el-form
        :model="form"
        ref="ruleFormRef"
        :rules="rules"
        label-width="120px">
        <el-form-item label="小区名称*:" prop="Cname">
          <el-input v-model="form.Cname" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="小区地址*:">
          <div class="address">
            <el-select
              placeholder="选中省"
              @change="checkProvince"
              v-model="form.province">
              <el-option
                v-for="item in address"
                :key="item.id"
                :value="item.name" />
            </el-select>
            <el-select
              placeholder="选中市"
              v-model="form.city"
              @change="checkCity">
              <el-option
                v-for="item in state.Scity"
                :key="item.id"
                :value="item.name" />
            </el-select>
            <el-select placeholder="选中镇" v-model="form.county">
              <el-option
                v-for="item in state.Scounty"
                :key="item.id"
                :value="item.name" />
            </el-select>
            <el-input class="place" v-model="form.place" placeholder="请输入" />
          </div>
        </el-form-item>
        <el-form-item label="小区负责人*:">
          <el-input v-model="form.head" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="负责人电话*:">
          <el-input v-model="form.headIphone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="小区logo:">
          <el-upload class="avatar-uploader" :http-request="uploadLogo">
            <img v-if="form.logo" :src="form.logo" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="小区图片:">
          <el-upload class="avatar-uploader" :http-request="uploadImage">
            <img v-if="form.img" :src="form.img" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <div class="bottom">
          <el-button @click="next" type="primary">下一步</el-button>
          <el-button @click="back">返回</el-button>
        </div>
      </el-form>
    </div>
  </div>
  <OthercomityCom v-else @isflag="isflag"></OthercomityCom>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Message, Plus } from '@element-plus/icons-vue';
import OthercomityCom from './otherComityCom.vue';
import { getAddressList } from '@/api/Address.js';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { getCommunityList } from '../../../api/IDC';
const store = useStore();
const form = reactive({
  Cname: '',
  province: '',
  city: '',
  county: '',
  place: '',
  head: '',
  headIphone: '',
  logo: '',
  img: '',
});
const emits = defineEmits(['isflag']);
const flag = ref(true);
const ruleFormRef = ref();
const address = ref();
const state = reactive({
  Sprovince: '',
  Scity: '',
  Scounty: '',
});
const rules = reactive({
  Cname: [{ required: true, message: '请输入小区名称', trigger: 'blur' }],
});
const getAddressFn = () => {
  return getAddressList().then((res) => {
    address.value = res;
    return address.value;
  });
};
getAddressFn();
const Scity = (val) => {
  address.value.forEach((item) => {
    console.log(val, item);
    if (item.name === val) {
      state.Scity = item.children;
    }
  });
};
const Scounty = (val) => {
  state.Scity.forEach((item) => {
    if (item.name === val) {
      state.Scounty = item.children;
    }
  });
};
const fn = async () => {
  if (store.state.idc.CommunityType === 'update') {
    Object.assign(form, store.state.idc.Community);
    getAddressFn().then((res) => {
      address.value = res;
      Scity(form.province);
      Scounty(form.city);
    });
  } else {
    form.Cname = '';
    form.province = '';
    form.city = '';
    form.county = '';
    form.place = '';
    form.head = '';
    form.headIphone = '';
    form.logo = '';
    form.img = '';
  }
};
fn();
const next = () => {
  if (!ruleFormRef) return;
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      if (store.state.idc.CommunityType === 'add') {
        await getCommunityList().then((res) => {
          for (let i = 0; i < res.length; i++) {
            if (res[i].Cname === form.Cname) {
              ElMessage({
                message: '小区名称已经存在！',
                type: 'error',
              });
              return;
            }
          }
        });
      }
      flag.value = false;
      store.commit('idc/setCommunity', {
        ...form,
      });
    }
  });
};
const back = () => {
  emits('isflag');
};
const isflag = () => {
  flag.value = true;
};
const checkProvince = (val) => {
  Scity(val);
  form.city = '';
  form.county = '';
};
const checkCity = (val) => {
  Scounty(val);
  form.county = '';
};
const uploadLogo = (option) => {
  form.logo = URL.createObjectURL(option.file);
};
const uploadImage = (option) => {
  form.img = URL.createObjectURL(option.file);
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
    width: 1200px;
    padding: 20px;
    background-color: white;
    .el-form-item {
      border-bottom: 1px solid rgb(236, 236, 236);
      padding: 20px;
    }
    .el-select {
      width: 100px;
      margin-right: 10px;
    }
    .place {
      width: 200px;
    }
    .avatar-uploader {
      width: 120px;
      height: 120px;
      display: block;
      border: 1px dashed black;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      .avatar {
        width: 120px;
        height: 120px;
      }
    }

    .avatar-uploader:hover {
      border-color: var(--el-color-primary);
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 120px;
      text-align: center;
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
