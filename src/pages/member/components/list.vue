<template>
  <div class="table">
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" v-if="scope.row.status == 1">启用</el-button>
          <el-button size="mini" type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="willEdit(scope.row)">编辑</el-button>
          <!-- <el-button size="mini" type="danger" @click="willDelete(scope.row.uid)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { requserinfo, reqrolelist, } from "../../../request/api";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["list"],
  data() {
    return {
      userList: []
    };
  },
  methods: {
    willEdit(row) {
      console.log(row);
      // 通知父组件修改数据
      this.$emit("edit", row);
    }
  }
};
</script>

<style scoped lang=less>
.table {
  margin-top: 20px;
}

</style>