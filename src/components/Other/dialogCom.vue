<template>
  <el-dialog
    v-model="dialog.dialogVisible"
    :title="dialog.title"
    :width="dialog.width"
    :draggable="true"
    :close-on-press-escape="false"
    :close-on-click-modal="false">
    <div>{{ dialog.prompt }}</div>
    <slot :name="dialog.name" v-if="$slots[dialog.name]"></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">{{ dialog.cancleText }}</el-button>
        <el-button type="primary" @click="confirm">
          {{ dialog.confirmText }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
const props = defineProps({
  dialog: Object,
});
const emits = defineEmits(['cancle', 'confirm']);
const confirm = () => {
  emits('confirm');
};
const cancle = () => {
  emits('cancle');
};
</script>

<style lang="scss" scoped></style>
