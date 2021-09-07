import axios from "axios";
import router from "../router/index";
import { message } from "ant-design-vue";

// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
// axios.defaults.baseURL = "https://api.lionnft.io/"
// 携带 cookie，对目前的项目没有什么作用，因为我们是 token 鉴权
axios.defaults.withCredentials = true;
// 请求头，headers 信息
axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
// axios.defaults.headers['token'] = localGet('token') || ''
// 默认 post 请求，使用 application/json 形式
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 请求拦截器
axios.interceptors.response.use((res) => {
  if (typeof res.data !== "object") {
    message.error("服务端异常！");
    return Promise.reject(res);
  }
  if (res.data.code != 200) {
    if (res.data.code == 500) {
      message.error(res.data.msg);
      return Promise.resolve(res);
    }
    if (res.data.code == 401) {
      localStorage.removeItem("is_login");
      router.push({ path: "/login" });
    }
    return Promise.resolve(res);
  }
  return Promise.resolve(res);
});

export default axios;
