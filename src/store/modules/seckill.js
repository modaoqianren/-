import { reqsecklist } from '../../request/api'
// 状态
const state = {
    list: []
}
// 修改状态
const mutations = {
    changeList(state, arr){
        state.list = arr
    }
}
// 异步和逻辑操作
const actions = {
    reqList(context){
        reqsecklist().then(res => {
            const list = res.data.list ? res.data.list : []
            context.commit('changeList',list)
        })
    }
}
// getters 导出数据
const getters = {
    list(state){
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}