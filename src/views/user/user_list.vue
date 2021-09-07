<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>用户管理</a-breadcrumb-item>
    <a-breadcrumb-item>用户列表</a-breadcrumb-item>
  </a-breadcrumb>

  <a-table
    :row-key="(record) => record['user_id']"
    :dataSource="tbl_list"
    :columns="tbl_col"
    :pagination="tbl_page"
    :loading="tbl_load"
    @change="tbl_hand"
  >
    <template #followers="{ text }">
      {{ text || 0 }}
    </template>
    <template #followings="{ text }">
      {{ text || 0 }}
    </template>
    <template #total="{ text }">
      {{ text ? FFormatEther(text) : 0 }} {{ MyCoin }}
    </template>
    <template #balance="{ text }">
      {{ text ? FFormatEther(text) : 0 }} {{ MyCoin }}
    </template>
    <template #action="{ record }">
      <router-link :to="'/user/info/' + record.user_id">详情</router-link>
      <a
        class="am"
        :href="'/#/mine/list?user_id=' + record.user_id"
        target="_blank"
      >
        挖矿
      </a>
      <a
        class="am"
        :href="'/#/user_follow/list?user_id=' + record.user_id"
        target="_blank"
      >
        关注者
      </a>
      <a
        class="am"
        :href="'/#/user_follow/list?follow_id=' + record.user_id"
        target="_blank"
      >
        粉丝
      </a>
    </template>
  </a-table>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import {
  TableState,
  TableStateFilters,
} from 'ant-design-vue/es/table/interface'
import { FFormatEther, MyCoin } from '../../filters/index'

const tbl_col = [
  {
    title: '用户ID',
    dataIndex: 'user_id',
    key: 'user_id',
  },
  {
    title: '用户钱包',
    dataIndex: 'user_address',
    key: 'user_address',
  },
  {
    title: '用户昵称',
    dataIndex: 'user_name',
    key: 'user_name',
  },
  {
    title: '挖矿总量',
    dataIndex: 'user_total',
    slots: { customRender: 'total' },
  },
  {
    title: '待领取',
    dataIndex: 'user_balance',
    slots: { customRender: 'balance' },
  },
  {
    title: '粉丝数',
    dataIndex: 'user_followers',
    slots: { customRender: 'followers' },
  },
  {
    title: '关注数',
    dataIndex: 'user_followings',
    slots: { customRender: 'followings' },
  },
  {
    title: '操作',
    slots: { customRender: 'action' },
  },
]

export default defineComponent({
  setup: () => {
    const data = reactive({
      tbl_load: true,
      tbl_list: [],
      tbl_page: {
        total: 1,
        current: 1,
        pageSize: 10,
      },
    })
    const datas = toRefs(data)

    const api = () => {
      data.tbl_load = true
      axios
        .get('/admin/user/list?page=' + data.tbl_page.current, {})
        .then((resp) => {
          const res = resp.data
          data.tbl_list = res.list
          data.tbl_load = false
          data.tbl_page.total = res.pager.total
          data.tbl_page.current = res.pager.page
          data.tbl_page.pageSize = res.pager.size
        })
    }

    type Pagination = TableState['pagination']
    const tbl_hand = (pager: Pagination, filters: TableStateFilters) => {
      data.tbl_page.current = pager!.current!
      api()
    }

    onMounted(() => {
      api()
    })

    return { tbl_col, tbl_hand, FFormatEther, MyCoin, ...datas }
  },
})
</script>
