<template>
  <div>
    <van-nav-bar title="发布房源" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <van-cell title="房源信息" class="c4ac591" />
      <van-cell title="小区名称" value="请输入小区名称" is-link />
      <div class="zujin">
        <span>租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金</span>
        <input type="text" placeholder="请输入租金/月" />
        <span>¥ / 月</span>
      </div>
      <div class="zujin">
        <span>建筑面积</span>
        <input type="text" placeholder="请输入建筑面积" />
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;㎡</span>
      </div>
      <van-cell title="户型" value="请选择" is-link />
      <van-cell title="所在楼层" value="请选择" is-link />
      <van-cell class="borderNone" title="朝向" value="请选择" is-link />
      <div class="houseTitle">
        <p>房屋标题</p>
        <input
          type="text"
          placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
        />
        <p>房屋图像</p>
      </div>
      <div class="houseImg">
        <van-uploader :max-count="4" deletable />
      </div>
      <p class="configuration">房屋配置</p>
      <van-grid :column-num="5" :border="false">
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
      </van-grid>
    </van-cell-group>
  </div>
</template>

<script>
export default {
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
.van-cell {
  color: #969799;
}
.zujin {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88px;
  margin: 0 30px;
  border-bottom: 1px solid rgb(210, 210, 210);
  line-height: 88px;
  font-size: 28px;
  color: #969799;
  input {
    height: 80px;
    border: none;
  }
}
.houseTitle {
  margin: 0 30px;
  font-size: 28px;
  color: #333;
  p {
    padding: 30px 0 20px 0;
    margin: 0;
  }
  input {
    width: 100%;

    padding: 26px 0 20px;
    border: none;
    border-top: 1px solid #999;
  }
}
.houseImg {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  // width: 170px;
  height: 170px;
  margin: 0 30px;
  padding-top: 10px;
  transform: translateY(-15px);
  border-top: 1px solid #999;
}
/deep/.borderNone {
  border: none;
}
.c4ac591 {
  color: #4ac591;
  font-size: 30px;
}
</style>
