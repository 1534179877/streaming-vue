<template>
  <el-container>
    <!-- 头 -->
    <el-header height="10%" style="padding:0">
      <Header @sendShow="isshow = !isshow" />
    </el-header>
    <el-main>
      <!-- 路由占位符 主要部分 -->
      <!--  匹配完整路径 使其能跳转自身   -->
      <router-view></router-view>
    </el-main>
    <pay-card v-show="isshow" @cancelShow="isshow = !isshow"></pay-card>
  </el-container>
</template>
<script>
import Header from './components/header'
import payCard from '@/components/paycard'
export default {
  components: {
    Header,
    payCard,
  },
  data() {
    return {
      isshow: false,
    }
  },
  methods: {},
}
</script>
<style lang="scss">
.el-container {
  width: 100vw;
  min-height: 100%;
}
.el-main {
  width: 1440px;
  margin: 0 auto 50px;
  padding: 0;
}
/* 分页*/
.el-pagination {
  text-align: center;
}
.dplayer-danloading {
  display: none;
}
</style>
