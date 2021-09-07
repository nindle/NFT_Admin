<template>
  <a-table
    :dataSource="tbl_list"
    :columns="tbl_col"
    :pagination="tbl_page"
    :loading="tbl_load"
  />
</template>

<script lang="ts">
import axios from "axios";
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
} from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const tbl_col = [
      {
        title: "ID",
        dataIndex: "coll_id",
        key: "coll_id",
      },
      {
        title: "合约地址",
        dataIndex: "coll_address",
        key: "coll_address",
      },
      {
        title: "合约名称",
        dataIndex: "coll_title",
        key: "coll_title",
      },
    ];

    const data = reactive({
      tbl_load: true,
      tbl_list: [],
      tbl_page: {
        total: 1,
        current: 1,
        pageSize: 10,
      },
    });
    const datas = toRefs(data);

    const api = () => {
      axios
        .get("/admin/collection/list", {})
        .then((resp) => {
          const res = resp.data
          data.tbl_list = res.list;
          data.tbl_load = false;
          data.tbl_page.total = res.pager.total;
          data.tbl_page.current = res.pager.page;
          data.tbl_page.pageSize = res.pager.size;
        })
    };

    onMounted(() => {
      api();
    });

    return { tbl_col, ...datas };
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
