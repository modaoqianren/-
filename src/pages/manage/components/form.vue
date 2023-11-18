<template>
  <div>
    <el-dialog :title="info.isAdd ? '用户添加' : '用户编辑'" :visible.sync="info.isShow" @close="close">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid">
            <el-option label="请选择" disabled value></el-option>
            <el-option
              :label="item.rolename"
              v-for="item in rolelist"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  requseradd,
  requserinfo,
  requseredit,
  reqrolelist
} from "../../../request/api";
import { successAlert, errorAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info", "list"],
  mounted() {
    // 请求菜单数据
    reqrolelist({ istree: true }).then(res => {
      if (res.data.code == 200) {
        this.rolelist = res.data.list ? res.data.list : [];
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
        roleid: "",
        username: "",
        password: "",
        status: 1
      },
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
    add() {
      requseradd(this.form).then(res => {
        if (!this.form.id && !this.form.username && !this.form.password) {
          errorAlert("内容不能为空");
        } else {
          if (res.data.code == 200) {
            // 成功提示
            successAlert(res.data.msg);
            // 关闭弹窗
            this.info.isShow = false;
            // 清空form
            this.empty();
            // 刷新页码
            this.$emit("getTotal");
            // 刷新列表
            this.$emit("init");
          }
        }
      });
    },
    // 获取一条数据
    getOne(uid) {
      console.log(this.form);
      requserinfo({ uid }).then(res => {
        this.form = res.data.list;
        this.form.password = "";
        // // 给表单添加id值
        // this.form.id = id;
      });
    },
    update() {
      requseredit(this.form).then(res => {
        if (res.data.code == 200) {
          // 成功提示
          successAlert(res.data.msg);
          // 关闭弹窗
          this.info.isShow = false;
          // 判断是否修改的是当前登录的用户
          if (this.user.uid == this.form.uid) {
            this.changeUser({});
            this.$router.replace("/login");
            return
          }
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