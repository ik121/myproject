<template>
  <div class="container" v-if="store.state.idc.BuildingDetail">
    <div class="header">
      <h3>楼宇管理</h3>
      <div class="address">
        <h5>小区名称</h5>
        <el-select
          @change="selectChange"
          v-model="state.Cname"
          placeholder="请选择">
          <el-option
            v-for="item in state.CommunityList"
            :key="item.id"
            :value="item.Cname">
          </el-option>
        </el-select>
        小区地址：{{ state.address || '请选择小区' }}
      </div>
    </div>
    <div class="tabs">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="住宅" name="first">
          <div class="common-layout">
            <el-container>
              <el-aside width="250px">
                <div class="left_title">
                  <h3>楼栋</h3>
                  <div @click="addBuilding">+增加楼栋</div>
                </div>
                <div class="build">
                  <ul>
                    <li
                      @click="chooseBulid(item)"
                      :class="{ isChoose: item.Bname === BulidList.Bname }"
                      v-for="item in state.BulidList"
                      :key="item.Bname">
                      <span>{{ item.Bname }}</span>
                      <div class="svg">
                        <svg
                          @click="updateBuilding"
                          t="1686278441663"
                          class="icon"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="2393"
                          width="20"
                          height="20">
                          <path
                            d="M512 328c-100.8 0-184 83.2-184 184S411.2 696 512 696 696 612.8 696 512 612.8 328 512 328z m0 320c-75.2 0-136-60.8-136-136s60.8-136 136-136 136 60.8 136 136-60.8 136-136 136z"
                            p-id="2394"></path>
                          <path
                            d="M857.6 572.8c-20.8-12.8-33.6-35.2-33.6-60.8s12.8-46.4 33.6-60.8c14.4-9.6 20.8-27.2 16-44.8-8-27.2-19.2-52.8-32-76.8-8-14.4-25.6-24-43.2-19.2-24 4.8-48-1.6-65.6-19.2-17.6-17.6-24-41.6-19.2-65.6 3.2-16-4.8-33.6-19.2-43.2-24-14.4-51.2-24-76.8-32-16-4.8-35.2 1.6-44.8 16-12.8 20.8-35.2 33.6-60.8 33.6s-46.4-12.8-60.8-33.6c-9.6-14.4-27.2-20.8-44.8-16-27.2 8-52.8 19.2-76.8 32-14.4 8-24 25.6-19.2 43.2 4.8 24-1.6 49.6-19.2 65.6-17.6 17.6-41.6 24-65.6 19.2-16-3.2-33.6 4.8-43.2 19.2-14.4 24-24 51.2-32 76.8-4.8 16 1.6 35.2 16 44.8 20.8 12.8 33.6 35.2 33.6 60.8s-12.8 46.4-33.6 60.8c-14.4 9.6-20.8 27.2-16 44.8 8 27.2 19.2 52.8 32 76.8 8 14.4 25.6 22.4 43.2 19.2 24-4.8 49.6 1.6 65.6 19.2 17.6 17.6 24 41.6 19.2 65.6-3.2 16 4.8 33.6 19.2 43.2 24 14.4 51.2 24 76.8 32 16 4.8 35.2-1.6 44.8-16 12.8-20.8 35.2-33.6 60.8-33.6s46.4 12.8 60.8 33.6c8 11.2 20.8 17.6 33.6 17.6 3.2 0 8 0 11.2-1.6 27.2-8 52.8-19.2 76.8-32 14.4-8 24-25.6 19.2-43.2-4.8-24 1.6-49.6 19.2-65.6 17.6-17.6 41.6-24 65.6-19.2 16 3.2 33.6-4.8 43.2-19.2 14.4-24 24-51.2 32-76.8 4.8-17.6-1.6-35.2-16-44.8z m-56 92.8c-38.4-6.4-76.8 6.4-104 33.6-27.2 27.2-40 65.6-33.6 104-17.6 9.6-36.8 17.6-56 24-22.4-30.4-57.6-49.6-97.6-49.6-38.4 0-73.6 17.6-97.6 49.6-19.2-6.4-38.4-14.4-56-24 6.4-38.4-6.4-76.8-33.6-104-27.2-27.2-65.6-40-104-33.6-9.6-17.6-17.6-36.8-24-56 30.4-22.4 49.6-57.6 49.6-97.6 0-38.4-17.6-73.6-49.6-97.6 6.4-19.2 14.4-38.4 24-56 38.4 6.4 76.8-6.4 104-33.6 27.2-27.2 40-65.6 33.6-104 17.6-9.6 36.8-17.6 56-24 22.4 30.4 57.6 49.6 97.6 49.6 38.4 0 73.6-17.6 97.6-49.6 19.2 6.4 38.4 14.4 56 24-6.4 38.4 6.4 76.8 33.6 104 27.2 27.2 65.6 40 104 33.6 9.6 17.6 17.6 36.8 24 56-30.4 22.4-49.6 57.6-49.6 97.6 0 38.4 17.6 73.6 49.6 97.6-6.4 19.2-14.4 38.4-24 56z"
                            p-id="2395"></path>
                        </svg>
                        <svg
                          @click="deleteBuilding"
                          t="1686278687752"
                          class="icon"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="3724"
                          width="18"
                          height="18">
                          <path
                            d="M844.8 326.4c-19.2 0-38.4 19.2-38.4 38.4v550.4c0 19.2-19.2 38.4-38.4 38.4H256c-19.2 0-38.4-19.2-38.4-38.4V364.8c0-19.2-12.8-38.4-38.4-38.4-19.2 0-38.4 19.2-38.4 38.4v550.4c6.4 57.6 51.2 108.8 115.2 108.8h512c64 0 115.2-51.2 115.2-115.2V364.8c0-19.2-19.2-38.4-38.4-38.4z m-409.6 435.2V364.8c0-19.2-12.8-38.4-38.4-38.4-19.2 0-38.4 19.2-38.4 38.4V768c0 19.2 12.8 38.4 38.4 38.4 25.6-6.4 38.4-19.2 38.4-44.8z m224 0V364.8c0-19.2-19.2-38.4-38.4-38.4s-38.4 19.2-38.4 38.4V768c0 19.2 19.2 38.4 38.4 38.4 19.2-6.4 38.4-19.2 38.4-44.8z m326.4-582.4h-179.2V108.8c0-57.6-51.2-108.8-108.8-108.8H326.4c-64 0-108.8 44.8-108.8 108.8v76.8H38.4c-19.2-6.4-38.4 12.8-38.4 32s19.2 32 38.4 32h947.2c19.2 0 38.4-12.8 38.4-32s-19.2-38.4-38.4-38.4z m-256 0H288V108.8c0-19.2 19.2-38.4 38.4-38.4h371.2c19.2 0 32 12.8 32 38.4v70.4z m0 0"
                            fill="#383838"
                            p-id="3725"></path>
                        </svg>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-aside>
              <el-container class="main">
                <UntilTableCom
                  :Cname="state.Cname"
                  @detail="detail"
                  @Refresh="Refresh"
                  @deleteBuild="deleteBuild"
                  :BulidList="BulidList"></UntilTableCom>
              </el-container>
            </el-container>
          </div>
        </el-tab-pane>
        <el-tab-pane label="办公" name="second"> </el-tab-pane>
        <el-tab-pane label="民用" name="third"> </el-tab-pane>
        <el-tab-pane label="商用" name="fourth"> </el-tab-pane>
      </el-tabs>
      <addBuildingCom
        :dialog="dialog"
        :type="state.type"
        :Cname="state.Cname"
        :isBuild="state.isBuild"
        :Bname="BulidList.Bname"
        @close="close"></addBuildingCom>
    </div>
  </div>
  <detailCom v-else :detailList="state.detail" :Cname="state.Cname"></detailCom>
