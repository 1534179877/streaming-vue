<template>
  <h1>商品支付成功！！！</h1>
</template>

<script>
import { checkpay } from '@/api/alipay'
import { mapState } from 'vuex'

export default {
  name: 'alipay',
  methods: {
    ...mapState(['userId']),
  },
  created() {
    let data = {
      out_trade_no: this.$route.query.out_trade_no,
      trade_no: this.$route.query.trade_no,
      userId: this.userId,
    }
    checkpay(data).then(res => {
      console.log(res)
    })
  },
}
</script>

<style scoped></style>
