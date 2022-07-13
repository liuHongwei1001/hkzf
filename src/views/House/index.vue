<template>
  <div>
    <div class="van-nav-bar">
      <div class="left">
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </div>
      <div class="right">
        <div class="city">
          <div class="location">
            <span @click="$router.push({ name: 'citylist' })">{{
              nowCity
            }}</span>
            <van-icon name="play" class="icon-play" />
          </div>
          <div class="search">
            <van-icon name="search" class="icon-search" />
            <span>请输入小区或地址</span>
          </div>
        </div>
        <div class="qwe">
          <van-icon name="guide-o" @click="$router.push({ name: 'mapfind' })" />
        </div>
      </div>
    </div>
    <!-- 筛选条件 -->
    <div class="filterCriteria">
      <van-dropdown-menu>
        <van-dropdown-item title="区域">
          <van-picker
            show-toolbar
            :columns="houseCondition"
            toolbar-position="bottom"
            :loading="loading"
            @confirm="onConfirm"
          />
        </van-dropdown-item>
        <van-dropdown-item title="方式">
          <van-picker
            show-toolbar
            :columns="rentType"
            toolbar-position="bottom"
          />
        </van-dropdown-item>
        <van-dropdown-item title="租金">
          <van-picker show-toolbar :columns="Price" toolbar-position="bottom" />
        </van-dropdown-item>
      </van-dropdown-menu>
      <van-cell @click="showPopup"
        >筛选
        <van-icon name="play" />
      </van-cell>
    </div>
    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '78.5%' }"
    >
      <dl>
        <dt>户型</dt>
        <dd>
          <span v-for="(item, index) in roomType" :key="index">{{ item }}</span>
        </dd>
      </dl>
      <dl>
        <dt>朝向</dt>
        <dd>
          <span v-for="(item, index) in oriented" :key="index">{{ item }}</span>
        </dd>
      </dl>
      <dl>
        <dt>楼层</dt>
        <dd>
          <span v-for="(item, index) in floor" :key="index">{{ item }}</span>
        </dd>
      </dl>
      <dl>
        <dt>房屋亮点</dt>
        <dd>
          <span v-for="(item, index) in characteristic" :key="index">{{
            item
          }}</span>
        </dd>
      </dl>
      <div class="ppbtn">
        <van-button type="default" class="default">取消</van-button>
        <van-button type="primary" class="primary">确认</van-button>
      </div>
    </van-popup>
    <!-- 数据盒子 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <FindHouseCell
        v-for="(item, index) in houseList"
        :key="index"
        :item="item"
      ></FindHouseCell>
    </van-list>
  </div>
</template>