</template>
<script setup>
import { reactive, ref, watch } from 'vue';
import { getBulidList, getCommunityList } from '../../../api/IDC';
import addBuildingCom from '@/components/IDC/Building/addBuildingCom.vue';
import UntilTableCom from '@/components/IDC/Building/UntilTableCom.vue';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
import detailCom from '@/components/IDC/Building/detailCom.vue';
const store = useStore();
const activeName = ref('first');
const state = reactive({
  CommunityList: [],
  Cname: '',
  address: '',
  BulidList: [],
  type: '',
  isBuild: false,
  detail: '',
});
const BulidList = reactive({
  Bname: '',
  toward: '',
  height: '',
  structure: '',
  units: '',
  floor: '',
  util: [],
});
const dialog = reactive({
  dialogVisible: false,
  title: '楼栋设置',
  cancleText: '取消',
  confirmText: '确定',
  width: '40%',
  name: 'operation',
});
//刷新楼栋数据
const getBulidListFn = () => {
  getBulidList().then((res) => {
    res.forEach((item) => {
      if (state.Cname === item.Cname) {
        state.BulidList = item.Bulid;
        item.Bulid.forEach((bitem) => {
          if (bitem.Bname === BulidList.Bname) {
            Object.assign(BulidList, bitem);
          }
        });
      }
    });
  });
};
//获取小区数据
getCommunityList().then((res) => {
  state.CommunityList = res;
  state.Cname = state.CommunityList[0].Cname;
});
//初始化获取楼栋数据
getBulidList().then((res) => {
  Object.assign(BulidList, res[0].Bulid[0]);
  Object.assign(state.BulidList, res[0].Bulid);
});
//添加楼栋按钮，打开对话框
const addBuilding = () => {
  if (state.Cname) {
    dialog.dialogVisible = true;
    state.isBuild = !state.isBuild;
    state.type = '添加';
    dialog.title = '楼栋设置';
    dialog.cancleText = '取消';
    dialog.confirmText = '确定';
    dialog.width = '40%';
    dialog.name = 'operation';
    dialog.prompt = '';
  } else {
    ElMessage({
      message: '请选择小区',
      type: 'warning',
    });
  }
};
//打开删除楼栋
const deleteBuildFn = () => {
  state.type = '删除';
  state.isBuild = !state.isBuild;
  dialog.name = '';
  dialog.title = '删除楼栋';
  dialog.prompt = '警告！你将要删除整个楼栋';
  dialog.dialogVisible = true;
};
//删除楼栋数据
const deleteBuilding = () => {
  deleteBuildFn();
};
const deleteBuild = () => {
  deleteBuildFn();
};
//修改按钮
const updateBuilding = () => {
  state.type = '修改';
  state.isBuild = !state.isBuild;
  dialog.dialogVisible = true;
  dialog.title = '修改楼栋';
  dialog.cancleText = '取消';
  dialog.confirmText = '确定';
  dialog.width = '40%';
  dialog.name = 'operation';
  dialog.prompt = '';
};
const close = (type, form) => {
  dialog.dialogVisible = false;
  if (type === '删除') {
    BulidList.Bname = '';
    BulidList.toward = '';
    BulidList.height = '';
    BulidList.structure = '';
    BulidList.units = '';
    BulidList.floor = '';
    BulidList.util = [];
  } else {
    Object.assign(BulidList, form);
  }
  getBulidListFn();
};
const Refresh = () => {
  getBulidListFn()
};
//打开详情页
const detail = (itemChild) => {
  state.detail = itemChild;
  store.commit('idc/setBuildingDetail', false);
};
// 选择小区
const selectChange = () => {
  getBulidListFn();
};
// 选择楼栋
const chooseBulid = (item) => {
  getBulidListFn();
  Object.assign(BulidList, item);
};

