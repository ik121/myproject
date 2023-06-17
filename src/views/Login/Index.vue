<template>
  <div class="container">
    <el-form :model="form" label-width="120px" ref="ruleFormRef" :rules="rules">
      <div class="Tltle">
        <div class="logo">
          <el-image src="../../../public/1685107138935.png" />
        </div>
        <div class="word">智慧物业</div>
      </div>
      <div class="islogin">登录</div>
      <el-form-item label="手机号：" prop="iphone">
        <el-input v-model="form.iphone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" />
      </el-form-item>
      <div class="ischeck">
        <el-checkbox v-model="form.remember" label="记住密码" name="type" />
        <span>忘记密码？</span>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
      <div class="register">
        还没有账号？
        <span>立即注册</span>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/api/Home.js';
const ruleFormRef = ref();
const form = reactive({
  iphone: '',
  password: '',
  remember: false,
});

const rules = reactive({
  iphone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
});

if (localStorage.getItem('admin') && localStorage.getItem('password')) {
  form.iphone = localStorage.getItem('admin');
  form.password = localStorage.getItem('password');
  form.remember = true;
}

const router = useRouter();
const onSubmit = () => {
  if (!ruleFormRef) return;
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      login({ admin: form.iphone, password: form.password }).then((res) => {
        if (res.code === '登录成功') {
          router.push('/');
          if (form.remember) {
            localStorage.setItem('admin', form.iphone);
            localStorage.setItem('password', form.password);
            localStorage.setItem('token', res.token);
          } else {
            localStorage.setItem('admin', '');
            localStorage.setItem('password', '');
            localStorage.setItem('token', '');
          }
          ElMessage({
            message: '登录成功',
            type: 'success',
          });
        } else {
          ElMessage({
            message: '用户名或密码错误',
            type: 'warning',
          });
        }
      });
    } else {
      ElMessage({
        message: '请输入用户名和密码',
        type: 'warning',
      });
    }
  });
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background-color: rgb(0, 145, 255);
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-form {
  width: 500px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .el-form-item {
    margin-top: 10px;
  }
  .Tltle {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .el-image {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    .word {
      font-size: 35px;
      font-weight: 600;
      color: rgb(0, 145, 255);
    }
  }
  .islogin {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .el-input {
    width: 300px;
    margin-right: 20px;
  }
  .ischeck {
    display: flex;
    align-items: center;
    width: 300px;
    justify-content: space-between;
    span {
      font-size: 10px;
      color: rgb(22, 155, 213);
    }
  }
  .el-button {
    width: 350px;
    height: 50px;
    margin-right: 80px;
  }
  .register {
    span {
      font-size: 14px;
      color: rgb(22, 155, 213);
    }
  }
}
</style>
