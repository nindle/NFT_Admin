<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>挖矿管理</a-breadcrumb-item>
    <a-breadcrumb-item>挖矿信息</a-breadcrumb-item>
  </a-breadcrumb>

  <div class="spin-load" v-show="spinLoad">
    <a-spin />
  </div>

  <div>
    <a-descriptions title="挖矿信息" bordered>
      <a-descriptions-item label="ID">
        {{ mine.mine_id }}
      </a-descriptions-item>
      <a-descriptions-item label="挖矿金额">
        {{ mine.mine_amount || 0 }}
      </a-descriptions-item>
      <a-descriptions-item label="类型">
        {{ mine.mine_type }}
      </a-descriptions-item>

      <a-descriptions-item label="结果">
        <span v-if="mine.tx_state == 1" class="green">成功</span>
        <span v-else class="grey">失败</span>
      </a-descriptions-item>
      <a-descriptions-item label="挖矿时间">
        {{ mine.mine_time }}
      </a-descriptions-item>
      <a-descriptions-item label="Tx Hash">
        {{ mine.tx_id }}
      </a-descriptions-item>
    </a-descriptions>

    <div class="hgt"></div>

    <UserInfo :user_id="user_id" @onLoaded="spinLoaded"></UserInfo>

    <div class="btn-wrap">
      <a-button @click="goback">返回</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import axios from '../../utils/axios'
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserInfo from '../../components/UserInfo.vue'

export default defineComponent({
  components: {
    UserInfo,
  },
  setup: () => {
    let mine_id = 0
    const route = useRoute()
    const router = useRouter()

    let state = reactive({
      user_id: 0,
      spinLoad: true,
      mine: {
        mine_amount: '',
        mine_id: 0,
        mine_time: '',
        mine_type: 'mine',
        tx_id: '',
        tx_state: 1,
      },
    })

    onMounted(() => {
      mine_id = Number(route.params.mine_id as string)
      infoApi(mine_id)
    })

    const infoApi = (mine_id: number) => {
      axios.get('/admin/mine/info?mine_id=' + String(mine_id)).then((resp) => {
        const res = resp.data
        state.mine = res.data
        state.user_id = res.data.user_id
      })
    }

    const goback = () => {
      router.back()
    }

    const spinLoaded = () => {
      state.spinLoad = false
    }

    return { goback, spinLoaded, ...toRefs(state) }
  },
})
</script>
