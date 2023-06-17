<template>
  <el-table
    :data="tableData"
    @selection-change="selectL"
    ref="multipleTable"
    style="width: 100%">
    <el-table-column v-if="selection" type="selection" width="55" />
    <el-table-column
      v-for="item in tablist"
      :key="item"
      :prop="item.prop"
      :width="item.width"
      :label="item.label">
      <template #default="scope" v-if="$slots[item.prop]">
        <slot :name="item.prop" v-bind="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
const multipleTable = ref();
const store = useStore();
const selectL = (selection) => {
  store.state.idc.selectCar = selection;
};
const props = defineProps({
  selection: Boolean,
  tableData: Object,
  tablist: Object,
});
</script>

<style scoped lang="scss">
::v-deep .cell {
  font-size: 14px;
  text-align: center;
}
</style>
