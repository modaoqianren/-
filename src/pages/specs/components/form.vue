<template>
  <div>
    <el-dialog :title="info.isAdd ? '规格添加' : '规格修改'" :visible.sync="info.isShow" @close="close">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="formLabelWidth">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="formLabelWidth" v-for='(item, index) in attrArr' :key='index'>
          <div  class="box">
            <el-input v-model="item.value" autocomplete="off"></el-input>
            <el-button type="primary" @click="addAttr" v-if="index == 0">新增规格属性</el-button>
            <el-button type="danger" @click="delAttr(index)" v-else>删除</el-button>
            <!-- {{ attrArr }} -->
          </div>
        </el-form-item>
        <!-- <el-form-item label="图片" :label-width="formLabelWidth"> -->
          <!-- 原生写法 -->
          <!-- <div class="upload">
            <h3>+</h3>
            <img :src="imgSrc" alt="" v-if="imgSrc">
            <input type="file" @change="getfile" multiple>
          </div>-->
          <!-- <el-upload class="avatar-uploader" action="#" :before-upload="beforeAvatarUpload">
            <img v-if="imgSrc != null" :src="imgSrc" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
        <!-- </el-form-item> -->
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
import { reqspecsadd, reqspecsinfo, reqspecsedit } from "../../../request/api";
import { successAlert, errorAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  mounted() {},
  computed: {
    ...mapGetters({
      list: "specs/list"
    })
  },
  data() {
    return {
      rolelist: [],
      attrArr: [{ value: "" }],
      value: false,
      radio: "1",
      // form表单数据
      form: {
        specsname: "",
        attrs: "",
        status: 1
      },
      formLabelWidth: "120px"
      // name: ['系统管理员','客服专员']
    };
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      getTotal: 'specs/getTotal'
    }),
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1
      },
      this.attrArr= [
        { value: '' }
      ]
    },
    cancel() {
      this.info.isShow = false;
      // 点击取消后清空数据
      this.empty();
    },
    add() {
      // 处理规格属性的值
      let str = this.attrArr.reduce((val,item)=> val += item.value + ',','')
      str = str.slice(0, str.length-1)
      this.form.attrs = str
      console.log(this.form);
      reqspecsadd(this.form).then(res => {
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
          // 刷新总数
          this.getTotal()
        }
      });
    },
    // 获取一条数据
    getOne(id) {
      reqspecsinfo({ id }).then(res => {
        this.form = res.data.list[0];
        this.attrArr = this.form.attrs.map(item => ({ value: item }))
      });
    },
    update() {
      this.form.attrs = this.attrArr.map(item => item.value).join(',')
      console.log(this.form.attrs);
      reqspecsedit(this.form).then(res => {
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
    addAttr(){
      this.attrArr.push({ value: '' })
    },
    delAttr(index){
      this.attrArr.splice(index,1)
    }
  }
};
</script>

<style scoped lang=less>
@import "../../../less/index.less";
/* .el-input {
  width: 250px !important;
} */
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
.box {
  display: flex;
}
.box input {
  flex: 1; 
}
.box button {
  flex: 1;
}
</style>