<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>NFT管理</a-breadcrumb-item>
    <a-breadcrumb-item>收藏列表</a-breadcrumb-item>
  </a-breadcrumb>

  <a-table
    :row-key="(record) => record['like_id']"
    :dataSource="tbl_list"
    :columns="tbl_col"
    :pagination="tbl_page"
    :loading="tbl_load"
    @change="tbl_hand"
  >
    <template #state="{ text }">
      <span v-if="text == 1" class="green">收藏</span>
      <span v-else class="grey">取消收藏</span>
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

const tbl_col = [
  {
    title: 'ID',
    dataIndex: 'like_id',
    key: 'like_id',
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
    title: '收藏时间',
    dataIndex: 'like_time',
    key: 'like_time',
  },
  {
    title: '结果',
    dataIndex: 'like_state',
    slots: { customRender: 'state' },
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
          '/admin/item_like/list?page=' +
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

    return { tbl_col, tbl_hand, ...datas }
  },
})
</script>
