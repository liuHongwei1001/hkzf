<template>
  <div>
    <van-nav-bar
      title="城市列表"
      left-arrow
      @click-left="$router.back()"
      fixed
      z-index="2"
    />
    <van-index-bar :index-list="indexList" highlight-color="#4fc08d" sticky>
      <van-index-anchor index="#">当前城市</van-index-anchor>
      <van-cell :title="nowCity" />

      <van-index-anchor index="热">热门城市</van-index-anchor>
      <van-cell
        :title="item.label"
        v-for="(item, index) in hotCityList"
        :key="index"
        @click="$store.commit('setNowCity', item.label), $router.back()"
      />

      <span v-for="(item, index) in cityName" :key="index">
        <van-index-anchor :index="index"></van-index-anchor>
        <van-cell
          v-for="(item1, index1) in item"
          :key="index1"
          :title="item1.label"
          @click="$store.commit('setNowCity', item1.label), $router.back()"
        />
      </span>
    </van-index-bar>
  </div>
</template>

<script>
import { getCityList, getHotCityList } from '@/api/citylist'
import { mapState } from 'vuex'
export default {
  created () {
    this.getCityList()
    this.getHotCityList()
  },
  data () {
    return {
      indexList: ['#', '热'],
      cityList: [], // 城市列表
      cityName: {}, // 城市名字
      hotCityList: [], // 热门城市
      arr: [] // 处理后城市首字母
    }
  },
  methods: {
    async getCityList () {
      try {
        const res = await getCityList()
        // console.log(res)
        this.cityList = res.data.body
        this.cityList.forEach(item => {
          this.arr.push(item.short[0].toUpperCase())
        })
        this.arr = [...new Set(this.arr)].sort()
        this.indexList.push(...this.arr)
        this.arr.forEach(item => {
          const arr2 = this.cityList.filter(item2 => {
            return item2.short[0].toUpperCase() === item
          })
          this.cityName[item] = arr2
        })
        // console.log(this.cityName)
      } catch (err) {
        console.log(err)
      }
    },
    async getHotCityList () {
      try {
        const res = await getHotCityList()
        // console.log(res)
        this.hotCityList = res.data.body
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['nowCity'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-index-bar {
  margin-top: 92px;
}
/deep/.van-index-bar__index {
  color: #333;
  font-weight: 300;
}
</style>
