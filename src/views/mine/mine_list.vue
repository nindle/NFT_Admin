<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>挖矿管理</a-breadcrumb-item>
    <a-breadcrumb-item>挖矿列表</a-breadcrumb-item>
  </a-breadcrumb>

  <a-table
    :row-key="(record) => record['mine_id']"
    :dataSource="tbl_list"
    :columns="tbl_col"
    :pagination="tbl_page"
    :loading="tbl_load"
    @change="tbl_hand"
  >
    <template #mineType="{ text }">
      <span>{{ text }}</span>
    </template>
    <template #amount="{ text }">
      <span>{{ text ? FFormatEther(text) : 0 }} {{ MyCoin }}</span>
    </template>
    <template #state="{ text }">
      <span v-if="text == 1" class="green">成功</span>
      <span v-else class="grey">失败</span>
    </template>
    <template #action="{ record }">
      <router-link :to="'/mine/info/' + record.mine_id">详情</router-link>
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
import { FFormatEther, MyCoin } from '../../filters/index'

const tbl_col = [
  {
    title: 'ID',
    dataIndex: 'mine_id',
    key: 'mine_id',
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
    title: '金额',
    dataIndex: 'mine_amount',
    slots: { customRender: 'amount' }
  },
  {
    title: '类型',
    dataIndex: 'mine_type',
    slots: { customRender: 'mineType' },
  },
  {
    title: '结果',
    dataIndex: 'tx_state',
    slots: { customRender: 'state' },
  },
  {
    title: '挖矿时间',
    dataIndex: 'mine_time',
    key: 'mine_time',
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
        user_id: '',
        user_address: '',
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
          '/admin/mine/list?page=' +
            data.tbl_page.current +
            '&user_id=' +
            data.search.user_id +
            '&user_address=' +
            data.search.user_address,
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
      data.search.user_address = (route.query.user_address as string) || ''
      api()
    })

    return { tbl_col, tbl_hand, FFormatEther, MyCoin, ...datas }
  },
})
</script>
