<!--
 * @Description: 
 * @Author: Do not edit
 * @Date: 2020-11-30 08:40:53
 * @LastEditTime: 2020-12-12 00:07:20
 * @LastEditors: HongXuan.Lu
-->
<template>
  <div class="header" :class="type + 'bg'">
    <div class="left">
      <a @click="goTo('home')" class="hand">首页</a>
      <a @click="goTo('myArticle')" class="hand">我的博客</a>
      <a @click="goTo('game')" class="hand">游戏页面</a>
      <a @click="goTo('edit')" class="hand">博客编辑</a>
      <a @click="goTo('lifetree')" class="hand">树生活</a>
      <a @click="goTo('tasktree')" class="hand">任务树</a>
    </div>
    <div class="middle"></div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  props: ["type"],
  name: "Header",
  data() {
    return {};
  },
  methods: {
    goTo(type) {
      this.$router.push(type);
    },
  },
  created() {},
};
</script>

<style lang="scss" src="./header.scss" scoped></style>