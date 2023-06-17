<template>
  <div class="container">
    <div class="box">
      <div class="top">
        <el-image></el-image>
        <div>
          <ul>
            <li>
              <span> 姓名:</span>
              <span>yezai</span>
            </li>
            <li>
              <span>角色:</span>
              <span>物管</span>
            </li>
            <li>
              <span>电话:</span>
              <span>17858335483</span>
            </li>
            <li>
              <span>录入时间:</span>
              <span>2023-5-1</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="main">
        <ul>
          <li>
            <span><p>性别:</p></span>
            <span>男</span>
          </li>
          <li>
            <span><p>年龄:</p></span>
            <span>21</span>
          </li>
          <li>
            <span><p>学历:</p></span>
            <span>清华大学</span>
          </li>
          <li>
            <span><p>身份证号码:</p></span>
            <span>3304822002xxxxxxxx</span>
          </li>
          <li>
            <span><p>入职时间:</p></span>
            <span>2022-xx-xx</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  .box {
    display: flex;
    flex-direction: column;
    width: 700px;
    height: 500px;
    padding: 20px;
    background-color: white;
    .top {
      display: flex;
      width: 100%;
      height: 170px;
      border-bottom: 1px solid rgb(238, 238, 238);
      .el-image {
        width: 150px;
        height: 150px;
      }
      ul {
        margin-left: 20px;

        li {
          margin-top: 15px;
          display: flex;
        }
      }
    }
    .main {
      width: 100%;
      ul {
        width: 60%;
        li {
          display: flex;
          width: 100%;
          margin-top: 20px;
          span {
            display: block;
            width: 30%;
            margin-right: 40px;
            p {
              float: right;
            }
          }
        }
      }
    }
  }
}
</style>
