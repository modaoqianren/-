import {
    reqgoodslist,
    reqgoodscount
} from '../../request/api'
// 状态
const state = {
    list: [],
    total: 0,
    size: 2,
    page: 1
}
// 修改状态
const mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    changeTotal(state, num) {
        state.total = num
    },
    changePage(state, num) {
        state.page = num
    }
}
// 异步和逻辑操作
const actions = {
    reqList({ commit,state: { page, size },dispatch }) {
        // const params = bool ? {}: {page,size}
        reqgoodslist({ page, size }).then(res => {
            if (res.data.code == 200) {
                let list = res.data.list ? res.data.list : []
                if (list.length == 0 && page != 1) {
                    commit('changePage', page-1);
                    // console.log(state.page);
                    dispatch('reqList');
                    return;
                }
                commit('changeList', list)
            }
        })
    },
    getTotal({
        commit,
        dispatch
    }) {
        reqgoodscount().then(res => {
            commit('changeTotal', res.data.list[0].total);
            // console.log(state.total);
        });
    },
    changePage({ dispatch, commit },num){
        // 页码值赋值给page
        commit('changePage',num)
        dispatch('reqList')
    }

}
// getters 导出数据
const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}