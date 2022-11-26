<template>
  <div class="userInfo">
    <el-form label-width="80px" status-icon :model="user" :rules="rules" ref="userInfo">
      <el-form-item label="头像">
        <el-upload
          name="img"
          :action="'/upload/avatar' | urlFormat"
          :show-file-list="false"
          :on-success="success"
          :before-upload="beforeUpload"
          accept=".jpg,.jpeg,.png"
        >
          <el-avatar icon="el-icon-user-solid" :size="64" :src="headUrl" title="点击头像可上传"></el-avatar>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="nick">
        <el-input v-model="user.nick"></el-input>
      </el-form-item>
      <el-form-item label="签名" prop="sign">
        <el-input v-model="user.sign"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="user.sex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getUserById, updateUser } from '../../../api/user'
import { mapState } from 'vuex'
export default {
  name: 'setting',
  computed: {
    ...mapState(['userId']),
  },
  data() {
    return {
      user: {
        nick: '',
        headUrl: '',
        sign: '',
        sex: '',
      },
      headUrl: '',
      rules: {
        nick: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 14, message: '长度在 2 到 14 个字符', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submit() {
      this.$refs.userInfo.validate(async valid => {
        if (valid) {
          this.user._id = this.userId
          await updateUser(this.user)
          console.log(this.user)
          console.log(this.headUrl)
          this.$message.success('已保存')
          location.reload()
        } else {
          this.$message.error('修改错误项')
        }
      })
    },
    //上传前判断文件是否合法
    beforeUpload(file) {
      const teststr = RegExp('image/[j,p][p,n][e]*[g]')
      const isType = teststr.test(file.type)
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isType) {
        this.$message.error('格式只能是jpg/jpeg/png格式!')
        return false
      }
      if (!isLt1M) {
        this.$message.error('图片大小不能超过 1MB!')
        return false
      }
      return true
    },
    success(res) {
      console.log(res)
      this.headUrl = 'http://localhost:3000' + res.data
      this.user.headUrl = res.data
    },
    async init() {
      let result = await getUserById(this.userId)
      let user = result.data
      this.headUrl = 'http://localhost:3000' + user.headUrl
      this.user.nick = user.nick
      this.user.sex = user.sex
      this.user.sign = user.sign
    },
  },
  created() {
    this.init()
  },
}
</script>
<style lang="scss" scoped>
.userInfo {
  width: 70rem;
  margin: 3rem 30rem 0;
  padding: 4rem 15rem 4rem 2rem;
  border: 1px solid #d7dae2;
  border-radius: 8px;
}
</style>
