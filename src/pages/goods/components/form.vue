<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '商品添加' : '商品修改'"
      :visible.sync="info.isShow"
      @close="close"
      @opened="open"
    >
      {{ form }}
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" @change="change_first_cateid">
            <el-option label="请选择" value disabled></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in second_cate_list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <!-- 原生写法 -->
          <!-- <div class="upload">
            <h3>+</h3>
            <img :src="imgSrc" alt="" v-if="imgSrc">
            <input type="file" @change="getfile" multiple>
          </div>-->
          <el-upload class="avatar-uploader" action="#" :before-upload="beforeAvatarUpload">
            <img v-if="imgSrc" :src="imgSrc" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="form.specsid" @change="change_specs_id">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" value disabled></el-option>
            <el-option v-for="item in attrsArr" :key="item.id" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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
        <el-form-item>
          <!-- <el-input type="textarea" v-model="form.desc" placeholder="请输入内容"></el-input> -->
          <div id="editor"></div>
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
  reqgoodsadd,
  reqgoodsinfo,
  reqgoodsedit
} from "../../../request/api";
import { successAlert, errorAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
import E from "wangeditor";
export default {
  props: ["info"],
  mounted() {
    if (this.list.length == 0) {
      this.reqList();
    }
    this.reqSpecsList(true);
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
      // 规格列表
      specsList: "specs/list"
    })
  },
  data() {
    return {
      rolelist: [],
      value: false,
      radio: "1",
      // form表单数据
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        img: null,
        status: 1
      },
      imgSrc: "",
      attrsArr: [],
      second_cate_list: [],
      formLabelWidth: "120px"
    };
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
      reqSpecsList: "specs/reqList",
      reqGoodsList: "goods/reqList",
      getTotal: "goods/getTotal"
    }),
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        img: null,
        status: 1
      };
      this.imgSrc = "";
      this.attrsArr = [];
      this.second_cate_list = [];
      this.editor.txt.html("");
    },
    cancel() {
      this.info.isShow = false;
      // 点击取消后清空数据
      this.empty();
    },
    add() {
      this.check().then(() => {
        this.form.description = this.editor.txt.html();
        // console.log({ ...this.form, specsattr: this.form.specsattr.join(",")});
        reqgoodsadd({
          ...this.form,
          specsattr: this.form.specsattr.join(",")
        }).then(res => {
          // if(!this.form.id && !this.form.username && !this.form.password){
          //   errorAlert('内容不能为空')
          // } else {
          if (res.data.code == 200) {
            // 成功提示
            successAlert(res.data.msg);
            // 关闭弹窗
            this.info.isShow = false;
            // 清空form
            this.empty();
            // 刷新列表
            this.reqGoodsList();
            // 刷新分页页码
            this.getTotal();
          }
        });
      });
    },
    // 获取一条数据
    getOne(id) {
      reqgoodsinfo({ id }).then(res => {
        this.form = res.data.list;
        // 给表单添加id值
        this.form.id = id;
        // 转成数组便于下拉列表展示数据
        this.form.specsattr = this.form.specsattr.split(",");
        this.imgSrc =
          this.form.img != "null" ? this.$pre + this.form.img : null;
        // 根据一级分类id,获取二级分类列表
        this.get_second_cate_list();
        // 根据规格id获取规格属性
        this.get_attrs_arr();
        this.editor && this.editor.txt.html(this.form.description);
      });
    },
    update() {
      this.check().then(() => {
        this.form.description = this.editor.txt.html();
        // console.log({ ...this.form, specsattr: this.form.specsattr.join(",") });
        reqgoodsedit({
          ...this.form,
          specsattr: this.form.specsattr.join(",")
        }).then(res => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            // 关闭弹窗
            this.info.isShow = false;
            // 清空form
            this.empty();
            // 刷新列表
            this.reqGoodsList();
          }
        });
      });
    },
    close() {
      // 编辑弹窗消失后清空form数据
      !this.info.isAdd && this.empty();
    },
    open() {
      if (!this.editor) {
        this.editor = new E("#editor");
        this.editor.create();
      }
      this.editor.txt.html(this.form.description);
    },
    check() {
      return new Promise((resolve, reject) => {
        if (this.form.first_cateid == "") {
          errorAlert("一级分类不能为空");
          return;
        }
        if (this.form.second_cateid == "") {
          errorAlert("二级分类不能为空");
          return;
        }
        if (this.form.goodsname == "") {
          errorAlert("商品名称不能为空");
          return;
        }
        if (this.form.price == "") {
          errorAlert("价格不能为空");
          return;
        }
        if (this.form.market_price == "") {
          errorAlert("市场价格不能为空");
          return;
        }
        if (!this.form.img) {
          errorAlert("请上传图片");
          return;
        }
        if (this.form.specsid == "") {
          errorAlert("商品规格不能为空");
          return;
        }
        if (this.form.specsattr.length == 0) {
          errorAlert("规格属性不能为空");
          return;
        }
        if (this.editor.txt.html() == "") {
          errorAlert("描述不能为空");
          return;
        }
        resolve();
      });
    },
    // 原生写法
    // getfile(e) {
    //   let file = e.target.files[0];
    //   // 文件的大小
    //   if (file.size > 2 * 1024 * 1024) {
    //     errorAlert("文件大小不能超过2m!");
    //     return;
    //   }
    //   // 图片格式
    //   const imgArr = [".jpg", ".png", ".jpeg", ".gif"];
    //   const extname = file.name.slice(file.name.lastIndexOf("."));
    //   console.log(extname);
    //   if (!imgArr.includes(extname)) {
    //     errorAlert("必须是图片格式!");
    //     return;
    //   }
    //   // 给图片赋值地址
    //   this.imgSrc = URL.createObjectURL(file);
    //   this.form.img = file;
    //   console.log(this.form);
    // },
    beforeAvatarUpload(file) {
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件大小不能超过2m!");
        return;
      }
      // 图片格式
      const imgArr = [".jpg", ".png", ".jpeg", ".gif"];
      const extname = file.name.slice(file.name.lastIndexOf("."));
      console.log(extname);
      if (!imgArr.includes(extname)) {
        errorAlert("必须是图片格式!");
        return;
      }
      // 给图片赋值地址
      this.imgSrc = URL.createObjectURL(file);
      this.form.img = file;
      console.log(this.form);
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
    change_specs_id() {
      this.get_attrs_arr();
      this.form.specsattr = [];
    },
    get_attrs_arr() {
      // console.log(this.specsList,this.form.specsid);
      let obj = this.specsList.find(item => item.id == this.form.specsid);
      console.log(obj.attrs);
      this.attrsArr = obj ? obj.attrs : [];
    }
  }
};
</script>

<style scoped lang=less>
@import "../../../less/index.less";

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
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>