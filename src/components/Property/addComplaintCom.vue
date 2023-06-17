<template>
  <dialog-com :dialog="props.dialog" @cancle="cancle" @confirm="confirm">
    <template #operation>
      <div class="container">
        <div class="main">
          <el-form :model="form" label-width="120px" :disabled="isDflag">
            <el-form-item label="楼栋*:" prop="Cname">
              <el-select v-model="form.Cname" placeholder="请选择">
                <el-option
                  v-for="item in state.CommunityList"
                  :key="item.id"
                  :value="item.Cname">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投诉人:">
              <el-input v-model="form.complainant" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="联系电话:">
              <el-input v-model="form.iphone" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="投诉时间:">
              <el-config-provider :locale="zhCn">
                <el-date-picker
                  v-model="form.ComplaintTime"
                  type="date"
                  range-separator="To"
                  :size="size" />
              </el-config-provider>
            </el-form-item>
            <el-form-item label="投诉内容:">
              <el-input
                type="textarea"
                rows="5"
                v-model="form.ComplaintContent"
                placeholder="请输入" />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </template>
    <template #acceptance>
      <el-form :model="form" label-width="120px" :disabled="isDflag">
        <el-form-item label="处理人:">
          <el-input
            class="Publisher"
            v-model="form.Publisher"
            placeholder="请输入" />
        </el-form-item>
        <el-form-item label="必须解决:">
          <el-select v-model="form.ComplaintState" placeholder="请选择">
            <el-option label="已解决" value="0"> </el-option>
            <el-option label="已解决" value="0"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </template>
  </dialog-com>
</template>
<script setup>
import { reactive, ref, watch } from 'vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { getCommunityList } from '../../api/IDC';
const state = reactive({
  CommunityList: [],
  BulidSelect: [],
  utilSelect: [],
  floorSelect: [],
  formList: '',
});
const form = reactive({});
const props = defineProps({
  tltle: String,
  type: String,
  Cname: Object,
  BulidList: Object,
  formList: Object,
});
getCommunityList().then((res) => {
  state.CommunityList = res;
});
const emits = defineEmits(['confirm', 'cancle']);
watch(
  () => props.formList,
  () => {
    Object.assign(form, props.formList);
    if (props.type === '添加') {
      form.Cname = '';
      form.complainant = '';
      form.iphone = '';
      form.ComplaintContent = '';
      form.ComplaintTime = '';
    }
  }
);
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
    width: 90%;
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
.Publisher {
  width: 240px;
}
</style>
