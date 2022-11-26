<template>
  <div>
    <!-- 背景图 -->
    <div class="bg"></div>
    <div class="login">
      <img src="../../assets/img/11.png" />
      <div class="form">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
// 登录背景
.bg {
  position: fixed;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(125deg, #e7f4fd, #b6def9, #267ef9, #8b1df5, #db1df5,#e7f4fd);
  background-size: 400%;
  animation: bganimation 10s infinite;
  filter: blur(1px);
}
.login {
  position: absolute;
  left: 50%;
  backdrop-filter: blur(10px);
  top: 60%;
  transform: translate(-50%, -50%);
  width: 60rem;
  height: 45rem;
  border-radius: 30px;
  img {
    position: absolute;
    background-color: white;
    top: -12%;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: 2px 2px 3px black;
  }
}
.form {
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes bganimation {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
