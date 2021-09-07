<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>合约管理</a-breadcrumb-item>
    <a-breadcrumb-item>合约列表</a-breadcrumb-item>
  </a-breadcrumb>

  <a-table
    :row-key="(record) => record['cc.coll_id']"
    :dataSource="tbl_list"
    :columns="tbl_col"
    :pagination="tbl_page"
    :loading="tbl_load"
    @change="tbl_hand"
  >
    <template #action="{ record }">
      <router-link
        :to="'/collection/cont_info?coll_id=' + record['cc.coll_id']"
      >
        详情
      </router-link>
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

const tbl_col = [
  {
    title: 'ID',
    dataIndex: 'cc.coll_id',
    key: 'cc.coll_id',
  },
  {
    title: '合约地址',
    dataIndex: 'coll_address',
    key: 'coll_address',
  },
  {
    title: '合约名称',
    dataIndex: 'coll_title',
    key: 'coll_title',
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
      axios
        .get('/admin/collection/list?page=' + data.tbl_page.current, {})
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

    return { tbl_col, tbl_hand, ...datas }
  },
})
</script>
