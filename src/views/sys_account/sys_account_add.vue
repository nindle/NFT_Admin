<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>系统账号管理</a-breadcrumb-item>
    <a-breadcrumb-item>系统账号添加</a-breadcrumb-item>
  </a-breadcrumb>

  <div>
    <a-form :label-col="{ span: 2 }" :wrapper-col="{ span: 6 }">
      <a-form-item label="账号">
        <a-input v-model:value="acct.account" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item label="昵称">
        <a-input v-model:value="acct.nickname" placeholder="请输入昵称" />
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input v-model:value="acct.email" placeholder="请输入邮箱" />
      </a-form-item>
      <a-form-item label="密码">
        <a-input v-model:value="acct.passwd" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 2 }">
        <a-button type="primary" :loading="is_load" @click="api">确定</a-button>
        <a-button class="btn-back" @click="goback">返回</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import axios from '../../utils/axios'
import utils from '../../utils/index'
import { defineComponent, reactive, toRefs } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup: () => {
    const router = useRouter()

    let state = reactive({
      is_load: false,
      acct: {
        account: '',
        avatar: '',
        create_at: '',
        email: '',
        nickname: '',
        passwd: '',
      },
    })

    const api = () => {
      if (state.acct.account == '') {
        message.error('账号不正确')
        return
      }
      if (state.acct.nickname == '') {
        message.error('昵称不正确')
        return
      }
      if (state.acct.email == '') {
        message.error('邮箱不正确')
        return
      }

      state.is_load = true
      axios
        .post(
          '/admin/sys_account/add',
          utils.formData({
            account: state.acct.account,
            nickname: state.acct.nickname,
            email: state.acct.email,
            passwd: state.acct.passwd,
          }),
        )
        .then((resp) => {
          state.is_load = false
          const res = resp.data
          if (res.code == 200) {
            message.success(res.msg)
          }
        })
    }

    const goback = () => {
      router.back()
    }

    return { api, goback, ...toRefs(state) }
  },
})
</script>
