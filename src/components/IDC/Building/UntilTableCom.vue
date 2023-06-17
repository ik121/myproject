<template>
  <el-header>
    <div class="left">
      <h2>{{ BulidList.Bname }}</h2>
      <span>楼宇朝向:{{ BulidList.toward || '选择楼房' }}</span>
      <span>楼高:{{ BulidList.height || '选择楼房' }}米 </span>
      <span>楼宇结构:{{ BulidList.structure || '选择楼房' }}</span>
    </div>
    <div class="right">
      <span @click="addUtils">添加房屋</span>
      <span>收费标准设置</span>
      <span @click="deleteBuild">删除</span>
    </div>
  </el-header>
  <el-main>
    <table>
      <thead v-if="props.BulidList.Bname">
        <tr v-if="props.BulidList.units">
          <th></th>
          <th
            v-for="(item, index) in Number(props.BulidList.units)"
            :key="item.Bname">
            {{ index + 1 }}单元
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, findex) in Number(props.BulidList.floor)"
          :key="item.Bname">
          <td class="left">{{ findex + 1 }}楼</td>
          <td
            :style="{ width: unitsWidth }"
            v-for="(item, uindex) in Number(props.BulidList.units)"
            :key="item.Bname">
            <ul>
              <li
                :class="{
                  hide:
                    findex + 1 !== Number(itemChild.floor) ||
                    uindex + 1 !== Number(itemChild.units),
                }"
                v-for="itemChild in props.BulidList.util"
                :key="itemChild.roomNumber">
                <div
                  class="box"
                  @click="Beingclicked(itemChild.roomNumber)"
                  v-if="
                    findex + 1 === Number(itemChild.floor) &&
                    uindex + 1 === Number(itemChild.units)
                  ">
                  <svg
                    t="1686801081528"
                    class="chooseSvg"
                    v-show="state.roomNumber.includes(itemChild.roomNumber)"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2408"
                    width="30"
                    height="30">
                    <path
                      d="M256 1024h768V256l-768 768z m493.6-108.8L704 960l-45.6-45.6L576 832l45.6-45.6L704 869.6l210.4-210.4 45.6 45.6-210.4 210.4z"
                      p-id="2409"></path>
                  </svg>
                  <p>
                    {{ itemChild.roomNumber }}
                  </p>
                  <span>
                    <el-dropdown>
                      <div class="el-dropdown-link">
                        <svg
                          t="1686458769201"
                          class="icon"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="4134"
                          width="15"
                          height="15">
                          <path
                            d="M412.8 860.8c0-55.2 44.8-99.2 99.2-99.2s99.2 44.8 99.2 99.2c0 55.2-44.8 99.2-99.2 99.2s-99.2-44.8-99.2-99.2z m0-348.8c0-55.2 44.8-99.2 99.2-99.2S611.2 456.8 611.2 512 567.2 611.2 512 611.2 412.8 567.2 412.8 512z m0-348.8C412.8 108.8 456.8 64 512 64s99.2 44.8 99.2 99.2S567.2 263.2 512 263.2s-99.2-44.8-99.2-100z"
                            fill="#333333"
                            p-id="4135"></path>
                        </svg>
                      </div>
                      <template #dropdown>
                        <el-dropdown-menu style="width: 60px">
                          <el-dropdown-item @click="detail(itemChild)"
                            >详情</el-dropdown-item
                          >
                          <el-dropdown-item @click="chooseDetail(itemChild)"
                            >修改</el-dropdown-item
                          >
                          <el-dropdown-item @click="deleteDetail(itemChild)"
                            >删除</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </span>
                </div>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </el-main>
  <addUntilCom
    :dialog="dialog"
    @cancle="cancle"
    @confirm="confirm"
    :type="state.type"
    :isDetail="state.isDetail"
    :itemChild="state.itemChild"
    :BulidList="props.BulidList"></addUntilCom>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { addUtilList, updateUtilList, deleteUtilList } from '@/api/IDC';
