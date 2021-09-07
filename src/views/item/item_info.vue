<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>NFT管理</a-breadcrumb-item>
    <a-breadcrumb-item>NFT信息</a-breadcrumb-item>
  </a-breadcrumb>

  <div class="spin-load" v-show="spinLoad">
    <a-spin />
  </div>

  <div>
    <a-descriptions title="NFT信息" bordered>
      <a-descriptions-item label="NFTID">{{ item.item_id }}</a-descriptions-item>
      <a-descriptions-item label="资产类型">{{ item.asset_type }}</a-descriptions-item>
      <a-descriptions-item label="喜欢数">{{ item.likes || 0 }}</a-descriptions-item>

      <a-descriptions-item label="Token">{{ item.token }}</a-descriptions-item>
      <a-descriptions-item label="TokenId">{{ item.token_id }}</a-descriptions-item>
      <a-descriptions-item label="出售状态">
        <span v-if="item.saleable == 1" class="green">在售</span>
        <span v-else class="grey">下架</span>
      </a-descriptions-item>

      <a-descriptions-item label="供应量">{{ item.supply }}</a-descriptions-item>
      <a-descriptions-item label="在售量">{{ item.supply_sell }}</a-descriptions-item>
      <a-descriptions-item
        label="价格"
      >{{ item.price ? FFormatEther(item.price) : 0 }} {{ item.coin_name }}</a-descriptions-item>

      <a-descriptions-item label="Tx Hash" :span="2">{{ item.tx_id }}</a-descriptions-item>
      <a-descriptions-item label="发布时间">{{ item.create_time }}</a-descriptions-item>

      <a-descriptions-item label="推荐">
        <a-select v-model:value="item.top_type" style="width: 200px;">
          <a-select-option value="common">普通</a-select-option>
          <a-select-option value="home_top">首页推荐</a-select-option>
        </a-select>
      </a-descriptions-item>
      <a-descriptions-item label="推荐顺序">
        <a-input v-model:value="item.top_index" />
      </a-descriptions-item>
      <a-descriptions-item>&nbsp;</a-descriptions-item>
      <a-descriptions-item label="分类" :span="3">
        <a-checkbox-group v-model:value="cateChecked" :options="cateOptions" />
      </a-descriptions-item>
    </a-descriptions>

    <div class="btn-wrap">
      <a-button type="primary" :loading="is_loadtop" @click="apiTop">保存</a-button>
      <a-button
        type="primary"
        :disabled="item.saleable != 1"
        :loading="is_load"
        @click="api"
        class="btn-back"
      >下架</a-button>
      <a-button class="btn-back" @click="goback">返回</a-button>
    </div>

    <div class="hgt"></div>
    <ItemPropInfo :item_id="item_id" :loaded="false"></ItemPropInfo>

    <div class="hgt"></div>
    <UserInfo :user_id="user_id" @onLoaded="spinLoaded"></UserInfo>
  </div>
</template>

<script lang="ts">
import axios from '../../utils/axios'
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import utils from '../../utils'
import UserInfo from '../../components/UserInfo.vue'
import ItemPropInfo from '../../components/ItemPropInfo.vue'
import { FFormatEther } from '../../filters/index'

export default defineComponent({
  components: {
    UserInfo,
    ItemPropInfo,
  },
  setup: () => {
    const route = useRoute()
    const router = useRouter()

    let state = reactive({
      item_id: 0,
      user_id: 0,
      is_load: false,
      is_loadtop: false,
      spinLoad: true,
      item: {
        item_id: 0,
        asset_type: '',
        saleable: 1,
        likes: 0,
        token: '',
        token_id: 0,
        supply: 1,
        supply_sell: 0,
        price: '',
        coin_name: '',
        tx_id: '',
        create_time: '',
        top_type: 'common',
        top_index: 9999,
      },
      cateList: [],
      cateChecked: [],
      cateOptions: [],
    })

    onMounted(() => {
      state.item_id = Number(route.params.item_id as string)
      infoApi(state.item_id)
      apiCate()
    })

    const infoApi = (item_id: number) => {
      axios.get('/admin/item/info?item_id=' + String(item_id)).then((resp) => {
        const res = resp.data
        state.item = res.data
        state.user_id = res.data.user_id
      })
    }

    const api = () => {
      state.is_load = true
      axios
        .post(
          '/admin/item/unsell',
          utils.formData({
            item_id: state.item_id,
          }),
        )
        .then((resp) => {
          state.is_load = false
          const res = resp.data
          if (res.code == 200) {
            message.success(res.msg)
            state.item.saleable = 0
          }
        })
    }

    const apiTop = () => {
      let cateId = []
      for (let v in state.cateChecked) {
        for (let vv in state.cateList) {
          const item = state.cateList[vv]
          if (state.cateChecked[v] == item.cate_name) {
            cateId.push(item.cate_id)
          }
        }
      }

      state.is_loadtop = true
      axios
        .post(
          '/admin/item/top_type',
          utils.formData({
            item_id: state.item_id,
            top_type: state.item.top_type,
            top_index: state.item.top_index,
            cate: cateId,
          }),
        )
        .then((resp) => {
          state.is_loadtop = false
          const res = resp.data
          if (res.code == 200) {
            message.success(res.msg)
          }
        })
    }

    const apiCate = () => {
      axios.get('/admin/category/list?page=1&size=100', {}).then((resp) => {
        const res = resp.data
        state.cateList = res.list
        if (res.code == 200) {
          for (let k in res.list) {
            const item = res.list[k]
            if (item.cate_state == 1) {
              state.cateOptions.push(item.cate_name)
            }
          }
          apiCateRel()
        }
      })
    }

    const apiCateRel = () => {
      axios
        .get('/admin/item_cate/list?item_id=' + state.item_id, {})
        .then((resp) => {
          const res = resp.data
          if (res.code == 200) {
            for (let k in res.list) {
              const item = res.list[k]
              state.cateChecked.push(item.cate_name)
            }
          }
        })
    }

    const goback = () => {
      router.back()
    }

    const spinLoaded = () => {
      state.spinLoad = false
    }

    return { goback, api, apiTop, spinLoaded, FFormatEther, ...toRefs(state) }
  },
})
</script>
