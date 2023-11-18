<template>
  <div class="login">
    <div class="con">
      <h3>登录</h3>
      <div class="input">
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </div>
      <div class="input">
        <el-input placeholder="请输入密码" v-model="user.password" show-password></el-input>
      </div>
      <div class="loginBtn">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reqLogin } from "../../request/api";
import { errorAlert, successAlert } from "../../utils/alert";
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  mounted() {},
  methods: {
    ...mapActions(['changeUser']),
    login() {
      if (this.user.username == "" || this.user.password == "") {
        errorAlert("账号或密码不能为空!");
        return;
      }
      reqLogin(this.user).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
        // 保存用户信息
        this.changeUser(res.data.list)
        // 登录成功跳转
        this.$router.push("/home");
        }
      });
    }
  },
  computed: {}
};
</script>

<style scoped lang=less>
@import "../../less/index.less";
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(90deg, @primary, @primary2);
  h3 {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
  }
  .input,
  .loginBtn {
    margin: 20px 20px 0px 20px;
  }
}
.con {
  width: 400px;
  height: 200px;
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
  .el-button {
    width: 100%;
  }
}
</style>