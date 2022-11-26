<template>
  <div class="attentionList" v-show="attentions.length">
    <el-row v-for="attention in attentions" :key="attention._id" type="flex" align="middle">
      <el-col :span="1">
        <router-link :to="`/user/${attention._id}`">
          <el-avatar icon="el-icon-user-solid" :size="64" :src="attention.headUrl | urlFormat"></el-avatar>
        </router-link>
      </el-col>
      <el-col :span="18" :offset="1">
        <router-link to="/home">
          <b class="nick">{{ attention.nick }}</b>
        </router-link>
        <p>{{ attention.sign }}</p>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-button size="small" type="danger" @click="cancel(attention._id)">取消关注</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getAttentionUser, toggleAtt } from '../../../api/user'
import { mapState } from 'vuex'
//import { deleteVideoById } from '../../../api/video'
export default {
  name: 'myAttention',
  computed: {
    ...mapState(['userId']),
  },
  data() {
    return {
      attentions: [],
    }
  },
  methods: {
    cancel(user) {
      this.$confirm('确定要取消吗?', '提示').then(async () => {
        await toggleAtt({ _id: this.userId, user })
        this.init()
        this.$message.success('取消关注')
      })
    },
    async init() {
      let result = await getAttentionUser(this.userId)
      this.attentions = result.data
    },
  },
  created() {
    this.init()
  },
}
</script>
<style lang="scss" scoped>
.attentionList {
  width: 112rem;
  margin: 3rem auto 0;
  border: 1px solid #d7dae2;
  border-radius: 0.5rem;
  .el-row {
    padding: 2rem;
    border-bottom: 1px solid #eeeeee;
    .nick {
      font-size: 16px;
    }
    .el-col > p:nth-child(2) {
      color: #6d757a;
      margin-top: 1rem;
      font-size: 1.2rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
