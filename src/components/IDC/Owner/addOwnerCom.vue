<template>
  <div class="container">
    <h2>{{ props.title }}</h2>
    <h4 v-if="props.type === '添加' ? true : false">
      1、添加单个新住户,如需批量导入请点击“住户管理—导入”;
    </h4>
    <h4 v-if="props.type === '添加' ? true : false">
      2、如已迁出用户需再次迁入,请在住户管理中选中已迁出用户进行操作。
    </h4>
    <div class="main">
      <el-form
        ref="ruleFormRef"
        :rules="rules"
        :model="form"
        label-width="120px"
        :disabled="props.type === '详情' ? true : false">
        <h3>基本信息</h3>
        <div class="form_center">
          <div class="left">
            <el-form-item label="选择小区*:" prop="Cname">
              <el-select
                @change="changeCname"
                v-model="form.Cname"
                placeholder="请选择">
                <el-option
                  v-for="item in props.Cname"
                  :key="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="姓名:" prop="ownerName">
              <div class="address">
                <el-input v-model="form.ownerName" placeholder="请输入" />
              </div>
            </el-form-item>
            <el-form-item label="入住时间:" prop="InTime">
              <el-config-provider :locale="zhCn">
                <el-date-picker
                  v-model="form.InTime"
                  type="date"
                  placeholder="选择入住时间" />
              </el-config-provider>
            </el-form-item>
            <el-form-item label="性别:">
              <el-select v-model="form.sex" placeholder="请选择性别">
                <el-option value="男"></el-option>
                <el-option value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号:">
              <el-input v-model="form.iphone" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="right">
            <el-form-item label="居住楼号:" prop="Bname">
              <el-select
                v-model="form.Bname"
                @change="changeBname"
                :disabled="!form.Cname"
                @click="clickBname"
                placeholder="请选择居住楼号">
                <el-option
                  v-for="item in state.BulidSelect"
                  :key="item"
                  :value="item.Bname" />
              </el-select>
            </el-form-item>
            <el-form-item label="居住单元号:" prop="units">
              <el-select
                @change="changeUtil"
                :disabled="!form.Bname"
                v-model="form.units"
                placeholder="居住单元号">
                <el-option
                  v-for="item in Number(state.utilSelect)"
                  :key="item"
                  :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item label="居住楼层号:" prop="floor">
              <el-select
                @change="changeFloor"
                :disabled="!form.Bname"
                v-model="form.floor"
                placeholder="居住楼层号">
                <el-option
                  v-for="item in Number(state.floorSelect)"
                  :key="item"
                  :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item label="选择房号:" prop="roomNumber">
              <el-select
                v-model="form.roomNumber"
                :disabled="isUnits"
                placeholder="居住房号">
                <el-option
                  v-for="item in state.unitsSelect"
                  :key="item"
                  :value="item.roomNumber" />
              </el-select>
            </el-form-item>
            <el-form-item label="业主身份:" prop="type">
              <el-select v-model="form.type" placeholder="请输入">
                <el-option value="业主" />
                <el-option value="租客" />
                <el-option value="亲属" />
                <el-option value="其他" />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <h3>其它信息</h3>
        <div class="form_bottom">
          <div class="header">
            <el-form-item label="微信号*:">
              <el-input v-model="form.wx" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="身份证号:" prop="IDcard">
              <div class="address">
                <el-input v-model="form.IDcard" placeholder="请输入" />
              </div>
            </el-form-item>
          </div>
          <div class="center">
            <el-form-item label="户籍地址:">
              <el-input v-model="form.domicile" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="职业:">
              <el-select v-model="form.career" placeholder="请输入">
                <el-option value="上班族" />
                <el-option value="全职妈妈" />
                <el-option value="学生" />
                <el-option value="自由职业" />
                <el-option value="其它" />
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="备注:">
            <el-input
              v-model="form.notes"
              type="textarea"
              placeholder="请输入" />
          </el-form-item>
        </div>
      </el-form>
      <div class="bottom">
        <el-button @click="confirm" type="primary">确认</el-button>
        <el-button @click="cancle">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
