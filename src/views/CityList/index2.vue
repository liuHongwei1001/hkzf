<template>
  <div>
    <van-nav-bar
      fixed
      title="城市列表"
      left-arrow
      @click-left="$router.back()"
    />
    <van-index-bar :index-list="indexList">
      <template v-for="(value, key) in cityName">
        <van-index-anchor :key="key" :index="key" />
        <span class="span" :key="key + 'a'">{{
          key === "#" ? "当前城市" : key === "热" ? "热门城市" : key
        }}</span>
        <van-cell
          v-for="(citem, cindex) in value"
          :key="cindex + key"
          :title="citem.name"
          @click="getDetail(citem)"
        ></van-cell>
      </template>
    </van-index-bar>
  </div>
</template>

<script>
import { getCityHot, getCityList, getCityData } from '@/api/city'

const pinyin = require('js-pinyin')
pinyin.setOptions({ checkPolyphone: false, charCase: 0 })
export default {
  created () {
    this.getCityList()
    this.getCityHot()
  },
  data () {
    return {
      indexList: [
        '#',
        '热',
        'A',
        'B',
        'C',
        'D',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'M',
        'N',
        'Q',
        'S',
        'T',
        'W',
        'X',
        'Y',
        'Z'
      ],
      hot: [],
      cityList: [],
      cityName: {},
      nowName: '',
      nowId: ''
    }
  },
  mounted () {
    this.nowName = this.$route.query.name
    this.nowId = this.$route.query.id
  },
  methods: {
    async getCityHot () {
      const res = await getCityHot()
      this.hot = res.data.body
      // console.log(this.hot)
    },
    async getCityList () {
      const res1 = await getCityList()
      const list = res1.data.body
      // console.log(list)

      list.forEach((item) => {
        this.cityList.push(item)
      })
      const cityName = {}

      this.indexList.forEach((item) => {
        cityName[item] = []
        if (item === '#') {
          cityName[item].push({
            name: this.nowName,
            id: this.nowId
          })
        } else if (item === '热') {
          const hotName = []
          this.hot.forEach((itm, index) => {
            hotName.push({
              name: itm.label,
              id: itm.value
            })
          })
          cityName[item] = hotName
        } else {
          this.cityList.forEach((el) => {
            const first = pinyin.getFullChars(el.label).substring(0, 1)
            if (first === item) {
              cityName[item].push({
                name: el.label,
                id: el.value
              })
            }
          })
        }
      })
      this.cityName = cityName
      // console.log(this.cityName)
    },
    // 获取每条信息
    async getDetail (val) {
      try {
        // console.log(val)
        const data = await getCityData(val.id)
        console.log(data)
        if (data.length === 0) {
          this.$toast('暂无房源')
        } else {
          this.$router.push({
            path: '/home',
            query: { name: val.name }

          })
        }
      } catch (err) {
        console.log(err)
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
.van-index-bar {
  position: absolute;
  top: 70px;
  font-size: 14px;
  .span {
    margin-left: 15px;
    color: #999;
  }
}

/deep/.van-index-anchor {
  display: none;
  // margin-bottom: 20px;
}
/deep/.van-index-bar__index {
  font-size: 14px;

  padding-top: 10px;
}
</style>
