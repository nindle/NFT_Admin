<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>工作台</a-breadcrumb-item>
    <a-breadcrumb-item>业务数据</a-breadcrumb-item>
  </a-breadcrumb>

  <div class="spin-load" v-show="spinLoad">
    <a-spin />
  </div>

  <a-row>
    <a-col :span="6">
      <a-statistic
        title="用户数"
        :value="total.user_total"
        style="margin-right: 50px;"
      />
    </a-col>
    <a-col :span="6">
      <a-statistic title="NFT数" :value="total.item_total" />
    </a-col>
    <a-col :span="6">
      <a-statistic title="订单数" :value="total.order_total" />
    </a-col>
    <a-col :span="6">
      <a-statistic
        title="已产出金额"
        :value="total.mint_total"
        style="margin-right: 50px;"
      />
    </a-col>
  </a-row>

  <div class="hgt"></div>

  <a-row>
    <a-col :span="6">
      <a-statistic title="竞拍数" :value="total.bids_total" />
    </a-col>
    <a-col :span="6">
      <a-statistic
        title="收藏数"
        :value="total.like_total"
        style="margin-right: 50px;"
      />
    </a-col>
    <a-col :span="6">
      <a-statistic
        title="合约数"
        :value="total.contract_total"
        style="margin-right: 50px;"
      />
    </a-col>
    <a-col :span="6">
      <a-statistic title="系统账号" :value="total.sys_acct_total" />
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import http from '../utils/axios'

export default defineComponent({
  setup: () => {
    const data = reactive({
      spinLoad: true,
      total: {
        bids_total: 0,
        contract_total: 0,
        item_total: 0,
        like_total: 0,
        mint_total: 0,
        order_total: 0,
        sys_acct_total: 0,
        user_total: 0,
      },
    })

    const api = () => {
      http.get('/admin/data/total', {}).then((resp) => {
        const res = resp.data
        data.total = res.data
        data.spinLoad = false
      })
    }

    onMounted(() => {
      api()
    })

    return { ...toRefs(data) }
  },
})
</script>
