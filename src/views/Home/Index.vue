<template>
  <div class="common-layout">
    <el-container class="container_top">
      <el-header>
        <div class="toolbar">
          <el-image src="../../../public/1685107138935.png"></el-image>
          <span>智慧物业</span>
        </div>
        <div class="avatar">
          <img src="../../../public/微信图片_20230306190440.png" />
          <el-dropdown @command="handleCommand">
            <div class="el-dropdown-link">
              <span>yezai</span>
              <el-icon><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="information">
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item> 修改密码 </el-dropdown-item>
                <el-dropdown-item command="login"> 退出登录 </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container class="container_bottom">
        <el-scrollbar height="100%">
          <el-aside width="200px">
            <asideCom></asideCom>
          </el-aside>
        </el-scrollbar>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue';
import asideCom from '../../components/Home/asideCom.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
if (!localStorage.getItem('token')) {
  router.push('/login');
}
const handleCommand = (command) => {
  console.log(command);
  router.push(`/${command}`);
};
</script>

<style scoped lang="scss">
.common-layout {
  height: 100%;
  overflow: hidden;
  .container_top {
    height: 100%;
    background-color: rgb(246, 248, 250);
    .el-header {
      display: flex;
      font-family: '宋体';
      background: linear-gradient(to right,rgb(209, 208, 208), blue,rgb(236, 127, 127) );
      .toolbar {
        display: flex;
        align-items: center;
        overflow: hidden;
        width: 100%;

        .el-image {
          width: 50px;
          height: 50px;
        }
        span {
          margin-left: 10px;
          font-size: 35px;
          color: white;
        }
      }
      .avatar {
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 5px;

          object-fit: cover;
        }
        span {
          color: white;
          margin-right: 5px;
        }

        .el-dropdown {
          display: flex;
          color: white;
          div {
            display: flex;
            span {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
  .container_bottom {
    height: 100%;
    .el-scrollbar {
      background-color: rgb(255, 255, 255);
    }
    .el-aside {
      height: 100%;
      
    }
    .el-main {
      height: 100%;
      background-color: rgb(246, 248, 250);
    }
  }
}
::v-deep .el-dropdown-link:focus {
  outline: none !important;
}

</style>
