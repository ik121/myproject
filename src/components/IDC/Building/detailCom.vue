<template>
  <div class="container">
    <div class="header">
      <h2>数据详情</h2>
      <el-button @click="close">返回</el-button>
    </div>
    <div class="main">
      <h2>房屋详情</h2>
      <ul>
        <li>
          <h5>房号:</h5>
          <p>
            {{ props.detailList.floor }}- {{ props.detailList.units }} -{{
              props.detailList.roomNumber
            }}
          </p>
        </li>
        <li>
          <h5>所属小区:</h5>
          <p>{{ props.Cname }}</p>
        </li>
        <li>
          <h5>楼宇:</h5>
          <p>{{ props.detailList.floor }}楼{{ props.detailList.units }}单元</p>
        </li>
        <li>
          <h5>单元:</h5>
          <p>{{ props.detailList.units }}</p>
        </li>
        <li>
          <h5>所在楼层:</h5>
          <p>{{ props.detailList.floor }}</p>
        </li>
        <li>
          <h5>套房面积:</h5>
          <p>{{ props.detailList.InnerSpace }}</p>
        </li>
        <li>
          <h5>公摊面积:</h5>
          <p>{{ props.detailList.PublicSpace }}</p>
        </li>
        <li>
          <h5>建筑面积:</h5>
          <p>{{ props.detailList.buildSpace }}</p>
        </li>
        <li>
          <h5>房号朝向:</h5>
          <p>{{ props.detailList.toward }}</p>
        </li>
        <li>
          <h5>产权年限:</h5>
          <p>70</p>
        </li>
        <li>
          <h5>附件:</h5>
          <p>暂无</p>
        </li>
      </ul>
    </div>
    <div
      class="footer"
      v-if="JSON.stringify(props.detailList.Owner) === '[]' ? false : true">
      <TableCom :tableData="props.detailList.Owner" :tablist="tablist">
      </TableCom>
    </div>
    <div class="footer" v-else>
      <p>这个房子暂时还没有人居住</p>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { watch, reactive } from 'vue';
import TableCom from '../../Other/tableCom.vue';
const store = useStore();
const props = defineProps({
  detailList: Object,
  Cname: String,
});
const tablist = reactive([
  {
    prop: 'ownerName',
    label: '姓名',
  },
  {
    prop: 'sex',
    label: '性别',
  },
  {
    prop: 'iphone',
    label: '联系电话',
  },
  {
    prop: 'type',
    label: '身份',
  },
]);
console.log(JSON.stringify(props.detailList.Owner));

const close = () => {
  store.commit('idc/setBuildingDetail', true);
};
</script>

<style scoped lang="scss">
.container {
  flex-direction: column;
  .header {
    display: flex;
    justify-content: space-between;
    .el-button {
      font-size: 18px;
      font-weight: 600;
      width: 110px;
      height: 40px;
    }
  }
  h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .main {
    width: 100%;
    padding: 20px;
    background-color: white;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 30%;
        display: flex;
        margin-top: 30px;
        h5 {
          width: 50%;
          margin-right: 20px;
          text-align: right;
        }
      }
    }
  }
  .footer {
    width: 100%;
    margin-top: 10px;
    min-height: 60px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    p{
      
    }
  }
}
</style>
