<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>我的账号</a-breadcrumb-item>
    <a-breadcrumb-item>修改密码</a-breadcrumb-item>
  </a-breadcrumb>

  <div>
    <a-form :label-col="{ span: 2 }">
      <a-form-item label="原密码">
        <a-input v-model:value="passwd_old" placeholder="请输入原密码" />
      </a-form-item>
      <a-form-item label="新密码">
        <a-input v-model:value="passwd" placeholder="请输入新密码" />
      </a-form-item>
      <a-form-item label="确认密码">
        <a-input v-model:value="passwd_true" placeholder="请输入确认密码" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 2 }">
        <a-button type="primary" :loading="is_load" @click="api">确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import http from '../utils/axios'
import utils from '../utils/index'
import { defineComponent, ref } from 'vue'
import { message } from 'ant-design-vue'

export default defineComponent({
  setup: () => {
    const passwd_old = ref('')
    const passwd = ref('')
    const passwd_true = ref('')
    const is_load = ref(false)

    const api = () => {
      if (passwd_old.value == '' || passwd_old.value.length < 6) {
        message.error('原密码不正确')
        return
      }
      if (passwd.value == '' || passwd.value.length < 6) {
        message.error('新密码不正确')
        return
      }
      if (passwd_true.value == '' || passwd_true.value.length < 6) {
        message.error('确认密码不正确')
        return
      }
      if (passwd.value != passwd_true.value) {
        message.error('二次密码不一致')
        return
      }

      is_load.value = true
      http
        .post(
          '/admin/sys_account/passwd',
          utils.formData({
            passwd: passwd.value,
            passwd_old: passwd_old.value,
          }),
        )
        .then((resp) => {
          is_load.value = false
          const res = resp.data
          if (res.code == 200) {
            message.success(res.msg)
          }
        })
    }

    return { api, passwd, passwd_old, passwd_true, is_load }
  },
})
</script>
