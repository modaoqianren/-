<template>
  <el-button size="mini" type="danger" @click="willDelete()">删除</el-button>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    willDelete() {
      this.$confirm("你确定删除该文件吗？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //  通知父组件删除
        this.$emit('del')
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style>
</style>