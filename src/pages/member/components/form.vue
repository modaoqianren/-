<template>
  <div>
    <el-dialog :title="info.isAdd ? '用户添加' : '用户编辑'" :visible.sync="info.isShow" @close="close">
      <el-form :model="form">
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqmemberinfo,
  reqmemberedit,
  reqmemberlist
} from "../../../request/api";
import { successAlert, errorAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info", "list"],
  mounted() {
    // 请求菜单数据
    reqmemberlist().then(res => {
      if (res.data.code == 200) {
        this.membermsg = res.data.list ? res.data.list : [];
      }
    });
  },
  data() {
    return {
      rolelist: [],
      value: false,
      radio: "1",
      // form表单数据
      form: {
        uid: "",
        nickname: "",
        password: "",
        password: '',
        status: 1
      },
      membermsg: [],
      formLabelWidth: "120px"
      // name: ['系统管理员','客服专员']
    };
  },
  methods: {
    ...mapActions(["changeUser"]),
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1
      };
    },
    cancel() {
      this.info.isShow = false;
      // 点击取消后清空数据
      this.empty();
    },
    // 获取一条数据
    getOne(uid) {
      console.log(uid);
      reqmemberinfo({ uid }).then(res => {
        this.form = res.data.list;
        this.form.password = "";
        // // 给表单添加id值
        this.form.uid = uid;
        this.form.randstr = ''
      });
    },
    update() {
      console.log(this.form);
      reqmemberedit(this.form).then(res => {
        if (res.data.code == 200) {
          // 成功提示
          successAlert(res.data.msg);
          // 关闭弹窗
          this.info.isShow = false;
          // 清空form
          this.empty();
          // 刷新列表
          this.$emit("init");
        }
      });
    },
    close() {
      // 编辑弹窗消失后清空form数据
      !this.info.isAdd && this.empty();
    }
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style scoped lang=less>
.el-input {
  width: 250px !important;
}
</style>