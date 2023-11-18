import Vue from 'vue'

let filters = {

}

for(let k in filters){
    Vue.filter(k, filters[k])
}