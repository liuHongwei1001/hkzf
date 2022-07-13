<template>
  <div>
    <div class="wrapper">
      <!-- <van-image
        block
        width="106"
        height="80"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      /> -->
      <img :src="'http://liufusong.top:8080' + item.houseImg" alt="" />
      <div class="right">
        <h3 class="title">{{ item.title }}</h3>
        <p class="title1">
          <span>{{ item.desc }}</span>
        </p>
        <p class="title2">{{ item.tags[0] }}</p>
        <p class="title3"><span>1111</span>元/月</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.wrapper {
  // display: flex;
  width: 690px;
  height: 240;
  border-bottom: 2px solid #e5e5e5;
  margin-left: 30px;
  // justify-content: space-between;a
  img {
    display: inline-block;
    width: 212px;
    height: 160px;
    margin-top: 36px;
    vertical-align: top;
  }
  .right {
    width: 452px;
    display: inline-block;
    padding: 36px 0 0;
    margin-left: 24px;
    .title {
      margin: 0;
      padding: 0;
      font-size: 30px;
      color: #394043;
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .title1 {
      margin: 0;
      padding: 0;
      font-size: 24px;
      color: #afb2b3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }
    .title2 {
      margin: 0;
      padding: 0;
      font-size: 23px;
      background-color: #e1f5f8;
      color: #39becd;
      border-radius: 6px;
      width: 92px;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
    .title3 {
      font-size: 24px;
      color: #fa5741;
      span {
        font-size: 32px;
      }
    }
  }
}
</style>
