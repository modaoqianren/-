<template>
  <div>
    <el-dialog :title="info.isAdd ? '活动添加' : '活动修改'" :visible.sync="info.isShow" @close="close">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              align="center"
              @change="changeTime"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" @change="change_first_cateid">
            <el-option label="请选择分类" value disabled></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid" @change="change_second_cateid">
            <el-option label="请选择分类" value disabled></el-option>
            <el-option
              v-for="item in second_cate_list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid">
            <el-option label="请选择商品" value disabled></el-option>
            <el-option
              v-for="item in good_list"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqcatelist,
  reqgoodslist,
  reqgoodscount,
  reqseckadd,
  reqseckinfo,
  reqseckedit
} from "../../../request/api";
import { successAlert, errorAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  mounted() {
    if (this.list.length == 0) {
      this.reqList();
    }
    reqgoodscount().then(res => {
      this.total = res.data.list[0].total;
    });
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
      secklist: "seckill/list"
    })
  },
  data() {
    return {
      value: false,
      radio: "1",
      // form表单数据
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      },
      total: "",
      formLabelWidth: "120px",
      second_cate_list: [],
      good_list: [],
      // value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: []
    };
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
      reqSeckList: "seckill/reqList"
    }),
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      };
      this.value2 = [];
    },
    cancel() {
      this.info.isShow = false;
      // 点击取消后清空数据
      this.empty();
    },
    add() {
      if (
        this.form.title == "" ||
        this.form.begintime == "" ||
        this.form.endtime == "" ||
        this.form.first_cateid == "" ||
        this.form.second_cateid == "" ||
        this.form.goodsid == ""
      ) {
        errorAlert("添加的内容不能为空");
      } else {
        console.log(this.form);
        reqseckadd(this.form).then(res => {
          console.log(this.form);
          if (res.data.code == 200) {
            // 成功提示
            successAlert(res.data.msg);
            // 关闭弹窗
            this.info.isShow = false;
            // 清空form
            this.empty();
            // 刷新列表
            this.reqSeckList();
          }
        });
      }
    },
    // 获取一条数据
    getOne(id) {
      reqseckinfo({ id }).then(res => {
        this.form = res.data.list;
        this.value2.push(this.form.begintime) &&
          this.value2.push(this.form.endtime);
        // // 给表单添加id值
        this.form.id = id;
        this.get_second_cate_list();
        this.get_goods_cate_list();
        this.reqSeckList();
      });
    },
    update() {
      reqseckedit(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 关闭弹窗
          this.info.isShow = false;
          // 清空form
          this.empty();
          // 刷新列表
          this.reqSeckList();
        }
      });
    },
    close() {
      // 编辑弹窗消失后清空form数据
      !this.info.isAdd && this.empty();
    },
    change_first_cateid() {
      this.form.second_cateid = "";
      this.get_second_cate_list();
    },
    get_second_cate_list() {
      reqcatelist({ pid: this.form.first_cateid }).then(res => {
        res.data.list ? res.data.list : [];
        if (res.data.code == 200) {
          this.second_cate_list = res.data.list;
        }
      });
    },
    change_second_cateid() {
      this.form.goodsid = "";
      this.get_goods_cate_list();
    },
    get_goods_cate_list() {
      reqgoodslist({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid
      }).then(res => {
        this.good_list = res.data.list;
      });
    },
    changeTime() {
      this.form.begintime = this.value2[0];
      this.form.endtime = this.value2[1];
    }
  }
};
</script>

<style scoped lang=less>
@import "../../../less/index.less";
.el-input {
  width: 250px !important;
}
/* .upload{
  width: 100px;
  height: 100px;
  border: 1px dashed @header-color;
  text-align: center;
  line-height: 100px;
  font-size: 40px;
  color: @header-color;
  position: relative;
}
.upload input{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.upload img{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
} */
</style>