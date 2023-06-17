<template>
  <div class="container" v-if="store.state.idc.Communityflag">
    <div class="header">
      <h3>小区管理</h3>
      <el-input
        size="small"
        v-model="state.searchCmmunityList"
        placeholder="请输入小区的名称 "
        :prefix-icon="Search"
        @keyup.enter="searchCommunity" />
    </div>
    <div class="card">
      <div>
        <ul>
          <li v-for="item in state.CommunityList" :key="item.id">
            <div class="el_card">
              <div class="cardMessage">
                <el-image :src="item.img || '../../../public/undraw_Cooking_p7m1.png' " />
                <div>
                  <h3>{{ item.Cname }}</h3>
                  <p>到期时间{{ item.time }}</p>
                </div>
              </div>
              <div class="cardIcon">
                <svg
                  t="1685865033790"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2898"
                  width="30"
                  height="30">
                  <path
                    d="M175.4 832.8l19-48.7c13.8-35.4 25.1-74.1 26.1-88.9-71.5-58.7-110.8-135.8-110.8-217.8 0-173.5 178.9-314.6 398.8-314.6s398.8 141.1 398.8 314.6S728.4 792 508.5 792c-50.5 0-99.6-7.3-146.1-21.7-16.6 2.1-83.1 24.2-137.9 44.5l-49.1 18z m183.9-63.5z m149.2-559.5c-194 0-351.8 120-351.8 267.6 0 69.4 35 135.3 98.7 185.6 8.3 6.5 22.6 17.8-0.3 90.7 100-35 111.7-31.3 118.4-29.2 42.8 13.6 88.2 20.5 135 20.5 194 0 351.8-120 351.8-267.6S702.5 209.8 508.5 209.8z"
                    fill="#666666"
                    p-id="2899"></path>
                  <path
                    d="M796 381.9l-107 26.5c-2.5 0.6-4.9 1.6-7.1 2.8L428 554.3c-10 5.6-22.5 4.7-31.5-2.5l-106.8-84.9c-5.2-4.1-11.7-6.3-18.4-6.1l-25.1 0.7 138.6 153.7c9.2 10.2 24.5 12.3 36.2 4.9l375-238.2z"
                    fill="#666666"
                    p-id="2900"></path>
                </svg>
                <svg
                  t="1685865090682"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3880"
                  width="30"
                  height="30">
                  <path
                    d="M906.666667 347.733333c-4.266667-10.666667-17.066667-17.066667-27.733334-10.666666-10.666667 4.266667-17.066667 17.066667-10.666666 27.733333 19.2 46.933333 29.866667 96 29.866666 147.2 0 51.2-10.666667 98.133333-27.733333 142.933333-40.533333-12.8-189.866667-57.6-226.133333-70.4 25.6-42.666667 46.933333-91.733333 59.733333-147.2h-145.066667v-49.066666h179.2v-29.866667h-179.2V277.333333H490.666667c-12.8 0-12.8 10.666667-12.8 10.666667v70.4h-168.533334v29.866667h168.533334v49.066666h-138.666667v27.733334h277.333333c-10.666667 34.133333-23.466667 66.133333-40.533333 96-61.866667-21.333333-98.133333-34.133333-174.933333-42.666667-145.066667-12.8-179.2 66.133333-185.6 113.066667-8.533333 74.666667 57.6 134.4 157.866666 134.4 98.133333 0 164.266667-44.8 228.266667-119.466667 64 29.866667 170.666667 81.066667 215.466667 102.4C742.4 838.4 633.6 896 512 896c-211.2 0-384-172.8-384-384S300.8 128 512 128c51.2 0 100.266667 10.666667 147.2 29.866667 10.666667 4.266667 23.466667 0 27.733333-10.666667 4.266667-10.666667 0-23.466667-10.666666-27.733333-51.2-21.333333-106.666667-32-164.266667-32C277.333333 85.333333 85.333333 277.333333 85.333333 512s192 426.666667 426.666667 426.666667 426.666667-192 426.666667-426.666667c0-57.6-10.666667-110.933333-32-164.266667zM360.533333 721.066667c-104.533333 0-121.6-66.133333-115.2-91.733334 6.4-27.733333 36.266667-61.866667 93.866667-61.866666 66.133333 0 125.866667 17.066667 198.4 51.2-51.2 64-113.066667 102.4-177.066667 102.4z"
                    fill="#3D3D3D"
                    p-id="3881"></path>
                </svg>
                <svg
                  t="1685865131563"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4964"
                  width="30"
                  height="30">
                  <path
                    d="M874.666667 394.666667H149.333333v373.333333a53.333333 53.333333 0 0 0 53.333334 53.333333h618.666666a53.333333 53.333333 0 0 0 53.333334-53.333333V394.666667z m-725.333334-64h725.333334v-74.666667a53.333333 53.333333 0 0 0-53.333334-53.333333H202.666667a53.333333 53.333333 0 0 0-53.333334 53.333333v74.666667z m608 341.333333a32 32 0 0 1 0 64H650.666667a32 32 0 0 1 0-64h106.666666zM202.666667 138.666667h618.666666c64.8 0 117.333333 52.533333 117.333334 117.333333v512c0 64.8-52.533333 117.333333-117.333334 117.333333H202.666667c-64.8 0-117.333333-52.533333-117.333334-117.333333V256c0-64.8 52.533333-117.333333 117.333334-117.333333z"
                    fill="#000000"
                    p-id="4965"></path>
                </svg>
              </div>
              <div class="footer">
                <ul>
                  <li>
                    <svg
                      t="1685865587397"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="6424"
                      width="20"
                      height="20">
                      <path
                        d="M56.888889 512c17.066667-221.866667 199.111111-398.222222 426.666667-398.222222s409.6 176.355556 426.666666 398.222222h56.888889c-17.066667-256-227.555556-455.111111-483.555555-455.111111S17.066667 256 0 512h56.888889zM910.222222 568.888889c-17.066667 221.866667-199.111111 398.222222-426.666666 398.222222S73.955556 790.755556 56.888889 568.888889H0c17.066667 256 221.866667 455.111111 483.555556 455.111111s466.488889-199.111111 483.555555-455.111111h-56.888889z"
                        fill="#333333"
                        p-id="6425"></path>
                      <path
                        d="M512 625.777778V512h170.666667V455.111111H551.822222l142.222222-142.222222-39.822222-39.822222-170.666666 170.666666-170.666667-170.666666-39.822222 39.822222L415.288889 455.111111H284.444444v56.888889h170.666667v113.777778H284.444444v56.888889h170.666667v170.666666h56.888889v-170.666666h170.666667v-56.888889zM910.222222 170.666667h56.888889v341.333333h-56.888889zM0 568.888889h56.888889v341.333333H0z"
                        fill="#333333"
                        p-id="6426"></path>
                    </svg>
                    续费
                  </li>
                  <li @click="updateCommunity('update', item.id)">
                    <svg
                      t="1685865629361"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="7411"
                      width="20"
                      height="20">
                      <path
                        d="M862.709333 116.042667a32 32 0 1 1 45.248 45.248L455.445333 613.813333a32 32 0 1 1-45.258666-45.258666L862.709333 116.053333zM853.333333 448a32 32 0 0 1 64 0v352c0 64.8-52.533333 117.333333-117.333333 117.333333H224c-64.8 0-117.333333-52.533333-117.333333-117.333333V224c0-64.8 52.533333-117.333333 117.333333-117.333333h341.333333a32 32 0 0 1 0 64H224a53.333333 53.333333 0 0 0-53.333333 53.333333v576a53.333333 53.333333 0 0 0 53.333333 53.333333h576a53.333333 53.333333 0 0 0 53.333333-53.333333V448z"
                        fill="#000000"
                        p-id="7412"></path>
                    </svg>
                    编辑
                  </li>
                  <li @click="deleteCommunity(item.id)">
                    <svg
                      t="1685865654296"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="8425"
                      width="20"
                      height="20">
                      <path
                        d="M909.050991 169.476903l-217.554898 0 0-31.346939c0-39.5866-32.205493-71.792093-71.793116-71.792093L408.15591 66.337871c-39.5866 0-71.792093 32.205493-71.792093 71.792093l0 31.346939L113.349581 169.476903c-11.013845 0-19.942191 8.940626-19.942191 19.954471s8.928347 19.954471 19.942191 19.954471l84.264149 0 0 640.687918c0 60.479443 49.203632 109.683075 109.683075 109.683075l416.474366 0c60.479443 0 109.683075-49.203632 109.683075-109.683075L833.454246 209.385844l75.595722 0c11.012821 0 19.942191-8.940626 19.942191-19.954471S920.063813 169.476903 909.050991 169.476903zM376.2482 138.130987c0-17.593703 14.314007-31.907711 31.907711-31.907711l211.547067 0c17.593703 0 31.907711 14.314007 31.907711 31.907711l0 31.346939L376.2482 169.477926 376.2482 138.130987zM793.569864 850.074785c0 38.486546-31.312146 69.798692-69.798692 69.798692L307.297828 919.873478c-38.486546 0-69.798692-31.312146-69.798692-69.798692L237.499136 211.042577l556.070728 0L793.569864 850.074785z"
                        fill="#272636"
                        p-id="8426"></path>
                      <path
                        d="M510.662539 861.276918c11.012821 0 19.954471-8.92937 19.954471-19.942191L530.61701 294.912753c0-11.013845-8.94165-19.942191-19.954471-19.942191s-19.954471 8.928347-19.954471 19.942191L490.708068 841.334727C490.708068 852.347548 499.649717 861.276918 510.662539 861.276918z"
                        fill="#272636"
                        p-id="8427"></path>
                      <path
                        d="M374.562814 801.449321c11.012821 0 19.954471-8.92937 19.954471-19.942191L394.517285 354.74035c0-11.013845-8.94165-19.942191-19.954471-19.942191s-19.954471 8.928347-19.954471 19.942191l0 426.76678C354.608344 792.519951 363.549993 801.449321 374.562814 801.449321z"
                        fill="#272636"
                        p-id="8428"></path>
                      <path
                        d="M649.832182 801.449321c11.012821 0 19.954471-8.92937 19.954471-19.942191L669.786653 354.74035c0-11.013845-8.94165-19.942191-19.954471-19.942191s-19.954471 8.928347-19.954471 19.942191l0 426.76678C629.877711 792.519951 638.81936 801.449321 649.832182 801.449321z"
                        fill="#272636"
                        p-id="8429"></path>
                    </svg>
                    删除
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <div
              v-if="isSeach"
              class="add_card"
              @click="updateCommunity('add')">
              <div class="box">
                <h3>添加小区</h3>
                <p>还能添加{{ state.CommunityQuantity }}个小区</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <newComityCom v-else @isflag="isflag"></newComityCom>
  <dialogCom :dialog="dialog" @cancle="cancle" @confirm="confirm"></dialogCom>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { ref, reactive, watch, computed } from 'vue';
