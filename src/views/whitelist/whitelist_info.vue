<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>白名单管理</a-breadcrumb-item>
    <a-breadcrumb-item>白名单信息</a-breadcrumb-item>
  </a-breadcrumb>

  <div class="spin-load" v-show="spinLoad">
    <a-spin />
  </div>
  <div>
    <a-form :label-col="{ span: 2 }" :wrapper-col="{ span: 6 }">
      <a-form-item label="ID">
        {{ white.white_id }}
      </a-form-item>
      <a-form-item label="合约地址">
        {{ white.contract_address }}
      </a-form-item>
      <a-form-item label="用户钱包">
        {{ white.white_address }}
      </a-form-item>
      <a-form-item label="TX Hash">
        {{ white.tx_id }}
      </a-form-item>
      <a-form-item label="结果">
        <span v-if="white.white_result == 1" class="green">有效</span>
        <span v-else class="grey">无效</span>
      </a-form-item>
      <a-form-item label="添加时间">
        {{ white.white_time }}
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 2 }">
        <a-button @click="goback">返回</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import axios from '../../utils/axios'
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup: () => {
    let white_id = 0
    const route = useRoute()
    const router = useRouter()

    let state = reactive({
      spinLoad: true,
      white: {
        white_id: 0,
        contract_address: '',
        tx_id: '',
        white_address: '',
        white_result: 1,
        white_time: '',
      },
    })

    onMounted(() => {
      white_id = Number(route.params.white_id as string)
      infoApi(white_id)
    })

    const infoApi = (white_id: number) => {
      axios
        .get('/admin/whitelist/info?white_id=' + String(white_id))
        .then((resp) => {
          const res = resp.data
          state.spinLoad = false
          state.white = res.data
        })
    }

    const goback = () => {
      router.back()
    }

    return { goback, ...toRefs(state) }
  },
})
</script>
