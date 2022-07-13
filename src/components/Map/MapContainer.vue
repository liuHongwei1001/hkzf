<template>
  <div id="container"></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
export default {
  name: 'MapContainer',
  created () { },
  mounted () {
    // DOM初始化完成进行地图初始化
    this.initMap()
  },
  data () {
    return {
      map: null
    }
  },
  methods: {
    initMap () {
      AMapLoader.load({
        key: '2ae9b635824b0b338123068fe08dafb5', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Scale', 'AMap.Geolocation', 'AMap.ElasticMarker', 'AMap.CitySearch'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.map = new AMap.Map('container', { // 设置地图容器id
          viewMode: '3D', // 是否为3D地图模式
          zoom: 10, // 初始化地图级别
          center: [120.153576, 30.287459] // 初始化地图中心点位置
        })
        this.map.addControl(new AMap.Scale())
        this.map.addControl(new AMap.Geolocation())
        this.map.addControl(new AMap.CitySearch())
        this.map.addControl(new AMap.ElasticMarker())
      }).catch(e => {
        console.log(e)
      })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style  scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100vw;
  height: 93vh;
}
</style>
