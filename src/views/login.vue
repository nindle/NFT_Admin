<template>
  <div class="login-wrap">
    <div class="login-form">
      <h2 class="login-head">管理后台</h2>
      <a-form-item label="账号">
        <a-input
          v-model:value="account"
          class="ipt_txt"
          placeholder="请输入账号"
        />
      </a-form-item>
      <a-form-item label="密码">
        <a-input
          type="password"
          v-model:value="passwd"
          class="ipt_txt"
          placeholder="请输入密码"
        />
      </a-form-item>
      <div class="login-ac">
        <a-button type="primary" :loading="is_load" @click="api">登录</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "../utils/axios";
import utils from "../utils/index";
import { useRouter } from "vue-router";
import { defineComponent, reactive, toRefs } from "vue";
import { message } from "ant-design-vue";
import { useStore } from "vuex";

export default defineComponent({
  setup: () => {
    const store = useStore();
    const router = useRouter();

    let state = reactive({
      account: "",
      passwd: "",
      is_load: false,
    });

    const api = () => {
      state.is_load = true;

      axios
        .post(
          "/admin/login",
          utils.formData({ account: state.account, passwd: state.passwd })
        )
        .then((resp) => {
          state.is_load = false;
          const res = resp.data;
          if (res.code == 200) {
            message.success(res.msg);
            store.commit("onlogin");
            router.push({ path: "/" });
          }
        });
    };

    return { api, ...toRefs(state) };
  },
});
</script>
