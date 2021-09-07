<template>
  <a-descriptions title="用户信息" bordered>
    <a-descriptions-item label="用户ID">
      {{ user.user_id }}
    </a-descriptions-item>
    <a-descriptions-item label="用户钱包">
      {{ user.user_address }}
    </a-descriptions-item>
    <a-descriptions-item label="用户昵称">
      {{ user.user_name }}
    </a-descriptions-item>

    <a-descriptions-item label="挖矿总量">
      {{ user.user_total ? FFormatEther(user.user_total.toString()) : 0 }} {{ MyCoin }}
    </a-descriptions-item>
    <a-descriptions-item label="待领取">
      {{ user.user_balance ? FFormatEther(user.user_balance.toString()) : 0 }} {{ MyCoin }}
    </a-descriptions-item>
    <a-descriptions-item label="粉丝数">
      {{ user.user_followers || 0 }}
    </a-descriptions-item>

    <a-descriptions-item label="关注数">
      {{ user.user_followings || 0 }}
    </a-descriptions-item>
    <a-descriptions-item label="twitter">
      {{ user.user_twitter }}
    </a-descriptions-item>
    <a-descriptions-item label="website">
      {{ user.user_website }}
    </a-descriptions-item>

    <a-descriptions-item label="简介描述" :span="3">
      {{ user.user_desc }}
    </a-descriptions-item>

    <a-descriptions-item label="注册时间">
      {{ user.create_time }}
    </a-descriptions-item>
  </a-descriptions>
</template>

<script lang="ts">
import axios from '../utils/axios'
import { defineComponent, reactive, toRefs, watch } from 'vue'
import { FFormatEther, MyCoin } from '../filters/index'

export default defineComponent({
  name: 'UserInfo',
  props: {
    user_id: {
      type: Number,
      required: true,
    },
    loaded: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  setup: (props, context) => {
    let state = reactive({
      user: {
        create_time: '',
        user_address: '',
        user_balance: 0,
        user_cover: '',
        user_desc: '',
        user_followers: 0,
        user_followings: 0,
        user_id: 0,
        user_lock: 0,
        user_name: '',
        user_pic: '',
        user_short_url: '',
        user_total: 0,
        user_twitter: '',
        user_type: 'user',
        user_version: 0,
        user_website: '',
      },
    })

    const infoApi = (user_id: number) => {
      axios.get('/admin/user/info?user_id=' + String(user_id)).then((resp) => {
        const res = resp.data
        state.user = res.data
        if (props.loaded == true) {
          try {
            context.emit('onLoaded')
          } catch (e) {
            console.log(e)
          }
        }
      })
    }

    watch(props, (newProps, oldProps) => {
      if (props.user_id > 0) {
        infoApi(props.user_id)
      }
    })

    return { FFormatEther, MyCoin, ...toRefs(state) }
  },
})
</script>
