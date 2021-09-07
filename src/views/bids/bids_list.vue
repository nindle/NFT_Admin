<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>竞拍管理</a-breadcrumb-item>
    <a-breadcrumb-item>竞拍列表</a-breadcrumb-item>
  </a-breadcrumb>

  <a-table
    :row-key="(record) => record['bid_id']"
    :dataSource="tbl_list"
    :columns="tbl_col"
    :pagination="tbl_page"
    :loading="tbl_load"
    @change="tbl_hand"
  >
    <template #price="{ record }">
      {{ record.bid_price ? FFormatEther(record.bid_price) : 0 }}
      <span>{{ record.coin_name }}</span>
    </template>
    <template #fee="{ record }">
      {{ record.bid_fee || 0 }}
      <span>{{ record.coin_name_fee }}</span>
    </template>
    <template #address="{ text }">
      {{ FAddress(text) }}
    </template>
    <template #result="{ text }">
      <span v-if="text == 1">成功</span>
      <span v-else-if="text == 2">失败</span>
      <span v-else-if="text == 0">进行中</span>
      <span v-else>--</span>
    </template>
    <template #action="{ record }">
      <router-link :to="'/bids/info/' + record.bid_id">
        详情
      </router-link>
    </template>
  </a-table>
</template>

<script lang="ts">
import http from '../../utils/axios'
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import {
  TableState,
  TableStateFilters,
} from 'ant-design-vue/es/table/interface'
import { FFormatEther, FAddress } from '../../filters/index'
import { useRoute } from 'vue-router'

const tbl_col = [
  {
    title: '竞拍ID',
    dataIndex: 'bid_id',
    key: 'bid_id',
  },
  {
    title: 'NFT ID',
    dataIndex: 'item_id',
    key: 'item_id',
  },
  {
    title: 'NFT类型',
    dataIndex: 'asset_type',
    key: 'asset_type',
  },
  {
    title: '用户ID',
    dataIndex: 'bid_user_id',
    key: 'bid_user_id',
  },
  {
    title: '钱包地址',
    dataIndex: 'bid_user_address',
    slots: { customRender: 'address' },
  },
  {
    title: '价格',
    slots: { customRender: 'price' },
  },
  {
    title: '费率',
    slots: { customRender: 'fee' },
  },
  {
    title: '结果',
    dataIndex: 'bid_result',
    slots: { customRender: 'result' },
  },
  {
    title: '竞拍时间',
    dataIndex: 'bid_time',
    key: 'bid_time',
  },
  {
    title: '操作',
    slots: { customRender: 'action' },
  },
]

export default defineComponent({
  setup: () => {
    const route = useRoute()

    const data = reactive({
      search: {
        item_id: '',
      },
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
      http
        .get(
          '/admin/bids/list?page=' +
            data.tbl_page.current +
            '&item_id=' +
            data.search.item_id,
          {},
        )
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
      data.search.item_id = (route.query.item_id as string) || ''
      api()
    })

    return { tbl_col, tbl_hand, FFormatEther, FAddress, ...datas }
  },
})
</script>