watch(
  () => state.Cname,
  () => {
    state.CommunityList.forEach((item) => {
      if (state.Cname === item.Cname) {
        state.address = item.province + item.city + item.county + item.place;
      }
    });
  }
);
</script>

<style scoped lang="scss">
.container {
  .header {
    margin-bottom: 10px;
    h3 {
      font-size: 20px;
      margin-bottom: 10px;
    }
    h5 {
      margin-bottom: 10px;
    }
  }
  .tabs {
    .common-layout {
      .el-aside {
        background-color: white;
        height: 100%;
        min-height: 600px;
        .left_title {
          padding: 20px;
          background-color: white;
          display: flex;
          border-bottom: 1px solid rgb(237, 237, 237);
          justify-content: space-between;
          div {
            font-size: 14px;
            cursor: pointer;
            color: rgb(132, 132, 241);
          }
        }
        .build {
          ul {
            li {
              display: flex;
              position: relative;
              justify-content: center;
              padding: 15px;
              height: 20px;
              cursor: pointer;
              border-bottom: 2px solid rgb(237, 237, 237);
            }
            .svg {
              right: 0;
              position: absolute;
              svg {
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }
  .main {
    display: flex;
    flex-direction: column;
  }
  .isChoose {
    color: rgb(13, 0, 255);
  }
}
</style>
