<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>订单管理</a-breadcrumb-item>
    <a-breadcrumb-item>订单信息</a-breadcrumb-item>
  </a-breadcrumb>

  <div class="spin-load" v-show="spinLoad">
    <a-spin />
  </div>

  <div>
    <a-descriptions title="订单信息" bordered>
      <a-descriptions-item label="订单ID">
        {{ order.ord_id }}
      </a-descriptions-item>
      <a-descriptions-item label="订单价格">
        {{ order.ord_price }} {{ order.coin_name }}
      </a-descriptions-item>
      <a-descriptions-item label="订单数量">
        {{ order.ord_amount || 0 }}
      </a-descriptions-item>

      <a-descriptions-item label="订单时间">
        {{ order.ord_time }}
      </a-descriptions-item>
      <a-descriptions-item label="订单类别">
        {{ order.ord_cate }}
      </a-descriptions-item>
      <a-descriptions-item label="订单状态">
        <span v-if="order.ord_result == 1" class="green">成功</span>
        <span v-else class="grey">待处理</span>
      </a-descriptions-item>

      <a-descriptions-item label="订单数据" :span="3">
        <a-textarea v-model:value="order.ord_data" :rows="5"></a-textarea>
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

export default defineComponent({
  components: {
    UserInfo,
    ItemInfo,
  },
  setup: () => {
    let order_id = 0
    const route = useRoute()
    const router = useRouter()

    let state = reactive({
      user_id: 0,
      item_id: 0,
      spinLoad: true,
      order: {
        ord_id: 0,
        ord_price: '',
        coin_name: '',
        ord_amount: 0,
        ord_time: '',
        ord_cate: '',
        ord_result: 0,
        ord_data: '',
      },
    })

    onMounted(() => {
      order_id = Number(route.params.order_id as string)
      infoApi(order_id)
    })

    const infoApi = (order_id: number) => {
      axios
        .get('/admin/order/info?order_id=' + String(order_id))
        .then((resp) => {
          const res = resp.data
          state.order = res.data
          state.item_id = res.data.item_id
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
