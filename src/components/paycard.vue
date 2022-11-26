<template>
  <div class="pay-main-box">
    <div class="mask"></div>
    <div class="card">
      <div class="pay-content">
        <div class="store">
          <div class="tab-box">
            <div class="account">当前余额:{{ this.account }}</div>
          </div>
          <div class="select-box">
            <div class="content-pay">
              <div style="margin-bottom: 10px">
                <h1>支付</h1>
              </div>
              <div class="buy-gold-store">
                <dl>
                  <dt>购买数量:</dt>
                  <dd>
                    <el-form>
                      <el-form-item>
                        <el-radio-group v-model="payamount">
                          <el-radio-button label="1"></el-radio-button>
                          <el-radio-button label="200"></el-radio-button>
                          <el-radio-button label="300"></el-radio-button>
                          <el-radio-button label="1980"></el-radio-button>
                          <el-radio-button label="6480"></el-radio-button>
                          <el-radio-button label="19980"></el-radio-button>
                        </el-radio-group>
                        <el-input placeholder="请填写10的整数倍金额" v-model="payamount"></el-input>
                      </el-form-item>
                    </el-form>
                  </dd>
                  <dt>购买金额:</dt>
                  <dd>
                    <span class="amount-pay">{{ payamount }} 元</span>
                  </dd>
                  <dt>支付方式:</dt>
                  <dd>
                    <el-radio-group v-model="paytype">
                      <el-radio-button label="1">支付宝支付</el-radio-button>
                      <el-radio-button label="2">微信支付</el-radio-button>
                    </el-radio-group>
                  </dd>
                </dl>
                <div class='pay-card-btn'>
                  <el-button @click="gotopay" class="paybtn">支付</el-button>
                  <el-button @click="$emit('cancelShow')" class="paybtn">取消</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="close icon icon-close"></div>
  </div>
</template>

<script>
import { alipay } from '@/api/alipay'
import { mapState } from 'vuex'

export default {
  name: 'paycard',
  data() {
    return {
      payamount: 1,
      paytype: 1,
    }
  },
  computed: {
    ...mapState(['userId', 'account']),
  },
  methods: {
    gotopay() {
      const rand = Date.now() + parseInt(Math.random() * 999 + '')
      let data = {
        orderId: rand,
        userid: this.userId,
        amount: this.payamount,
        date: Date.now(),
      }
      alipay(data).then(res => {
        window.open(res.result)
      })
    },
  },
}
</script>

<style scoped lang="scss">
.pay-main-box {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  position: fixed;
  width: 100%;
  height: 100%;
  font-size: 13px;
  top: 0;
  left: 0;
  z-index: 9999;
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: rgba(0, 0, 0, 0.3);
  }
  .card {
    position: fixed;
    margin: 0;
    padding: 0;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 674px;
    .pay-content {
      overflow: hidden;
      margin: 0;
      padding: 0;
      background: #fff;
      border-radius: 8px;
      transition: height cubic-bezier(0.22, 0.58, 0.12, 0.98) 0.2s;
      .store {
        position: relative;
        overflow: hidden;
        margin: 0;
        padding: 0;
        background: #f7f8fa;
        border-radius: 0 0 8px 8px;
        .tab-box {
          vertical-align: top;
          display: inline-block;
          margin: 0;
          padding: 0;
          width: 120px;
          .account {
            margin-top: 10px;
          }
        }
        .select-box {
          vertical-align: top;
          display: inline-block;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          width: 554px;
          background: #fff;
          border-radius: 0 0 8px 0;
          .content-pay {
            margin: 0;
            padding: 20px 0 0 25px;
            .blander-box {
              margin: 0;
              padding: 0;
              width: 100%;
            }
            .buy-gold-store {
              dl {
                margin: 0;
                padding: 0;
                dt {
                  padding: 0;
                  color: #222;
                  width: 65px;
                  text-align: right;
                  display: inline-block;
                  vertical-align: top;
                  margin: 0 0 14px 0;
                  line-height: 26px;
                }
                dd {
                  margin: 0;
                  width: 464px;
                  display: inline-block;
                  box-sizing: border-box;
                  padding: 0 0 10px 8px;
                  .el-form {
                    .el-form-item {
                      .el-input {
                        list-style: none;
                        font-size: 100%;
                        margin-top: 5px;
                        overflow: visible;
                        position: relative;
                        width: 200px;
                        min-width: 60px;
                        border: none;
                        height: 34px;
                        line-height: 34px;

                        outline: none;
                        opacity: 1;
                      }
                    }
                  }

                  .amount-pay {
                    line-height: 1.15;
                    color: #faab4b;
                    font-size: 20px;
                    font-style: normal;
                    margin: 0 8px 0 0;
                  }
                }
              }
              .paybtn {
                margin-bottom: 10px;
                //margin-right: 50px;
              }
              .pay-card-btn{
                display: flex;
                justify-content: space-around;
              }
            }
          }
        }
      }
    }
  }
  .close {
    position: absolute;
    cursor: pointer;
    font-family: icon-font !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    margin: 0;
    padding: 0;
    right: -24px;
    top: -14px;
    color: #fff;
    line-height: 1;
    font-size: 16px;
    transition: all 0.3s cubic-bezier(0.22, 0.58, 0.12, 0.98);
  }
}
</style>
