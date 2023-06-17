<template>
  <div class="container">
    <div class="header">
      <div class="header_left">
        <el-image
          class="undraw"
          src="../../../../public/undraw_Small_town_re_7mcn.png" />
        <div>
          <span>浙江荣智物业公司</span>
          <p>智慧小区 VIP版 | 到期时间 2024-6-30</p>
        </div>
      </div>
      <div class="header_right">
        <div>
          <span>可添加小区(个)</span>
          <p>{{ 6 - state.CommunityList.length }}</p>
        </div>
        <div>
          <span>剩余短信</span>
          <p>4512</p>
        </div>
      </div>
    </div>
    <div class="broadcast" ref="broadcast">
      <svg
        t="1685782651297"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1397"
        width="20"
        height="20">
        <path
          d="M855.194374 512.339073a263.12053 263.12053 0 0 0-191.915232-252.948345 33.907285 33.907285 0 0 0-42.045033 33.907285 33.907285 33.907285 0 0 0 24.074172 33.907285 194.627815 194.627815 0 0 1 0 374.675497 33.907285 33.907285 0 0 0-24.074172 33.907284 33.907285 33.907285 0 0 0 42.045033 33.907285 263.12053 263.12053 0 0 0 191.915232-257.356291zM529.006295 0a46.113907 46.113907 0 0 0-27.803974 12.545695L490.35199 22.039735l-109.859603 89.515232-156.312582 128.508609H83.464573a67.81457 67.81457 0 0 0-67.81457 67.81457V708.662252a67.81457 67.81457 0 0 0 67.81457 67.814569h131.899338l160.381457 131.899338 111.215894 91.210596 14.580132 11.86755a46.113907 46.113907 0 0 0 27.803974 12.545695c11.86755 0 20.005298-8.815894 23.056953-24.413245a65.780132 65.780132 0 0 0 0-12.545695V37.298013a67.81457 67.81457 0 0 0 0-14.919205c-3.729801-14.580132-12.206623-22.378808-23.396026-22.378808zM320.815566 775.12053l-81.03841-67.81457H83.464573V307.878146h164.789404l78.6649-64.423841 158.686093-130.543047v797.838411z"
          fill="#fd9809"
          p-id="1398"></path>
        <path
          d="M733.806295 71.544371a33.907285 33.907285 0 0 0-48.82649 30.177483 33.907285 33.907285 0 0 0 19.327152 30.516557 421.128477 421.128477 0 0 1 0 756.13245 33.907285 33.907285 0 0 0-19.327152 30.516556 33.907285 33.907285 0 0 0 48.82649 30.855629 488.943046 488.943046 0 0 0 0-878.537748z"
          fill="#fd9809"
          p-id="1399"></path>
      </svg>
      <p ref="pw">
        <span ref="sw" :style="{ left: state.left + 'px' }"
          >欢迎使用智慧物业系统，开启你的智慧生活。凑字数凑字数凑字数，凑字数凑字数凑字数，凑字数凑字数凑字数</span
        >
      </p>
    </div>
    <div class="main">
      <div class="statistics">
        <ul>
          <li>
            <el-image
              src="../../../../public/undraw_For_sale_re_egkk.png"
              style="border: 10px solid rgba(5, 25, 243, 0.1)" />
            <div>
              <span style="color: blue">{{ state.BuildSum }}</span>
              <p>房屋认证数</p>
            </div>
          </li>
          <li>
            <el-image
              src="../../../../public/undraw_Drink_coffee_jdqb.png"
              style="border: 10px solid rgba(243, 5, 5, 0.1)" />
            <div>
              <span style="color: rgb(255, 0, 0)">{{ state.OwnerSum }}</span>
              <p>业主数</p>
            </div>
          </li>
          <li>
            <el-image
              src="../../../../public/undraw_Profile_re_4a55.png"
              style="border: 10px solid rgba(243, 100, 5, 0.1)" />
            <div>
              <span style="color: rgb(255, 170, 0)"
                >{{ state.TenantSum }}
              </span>
              <p>租客数</p>
            </div>
          </li>
          <li>
            <el-image
              src="../../../../public/undraw_Personal_documents_re_vcf2.png"
              style="border: 10px solid rgba(140, 5, 243, 0.1)" />
            <div>
              <span style="color: rgb(149, 0, 255)">39</span>
              <p>员工数</p>
            </div>
          </li>
          <li>
            <el-image
              src="../../../../public/undraw_Business_deal_re_up4u.png"
              style="border: 10px solid rgba(59, 255, 5, 0.1)" />
            <div>
              <span style="color: rgb(5, 255, 47)">39</span>
              <p>商家数</p>
            </div>
          </li>
          <li>
            <el-image
              src="../../../../public/undraw_automobile_repair_ywci.png"
              style="border: 10px solid rgba(255, 213, 5, 0.1)" />
            <div>
              <span style="color: rgb(255, 197, 5)">
                {{ state.ParkingSum }}
              </span>
              <p>车位数</p>
            </div>
          </li>
          <li>
            <el-image
              src="../../../../public/undraw_Order_ride_re_372k.png"
              style="border: 10px solid rgba(6, 240, 127, 0.1)" />
            <div>
              <span style="color: rgb(5, 255, 201)">
                {{ state.VehicleSum }}
              </span>
              <p>等级车辆数</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="box">
        <div class="boxLeft">
          <ul>
            <li class="one">
              <div class="left">
                <h3>房屋统计</h3>
                <HouseEchCom
                  :BuildSum="state.BuildSum"
                  :OwnerSum="state.OwnerSum"
                  :TenantSum="state.TenantSum"
                  style="margin-left: 50px"></HouseEchCom>
              </div>
              <div class="right">
                <h3>缴费统计</h3>
                <p>应缴费用:2039.23万元 已收:1039.23万元 待售:39.23万元</p>
                <payCom></payCom>
              </div>
            </li>
            <li class="two">
              <div class="left">
                <h3>满意度查询</h3>
                <satisfiedEchCom></satisfiedEchCom>
              </div>
              <div class="right">
                <h3>工单统计</h3>
                <workEchCom></workEchCom>
              </div>
            </li>
            <li class="three">
              <div class="left">
                <h3>代办工单</h3>
                <ul>
                  <li>
                    <h5>B1-1楼梯口消防设备维修</h5>
                    <p>2021-04-12 11:30</p>
                  </li>
                  <li>
                    <h5>B1-1楼梯口消防设备维修</h5>
                    <p>2021-04-12 11:30</p>
                  </li>
                  <li>
                    <h5>B1-1楼梯口消防设备维修</h5>
                    <p>2021-04-12 11:30</p>
                  </li>
                </ul>
              </div>
              <div class="right">
                <DoorEachCom></DoorEachCom>
              </div>
            </li>
          </ul>
        </div>
        <div class="boxRight">
          <div class="top">
            <h3>快捷方式</h3>
            <ul>
              <li>收银台</li>
              <li>未缴账单</li>
              <li>小区公共</li>
              <li>臭鱼烂虾</li>
              <li class="box">+添加</li>
            </ul>
          </div>
          <div class="bottom">
            <h3>通知公告</h3>
            <ul>
              <li v-for="item in state.NoticeList" :key="item.NoticeId">
                <h5>{{ item.NoticeName }}</h5>
                <p>{{ item.PublishTime }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import HouseEchCom from '../../../components/Home/houseEchCom.vue';
import payCom from '../../../components/Home/payCom.vue';
import workEchCom from '../../../components/Home/workEchCom.vue';
import DoorEachCom from '../../../components/Home/DoorEachCom.vue';
import satisfiedEchCom from '../../../components/Home/satisfiedEchCom.vue';
import {
  getCommunityList,
  getBulidList,
  getOwnerList,
  getCarList,
  getVehicleList,
} from '../../../api/IDC';
import { getNoticeList } from '../../../api/Property';

const sw = ref();
const pw = ref();
const broadcast = ref();
const state = reactive({
  CommunityList: '',
  BuildSum: 0,
  OwnerSum: 0,
  TenantSum: 0,
  ParkingSum: 0,
  VehicleSum: 0,
  left: 0,
  setTime: null,
  NoticeList: '',
});
onMounted(() => {
  state.setTime = setInterval(() => {
    state.left--;
    if (state.left < -sw.value.clientWidth) {
      state.left = pw.value.clientWidth;
    }
  }, 10);
}),
  onBeforeUnmount(() => {
    clearInterval(state.setTime);
    state.setTime = null;
  });
getCommunityList().then((res) => {
  state.CommunityList = res;
});
getBulidList().then((res) => {
  let sum = 0;
  res.forEach((item) => {
    item.Bulid.forEach((bitem) => {
      sum = sum + bitem.units * bitem.floor;
    });
  });
  state.BuildSum = sum * 4;
});
getOwnerList().then((res) => {
  res.forEach((item) => {
    if (item.type === '业主') {
      state.OwnerSum++;
    } else if (item.type === '租客') {
      state.TenantSum++;
    }
  });
});
getCarList().then((res) => {
  res.forEach((item) => {
    state.ParkingSum++;
  });
});
getVehicleList().then((res) => {
  res.forEach((item) => {
    state.VehicleSum++;
  });
});
getNoticeList(1).then((res) => {
  state.NoticeList = res;
});
</script>
<style lang="scss" scoped>
.container {
  width: 1290px;
  .header {
    background-color: white;
    display: flex;
    justify-content: space-between;
    .header_left {
      display: flex;
      align-items: center;
      padding: 10px 20px 10px 20px;
      .el-image {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .undraw {
        border: 1px solid rgb(227, 226, 226);
        box-shadow: -1px 0px 5px rgb(191, 191, 191);
      }
      span {
        font-weight: 600;
        margin-left: 10px;
      }
      p {
        color: rgb(168, 168, 168);
        font-size: 14px;
        margin-top: 5px;
        margin-left: 10px;
      }
    }
    .header_right {
      display: flex;
      text-align: center;
      align-items: center;
      margin-right: 10px;
      div {
        margin-left: 30px;
        font-size: 14px;
        span {
        }
        p {
          color: rgb(255, 153, 0);
        }
      }
    }
  }
  .broadcast {
    display: flex;
    align-items: center;

    width: 98%;
    height: 30px;
    padding: 5px 0px 5px 20px;
    margin-top: 10px;
    background-color: rgb(250, 253, 183);
    border: 1px solid rgb(255, 153, 0);
    .icon {
      color: rgb(255, 153, 0) !important;
    }
    p {
      width: 100%;
      height: 30px;
      display: flex;
      align-items: center;
      position: relative;
      color: rgb(255, 153, 0);
      overflow: hidden;
      span {
        width: 790px;
        position: absolute;
        left: -10px;
      }
    }
  }
  .main {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    .statistics {
      background-color: white;
      ul {
        padding: 15px;
        display: flex;
        justify-content: space-between;

        li {
          display: flex;
          align-items: center;
          .el-image {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          div {
            margin-left: 20px;
            span {
              font-weight: 600;
              font-size: 24px;
            }
            p {
              font-size: 14px;
              color: rgb(204, 205, 206);
            }
          }
        }
      }
    }
    .box {
      width: 100%;
      display: flex;
      .boxLeft {
        width: 70%;
        ul {
          .one {
            display: flex;
            .left {
              width: 337px;
              height: 250px;
              padding: 10px;
              margin-top: 10px;
              border-radius: 5px;
              box-shadow: 1px 1px 10px rgb(233, 233, 233);
              background-color: white;
              .box {
                margin-left: 20px;
              }
            }
            .right {
              width: 520px;
              height: 250px;
              background-color: white;
              margin-left: 10px;
              margin-top: 10px;
              padding: 10px;
              border-radius: 5px;
              box-shadow: 1px 1px 10px rgb(233, 233, 233);
              p {
                margin-top: 10px;
                margin-left: 10px;
              }
            }
          }
          .two {
            display: flex;
            .left {
              width: 390px;
              height: 280px;
              padding: 10px;
              margin-top: 10px;
              border-radius: 5px;
              box-shadow: 1px 1px 10px rgb(233, 233, 233);
              background-color: white;
              .box {
                margin-left: 20px;
              }
            }
            .right {
              width: 510px;
              height: 280px;
              background-color: white;
              margin-left: 10px;
              margin-top: 10px;
              padding: 10px;
              border-radius: 5px;
              box-shadow: 1px 1px 10px rgb(233, 233, 233);
              p {
                margin-top: 10px;
                margin-left: 10px;
              }
            }
          }
          .three {
            display: flex;
            .left {
              width: 345px;
              height: 300px;
              padding: 10px;
              margin-top: 10px;
              border-radius: 5px;
              box-shadow: 1px 1px 10px rgb(233, 233, 233);
              background-color: white;
              ul {
                li {
                  display: flex;
                  margin-top: 20px;
                  justify-content: space-between;
                  padding-bottom: 10px;
                  border-bottom: 1px solid rgb(244, 242, 242);
                  h5 {
                    font-size: 13px;
                  }
                  p {
                    font-size: 12px;
                    color: rgb(172, 171, 171);
                  }
                }
              }
            }
            .right {
              width: 510px;
              height: 300px;
              background-color: white;
              margin-left: 10px;
              margin-top: 10px;
              padding: 10px;
              border-radius: 5px;
              box-shadow: 1px 1px 10px rgb(233, 233, 233);
              p {
                margin-top: 10px;
                margin-left: 10px;
              }
            }
          }
        }
      }
      .boxRight {
        width: 29%;
        .top {
          width: 355px;
          padding: 10px;
          margin-top: 10px;
          margin-left: 10px;
          border-radius: 5px;
          box-shadow: 1px 1px 10px rgb(233, 233, 233);
          background-color: white;
          ul {
            margin-top: 20px;
            padding: 20px;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            li {
              width: 30%;
              margin-bottom: 20px;
            }
            .box {
              width: 45px;
              height: 20px;
              font-size: 14px;
              border: 1px dotted rgb(55, 55, 249);
            }
          }
        }
        .bottom {
          width: 355px;
          padding: 10px;
          margin-top: 10px;
          margin-left: 10px;
          border-radius: 5px;
          box-shadow: 1px 1px 10px rgb(233, 233, 233);
          background-color: white;
          ul {
            li {
              display: flex;
              margin-top: 20px;
              justify-content: space-between;
              padding-bottom: 20px;
              border-bottom: 1px solid rgb(244, 242, 242);
              h5 {
                font-size: 14px;
              }
              p {
                font-size: 12px;
                color: rgb(174, 172, 172);
              }
            }
          }
        }
      }
    }
  }
}
</style>
