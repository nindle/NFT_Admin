<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>我的账号</a-breadcrumb-item>
    <a-breadcrumb-item>账号信息</a-breadcrumb-item>
  </a-breadcrumb>

  <div class="spin-load" v-show="spinLoad">
    <a-spin />
  </div>
  <div>
    <a-form :label-col="{ span: 2 }" :wrapper-col="{ span: 6 }">
      <a-form-item label="账号">
        {{ acct.account }}
      </a-form-item>
      <a-form-item label="昵称">
        {{ acct.nickname }}
      </a-form-item>
      <a-form-item label="邮箱">
        {{ acct.email }}
      </a-form-item>
      <a-form-item label="创建时间">
        {{ acct.create_at }}
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 2 }">
        <a-button @click="goback">返回</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import axios from '../utils/axios'
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { TAccount } from '../types/account'

export default defineComponent({
  setup: () => {
    const router = useRouter()

    let state: TAccount = reactive({
      spinLoad: true,
      acct: {
        account: '',
        avatar: '',
        create_at: '',
        email: '',
        nickname: '',
        passwd: '',
      },
    })

    onMounted(() => {
      infoApi()
    })

    const infoApi = () => {
      axios.get('/admin/sys_account/data').then((resp) => {
        const res = resp.data
        state.spinLoad = false
        state.acct = res.data
      })
    }

    const goback = () => {
      router.back()
    }

    return { goback, ...toRefs(state) }
  },
})
</script>
