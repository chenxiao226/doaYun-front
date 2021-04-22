<template>
  <div id="main">
    <h3 id="mian_title">到云后台管理系统</h3>
    <a-button type="primary" @click="logout">登出</a-button>
  </div>
</template>

<script>
import { logOut } from "../api/main";
export default {
  name: "Main",
  methods: {
    logout() {
      logOut().then((res) => {
        console.log(res);
        if (res.code === 0) {
        } else {
          //提示错误信息
          this.$notification.open({
            message: "错误",
            description: "登出失败！",
            style: {
              width: "600px",
              marginLeft: `${335 - 600}px`,
            },
          });
        }
      });
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.main_title {
  text-align: center;
  text-decoration-line: initial;
}
</style>
