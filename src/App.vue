<template>
  <template v-if="is_login">
    <a-layout>
      <a-layout-header class="header">
        <div class="logo">管理后台</div>
        <div class="head-rgt">
          <a-dropdown>
            <a class="ant-dropdown-link">
              我的账号
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu @click="acctMenu" v-if="is_login == true">
                <a-menu-item key="/account/info">账号信息</a-menu-item>
                <a-menu-item key="/account/password">修改密码</a-menu-item>
                <a-menu-item key="/logout">退出系统</a-menu-item>
              </a-menu>
              <a-menu v-else @click="acctMenu">
                <a-menu-item key="/login">现在登录</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            mode="inline"
            v-model:selectedKeys="selectedKeys2"
            v-model:openKeys="openKeys"
            :style="{ height: '100%', borderRight: 0 }"
            @click="menuClick"
          >
            <a-sub-menu key="workbench">
              <template #title>
                <span>
                  <user-outlined />
                  工作台
                </span>
              </template>
              <a-menu-item key="/">业务数量</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="nft">
              <template #title>
                <span>
                  <user-outlined />
                  NFT管理
                </span>
              </template>
              <a-menu-item key="/item/list">NFT列表</a-menu-item>
              <a-menu-item key="/item_owner/list">拥有者列表</a-menu-item>
              <a-menu-item key="/item_like/list">收藏列表</a-menu-item>
              <a-menu-item key="4">行为活动</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="biz">
              <template #title>
                <span>
                  <user-outlined />
                  交易管理
                </span>
              </template>
              <a-menu-item key="/mine/list">挖矿列表</a-menu-item>
              <a-menu-item key="/order/list">订单列表</a-menu-item>
              <a-menu-item key="/bids/list">竞拍列表</a-menu-item>
              <a-menu-item key="/whitelist/list">白名单列表</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="system">
              <template #title>
                <span>
                  <laptop-outlined />
                  系统管理
                </span>
              </template>
              <a-menu-item key="/system/account/list">系统账号</a-menu-item>
              <a-menu-item key="/category/list">分类管理</a-menu-item>
              <a-menu-item key="/collection/cont_list">合约列表</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="account">
              <template #title>
                <span>
                  <notification-outlined />
                  用户管理
                </span>
              </template>
              <a-menu-item key="/user/list">用户列表</a-menu-item>
              <a-menu-item key="/user_follow/list">关注列表</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout style="padding: 24px">
          <a-layout-content
            :style="{
              background: '#fff',
              padding: '0 24px 24px',
              margin: 0,
              minHeight: '280px',
            }"
          >
            <router-view />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </template>
  <template v-else>
    <router-view />
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import http from "./utils/axios";
import { message } from "ant-design-vue";
import { mapState, useStore } from "vuex";

export default defineComponent({
  computed: mapState(["is_login"]),
  setup() {
    const store = useStore();
    const router = useRouter();

    function menuClick(obj: any) {
      router.push({ path: obj.key });
    }

    function acctMenu(obj: any) {
      if (obj.key == "/logout") {
        http.post("/admin/logout", {}).then((resp) => {
          const res = resp.data;
          message.success(res.msg);
          store.commit("onlogout");
          router.push({ path: "/login" });
        });
      } else {
        router.push({ path: obj.key });
      }
    }

    return {
      menuClick,
      acctMenu,
      selectedKeys1: ref(["2"]),
      selectedKeys2: ref(["1"]),
      collapsed: ref(false),
      openKeys: ref(["sub1"]),
    };
  },
});
</script>
