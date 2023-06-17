<template>
  <el-pagination
    background
    v-model:current-page="count"
    :total="total"
    layout="prev, pager, next, jumper"
    @current-change="changeCount" />
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  total: Number,
});
const emits = defineEmits('current');
const count = ref();
const changeCount = () => {
  emits('current', count.value);
};
</script>

<style scoped lang="scss">
.el-pagination {
  float: right;
  
}
</style>
