<template>
  <el-menu
    background-color="#fff"
    text-color="#000"
    class="menu"
    :unique-opened="true"
    :default-openeds="['/message','/idc']"
    router
    :default-active="route.path">
    <!-- 首页 -->
    <el-menu-item index="/message">
      <el-icon><House /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <!-- 数据中心 -->
    <el-sub-menu index="/idc">
      <template #title>
        <el-icon><ChatLineSquare /></el-icon>
        <span>数据中心</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/idc/community">小区管理</el-menu-item>
        <el-menu-item index="/idc/building">楼宇管理</el-menu-item>
        <el-menu-item index="/idc/car">车位管理</el-menu-item>
        <el-menu-item index="/idc/owner">业主管理</el-menu-item>
        <el-menu-item index="/idc/tenant">租客管理</el-menu-item>
        <el-menu-item index="/idc/visitor">访客管理</el-menu-item>
        <el-menu-item index="/idc/advertisement">广告位管理</el-menu-item>
        <el-menu-item index="/idc/vehicle">车辆管理</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <!-- 物业服务 -->
    <el-sub-menu index="/Property">
      <template #title>
        <el-icon><Connection /></el-icon>
        <span>物业服务</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/Property/Notice">公告管理</el-menu-item>
        <el-menu-item index="/Property/complaint">投诉管理</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <!-- 统计分析 -->
    <el-sub-menu index="9">
      <template #title>
        <el-icon><PieChart /></el-icon>
        <span>统计分析</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/statistic/personnel">人员分析</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>
<script setup>
import {
  House,
  ChatLineSquare,
  Connection,
  Present,
  Box,
  Edit,
  CopyDocument,
  Tools,
  PieChart,
  Printer,
} from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
<style scoped lang="scss">
.menu {
  height: 100%;
  border-right: 0px solid;
}
</style>
