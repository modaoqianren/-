<template>
  <div class="table">
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" v-if="scope.row.status == 1">启用</el-button>
          <el-button size="mini" type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="willEdit(scope.row.id)">编辑</el-button>
          <del-btn @del="willDelete(scope.row.id)"></del-btn>
          <!-- <el-button size="mini" type="danger" @click="willDelete(scope.row.id)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqroledelete } from "../../../request/api";
import { successAlert } from "../../../utils/alert";
// import { Del } from '../../../mixins/info'
export default {
  // mixins:[Del],
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    willEdit(id) {
      // 通知父组件修改数据
      this.$emit("edit", id);
    },
    willDelete(id) {
      reqroledelete({ id }).then(res => {
        // 删除成功弹窗并刷新数据
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.$emit("init");
        }
      });
    }
  }
};
</script>

<style scoped lang=less>
</style>