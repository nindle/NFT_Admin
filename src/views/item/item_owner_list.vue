<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>NFT管理</a-breadcrumb-item>
    <a-breadcrumb-item>拥有者列表</a-breadcrumb-item>
  </a-breadcrumb>

  <a-table
    :row-key="(record) => record['own_id']"
    :dataSource="tbl_list"
    :columns="tbl_col"
    :pagination="tbl_page"
    :loading="tbl_load"
    @change="tbl_hand"
  >
    <template #price="{ text }">
      {{ text ? FFormatEther(text) : 0 }}
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
import { useRoute } from 'vue-router'
import { FFormatEther } from '../../filters/index'

const tbl_col = [
  {
    title: 'ID',
    dataIndex: 'own_id',
    key: 'own_id',
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
    title: 'Token ID',
    dataIndex: 'token_id',
    key: 'token_id',
  },
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
    title: '拥有时间',
    dataIndex: 'own_time',
    key: 'own_time',
  },
  {
    title: '拥有数',
    dataIndex: 'own_supply',
    key: 'own_supply',
  },
  {
    title: '交易价格',
    dataIndex: 'sale_price',
    slots: { customRender: 'price' },
  },
  {
    title: '代币',
    dataIndex: 'sale_coin',
    key: 'sale_coin',
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
      axios
        .get(
          '/admin/item_owner/list?page=' +
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

    return { tbl_col, tbl_hand, FFormatEther, ...datas }
  },
})
</script>
