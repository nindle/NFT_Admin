<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>用户管理</a-breadcrumb-item>
    <a-breadcrumb-item>关注列表</a-breadcrumb-item>
  </a-breadcrumb>

  <a-table
    :row-key="(record) => record['user_id']"
    :dataSource="tbl_list"
    :columns="tbl_col"
    :pagination="tbl_page"
    :loading="tbl_load"
    @change="tbl_hand"
  >
    <template #state="{ text }">
      <span v-if="text == 1" class="green">关注</span>
      <span v-else class="grey">取消关注</span>
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
import { useRoute } from 'vue-router'

const tbl_col = [
  {
    title: '关注ID',
    dataIndex: 'uf_id',
    key: 'uf_id',
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
    title: '被关注ID',
    dataIndex: 'follow_id',
    key: 'follow_id',
  },
  {
    title: '被关注钱包',
    dataIndex: 'follow_address',
    key: 'follow_address',
  },
  {
    title: '状态',
    dataIndex: 'uf_state',
    slots: { customRender: 'state' },
  },
  {
    title: '关注时间',
    dataIndex: 'create_time',
    key: 'create_time',
  },
]

export default defineComponent({
  setup: () => {
    const route = useRoute()

    const data = reactive({
      search: {
        user_id: '',
        follow_id: '',
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
          '/admin/user_follow/list?page=' +
            data.tbl_page.current +
            '&user_id=' +
            data.search.user_id +
            '&follow_id=' +
            data.search.follow_id,
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
      data.search.user_id = (route.query.user_id as string) || ''
      data.search.follow_id = (route.query.follow_id as string) || ''
      api()
    })

    return { tbl_col, tbl_hand, FFormatEther, MyCoin, ...datas }
  },
})
</script>
