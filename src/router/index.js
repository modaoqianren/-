import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

function check(path, next){
  // 当前用户有该地址访问权限就放行
  if( store.state.user.menus_url.includes(path)){
    next()
  } else {
    next('/login')
  }
}

// 给添加绑定上级菜单分类和菜单地址分类
export const IndexRoutes = [
  {
    path: 'menu',
    component: () => import('../pages/menu/menu.vue'),
    meta:{
      title: '菜单管理'
    },
    beforeEnter(to, from, next) {
      check('/menu',next)
    }
  },
  {
    path: 'role',
    component: () => import('../pages/role/role.vue'),
    meta:{
      title: '角色管理'
    },
    beforeEnter(to, from, next) {
      check('/role',next)
    }
  },
  {
    path: 'manage',
    component: () => import('../pages/manage/manage.vue'),
    meta:{
      title: '管理员管理'
    },
    beforeEnter(to, from, next) {
      check('/manage',next)
    }
  },
  {
    path: 'cate',
    component: () => import('../pages/cate/cate.vue'),
    meta:{
      title: '商品分类'
    },
    beforeEnter(to, from, next) {
      check('/cate',next)
    }
  },
  {
    path: 'specs',
    component: () => import('../pages/specs/specs.vue'),
    meta:{
      title: '商品规格'
    },
    beforeEnter(to, from, next) {
      check('/specs',next)
    }
  },
  {
    path: 'goods',
    component: () => import('../pages/goods/goods.vue'),
    meta:{
      title: '商品管理'
    },
    beforeEnter(to, from, next) {
      check('/goods',next)
    }
  },
  {
    path: 'banner',
    component: () => import('../pages/banner/banner.vue'),
    meta:{
      title: '轮播图管理'
    },
    beforeEnter(to, from, next) {
      check('/banner',next)
    }
  },
  {
    path: 'seckill',
    component: () => import('../pages/seckill/seckill.vue'),
    meta:{
      title: '秒杀活动'
    },
    beforeEnter(to, from, next) {
      check('/seckill',next)
    }
  },
  {
    path: 'member',
    component: () => import('../pages/member/member.vue'),
    meta:{
      title: '会员管理'
    },
    beforeEnter(to, from, next) {
      check('/member',next)
    }
  }
]

const routes = [
  {
    path: '/login',
    component: () => import('../pages/login/login.vue')
  },
  {
    path: '/',
    component: () => import('../pages/index/index.vue'),
    children:[
      {
        path: 'home',
        component: () => import('../pages/home/home.vue')
      },
      // 外部写了部分需要使用的
      ...IndexRoutes,
      {
        path: '',
        redirect: 'home'
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 登录拦截
router.beforeEach((to, from, next) => {
  if( to.path == '/login' ){
    next()
    return
  }
  // 非登录先查看是否已登录
  if( store.state.user.token ){
    next()
    return
  }
  next('/login')
})

export default router
