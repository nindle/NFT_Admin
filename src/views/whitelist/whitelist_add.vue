<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>白名单管理</a-breadcrumb-item>
    <a-breadcrumb-item>白名单添加</a-breadcrumb-item>
  </a-breadcrumb>

  <div>
    <a-form :label-col="{ span: 2 }" :wrapper-col="{ span: 10 }">
      <a-form-item label="合约地址">
        <a-select v-model:value="white.contract_address">
          <a-select-option :value="cont1155">
            1155合约 / {{ cont1155 }}
          </a-select-option>
          <a-select-option :value="cont721">
            721合约 / {{ cont721 }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="钱包地址">
        <a-input
          v-model:value="white.white_address"
          placeholder="请输入钱包地址"
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
import { defineComponent, reactive, toRefs } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup: () => {
    const isProd = import.meta.env.PROD;
    const cont1155 = isProd ? "0x10cab0D6aA8A236cddF0249DD602EEF52E7e6630" : "0xE9285F4Bd13D86Fe4f4b019C6b54cc3f8c6f858C";
    const cont721 = isProd ? "0x4769e82BaC4e7550D9311956fFb945f9eAB66E65" : "0x3f1f2Eff3A7EF3890b1b91cf1b13e72899Bb1A38";

    const router = useRouter()

    let state = reactive({
      is_load: false,
      white: {
        contract_address: cont1155,
        white_address: '',
      },
    })

    const api = () => {
      if (state.white.contract_address == '') {
        message.error('合约地址不正确')
        return
      }
      if (state.white.white_address == '') {
        message.error('钱包地址不正确')
        return
      }

      state.is_load = true
      axios
        .get(
          '/admin/whitelist/add?address=' +
            state.white.white_address +
            '&contract=' +
            state.white.contract_address,
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

    return { api, goback, cont1155, cont721, ...toRefs(state) }
  },
})
</script>
