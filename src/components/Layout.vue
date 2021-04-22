<template>
  <div id="layout">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <Sider/>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <div
            :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
          >
            <Main/>
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Sider from "../components/Sider.vue";
import Main from "../views/Main.vue";
export default {
  name: "Layout",
  components: {
    Sider,
    Main,
  },
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

#components-layout-demo-side .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-side .trigger:hover {
  color: #1890ff;
}
</style>
