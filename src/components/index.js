import Vue from 'vue'
import delBtn from './delBtn'


let components = {
    delBtn
}

for(let k in components){
    Vue.component(k, components[k])
}