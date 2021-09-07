<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>用户管理</a-breadcrumb-item>
    <a-breadcrumb-item>用户信息</a-breadcrumb-item>
  </a-breadcrumb>

  <div class="spin-load" v-show="spinLoad">
    <a-spin />
  </div>

  <div>
    <UserInfo :user_id="user_id" @onLoaded="spinLoaded"></UserInfo>

    <div class="btn-wrap">
      <a-button @click="goback">返回</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserInfo from '../../components/UserInfo.vue'

export default defineComponent({
  components: {
    UserInfo,
  },
  setup: () => {
    const route = useRoute()
    const router = useRouter()

    let state = reactive({
      user_id: 0,
      spinLoad: true,
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

    onMounted(() => {
      state.user_id = Number(route.params.user_id as string)
    })

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