import { useStore } from 'vuex';
import {
  getCommunityList,
  searchCommunityList,
  deleteCommunityList,
} from '../../../api/IDC';
import newComityCom from '../../../components/IDC/Community/newComityCom.vue';
import dialogCom from '../../../components/Other/dialogCom.vue';
const store = useStore();
const isSeach = ref(true);
const state = reactive({
  CommunityList: [],
  CommunityQuantity: '',
  searchCmmunityList: '',
  Clist: [],
  deleteId: '',
});
const dialog = reactive({
  dialogVisible: false,
  title: '确定要删除吗？',
  cancleText: '取消',
  confirmText: '确定',
  width: '30%',
});
//新增修改小区
const updateCommunity = (type, id) => {
  //添加小区
  if (type === 'add') {
    if (state.CommunityQuantity === 0) {
      ElMessage({
        message: '添加的小区已达到上限',
        type: 'error',
      });
      return;
    }
    store.commit('idc/setCommunityType', 'add');
  } else {
    //修改小区
    state.CommunityList.forEach((item) => {
      if (item.id === id) {
        store.commit('idc/setCommunity', item);
      }
    });
    store.commit('idc/setCommunityType', 'update');
  }
  store.commit('idc/setCommunityflag', false);
};
//删除小区
const deleteCommunity = (id) => {
  dialog.dialogVisible = true;
  state.deleteId = id;
};
//弹出框取消
const cancle = () => {
  dialog.dialogVisible = false;
};
//弹出框确认
const confirm = () => {
  dialog.dialogVisible = false;
  state.CommunityList.forEach((item) => {
    if (item.id === state.deleteId) {
      deleteCommunityList(item).then((res) => {
        CommunityListFn();
        ElMessage({
          message: '删除成功',
          type: 'success',
        });
      });
    }
  });
};
//搜索小区
const searchCommunity = () => {
  state.searchCmmunityList.split('').forEach((item) => {
    state.CommunityList.forEach((list) => {
      if (list.Cname.includes(item)) {
        if (state.Clist.indexOf(list) === -1) {
          state.Clist.push(list);
        }
      }
    });
  });
  if (JSON.stringify(state.Clist) !== '[]') {
    isSeach.value = false;
  } else {
    isSeach.value = true;
  }
  searchCommunityList(state.Clist).then((res) => {
    state.CommunityList = res;
  });
  state.Clist = [];
  state.searchCmmunityList = '';
};
const isflag = () => {
  store.commit('idc/setCommunityflag', true);
};
watch(
  () => store.state.idc.Communityflag,
  () => {
    if (isSeach.value) {
      CommunityListFn();
    }
  }
);
state.CommunityQuantity = computed(() => {
  return 6 - state.CommunityList.length;
});
const CommunityListFn = () => {
  getCommunityList().then((res) => {
    state.CommunityList = res;
  });
};
CommunityListFn();
</script>

