<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit="willEdit"></v-list>
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { successAlert } from "../../utils/alert";
export default {
  data() {
    return {
      info: {
        isShow: false,
        isAdd: true
      }
      // 列表数据
    };
  },
  methods: {
    willAdd() {
      this.info.isShow = true;
      // 将isAdd状态更新为true
      this.info.isAdd = true;
    },
    willEdit(row) {
      this.info.isShow = true;
      // form修改数据
      this.$refs.form.getOne(row);
      console.log(row);
      // 修改isAdd状态为false
      this.info.isAdd = false;
    }
  },
  components: {
    vList,
    vForm
  }
};
</script>

<style scoped>
.el-pagination {
  text-align: right;
  margin-top: 10px;
}
</style>