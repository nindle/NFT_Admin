<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>白名单管理</a-breadcrumb-item>
    <a-breadcrumb-item>白名单列表</a-breadcrumb-item>
  </a-breadcrumb>

  <div class="search-wrap">
    <a-button @click="add">添加</a-button>
  </div>

  <a-table
    :row-key="(record) => record['white_id']"
    :dataSource="tbl_list"
    :columns="tbl_col"
    :pagination="tbl_page"
    :loading="tbl_load"
    @change="tbl_hand"
  >
    <template #contract="{ text }">
      <span v-if="text == cont1155">1155合约 / {{text}}</span>
      <span v-else>721合约 / {{text}}</span>
    </template>
    <template #white_result="{ text }">
      <span v-if="text == 1" class="green">有效</span>
      <span v-else class="grey">无效</span>
    </template>
    <template #action="{ record }">
      <router-link :to="'/whitelist/info/' + record.white_id">详情</router-link>
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
import { useRouter } from 'vue-router'

const tbl_col = [
  {
    title: 'ID',
    dataIndex: 'white_id',
    key: 'white_id',
  },
  {
    title: '合约地址',
    dataIndex: 'contract_address',
    slots: { customRender: 'contract' },
  },
  {
    title: '用户钱包',
    dataIndex: 'white_address',
    key: 'white_address',
  },
  {
    title: '结果',
    dataIndex: 'white_result',
    slots: { customRender: 'white_result' },
  },
  {
    title: '添加时间',
    dataIndex: 'white_time',
    key: 'white_time',
  },
  {
    title: '操作',
    slots: { customRender: 'action' },
  },
]

export default defineComponent({
  setup: () => {
    const isProd = import.meta.env.PROD;
    const cont1155 = isProd ? "0x10cab0D6aA8A236cddF0249DD602EEF52E7e6630" : "0xE9285F4Bd13D86Fe4f4b019C6b54cc3f8c6f858C";

    const router = useRouter()

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
        .get('/admin/whitelist/list?page=' + data.tbl_page.current, {})
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

    const add = () => {
      router.push('/whitelist/add')
    }

    return { tbl_col, tbl_hand, add, cont1155, ...datas }
  },
})
</script>