const form = reactive({});
const isUnits = ref(true);
const ruleFormRef = ref();
const props = defineProps({
  Cname: Object,
  BulidList: Object,
  formList: Object,
  type: String,
  title: String,
});
const rules = reactive({
  Cname: [{ required: true, message: '请输入小区名称', trigger: 'blur' }],
  ownerName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  InTime: [{ required: true, message: '请选择入住时间', trigger: 'blur' }],
  Bname: [{ required: true, message: '请选择居中楼号', trigger: 'blur' }],
  units: [{ required: true, message: '请选择居中单元号', trigger: 'blur' }],
  floor: [{ required: true, message: '请选择居中楼层号', trigger: 'blur' }],
  roomNumber: [{ required: true, message: '请选择居中房间', trigger: 'blur' }],
  type: [{ required: true, message: '请选择身份', trigger: 'blur' }],
  IDcard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
});
const emits = defineEmits(['cancle', 'confirm']);
const state = reactive({
  BulidSelect: '',
  utilSelect: '',
  Bname: '',
  floorSelect: '',
  unitsSelect: [],
});
//选择小区
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
const roomNumberFn = () => {
  if (!state.units) return;
  if (!state.floor) return;
  isUnits.value = false;
  state.unitsSelect = [];
  state.BulidSelect.forEach((Bitem) => {
    if (Bitem.Bname === form.Bname) {
      Bitem.util.forEach((item) => {
        if (item.units == state.units && item.floor == state.floor) {
          state.unitsSelect.push(item);
        }
      });
    }
  });
};

if (props.formList) {
  Object.assign(form, props.formList);
  CnameFn(form.Cname);
  BnameFn(form.Bname);
  state.units = form.units;
  state.floor = form.floor;
  roomNumberFn();
} else {
  form.Bname = '';
  form.Cname = '';
  form.IDcard = '';
  form.InTime = '';
  form.OwnerState = '';
  form.age = '';
  form.career = '';
  form.domicile = '';
  form.floor = '';
  form.identity = '';
  form.iphone = '';
  form.notes = '';
  form.ownerCard = '';
  form.ownerId = '';
  form.ownerName = '';
  form.roomNumber = '';
  form.sex = '';
  form.type = '';
  form.units = '';
  form.validity = '';
  form.wx = '';
}
watch(
  () => [state.units, state.floor],
  () => {
    roomNumberFn();
  }
);
//选择小区
const changeCname = (val) => {
  CnameFn(val);
  form.Bname = '';
  form.units = '';
  form.floor = '';
  form.roomNumber = '';
  isUnits.value = true;
};
const changeBname = (val) => {
  BnameFn(val);
  form.units = '';
  form.floor = '';
  form.roomNumber = '';
  isUnits.value = true;
};
const changeUtil = (val) => {
  state.units = val;
  form.roomNumber = '';
  isUnits.value = true;
};
const changeFloor = (val) => {
  state.floor = val;
  form.roomNumber = '';
  isUnits.value = true;
};
const confirm = () => {
  if (!ruleFormRef) return;
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      emits('confirm', form);
    }
  });
};
const cancle = () => {
  emits('cancle');
};
</script>

<style scoped lang="scss">
.container {
  flex-direction: column;
  h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }
  h4 {
    font-size: 14px;
    font-weight: 200;
    margin-bottom: 20px;
  }
  .main {
    width: 1000px;
    padding: 20px;
    background-color: white;
    h3 {
      padding-bottom: 10px;
      border-bottom: 1px solid rgb(221, 221, 221);
    }

    .el-form-item {
      padding: 20px;
    }
    .el-input {
      width: 215px;
    }
    .el-select {
      width: 215px;
      margin-right: 10px;
    }
    .form_center {
      display: flex;
    }
    .form_bottom {
      .header {
        display: flex;
      }
      .center {
        display: flex;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: center;
    padding-bottom: 30px;
  }
}
</style>
