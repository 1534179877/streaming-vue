<template>
  <div class="gift-bar">
    <div class="bar-choose">
      <el-radio-group v-model="giftNum">
        <el-radio-button :label="gift.giftId" v-for="gift in gifts" :key="gift.giftId">
          <template>
            <img :src="gift.giftimg" alt="" class='gif-img'/>
            <p>{{ gift.giftName }}</p>
          </template>
        </el-radio-button>
      </el-radio-group>
      <el-input placeholder="输入个数" v-model="giftamount" style="width: 100px ; margin-left: 30px"></el-input>
      <el-button @click="changehook">赠送</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { sendgift } from '@/api/alipay'
export default {
  name: 'giftbar',
  data() {
    return {
      giftNum: 2,
      gifts: [
        { giftId: 0, giftimg: require('../assets/img/floower.webp'), giftName: '鲜花', giftPrice: '100' },
        { giftId: 1, giftimg: require('../assets/img/good.webp'), giftName: '点赞', giftPrice: '200' },
        { giftId: 2, giftimg: require('../assets/img/box.webp'), giftName: '宝箱', giftPrice: '5' },
        { giftId: 3, giftimg: require('../assets/img/hb.webp'), giftName: '红包', giftPrice: '10' },
        { giftId: 4, giftimg: require('../assets/img/love.webp'), giftName: '告白花束', giftPrice: '520' },
        { giftId: 5, giftimg: require('../assets/img/call.webp'), giftName: '为你打call', giftPrice: '310' },
        { giftId: 6, giftimg: require('../assets/img/niu.webp'), giftName: '牛啊牛啊', giftPrice: '666' },

      ],
      giftamount: 0,
    }
  },
  props: {
    liverId: String,
  },
  computed: {
    pricetotal: {
      get: function() {
        return this.giftamount * this.gifts[this.giftNum].giftPrice
      },
    },
    ...mapState(['userId']),
  },
  methods: {
    changehook() {
      let data = {
        priceTotal: this.pricetotal,
        sendId: this.userId,
        getId: this.liverId,
      }
      sendgift(data).then(res => {
        if(res.err === 1){
          this.$message.error('支付失败!')
        } else {
          this.$message.success('支付成功!')
          this.$emit('sendgiftmeg',{ gift: this.gifts[this.giftNum].giftName, num: this.giftamount })

        }
      })
    },
  },
}
</script>

<style scoped lang="scss">
.gift-bar {
  position: relative;
  width: 100%;
  //background-color: red;
  margin-top: 20px;
  .bar-choose {
    position: absolute;
    right: 0;
    .gif-img{
      width: 40px;
      background-color: transparent;
    }
  }
}
</style>
