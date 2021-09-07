<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>竞拍管理</a-breadcrumb-item>
    <a-breadcrumb-item>竞拍信息</a-breadcrumb-item>
  </a-breadcrumb>

  <div class="spin-load" v-show="spinLoad">
    <a-spin />
  </div>

  <div>
    <a-descriptions title="竞拍信息" bordered>
      <a-descriptions-item label="竞拍ID">
        {{ bids.bid_id }}
      </a-descriptions-item>
      <a-descriptions-item label="竞拍价格">
        {{ bids.bid_price ? FFormatEther(bids.bid_price.toString()) : 0 }}
        {{ bids.coin_name }}
      </a-descriptions-item>
      <a-descriptions-item label="竞拍费率">
        {{ bids.bid_fee }} {{ bids.coin_name_fee }}
      </a-descriptions-item>

      <a-descriptions-item label="竞拍时间">
        {{ bids.bid_time }}
      </a-descriptions-item>
      <a-descriptions-item label="竞拍结果">
        <span v-if="bids.bid_result == 1" class="green">成功</span>
        <span v-else-if="bids.bid_result == 2" class="grey">失败</span>
        <span v-else-if="bids.bid_result == 0">进行中</span>
        <span v-else class="grey">--</span>
      </a-descriptions-item>
      <a-descriptions-item></a-descriptions-item>

      <a-descriptions-item label="订单数据" :span="3">
        <a-textarea v-model:value="bids.bid_data" :rows="5"></a-textarea>
      </a-descriptions-item>
    </a-descriptions>

    <div class="hgt"></div>
    <ItemInfo :item_id="item_id" :loaded="false"></ItemInfo>

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
import ItemInfo from '../../components/ItemInfo.vue'
import { FFormatEther } from '../../filters/index'

export default defineComponent({
  components: {
    UserInfo,
    ItemInfo,
  },
  setup: () => {
    let bid_id = 0
    const route = useRoute()
    const router = useRouter()

    let state = reactive({
      user_id: 0,
      item_id: 0,
      spinLoad: true,
      bids: {
        bid_id: 0,
        bid_price: 0,
        coin_name: '',
        bid_fee: 0,
        coin_name_fee: '',
        bid_time: '',
        bid_result: 0,
        bid_data: '',
      },
    })

    onMounted(() => {
      bid_id = Number(route.params.bid_id as string)
      infoApi(bid_id)
    })

    const infoApi = (bid_id: number) => {
      axios.get('/admin/bids/info?bid_id=' + String(bid_id)).then((resp) => {
        const res = resp.data
        state.bids = res.data
        state.item_id = res.data.item_id
        state.user_id = res.data.bid_user_id
      })
    }

    const goback = () => {
      router.back()
    }

    const spinLoaded = () => {
      state.spinLoad = false
    }

    return { goback, spinLoaded, FFormatEther, ...toRefs(state) }
  },
})
</script>