<script>
import FindHouseCell from './componets/FindHouseCell.vue'
import { mapState } from 'vuex'
import { getHouseCondition, getAreaInfo, getHouseData } from '@/api/house'
export default {
  created () {
    this.getCityId()
  },
  data () {
    return {
      cityID: '',
      houseCondition: [], // 区域
      rentType: [], // 方式
      Price: [], // 租金
      roomType: [], // 户型
      oriented: [], // 朝向
      floor: [], // 楼层
      characteristic: [], // 房屋亮点
      houseList: [], // 房屋信息
      loading: false,
      show: false,
      // eslint-disable-next-line no-dupe-keys, vue/no-dupe-keys
      loading: false,
      finished: false,
      data: { // 房屋筛选条件
        cityId: '',
        stat: 1,
        end: 120,
        area: '',
        rentType: null,
        price: 'PRICE|1000',
        more: ''
      }
    }
  },
  methods: {
    onConfirm (value, index) {
      console.log(value)
      console.log(index)
      this.getHouseData()
    },
    // 显示弹出层
    showPopup () {
      this.show = true
    },
    // 获取城市ID
    async getCityId () {
      try {
        const res = await getAreaInfo(this.nowCity)
        this.$store.commit('setNowCityId', res.data.body.value)
        this.data.cityId = res.data.body.value
        this.data.area = res.data.body.value
        this.cityID = res.data.body.value
        this.getHouseData()
      } catch (err) {
        console.log(err)
      }
      this.getHouseCondition()
    },
    // 获取房屋查询条件
    async getHouseCondition () {
      try {
        const res = await getHouseCondition(this.cityID)
        console.log(res)
        // 区域筛选
        this.houseCondition.push(res.data.body.area)
        this.houseCondition[0].text = this.houseCondition[0].label
        this.houseCondition[0].children.forEach(item => {
          item.text = item.label
          if (item.children) {
            item.children.forEach(item1 => {
              item1.text = item1.label
            })
          }
        })
        this.houseCondition[0].children.shift()
        // 地铁筛选
        this.houseCondition.push(res.data.body.subway)
        this.houseCondition[1].text = this.houseCondition[1].label
        this.houseCondition[1].children.forEach(item => {
          item.text = item.label
          if (item.children) {
            item.children.forEach(item1 => {
              item1.text = item1.label
            })
          }
        })
        // 方式
        res.data.body.rentType.forEach(item => {
          this.rentType.push(item.label)
        })
        // 价钱
        res.data.body.price.forEach(item => {
          this.Price.push(item.label)
        })
        // 户型
        res.data.body.roomType.forEach(item => {
          this.roomType.push(item.label)
        })
        // 朝向
        res.data.body.oriented.forEach(item => {
          this.oriented.push(item.label)
        })
        // 楼层
        res.data.body.floor.forEach(item => {
          this.floor.push(item.label)
        })
        // 房屋亮点
        res.data.body.characteristic.forEach(item => {
          this.characteristic.push(item.label)
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 发起axios 筛选获取房屋信息
    async getHouseData () {
      try {
        const res = await getHouseData(this.data)
        // this.rentType = res.data.body.rentType.value
        console.log(res)
        this.houseList.push(...res.data.body.list)
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.loading = true
      // this.getHouseData()
    }
  },
  computed: {
    ...mapState(['nowCity', 'nowCityId'])
  },
  watch: {},
  filters: {},
  components: {
    FindHouseCell
  }
}
</script>

<style scoped lang='less'>
.van-nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 750px;
  height: 100px;
  padding: 0 20px;
  .left {
    width: 32px;
    height: 32px;
    font-size: 46px;
    font-weight: 300;
    transform: translate(-8px, -5px);
  }
  .right {
    box-sizing: border-box;
    display: flex;
    width: 680px;
    height: 68px;
    padding: 0 20px;
    .city {
      display: flex;
      width: 548px;
      height: 48px;
      background-color: #fff;
      margin: 0 20px;
      padding: 10px 10px 10px 16px;
      border-radius: 6px;
      .location {
        width: 84px;
        height: 32px;
        font-size: 28px;
        transform: translate(-2px, 2px);
        span {
          color: #333;
        }
        .icon-play {
          margin-left: 4px;
          color: #959596;
          font-size: 24px;
          transform: rotate(90deg);
        }
      }
      .search {
        line-height: 16px;
        border-left: 1px solid #ccc;
        margin-left: 24px;
        .icon-search {
          padding: 0 4px 0 24px;
          color: #959596;
          font-size: 40px;
        }
        span {
          font-size: 26px;
          color: #9c9fa1;
        }
      }
    }
    .qwe {
      font-size: 50px;
      line-height: 68px;
    }
  }
}
.van-dropdown-menu {
  height: 80px;
  /deep/.van-dropdown-menu__bar {
    height: 80px;
  }
}
/deep/.van-dropdown-item__content {
  height: 620px;
}
.cancelBtn {
  width: 250px;
  height: 100px;
  color: #4ac591;
}
.determineBtn {
  width: 500px;
  height: 100px;
  background-color: #4ac591;
  color: #fff;
}
.filterCriteria {
  display: flex;
  .van-dropdown-menu {
    flex: 4.55;
  }
  .van-cell {
    flex: 1;
    text-align: center;
    line-height: 39px;
    font-size: 30px;
    color: #333;
    .van-icon {
      transform: translate(-2px, -1px) rotate(90deg);
      color: #e3e5e6;
      font-size: 12px;
    }
  }
}
/deep/.van-popup {
  box-sizing: border-box;
  dl {
    padding: 0 30px 0;
    dt {
      margin-bottom: 40px;
      font-size: 30px;
    }
    dd {
      box-sizing: border-box;
      padding-bottom: 28px;
      border-bottom: 2px solid #e5e5e5;
      color: #333;
      span {
        box-sizing: border-box;
        display: inline-block;
        height: 64px;
        width: 140px;
        margin: 0 36px 30px 0;
        border: 2px solid #ddd;
        border-radius: 6px;
        line-height: 64px;
        text-align: center;
        font-size: 24px;
        color: #888;
      }
    }
  }
  .ppbtn {
    position: sticky;
    display: flex;
    justify-content: space-between;
    // height: 100px;
    bottom: 100px;
    z-index: 999;
    .default {
      flex: 1;
    }
    .primary {
      flex: 2;
    }
  }
}
// 数据盒子
.van-list {
  position: fixed;
  top: 180px;
  bottom: 100px;
  overflow-y: auto;
  width: 100%;
  height: calc(100vh - 280px);
}
</style>
