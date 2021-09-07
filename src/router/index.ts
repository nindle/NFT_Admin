import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }, {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  }, {
    path: '/account/password',
    name: 'account_password',
    component: () => import(/* webpackChunkName: "account_password" */ '../views/password.vue')
  }, {
    path: '/account/info',
    name: 'account_info',
    component: () => import(/* webpackChunkName: "account_info" */ '../views/account_info.vue')
  }, 
  // item
  {
    path: '/item/list',
    name: 'item_list',
    component: () => import(/* webpackChunkName: "item_list" */ '../views/item/item_list.vue')
  }, {
    path: '/item/info/:item_id',
    name: 'item_info',
    component: () => import(/* webpackChunkName: "item_info" */ '../views/item/item_info.vue')
  }, {
    path: '/item_owner/list',
    name: 'item_owner_list',
    component: () => import(/* webpackChunkName: "item_owner_list" */ '../views/item/item_owner_list.vue')
  }, {
    path: '/item_like/list',
    name: 'item_like_list',
    component: () => import(/* webpackChunkName: "item_like_list" */ '../views/item/item_like_list.vue')
  }, 
  // 订单
  {
    path: '/order/list',
    name: 'order_list',
    component: () => import(/* webpackChunkName: "order_list" */ '../views/order/order_list.vue')
  }, {
    path: '/order/info/:order_id',
    name: 'order_info',
    component: () => import(/* webpackChunkName: "order_info" */ '../views/order/order_info.vue')
  }, 
  // collection
  {
    path: '/collection/cont_list',
    name: 'collection_cont_list',
    component: () => import(/* webpackChunkName: "collection_cont_list" */ '../views/collection_cont_list.vue')
  }, {
    path: '/collection/cont_info',
    name: 'collection_cont_info',
    component: () => import(/* webpackChunkName: "collection_cont_info" */ '../views/collection_cont_info.vue')
  }, 
  // user
  {
    path: '/user/list',
    name: 'user_list',
    component: () => import(/* webpackChunkName: "user_list" */ '../views/user/user_list.vue')
  }, {
    path: '/user/info/:user_id',
    name: 'user_info',
    component: () => import(/* webpackChunkName: "user_info" */ '../views/user/user_info.vue')
  }, {
    path: '/user_follow/list',
    name: 'user_follow_list',
    component: () => import(/* webpackChunkName: "user_follow_list" */ '../views/user/user_follow_list.vue')
  },
  // system
  {
    path: '/system/account/list',
    name: 'system_account_list',
    component: () => import(/* webpackChunkName: "system_account_list" */ '../views/sys_account/sys_account_list.vue')
  }, {
    path: '/system/account/add',
    name: 'system_account_add',
    component: () => import(/* webpackChunkName: "system_account_add" */ '../views/sys_account/sys_account_add.vue')
  }, {
    path: '/system/account/edit/:acct_id',
    name: 'system_account_edit',
    component: () => import(/* webpackChunkName: "system_account_edit" */ '../views/sys_account/sys_account_edit.vue')
  },
  // whitelist
  {
    path: '/whitelist/list',
    name: 'whitelist_list',
    component: () => import(/* webpackChunkName: "whitelist_list" */ '../views/whitelist/whitelist_list.vue')
  }, {
    path: '/whitelist/info/:white_id',
    name: 'whitelist_info',
    component: () => import(/* webpackChunkName: "whitelist_info" */ '../views/whitelist/whitelist_info.vue')
  }, {
    path: '/whitelist/add',
    name: 'sywhitelist_add',
    component: () => import(/* webpackChunkName: "whitelist_add" */ '../views/whitelist/whitelist_add.vue')
  }, 
  // category
  {
    path: '/category/list',
    name: 'category_list',
    component: () => import(/* webpackChunkName: "category_list" */ '../views/category/category_list.vue')
  }, {
    path: '/category/add',
    name: 'category_add',
    component: () => import(/* webpackChunkName: "category_add" */ '../views/category/category_add.vue')
  }, {
    path: '/category/edit/:cate_id',
    name: 'category_edit',
    component: () => import(/* webpackChunkName: "category_edit" */ '../views/category/category_edit.vue')
  }, 
  // mine
  {
    path: '/mine/list',
    name: 'mine_list',
    component: () => import(/* webpackChunkName: "mine_list" */ '../views/mine/mine_list.vue')
  }, {
    path: '/mine/info/:mine_id',
    name: 'mine_info',
    component: () => import(/* webpackChunkName: "mine_info" */ '../views/mine/mine_info.vue')
  },
  // bids
  {
    path: '/bids/list',
    name: 'bids_list',
    component: () => import(/* webpackChunkName: "bids_list" */ '../views/bids/bids_list.vue')
  }, {
    path: '/bids/info/:bid_id',
    name: 'bids_info',
    component: () => import(/* webpackChunkName: "bids_info" */ '../views/bids/bids_info.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
