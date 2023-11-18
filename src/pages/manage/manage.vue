<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list :list="list" @edit="willEdit" @init="init" @getTotal='getTotal'></v-list>
    <v-form :info="info" @init="init" :list="list" ref="form" @getTotal='getTotal'></v-form>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="Number(total)"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import {
  requserlist,
  requserdelete,
  reqrolelist,
  requsercount
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
    this.init(),
    this.getTotal()
  },
  methods: {
    init() {
      requserlist({
        size: this.size,
        page: this.page
      }).then(res => {
        if (res.data.code == 200) {
          // console.log(this.size);
          let list = res.data.list ? res.data.list : [];
          if (list.length == 0 && this.page != 1) {
            this.page--;
            console.log(this.page);
            this.init();
            return;
          }
          // console.log(this.page);
          this.list = list;
        }
      });
    },
    willAdd() {
      this.info.isShow = true;
      // 将isAdd状态更新为true
      this.info.isAdd = true;
    },
    willEdit(row) {
      // console.log(row);
      this.info.isShow = true;
      // form修改数据
      this.$refs.form.getOne(row.uid);
      // 修改isAdd状态为false
      this.info.isAdd = false;
    },
    changePage(page) {
      this.page = page;
      this.init()
    },
    getTotal(){
        requsercount().then(res => {
                this.total = res.data.list[0].total;
                console.log(this.total);
              });
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