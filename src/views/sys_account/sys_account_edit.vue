<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>系统账号管理</a-breadcrumb-item>
    <a-breadcrumb-item>系统账号编辑</a-breadcrumb-item>
  </a-breadcrumb>

  <div class="spin-load" v-show="spinLoad">
    <a-spin />
  </div>
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
        <a-input
          v-model:value="acct.passwd"
          placeholder="请输入密码（为空不修改）"
        />
      </a-form-item>
      <a-form-item label="状态">
        <a-select v-model:value="acct.acct_state">
          <a-select-option value="enable">
            启用
          </a-select-option>
          <a-select-option value="disable">
            禁用
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="创建时间">
        <a-input
          disabled="disabled"
          v-model:value="acct.create_at"
          placeholder="创建时间"
        />
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
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup: () => {
    let acct_id = 0
    const route = useRoute()
    const router = useRouter()

    let state = reactive({
      is_load: false,
      spinLoad: true,
      acct: {
        account: '',
        avatar: '',
        create_at: '',
        email: '',
        nickname: '',
        acct_state: 'enable',
        passwd: '',
      },
    })

    onMounted(() => {
      acct_id = Number(route.params.acct_id as string)
      infoApi(acct_id)
    })

    const infoApi = (acct_id: number) => {
      axios
        .get('/admin/sys_account/info?acct_id=' + String(acct_id))
        .then((resp) => {
          const res = resp.data
          state.spinLoad = false
          state.acct = res.data
          state.acct.passwd = ''
        })
    }

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
          '/admin/sys_account/edit',
          utils.formData({
            acct_id: acct_id,
            account: state.acct.account,
            nickname: state.acct.nickname,
            email: state.acct.email,
            state: state.acct.acct_state,
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
