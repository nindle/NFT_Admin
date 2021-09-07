<template>
  <a-descriptions title="NFT信息" bordered>
    <a-descriptions-item label="NFTID">
      {{ item.item_id }}
    </a-descriptions-item>
    <a-descriptions-item label="资产类型">
      {{ item.asset_type }}
    </a-descriptions-item>
    <a-descriptions-item label="喜欢数">
      {{ item.likes || 0 }}
    </a-descriptions-item>

    <a-descriptions-item label="Token">
      {{ item.token }}
    </a-descriptions-item>
    <a-descriptions-item label="TokenId">
      {{ item.token_id }}
    </a-descriptions-item>
    <a-descriptions-item label="出售状态">
      <span v-if="item.saleable == 1" class="green">在售</span>
      <span v-else class="grey">下架</span>
    </a-descriptions-item>

    <a-descriptions-item label="供应量">
      {{ item.supply }}
    </a-descriptions-item>
    <a-descriptions-item label="在售量">
      {{ item.supply_sell }}
    </a-descriptions-item>
    <a-descriptions-item label="价格">
      {{ item.price ? FFormatEther(item.price) : 0 }} {{ item.coin_name }}
    </a-descriptions-item>

    <a-descriptions-item label="Tx Hash" :span="2">
      {{ item.tx_id }}
    </a-descriptions-item>
    <a-descriptions-item label="发布时间">
      {{ item.create_time }}
    </a-descriptions-item>
  </a-descriptions>
</template>

<script lang="ts">
import axios from '../utils/axios'
import { defineComponent, reactive, toRefs, watch } from 'vue'
import { FFormatEther } from '../filters/index'

export default defineComponent({
  name: 'ItemInfo',
  props: {
    item_id: {
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
      },
    })

    const infoApi = (item_id: number) => {
      axios.get('/admin/item/info?item_id=' + String(item_id)).then((resp) => {
        const res = resp.data
        state.item = res.data
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
      if (props.item_id > 0) {
        infoApi(props.item_id)
      }
    })

    return { FFormatEther, ...toRefs(state) }
  },
})
</script>
