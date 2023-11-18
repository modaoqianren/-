export let InfoManage = {
    data() {
        return {
            info: {
                isShow: false,
                isAdd: true
            }
        }
    },
    methods: {
        willEdit(id) {
            // 弹窗
            this.info.isShow = true
            // 修改isAdd状态为false
            this.info.isAdd = false
            // form修改数据
            this.$refs.form.getOne(id)
        },
    }
}

// export let Del = {
//     methods: {
//         willDelete(id,req) {
//             this.$confirm('你确定删除该文件吗？', '提示', {
//                 confirmButtonText: '删除',
//                 cancelButtonText: '取消',
//                 type: 'warning'
//             }).then(() => {
//                 req({
//                     id
//                 }).then(res => {
//                     // 删除成功弹窗并刷新数据
//                     if (res.data.code == 200) {
//                         successAlert(res.data.msg)
//                         this.$emit('init')
//                     }
//                 });
//             }).catch(() => {
//                 this.$message({
//                     type: 'info',
//                     message: '已取消删除'
//                 });
//             });
//         }
//     }
// }