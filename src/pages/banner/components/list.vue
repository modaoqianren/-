<template>
  <div class="table">
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="title" label="轮播图标题" width="180"></el-table-column>
      <el-table-column prop="img" label="图片" width="180" >
        <template slot-scope="scope" v-if='scope.row.img != "null"'>
          <img :src="$pre + scope.row.img" alt="">
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
  </div>
</template>

<script>
import { reqbannerdelete } from "../../../request/api";
import { successAlert } from "../../../utils/alert";
import { mapActions,mapGetters } from 'vuex'
export default {
  data() {
    return {};
  },
  mounted(){
    if(this.list.length == 0){
      this.reqList()
    }
  },
  computed:{
    ...mapGetters({
      list: 'banner/list'
    })
  },
  methods: {
    ...mapActions({
      reqList: 'banner/reqList'
    }),
    willEdit(row) {
      console.log(row);
      // 通知父组件修改数据
      this.$emit("edit", row.id);
    },
    willDelete(id) {
      reqbannerdelete({ id }).then(res => {
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