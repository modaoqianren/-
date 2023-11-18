<template>
  <div class="table">
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="title" label="活动名称" width="180"></el-table-column>
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
  </div>
</template>

<script>
import { reqseckdelete } from "../../../request/api";
import { successAlert } from "../../../utils/alert";
import { mapActions,mapGetters } from 'vuex'
export default {
  data() {
    return {};
  },
  mounted(){
    console.log(this.list);
    if(this.list.length == 0){
      this.reqList()
    }
  },
  computed:{
    ...mapGetters({
      list: 'seckill/list'
    })
  },
  methods: {
    ...mapActions({
      reqList: 'seckill/reqList'
    }),
    willEdit(row) {
      console.log(row);
      // 通知父组件修改数据
      this.$emit("edit", row.id);
    },
    willDelete(id) {
      reqseckdelete({ id }).then(res => {
        // 删除成功弹窗并刷新数据
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqList()
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
</style>