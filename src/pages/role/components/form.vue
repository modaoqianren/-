<template>
  <div>
    <el-dialog :title="info.isAdd ? '角色添加' : '角色编辑'" :visible.sync="info.isShow" @close="close">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            v-model="form.menus"
            ref="tree"
          ></el-tree>
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
  reqroleadd,
  reqroleinfo,
  reqroleedit,
  reqmenulist
} from "../../../request/api";
import { successAlert } from "../../../utils/alert";
import { mapGetters,mapActions } from 'vuex'
export default {
  props: ["info", "list"],
  mounted() {
    // 请求菜单数据
    reqmenulist({
      istree: true
    }).then(res => {
      if (res.data.code == 200) {
        this.menuList = res.data.list ? res.data.list : [];
        console.log(this.menuList);
      }
    });
  },
  data() {
    return {
      menuList: [],
      defaultProps: {
        children: "children",
        label: "title"
      },
      value: false,
      radio: "1",
      // form表单数据
      form: {
        rolename: "",
        menus: "",
        status: 1
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    ...mapActions(['changeUser']),
    empty() {
      this.$refs.tree.setCheckedKeys([]);
      this.form = {
        rolename: "",
        menus: "",
        status: 1
      };
    },
    cancel() {
      this.info.isShow = false;
      // 点击取消后清空数据
      this.empty();
    },
    add() {
      // 将树上的数据赋值给menus
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqroleadd(this.form).then(res => {
        if (res.data.code == 200) {
          // 成功提示
          successAlert(res.data.msg);
          // 关闭弹窗
          this.info.isShow = false;
          // 刷新列表
          this.$emit("init");
          // 清空form
          this.empty();
        }
      });
    },
    // 获取一条数据
    getOne(id) {
      reqroleinfo({ id }).then(res => {
        this.form = res.data.list;
        // 给表单添加id值
        this.form.id = id;
        // 将form的值赋值给树形控件展示
        this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
      });
    },
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqroleedit(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 关闭弹窗
          this.info.isShow = false;
          console.log(this.form.id ,this.user.id);
          if(this.form.id == this.user.roleid){
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
      !this.info.isAdd && this.empty() 
    }
  },
  computed:{
    ...mapGetters(['user'])
  }
};
</script>

<style scoped lang=less>
.el-input {
  width: 250px !important;
}
</style>