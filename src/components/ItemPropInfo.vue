<template>
  <a-descriptions title="NFT属性" bordered>
    <a-descriptions-item label="NFTID">
      {{ prop.item_id }}
    </a-descriptions-item>
    <a-descriptions-item label="名称">
      {{ prop.prop_name }}
    </a-descriptions-item>
    <a-descriptions-item label="描述">
      {{ prop.prop_desc }}
    </a-descriptions-item>

    <a-descriptions-item label="链接" :span="3">
      {{ prop.prop_image }}
    </a-descriptions-item>
    <a-descriptions-item label="JSON" :span="3">
      {{ prop.prop_data }}
    </a-descriptions-item>
  </a-descriptions>
</template>

<script lang="ts">
import axios from "../utils/axios";
import { defineComponent, reactive, toRefs, watch } from "vue";

export default defineComponent({
  name: "ItemPropInfo",
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
      prop: {
        item_id: 0,
        prop_animation_url: "",
        prop_data: {},
        prop_desc: "",
        prop_id: 0,
        prop_image: "",
        prop_img_big: "",
        prop_img_preview: "",
        prop_name: "",
      },
    });

    const infoApi = (item_id: number) => {
      axios
        .get("/admin/item_prop/info?item_id=" + String(item_id))
        .then((resp) => {
          const res = resp.data;
          state.prop = res.data;
          if (props.loaded == true) {
            try {
              context.emit("onLoaded");
            } catch (e) {
              console.log(e);
            }
          }
        });
    };

    watch(props, (newProps, oldProps) => {
      if (props.item_id > 0) {
        infoApi(props.item_id);
      }
    });

    return { ...toRefs(state) };
  },
});
</script>
