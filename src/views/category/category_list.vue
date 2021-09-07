<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>分类管理</a-breadcrumb-item>
    <a-breadcrumb-item>分类列表</a-breadcrumb-item>
  </a-breadcrumb>

  <div class="search-wrap">
    <a-button @click="add">添加</a-button>
  </div>

  <a-table
    :row-key="(record) => record['acct_id']"
    :dataSource="tbl_list"
    :columns="tbl_col"
    :pagination="tbl_page"
    :loading="tbl_load"
    @change="tbl_hand"
  >
    <template #state="{ text }">
      <span v-if="text == 1" class="green">正常</span>
      <span v-else class="grey">禁用</span>
    </template>
    <template #action="{ record }">
      <router-link :to="'/category/edit/' + record.cate_id">
        编辑
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
import { useRouter } from 'vue-router'

const tbl_col = [
  {
    title: '分类ID',
    dataIndex: 'cate_id',
    key: 'cate_id',
  },
  {
    title: '分类名称',
    dataIndex: 'cate_name',
    key: 'cate_name',
  },
  {
    title: '排序',
    dataIndex: 'cate_index',
    key: 'cate_index',
  },
  {
    title: '状态',
    dataIndex: 'cate_state',
    slots: { customRender: 'state' },
  },
  {
    title: '创建时间',
    dataIndex: 'create_at',
    key: 'create_at',
  },
  {
    title: '操作',
    slots: { customRender: 'action' },
  },
]

export default defineComponent({
  setup: () => {
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

    const api = () => {
      data.tbl_load = true
      axios
        .get('/admin/category/list?page=' + data.tbl_page.current, {})
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
      router.push('/category/add')
    }

    return { tbl_col, tbl_hand, add, ...toRefs(data) }
  },
})
</script>
