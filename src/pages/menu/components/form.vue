<template>
  <div>
    <el-dialog :title="info.isAdd ? '菜单添加' : '菜单编辑'" :visible.sync="info.isShow" @close='close'>
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid" @change="changePid">
            <el-option label="请选择" disabled value></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 遍历list -->
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="formLabelWidth" v-if="form.type == 1">
          <el-select v-model="form.icon">
            <el-option label="请选择" disabled value></el-option>
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url">
            <el-option label="请选择" disabled value></el-option>
            <el-option
              :label="item.meta.title"
              :value="'/' + item.path"
              v-for="item in IndexRoutes"
              :key="item.path"
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
        <el-button type="primary" @click="add" v-if='info.isAdd'>添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqmenuadd, reqmenuinfo, reqmenuedit } from "../../../request/api";
import { IndexRoutes } from "../../../router";
import { successAlert} from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      value: false,
      radio: "1",
      dialogTableVisible: false,
      // form表单数据
      form: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1
      },
      // 图标集合
      icons: [
        "el-icon-goods",
        "el-icon-help",
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-user-solid"
      ],
      // 路由集合
      IndexRoutes,
      formLabelWidth: "120px"
    };
  },
  methods: {
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1
      };
    },
    cancel() {
      this.info.isShow = false;
      // 点击取消后清空数据
      this.empty();
    },
    add() {
      reqmenuadd(this.form).then(res => {
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
    changePid() {
      // 判断上级分类是顶级菜单还是子菜单
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    // 获取一条数据
    getOne(id) {
      reqmenuinfo({ id }).then(res => {
        this.form = res.data.list;
        // 给表单添加id值
        this.form.id = id
      });
    },
    update() {
      reqmenuedit(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 关闭弹窗
          this.info.isShow = false;
          // 清空form
          this.empty();
          // 刷新列表
          this.$emit('init')
        }
      });
    },
    close(){
      // 编辑弹窗消失后清空form数据
      !this.info.isAdd && this.empty() 
    }
  }
};
</script>

<style scoped lang=less>
  .el-input{
    width: 250px !important;
  }
</style>