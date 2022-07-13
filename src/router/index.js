import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Login from '@/views/Login'
const Home = () => import('@/views/Home')
const Lease = () => import('@/views/Lease')
const House = () => import('@/views/House')
const Information = () => import('@/views/Information')
const My = () => import('@/views/My')
const CityList = () => import('@/views/CityList')
const MapFind = () => import('@/components/Map/MapFind.vue')
const MapContainer = () => import('@/components/Map/MapContainer')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/house',
        name: 'house',
        component: House
      },
      {
        path: '/information',
        component: Information
      },
      {
        path: '/my',
        name: 'my',
        component: My
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/citylist',
    name: 'citylist',
    component: CityList
  },
  {
    path: '/mapfind',
    name: 'mapfind',
    component: MapFind,
    children: [
      {
        path: 'mapcontainer',
        name: 'mapcontainer',
        component: MapContainer
      }
    ]
  },
  {
    path: '/lease',
    name: 'lease',
    component: Lease
  }

]

const router = new VueRouter({
  routes
})

export default router
