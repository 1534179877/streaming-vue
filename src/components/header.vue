<!-- 顶部导航-->
<template>
  <el-menu :default-active="'/' + $route.path.split('/', 2)[1]" background-color="#fff" text-color="rgb(166,169,171)" active-text-color="#409eff" router>
    <el-row :align="'middle'" type="flex">
      <el-col :span="2">
        <el-menu-item index="/home">主页</el-menu-item>
      </el-col>
      <el-col :span="2">
        <el-menu-item index="/top">排行榜</el-menu-item>
      </el-col>
      <el-col :span="2">
        <el-menu-item index="/upload">上传</el-menu-item>
      </el-col>
      <el-col :span="6" :offset="2">
        <el-input v-model="keyWord" placeholder="输入关键字搜索"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="medium" @click="search">搜索</el-button>
      </el-col>
      <el-col :span="2" :offset="2" v-if="!userId">
        <el-menu-item index="/login">
          <span>登录</span>
        </el-menu-item>
      </el-col>
      <el-col :span="3" :offset="1" v-else>
        <el-row type="flex" align="middle" style="line-height: 100%">
          <el-col :span="10">
            <el-avatar :src="headUrl" icon="el-icon-user-solid" :size="48"></el-avatar>
          </el-col>
          <el-col :span="12" :offset="2">
            <el-menu-item @click="logout">
              <span>退出</span>
            </el-menu-item>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2">
        <el-menu-item index="/message">消息中心</el-menu-item>
      </el-col>
      <el-col :span="2">
        <el-menu-item index="/mine">个人中心</el-menu-item>
      </el-col>
      <el-col :span="2">
        <el-button @click="gotopay">充值</el-button>
      </el-col>
    </el-row>
  </el-menu>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { isLogin, logout, getUserHeadUrl } from '../api/user'
export default {
  data() {
    return {
      keyWord: '',
      headUrl: '',
    }
  },
  computed: {
    ...mapState(['userId']),
  },
  watch: {
    userId(newValue) {
      //登录获取头像
      if (newValue) {
        this.getHeadUrl()
      }
    },
  },
  methods: {
    ...mapActions(['setUserId']),
    async logout() {
      let result = await logout()
      this.setUserId('')
      this.headUrl = ''
      this.$message.success(result.msg)
      await this.$router.replace('/home')
    },
    search() {
      if (this.keyWord.trim() !== '') {
        this.$router.push({
          path: '/search',
          query: {
            keyWord: this.keyWord,
          },
        })
      } else {
        this.keyWord = ''
        this.$message.error('请输入内容！')
      }
    },
    //获取用户头像
    async getHeadUrl() {
      if (this.userId) {
        let result = await getUserHeadUrl(this.userId)
        this.headUrl = 'http://localhost:3000' + result.data.headUrl
      }
    },
    async init() {
      try {
        let result = await isLogin()
        if (result.err !== 0) {
          this.setUserId('')
        }
      } catch (e) {
        this.setUserId('')
      }
    },
    gotopay() {
      if (!this.userId) {
        return this.$message.error('先登录')
      }else{
        this.$emit('sendShow')
      }
    }
  },
  created() {
    this.init()
    this.getHeadUrl()
  },
}
</script>
<style lang="scss" scoped>
.el-menu {
  text-align: center;
  .el-row {
    margin: 0 3rem;
  }
}
</style>
