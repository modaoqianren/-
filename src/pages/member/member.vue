<template>
  <div>
    <v-list :list="list" @edit="willEdit" @init="init" ></v-list>
    <v-form :info="info" @init="init" :list="list" ref="form" ></v-form>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import {
  reqmemberlist,
} from "../../request/api";
import { successAlert } from "../../utils/alert";
export default {
  data() {
    return {
      info: {
        isShow: false,
        isAdd: true
      },
      // 列表数据
      list: [],
      total: '',
      size: 2,
      page: 1
    };
  },
  mounted() {
    // 打开页面请求数据
    this.init()
  },
  methods: {
    init() {
      reqmemberlist().then(res => {
        if (res.data.code == 200) {
          // console.log(this.size);
          this.list = res.data.list ? res.data.list : [];
        }
      });
    },
    willEdit(row) {
      console.log(row);
      this.info.isShow = true;
      // form修改数据
      this.$refs.form.getOne(row.uid);
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