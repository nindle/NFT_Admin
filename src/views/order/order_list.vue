<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>订单管理</a-breadcrumb-item>
    <a-breadcrumb-item>订单列表</a-breadcrumb-item>
  </a-breadcrumb>

  <a-table
    :row-key="(record) => record['ord_id']"
    :dataSource="tbl_list"
    :columns="tbl_col"
    :pagination="tbl_page"
    :loading="tbl_load"
    @change="tbl_hand"
  >
    <template #price="{ record }">
      {{ FFormatEther(record.ord_price) }}
      <span>{{ record.coin_name }}</span>
    </template>
    <template #cate="{ text }">
      <span v-if="text == 1">出售</span>
      <span v-else-if="text == 2">购买</span>
      <span v-else>--</span>
    </template>
    <template #result="{ text }">
      <span v-if="text == 1">成功</span>
      <span v-else-if="text == 2">失败</span>
      <span v-else>--</span>
    </template>
    <template #action="{ record }">
      <router-link :to="'/order/info/' + record.ord_id">
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
import { FFormatEther } from '../../filters/index'

const tbl_col = [
  {
    title: '订单ID',
    dataIndex: 'ord_id',
    key: 'ord_id',
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
    dataIndex: 'user_id',
    key: 'user_id',
  },
  {
    title: '数量',
    dataIndex: 'ord_amount',
    key: 'ord_amount',
  },
  {
    title: '方式',
    dataIndex: 'ord_cate',
    slots: { customRender: 'cate' },
  },
  {
    title: '价格',
    dataIndex: 'ord_price',
    slots: { customRender: 'price' },
  },
  {
    title: '结果',
    dataIndex: 'ord_result',
    slots: { customRender: 'result' },
  },
  {
    title: '时间',
    dataIndex: 'ord_time',
    key: 'ord_time',
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
      http
        .get('/admin/order/list?page=' + data.tbl_page.current, {})
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

    return { tbl_col, tbl_hand, FFormatEther, ...datas }
  },
})
</script>
