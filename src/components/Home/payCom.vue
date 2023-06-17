<template>
  <div class="container">
    <ul>
      <li>
        <el-progress type="circle" :percentage="72" color="red" />
        <p>停车费</p>
      </li>
      <li>
        <el-progress type="circle" :percentage="50" color="green" />
        <p>物业费</p>
      </li>
      <li>
        <el-progress type="circle" :percentage="48" color="yellow" />
        <p>租金费</p>
      </li>
      <li>
        <el-progress type="circle" :percentage="57" color="blue" />
        <p>水电费</p>
      </li>
      <li>
        <el-progress type="circle" :percentage="26" color="purple" />
        <p>维修费</p>
      </li>
    </ul>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.container {
  margin-top: 50px;
  ul {
    display: flex;
    li {
      width: 100px;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        margin-top: 10px;
        margin-left: 14px;
        font-size: 14px;
      }
    }
  }
  .el-progress {
    margin-left: 15px;
  }
}
::v-deep .el-progress-circle {
  width: 70px !important;
  height: 70px !important;
}
</style>