<style scoped lang="scss">
.container {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgb(219, 218, 218);
    h3 {
      font-size: 20px;
    }
    .el-input {
      width: 250px;
      height: 30px;
    }
  }
  .card {
    padding-top: 15px;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 30%;
        height: 220px;
        margin-right: 10px;
        .el_card {
          background-color: white;
          box-shadow: 1px 1px 5px rgb(218, 217, 217);
          width: 100%;
          height: 200px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .cardMessage {
            display: flex;
            margin-top: 10px;
            margin-left: 10px;
            .el-image {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              margin-right: 10px;
              h3 {
                margin-bottom: 10px;
              }
            }
          }
          .cardIcon {
            margin-top: 20px;
            margin-left: 10px;
            svg {
              margin-right: 10px;
            }
          }
          .footer {
            width: 100%;
            height: 50px;
            background-color: rgb(249, 249, 249);
            ul {
              width: 70%;
              height: 50px;
              font-size: 10px;
              margin-top: 15px;
              float: right;
              li {
                display: flex;
                width: 26%;
                cursor: pointer;
              }
            }
          }
        }
        .add_card {
          display: flex;
          background-color: white;
          box-shadow: 1px 1px 5px rgb(218, 217, 217);
          border: 1px solid white;
          width: 100%;
          height: 200px;
          justify-content: center;
          align-items: center;
          text-align: center;
          cursor: pointer;
        }
        .add_card:hover {
          border: 1px dashed rgb(4, 136, 244);
        }
      }
    }
  }
}
</style>
