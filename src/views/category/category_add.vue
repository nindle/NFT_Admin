<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>分类管理</a-breadcrumb-item>
    <a-breadcrumb-item>分类添加</a-breadcrumb-item>
  </a-breadcrumb>

  <div>
    <a-form :label-col="{ span: 2 }" :wrapper-col="{ span: 10 }">
      <a-form-item label="分类名称">
        <a-input v-model:value="cate.cate_name" placeholder="请输入分类名称" />
      </a-form-item>
      <a-form-item label="分类排序">
        <a-input
          v-model:value="cate.cate_index"
          placeholder="请输入分类排序(由小到大显示)"
        />
      </a-form-item>
      <a-form-item label="状态">
        <a-select v-model:value="cate.cate_state">
          <a-select-option value="1">正常</a-select-option>
          <a-select-option value="0">禁用</a-select-option>
        </a-select>
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
      cate: {
        cate_name: '',
        cate_index: '',
        cate_state: '1',
      },
    })

    const api = () => {
      if (state.cate.cate_name == '') {
        message.error('分类名称不正确')
        return
      }
      if (state.cate.cate_index == '') {
        message.error('分类排序不正确')
        return
      }

      state.is_load = true
      axios
        .post(
          '/admin/category/add',
          utils.formData({
            name: state.cate.cate_name,
            index: state.cate.cate_index,
            state: state.cate.cate_state,
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
