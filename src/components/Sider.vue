<template>
  <div id="sider">
    <div class="logo" />
    <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
      <a-menu-item key="1">
        <a-icon type="pie-chart" />
        <span>首页</span>
      </a-menu-item>

      <a-sub-menu key="sub1">
        <span slot="title"
          ><a-icon type="userManagement" /><span>角色管理</span></span
        >
        <a-menu-item key="2"> 创建角色 </a-menu-item>
        <a-menu-item key="3"> 编辑角色 </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub1">
        <span slot="title"
          ><a-icon type="userManagement" /><span>用户管理</span></span
        >
        <a-menu-item key="2"> 创建用户 </a-menu-item>
        <a-menu-item key="3"> 编辑用户 </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub2">
        <span slot="title"
          ><a-icon type="studentManagement" /><span>学生管理</span></span
        >
        <a-menu-item key="4"> 创建学生 </a-menu-item>
        <a-menu-item key="5"> 编辑学生 </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub3">
        <span slot="title"
          ><a-icon type="teacherManagement" /><span>教师管理</span></span
        >
        <a-menu-item key="4"> 创建教师 </a-menu-item>
        <a-menu-item key="5"> 编辑教师 </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub4">
        <span slot="title"
          ><a-icon type="subjectManagement" /><span>课程管理</span></span
        >
        <a-menu-item key="4"> 添加课程 </a-menu-item>
        <a-menu-item key="5"> 课程设置 </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub5">
        <span slot="title"
          ><a-icon type="subjectManagement" /><span>数据字典</span></span
        >
        <a-menu-item key="4"> 创建字典 </a-menu-item>
        <a-menu-item key="5"> 设置字典 </a-menu-item>
        <a-menu-item key="4"> 创建条目 </a-menu-item>
        <a-menu-item key="5"> 设置条目 </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub6">
        <span slot="title"
          ><a-icon type="subjectManagement" /><span>学校设置</span></span
        >
        <a-menu-item key="4"> 创建专业 </a-menu-item>
        <a-menu-item key="5"> 设置专业 </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub7">
        <span slot="title"
          ><a-icon type="subjectManagement" /><span>签到设置</span></span
        >
        <a-menu-item key="4"> 创建学习行为 </a-menu-item>
        <a-menu-item key="5"> 编辑学习行为</a-menu-item>
        <a-menu-item key="5"> 出勤配置 </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: "Sider",
};
</script>