<template>
  <div class="camera_outer">
    <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
    <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>

    <div v-if="imgSrc" class="img_bg_camera">
      <img :src="imgSrc" alt="" class="tx_img" />
    </div>
    <el-button @click="getCompetence()">选择推流页面</el-button>
    <el-button @click="stopNavigator()">停止推流</el-button>
    <el-button @click="upload()">录制停止后上传</el-button>
  </div>
</template>

<script>
import { uploadVideo } from '@/api/video'
import { mapState } from 'vuex'
export default {
  name: 'tuiliu',
  data() {
    return {
      videoWidth: 1040,
      videoHeight: 485,
      imgSrc: '',
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      videoForm: {
        title: '',
        type: '',
        desc: '',
      },
      img: '',
      video: '',
    }
  },
  computed: {
    ...mapState(['userId']),
  },
  methods: {
    async upload() {
      if (this.img && this.video) {
        let fd = new FormData()
        let form = this.videoForm
        for (let key in form) {
          fd.append(key, form[key])
        }
        fd.append('author', this.userId)
        fd.append('img', this.img.raw)
        fd.append('video', this.video.raw)
        let loading = this.$loading({
          text: '正在上传...',
          fullscreen: true,
          lock: true,
          background: 'rgba(255,255,255,.7)',
        })
        let result
        try {
          result = await uploadVideo(fd)
        } catch (e) {
          this.$message.success('网络出错')
          //return clear()
        }
        //clear()
        this.$message.success(result.msg)
      } else {
        this.$message.error('请完善图片和视频')
      }
    },
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop()
    },
    getCompetence() {
      let _this = this
      this.thisCancas = document.getElementById('canvasCamera')
      this.thisContext = this.thisCancas.getContext('2d')
      this.thisVideo = document.getElementById('videoCamera')
      // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {}
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // 首先获取现存的getUserMedia(如果存在)   navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
          var getUserMedia = navigator.getUserMedia
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }
      let constraints = { audio: false, video: { width: this.videoWidth, height: this.videoHeight, transform: 'scaleX(-1)' } }

      navigator.mediaDevices
        .getDisplayMedia(constraints)
        .then(function(stream) {
          // 旧的浏览器可能没有srcObject
          if ('srcObject' in _this.thisVideo) {
            _this.thisVideo.srcObject = stream
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream)
          }
          _this.thisVideo.onloadedmetadata = function(e) {
            _this.thisVideo.play()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  created() {},
}
</script>

<style scoped></style>
