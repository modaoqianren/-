import { get, post } from './index'

/* 菜单管理 */

// 添加
export const reqmenuadd = (params) => post('/api/menuadd',params)
// 修改
export const reqmenuedit = (params) => post('/api/menuedit',params)
// 删除
export const reqmenudelete = (params) => post('/api/menudelete',params)
// 列表
export const reqmenulist = (params) => get('/api/menulist',params)
// 查询
export const reqmenuinfo = (params) => get('/api/menuinfo',params)

/* 角色管理 */

// 添加
export const reqroleadd = (params) => post('/api/roleadd',params)
// 修改
export const reqroleedit = (params) => post('/api/roleedit',params)
// 删除
export const reqroledelete = (params) => post('/api/roledelete',params)
// 列表
export const reqrolelist = (params) => get('/api/rolelist',params)
// 查询
export const reqroleinfo = (params) => get('/api/roleinfo',params)

/* 管理员管理 */
// 添加
export const requseradd = (params) => post('/api/useradd',params)
// 修改
export const requseredit = (params) => post('/api/useredit',params)
// 删除
export const requserdelete = (params) => post('/api/userdelete',params)
// 列表
export const requserlist = (params) => get('/api/userlist',params)
// 查询
export const requserinfo = (params) => get('/api/userinfo',params)
// 总数
export const requsercount = () => get('/api/usercount')
// 登录
export const requserlogin = (params) => get('/api/userlogin',params)

/* 商品分类 */
// 添加
export const reqcateadd = (params) => post('/api/cateadd',params,true)
// 修改
export const reqcateedit = (params) => post('/api/cateedit',params,true)
// 删除
export const reqcatedelete = (params) => post('/api/catedelete',params)
// 列表
export const reqcatelist = (params) => get('/api/catelist',params)
// 查询
export const reqcateinfo = (params) => get('/api/cateinfo',params)

/* 商品规格 */
// 添加
export const reqspecsadd = (params) => post('/api/specsadd',params)
// 修改
export const reqspecsedit = (params) => post('/api/specsedit',params)
// 删除
export const reqspecsdelete = (params) => post('/api/specsdelete',params)
// 列表
export const reqspecslist = (params) => get('/api/specslist',params)
// 总数
export const reqspecscount = () => get('/api/specscount')
// 查询
export const reqspecsinfo = (params) => get('/api/specsinfo',params)

// 登录
export const reqLogin = (params) => post('/api/userlogin',params)

/* 商品管理 */
// 添加
export const reqgoodsadd = (params) => post('/api/goodsadd',params,true)
// 修改
export const reqgoodsedit = (params) => post('/api/goodsedit',params,true)
// 删除
export const reqgoodsdelete = (params) => post('/api/goodsdelete',params)
// 列表
export const reqgoodslist = (params) => get('/api/goodslist',params)
// 总数
export const reqgoodscount = () => get('/api/goodscount')
// 查询
export const reqgoodsinfo = (params) => get('/api/goodsinfo',params)

/* 会员管理 */
// 修改
export const reqmemberedit = (params) => post('/api/memberedit',params)
// 列表
export const reqmemberlist = () => get('/api/memberlist')
// 查询
export const reqmemberinfo = (params) => get('/api/memberinfo',params)

/* 轮播图管理 */
// 添加
export const reqbanneradd = (params) => post('/api/banneradd',params,true)
// 修改
export const reqbanneredit = (params) => post('/api/banneredit',params,true)
// 删除
export const reqbannerdelete = (params) => post('/api/bannerdelete',params)
// 列表
export const reqbannerlist = () => get('/api/bannerlist')
// 查询
export const reqbannerinfo = (params) => get('/api/bannerinfo',params)

/* 秒杀活动 */
// 添加
export const reqseckadd = (params) => post('/api/seckadd',params)
// 修改
export const reqseckedit = (params) => post('/api/seckedit',params)
// 删除
export const reqseckdelete = (params) => post('/api/seckdelete',params)
// 列表
export const reqsecklist = () => get('/api/secklist')
// 查询
export const reqseckinfo = (params) => get('/api/seckinfo',params)