import { ref, watch, reactive } from 'vue';
const isClick = ref(false);
const props = defineProps({
  BulidList: Object,
  Cname: String,
});
const emits = defineEmits(['Refresh', 'deleteBuild', 'detail']);
const state = reactive({
  type: '',
  isDetail: false,
  itemChild: '',
  roomNumber: [],
});
const dialog = reactive({
  dialogVisible: false,
  title: '添加房间',
  cancleText: '取消',
  confirmText: '确定',
  width: '40%',
  name: 'operation',
});
const unitsWidth = ref();
watch(
  () => props.BulidList,
  () => {
    unitsWidth.value = 100 / Number(props.BulidList.units) + '%';
  }
);
const cancle = () => {
  dialog.dialogVisible = false;
};
//添加修改小区
const confirm = async (form) => {
  if (state.type === '添加') {
    await addUtilList({
      Bname: props.BulidList.Bname,
      Cname: props.Cname,
      form,
    }).then((res) => {
      emits('Refresh');
      ElMessage({
        message: '添加成功',
        type: 'success',
      });
    });
  } else if (state.type === '修改') {
    updateUtilList({
      Cname: props.Cname,
      Bname: props.BulidList.Bname,
      form,
    }).then((res) => {
      emits('Refresh');
      ElMessage({
        message: '修改成功',
        type: 'success',
      });
    });
  } else if (state.type === '删除') {
    deleteUtilList({
      Cname: props.Cname,
      Bname: props.BulidList.Bname,
      itemChild: state.itemChild,
    }).then((res) => {
      emits('Refresh');
      ElMessage({
        message: '删除成功',
        type: 'success',
      });
    });
  } else if (state.type === '删除全部') {
    state.roomNumber.forEach((item) => {
      deleteUtilList({
        Cname: props.Cname,
        Bname: props.BulidList.Bname,
        itemChild: {
          roomNumber: item,
        },
      }).then((res) => {
        emits('Refresh');
        state.roomNumber = [];
      });
    });
    ElMessage({
      message: '删除成功',
      type: 'success',
    });
  }

  dialog.dialogVisible = false;
};
//删除所有选中的房间
const deleteBuild = (itemChild) => {
  dialog.dialogVisible = true;
  dialog.title = '您将要删除所有选中的房间！';
  dialog.cancleText = '取消';
  dialog.confirmText = '删除';
  dialog.width = '30%';
  dialog.name = '';
  state.type = '删除全部';
  state.itemChild = itemChild;
};
//添加房间
const addUtils = () => {
  if (props.BulidList.util) {
    state.type = '添加';
    dialog.title = '添加房间';
    dialog.cancleText = '取消';
    dialog.confirmText = '确定';
    dialog.width = '40%';
    dialog.name = 'operation';
    state.isDetail = !state.isDetail;
    dialog.dialogVisible = true;
  } else {
    ElMessage({
      message: '请选择楼房',
      type: 'warning',
    });
  }
};
//删除房间
const deleteDetail = (itemChild) => {
  dialog.dialogVisible = true;
  dialog.title = '您将要删除该房间';
  dialog.cancleText = '取消';
  dialog.confirmText = '删除';
  dialog.width = '30%';
  dialog.name = '';
  state.type = '删除';
  state.itemChild = itemChild;
};
//修改房间
const chooseDetail = (itemChild) => {
  state.isDetail = !state.isDetail;
  dialog.title = '修改房间';
  dialog.cancleText = '取消';
  dialog.confirmText = '确定';
  dialog.width = '40%';
  dialog.name = 'operation';
  state.type = '修改';
  state.itemChild = itemChild;
  dialog.dialogVisible = true;
};
//查看小区详情
const detail = (itemChild) => {
  emits('detail', itemChild);
};
const Beingclicked = (roomNumber) => {
  if (state.roomNumber.includes(roomNumber)) {
    state.roomNumber.splice(state.roomNumber.indexOf(roomNumber), 1);
  } else {
    state.roomNumber.push(roomNumber);
  }
  isClick.value = true;
};
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  height: 50px;
  margin-left: 20px;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  .left {
    width: 60%;
    display: flex;
    align-items: center;
    h2 {
      font-size: 25px;
      margin-right: 20px;
    }
    span {
      margin-right: 60px;
      font-size: 14px;
      color: rgb(113, 112, 112);
    }
  }
  .right {
    span {
      margin-right: 20px;
      font-size: 14px;
      cursor: pointer;
      color: rgb(13, 4, 255);
    }
  }
}
.el-main {
  margin-bottom: 30px;
}
table {
  width: 1000px;
  height: 100%;
  text-align: center;
  border-collapse: collapse;
  background-color: white;
}
.left {
  width: 50px;
}
th,
td {
  border: 1px solid #dadada;
}
th {
  height: 50px;
}

td {
  padding: 10px;
  height: 50px;
  min-height: 50px;
}
ul {
  width: 90%;
  display: flex;
  margin: auto;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  li {
    width: 40%;
    height: 50px;
    margin-bottom: 40px;
    .box {
      width: 100%;
      height: 50px;
      font-size: 12px;
      border: 1px solid rgb(181, 181, 181);
      line-height: 50px;
      box-shadow: 1px 1px 4px rgb(181, 181, 181);
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        font-size: 12px;
      }
      .el-dropdown {
        display: flex;
      }
    }
  }
}
.hide {
  position: fixed;
  left: -99999px;
}
.over:hover {
  cursor: pointer;
  color: red;
}
.bColor {
  background-color: rgb(204, 204, 204);
}
::v-deep .el-dropdown:focus {
  outline: none !important;
}
.chooseSvg {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
