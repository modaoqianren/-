<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list :list="list" @edit='willEdit' @init='init'></v-list>
    <v-form :info="info" @init='init' :list="list" ref='form'></v-form>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { reqrolelist } from "../../request/api";
import { InfoManage } from '../../mixins/info'
export default {
  mixins: [InfoManage],
  data() {
    return {
      // 列表数据
      list: []
    };
  },
  mounted() {
    // 打开页面请求数据
    this.init()
  },
  methods: {
    init() {
      reqrolelist({
        // 树状结构
        istree: true
      }).then(res => {
        if (res.data.code == 200) {
          this.list = res.data.list ? res.data.list : [];
        }
      });
    },
    willAdd() {
      this.info.isShow = true;
      // 将isAdd状态更新为true
      this.info.isAdd = true
    },
  },
  components: {
    vList,
    vForm
  }
};
</script>

<style>
</style>