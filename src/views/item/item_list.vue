<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>NFT管理</a-breadcrumb-item>
    <a-breadcrumb-item>NFT列表</a-breadcrumb-item>
  </a-breadcrumb>

  <a-table
    :row-key="(record) => record['item_id']"
    :dataSource="tbl_list"
    :columns="tbl_col"
    :pagination="tbl_page"
    :loading="tbl_load"
    @change="tbl_hand"
  >
    <template #address="{ text }">
      <span>{{ FAddress(text) }}</span>
    </template>
    <template #token="{ text }">
      <span>{{ FToken(text) }}</span>
    </template>
    <template #saleable="{ text }">
      <span v-if="text == 1" class="green">在售</span>
      <span v-else class="grey">下架</span>
    </template>
    <template #topType="{ record }">
      <span v-if="record.top_type == 'home_top'" class="green">首页推荐 ({{record.top_index}})</span>
      <span v-else>普通</span>
    </template>
    <template #action="{ record }">
      <router-link :to="'/item/info/' + record.item_id">详情</router-link>
      <a
        class="am"
        :href="'/#/item_owner/list?item_id=' + record.item_id"
        target="_blank"
      >
        拥有者
      </a>
      <a
        class="am"
        :href="'/#/bids/list?item_id=' + record.item_id"
        target="_blank"
      >
        竞拍
      </a>
      <a
        class="am"
        :href="'/#/item_like/list?item_id=' + record.item_id"
        target="_blank"
      >
        收藏
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
import { FToken, FAddress } from '../../filters/index'

const tbl_col = [
  {
    title: 'NFT_ID',
    dataIndex: 'item_id',
    key: 'item_id',
  },
  {
    title: 'NFT名称',
    dataIndex: 'prop_name',
    key: 'prop_name',
  },
  {
    title: '用户名称',
    dataIndex: 'user_name',
    key: 'user_name',
  },
  {
    title: '用户钱包',
    dataIndex: 'user_address',
    slots: { customRender: 'address' },
  },
  {
    title: 'Token',
    dataIndex: 'token',
    slots: { customRender: 'token' },
  },
  {
    title: 'TokenId',
    dataIndex: 'token_id',
    key: 'token_id',
  },
  {
    title: '资产类型',
    dataIndex: 'asset_type',
    key: 'asset_type',
  },
  {
    title: '供应量',
    dataIndex: 'supply',
    key: 'supply',
  },
  {
    title: '出售状态',
    dataIndex: 'saleable',
    slots: { customRender: 'saleable' },
  },
  {
    title: '推荐',
    slots: { customRender: 'topType' },
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

    const api = () => {
      data.tbl_load = true
      axios
        .get('/admin/item/list?page=' + data.tbl_page.current, {})
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

    return { tbl_col, tbl_hand, FToken, FAddress, ...toRefs(data) }
  },
})
</script>
