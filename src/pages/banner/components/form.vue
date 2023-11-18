<template>
  <div>
    <el-dialog :title="info.isAdd ? '轮播图添加' : '轮播图修改'" :visible.sync="info.isShow" @close="close">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
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
  reqbanneradd,
  reqbannerinfo,
  reqbanneredit,
} from "../../../request/api";
import { successAlert, errorAlert } from "../../../utils/alert";
import { mapGetters,mapActions } from 'vuex'
export default {
  props: ["info"],
  mounted() {
   
  },
  computed:{
    ...mapGetters({
      list: 'banner/list'
    })
  },
  data() {
    return {
      imgSrc: "",
      value: false,
      radio: "1",
      // form表单数据
      form: {
        title: "",
        img: null,
        status: 1
      },
      formLabelWidth: "120px"
      // name: ['系统管理员','客服专员']
    };
  },
  methods: {
    ...mapActions({
      reqList: 'banner/reqList'
    }),
    empty() {
      this.form = {
        title: "",
        img: null,
        status: 1
      },
      this.imgSrc = ''
    },
    cancel() {
      this.info.isShow = false;
      // 点击取消后清空数据
      this.empty();
    },
    add() {
      reqbanneradd(this.form).then(res => {
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
          this.reqList();
        }
        // }
      });
    },
    // 获取一条数据
    getOne(id) {
      console.log(typeof this.imgSrc);
      reqbannerinfo({ id }).then(res => {
        this.form = res.data.list;
        console.log(this.form.img == 'null');
        // // 给表单添加id值
        this.form.id = id;
        this.imgSrc = this.form.img != 'null' ? this.$pre + this.form.img : null
      });
    },
    update() {
      reqbanneredit(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 关闭弹窗
          this.info.isShow = false;
          // 清空form
          this.empty();
          // 刷新列表
          this.reqList();
        }
      });
    },
    close() {
      // 编辑弹窗消失后清空form数据
      !this.info.isAdd && this.empty();
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