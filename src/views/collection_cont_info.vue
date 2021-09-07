<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>合约管理</a-breadcrumb-item>
    <a-breadcrumb-item>合约信息</a-breadcrumb-item>
  </a-breadcrumb>

  <div class="spin-load" v-show="spinLoad">
    <a-spin />
  </div>
  <a-descriptions title="合约信息" bordered>
    <a-descriptions-item label="合约标题">
      {{ info_data.coll_title }}
    </a-descriptions-item>
    <a-descriptions-item label="合约类型">
      {{ info_data.coll_type }}
    </a-descriptions-item>
    <a-descriptions-item label="合约名称">
      {{ info_data.coll_name }}
    </a-descriptions-item>
    <a-descriptions-item label="合约地址">
      {{ info_data.coll_address }}
    </a-descriptions-item>
    <a-descriptions-item label="合约封面">
      {{ info_data.coll_cover }}
    </a-descriptions-item>
    <a-descriptions-item label="创建时间">
      {{ info_data.create_at }}
    </a-descriptions-item>
    <a-descriptions-item label="用户ID">
      {{ info_data.user_id }}
    </a-descriptions-item>
    <a-descriptions-item label="热门">
      {{ info_data.coll_hot }}
    </a-descriptions-item>
    <a-descriptions-item label="显示顺序">
      {{ info_data.coll_index }}
    </a-descriptions-item>
    <a-descriptions-item label="合约ABI">
      <a-textarea v-model:value="info_data.coll_abi" :rows="10"></a-textarea>
    </a-descriptions-item>
  </a-descriptions>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup: () => {
    const route = useRoute()

    const data = reactive({
      spinLoad: true,
      info_data: {
        coll_title: '',
        coll_type: '',
        coll_name: '',
        coll_address: '',
        coll_cover: '',
        create_at: '',
        user_id: '',
        coll_hot: '',
        coll_abi: '',
        coll_index: '',
      },
      info_load: true,
    })

    const api = (coll_id: any) => {
      axios
        .get('/admin/collection/cont/info?coll_id=' + coll_id, {})
        .then((resp) => {
          data.spinLoad = false
          const res = resp.data
          data.info_data = res.data
          data.info_load = false
        })
    }

    onMounted(() => {
      const coll_id = route.query.coll_id
      api(coll_id)
    })

    return { ...toRefs(data) }
  },
})
</script>
