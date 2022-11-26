<template>
  <div>
    <!-- 轮播图 -->
    <div class="carousel">
      <el-carousel height="300px">
        <el-carousel-item
          v-for="item in lunbo"
          :key="item._id"
          :label="item.title"
          @click.native="goto(item._id)"
          :style="`background: url(http://localhost:3000${item.imgUrl}) no-repeat center/100%;cursor: pointer;`"
        ></el-carousel-item>
      </el-carousel>
    </div>
    <!-- 顶部分类 -->
    <div>
      <el-row type="flex" justify="space-around">
        <el-col :span="2" v-for="(type, index) in types" :key="index">
          <el-button size="medium " type="primary" @click="getPageByType(index)">{{ type.name }}</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 中间视频列表 -->
    <div class="middle">
      <!-- 标题 -->
      <div class="title">
        <span class="el-icon-video-camera-solid"></span>
        推荐
      </div>
      <!-- 视频列表 -->
      <VideoList :videos="videos" :showAuthor="true">
        <template v-slot:pagination>
          <el-pagination
            background
            :current-page="page"
            layout="prev, pager, next,total"
            :total="count"
            :page-size="8"
            @current-change="handleCurrent"
            hide-on-single-page
          ></el-pagination>
        </template>
      </VideoList>
    </div>
    <!-- 末尾直播 -->
    <div v-show="livesCount">
      <div class="title">
        <span class="el-icon-time"></span>
        直播
      </div>
      <LiveList :lives="lives">
        <template v-slot:pagination>
          <el-pagination
            background
            :current-page="livePage"
            layout="prev, pager, next,total"
            :total="livesCount"
            :page-size="1"
            @current-change="handLivePage"
            hide-on-single-page
          ></el-pagination>
        </template>
      </LiveList>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import VideoList from '@/components/videoList'
import LiveList from '@/components/liveList'
import { getVideoPage, recommend } from '../../api/video'
import { getOnLive } from '../../api/live'
export default {
  name: 'Home',
  components: { VideoList, LiveList },
  data() {
    return {
      livePage: 1,
      lives: [],
      livesCount: 0,
      type: '',
      types: [
        // 视频分类
        {
          name: '生活',
          btnType: 'primary',
        },
        {
          name: '音乐',
          btnType: 'success',
        },
        {
          name: '游戏',
          btnType: 'warning',
        },
        {
          name: '校园',
          btnType: 'danger',
        },
        {
          name: '教育',
          btnType: 'primary',
        },
        {
          name: '科技',
          btnType: 'success',
        },
        {
          name: '其他',
          btnType: 'danger',
        },
        {
          name: '重置',
          btnType: 'info',
        },
      ],
      lunbo: [],
      videos: [],
      page: 1,
      count: 0,
    }
  },
  computed: {},
  methods: {
    async handLivePage(page) {
      this.livePage = page
      let result = await getOnLive(page)
      this.lives = result.data.lives
      this.livesCount = result.data.count
    },
    goto(_id) {
      this.$router.push('/detail/' + _id)
    },
    async getPageByType(type) {
      if (type === 7) {
        this.type = ''
      } else {
        this.type = type
      }
      let result = await getVideoPage(1, this.type)
      this.videos = result.data.videos
      this.count = result.data.count
    },
    async handleCurrent(page) {
      this.livePage = page
      let result = await getVideoPage(page, this.type)
      this.videos = result.data.videos
      this.count = result.data.count
    },
    async init() {
      let result = await getVideoPage()
      this.videos = result.data.videos
      this.count = result.data.count
      result = await recommend()
      this.lunbo = result.data
      result = await getOnLive()
      this.lives = result.data.lives
      this.livesCount = result.data.count
    },
  },
  created() {
    this.init()
  },
}
</script>
<style lang="scss" scoped>
// 轮播图
.carousel {
  margin-bottom: 20px;
}
.title {
  width: 300px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  line-height: 50px;
  span {
    margin-right: 10px;
  }
}
</style>
