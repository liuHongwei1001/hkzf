<template>
  <div>
    <van-nav-bar title="账号登录" left-arrow @click-left="$router.go(-1)" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.username"
        placeholder="请输入账号"
        name="username"
      />
      <van-field
        v-model="user.password"
        type="password"
        placeholder="请输入密码"
        name="password"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getLoginAPI } from '@/api/user'

export default {
  created () { },
  data () {
    return {
      user: {
        username: 'test12',
        password: 'test12'
      }
    }
  },
  methods: {
    async onSubmit (values) {
      if (this.user.username.trim().length === 0 || this.user.password.trim().length === 0) {
        return this.$toast('用户名和密码不能为空')
      } else if (this.user.username.trim().length < 5 || this.user.username.trim().length > 8) {
        return this.$toast('用户名格式5-8位字母和数字')
      } else if (this.user.password.trim().length < 6 || this.user.password.trim().length > 12) {
        return this.$toast('密码格式5-8位字母和数字')
      }
      try {
        const res = await getLoginAPI(this.user)
        this.$store.commit('setUser', res.data.body)
        console.log(res)
        if (res.status === 200) {
          this.$toast.success('登录成功')
          this.$router.push({ name: 'my' })
        } else if (res.data.status === 400) {
          return this.$toast('用户名或密码错误')
        }
      } catch (err) {

      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-field {
  height: 120px;
  line-height: 120px;
  width: 100%;
  padding-top: 4px;
  padding-left: 36px;
  border: 0;
  color: #000;
  font-size: 34px;
}

.van-button {
  height: 100px;
  line-height: 100px;
  background-color: #4ac591;
  border: 2px solid #4ac591;
  border-radius: 4px;
  font-size: 36px;
}
</style>
