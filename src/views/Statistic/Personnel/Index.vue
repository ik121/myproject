<template>
  <div class="container">
    <el-select @change="showList" v-model="select" placeholder="请选择">
      <el-option
        v-for="item in state.CommunityList"
        :key="item.id"
        :value="item.Cname">
      </el-option>
    </el-select>
    <div class="first">
      <div class="Occupancy">
        <p class="title">入住情况</p>
        <div class="box">
          <div class="left">
            <p>{{ state.people }}</p>
            <span>入住人数</span>
          </div>
          <div class="right">
            <OccupancyCom
              :people="state.people"
              :util="state.util"></OccupancyCom>
          </div>
        </div>
      </div>
      <div class="ResidentType">
        <p class="title">住户类型分析</p>
        <div class="box">
          <ResidentTypeCom :OwnerList="state.OwnerList"></ResidentTypeCom>
        </div>
      </div>
      <div class="Sex">
        <p class="title">男女占比</p>
        <div class="box">
          <SexCom :OwnerList="state.OwnerList"></SexCom>
        </div>
      </div>
    </div>
    <div class="second">
      <div class="OwnerAgeCom">
        <p class="title">住户年龄分布</p>
        <div class="box">
          <OwnerAgeCom :OwnerList="state.OwnerList"></OwnerAgeCom>
        </div>
      </div>
      <div class="OwnerTypeCom">
        <p class="title">住户类型</p>
        <div class="box">
          <OwnerTypeCom :OwnerList="state.OwnerList"></OwnerTypeCom>
        </div>
      </div>
    </div>
    <div class="three">
      <div class="TurnoverCom">
        <p class="title">住户流动情况</p>
        <div class="box">
          <TurnoverCom></TurnoverCom>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { getBulidList, getOwnerList, getCommunityList } from '../../../api/IDC';
const select = ref();
const state = reactive({
  CommunityList: '',
  OwnerList: [],
});
const fn1 = async () => {
  await getCommunityList().then((res) => {
    state.CommunityList = res;
    select.value = state.CommunityList[0].Cname;
  });
  fn();
};
fn1();
const fn = async () => {
  await getBulidList().then((res) => {
    let sum = 0;
    res.forEach((item) => {
      if (item.Cname === select.value) {
        item.Bulid.forEach((bitem) => {
          sum = sum + bitem.units * bitem.floor;
        });
      }
    });
    state.util = sum * 4;
  });
  //入住人数
  await getOwnerList().then((res) => {
    let sum = 0;
    state.OwnerList = [];
    res.forEach((item) => {
      if (item.Cname === select.value) {
        state.OwnerList.push(item);
      }
    });
    console.log(state.OwnerList);
    res.forEach((item) => {
      if (item.Cname === select.value) {
        sum++;
      }
    });
    state.people = sum;
  });
};
const showList = async () => {
  //房间总数
  fn();
};
</script>

<style scoped lang="scss">
.container {
  width: 1290px;
}
.first {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .Occupancy {
    padding: 10px;
    width: 400px;
    height: 230px;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    .title {
      font-weight: 600;
    }
    .box {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .left {
      text-align: center;
      margin-left: 60px;
      p {
        font-size: 30px;
        color: rgb(5, 250, 54);
        font-weight: 600;
      }
      span {
        font-size: 14px;
        text-align: center;
      }
    }
  }
  .ResidentType {
    padding: 10px;
    width: 400px;
    height: 230px;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    .title {
      font-weight: 600;
    }
    .box {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .left {
      text-align: center;
      margin-left: 60px;
      p {
        font-size: 30px;
        color: rgb(5, 250, 54);
        font-weight: 600;
      }
      span {
        font-size: 14px;
        text-align: center;
      }
    }
  }
  .Sex {
    padding: 10px;
    width: 400px;
    height: 230px;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    .title {
      font-weight: 600;
    }
    .box {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .left {
      text-align: center;
      margin-left: 60px;
      p {
        font-size: 30px;
        color: rgb(5, 250, 54);
        font-weight: 600;
      }
      span {
        font-size: 14px;
        text-align: center;
      }
    }
  }
}
.second {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .OwnerAgeCom {
    padding: 10px;
    width: 830px;
    height: 230px;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    .title {
      font-weight: 600;
    }
  }
  .OwnerTypeCom {
    padding: 10px;
    width: 400px;
    height: 230px;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    .title {
      font-weight: 600;
    }
  }
}
.three {
  margin-top: 20px;
  .TurnoverCom {
    padding: 10px;
    width: 1260px;
    height: 300px;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    .title {
      font-weight: 600;
    }
  }
}
.fourth {
  width: 1260px;
  height: 230px;
  padding: 10px;
  margin-top: 20px;
  background-color: rgb(255, 255, 255);
  .title {
    font-weight: 600;
  }
}
</style>
