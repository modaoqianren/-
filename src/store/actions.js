const actions = {
    changeUser({ commit }, user){
        commit('changeUser',user)
        // 本地存储需存储
        if(user.token){
            // token存在表示登录
            sessionStorage.setItem('user',JSON.stringify(user))
        } else {
            sessionStorage.removeItem('user')
        }
    }
}

export default actions