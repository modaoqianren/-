<template>
  <div class="table">
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column prop="img" label="规格属性" width="180" >
        <template slot-scope="scope">
          <el-tag v-for='item in scope.row.attrs' :key='item.id'>{{ item }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" v-if="scope.row.status == 1">启用</el-button>
          <el-button size="mini" type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="willEdit(scope.row)">编辑</el-button>
          <del-btn @del="willDelete(scope.row.id)"></del-btn>
          <!-- <el-button size="mini" type="danger" @click="willDelete(scope.row.uid)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="Number(total)"
      :page-size="size"
      @current-change='changePage'
    ></el-pagination>
  </div>
</template>

<script>
import { reqspecsdelete } from "../../../request/api";
import { successAlert } from "../../../utils/alert";
import { mapActions,mapGetters } from 'vuex'
export default {
  data() {
    return {};
  },
  mounted(){
    this.reqList(),
    this.getTotal()
  },
  computed:{
    ...mapGetters({
      list: 'specs/list',
      total: 'specs/total',
      size: 'specs/size'
    })
  },
  methods: {
    ...mapActions({
      reqList: 'specs/reqList',
      getTotal: 'specs/getTotal',
      changePage: 'specs/changePage'
    }),
    willEdit(row) {
      console.log(row);
      // 通知父组件修改数据
      this.$emit("edit", row.id);
    },
    willDelete(id) {
      reqspecsdelete({ id }).then(res => {
        // 删除成功弹窗并刷新数据
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqList()
          // 删除后再调用请求总数
          this.getTotal()
        }
      });
    }
  }
};
</script>

<style scoped lang=less>
.table {
  margin-top: 20px;
}
img{
  width: 80px;
  height: 80px;
}
.el-pagination {
  text-align: right;
  margin-top: 10px;
}
</style>