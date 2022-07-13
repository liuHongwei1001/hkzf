<template>
  <div>
    <div class="login" v-if="user && user.token">
      <div class="container">
        <div class="My_myIcon__3cKIV">
          <van-image src="http://liufusong.top:8080/img/profile/avatar.png" />
        </div>
        <p>好客</p>
        <van-button round type="info" @click="logoutFn">退出</van-button>
        <div class="info">编辑个人资料 ></div>
      </div>
    </div>
    <div class="notlogin" v-else>
      <div class="img"></div>
      <div class="container">
        <div class="My_myIcon__3cKIV">
          <van-image src="http://liufusong.top:8080/img/profile/avatar.png" />
        </div>
        <p>游客</p>
        <van-button round type="info" to="/login">去登录</van-button>
      </div>
    </div>
    <van-grid :column-num="3">
      <van-grid-item
        to="/login"
        icon="photo-o"
        text="我的收藏"
        border="false"
      />
      <van-grid-item to="/login" icon="photo-o" text="我的出租" />
      <van-grid-item icon="photo-o" text="看房记录" />
      <van-grid-item icon="photo-o" text="成为房主" />
      <van-grid-item icon="photo-o" text="个人资料" />
      <van-grid-item icon="photo-o" text="联系我们" />
    </van-grid>
    <div class="img-profile">
      <van-image src="http://liufusong.top:8080/img/profile/join.png" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created () {
  },
  data () {
    return {}
  },
  methods: {
    async logoutFn () {
      await this.$dialog.confirm({ message: '确认退出吗' })
      this.$store.commit('setUser', {})
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login {
  position: relative;
  height: 750px;
  background: url(http://liufusong.top:8080/img/avatar.png);
  background-size: cover;
  .container {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 85%;
    height: 55%;
    background: #fff;
    padding: 0 20px;
    box-shadow: 0 0 10px 7px #ddd;
    text-align: center;
    font-size: 14px;
    .My_myIcon__3cKIV {
      position: relative;
      width: 120px;
      height: 120px;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 5px solid #f5f5f5;
      box-shadow: 0 0 10px 3px #ececec;
    }
    .van-button {
      height: unset;
      width: 100px;
      border-radius: 30px;
      color: #fff;
      padding: 2px 15px;
      background: #21b97a;
      font-size: 12px;
    }
    p {
      margin-top: -30px;
      color: #999;
      font-size: 12px;
    }
    .info {
      margin: 40px 0;
    }
  }
}
.notlogin {
  position: relative;
  height: 600px;
  .img {
    height: 380px;
    background: url(http://liufusong.top:8080/img/profile/bg.png);
    background-size: cover;
  }
  .container {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 85%;
    height: 55%;
    background: #fff;
    padding: 0 20px;
    box-shadow: 0 0 10px 7px #ddd;
    text-align: center;
    font-size: 14px;
    .My_myIcon__3cKIV {
      position: relative;
      width: 120px;
      height: 120px;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 5px solid #f5f5f5;
      box-shadow: 0 0 10px 3px #ddd;
    }
    .van-button {
      height: 60px;
      width: 135px;
      border-radius: 10px;
      color: #fff;
      padding: 2px 15px;
      background: #21b97a;
      font-size: 24;
    }
    p {
      margin-top: -30px;
      margin-bottom: 40px;
      font-size: 12px;
    }
  }
}
.van-grid {
  margin-top: 50px;
}
.img-profile {
  padding: 0 40px;
}
</style>
