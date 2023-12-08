import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AttentionView from '../views/AttentionView.vue'
import LoginVire from '../views/AuthorizationViewChildren/LoginVire.vue'
import RegisterView from '../views/AuthorizationViewChildren/RegisterView.vue'
import ShopView from '../views/ShopView.vue'
import UserView from '../views/UserView.vue'
import LiveView from '../views/LiveView.vue'
import SearchView from '../views/SearchView.vue'
import HomePage from '../views/UserViewChildren/HomePage.vue'
import LivePlaybackView from '../views/LiveViewChildren/LivePlaybackView.vue'
import LivingView from '../views/LiveViewChildren/LivingView.vue'
import PayView from '../views/PayView.vue'
import PaySuccess from '../views/PaySuccess.vue'
import LiveRoomView from '../views/LiveViewChildren/LiveRoomView.vue'

// 在路由中引入pinia
import pinia from '../stores/store'
import AuthorizationView from '../views/AuthorizationView.vue'
import { useRouterNameStore } from "../stores/counter";
const store = useRouterNameStore(pinia);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/attention',
      name: 'attention',
      component: AttentionView
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopView
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
      children: [
        {
          path: 'homepage',
          name: 'homepage',
          component: HomePage,
        },
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/live',
      name: 'live',
      component: LiveView,
    },
    {
      path:'/liveroom',
      name:'liveroom',
      component:LiveRoomView,
    },
    {
      path: '/livePlayback:itemUrlId&:actorUrlId&:explainId',
      name: 'livePlayback',
      props: true,
      component: LivePlaybackView,
    },
    {
      path: '/living',
      name: 'living',
      component: LivingView,
    },
    {
      path: '/authorization',
      name: 'authorization',
      component: AuthorizationView,
      redirect: { name: 'login' },
      children: [
        {
          path: 'login',
          name: 'login',
          component: LoginVire
        },
        {
          path: 'register',
          name: 'register',
          component: RegisterView
        }
      ]
    },
    {
      path:'/pay',
      name:'pay',
      component:PayView
    },
    {
      path:'/pay-success',
      name:'paySuccess',
      component:PaySuccess
    },
    {
      path: '/product-list',
      name: "productList",
      component: () => import("../views/SearchViewChildren/ProductListPageView.vue")
    },{
      path:'/project-detail',
      name:"project-detail",
      component:()=>import("../views/ProductDetailsView.vue")
    }

  ]
})

//全局路由守卫
router.beforeEach((to) => {

  const { name } = to;
  // console.log(to.name)
  // console.log(store.fromName)

  if (name == 'attention' || name == 'user' || name == 'shop') {

    store.changeFromName(name as string);

    const token = localStorage.token;

    if (token) {
      return true;
    } else {
      return { name: 'authorization' }
    }
    return { name: 'authorization' }

  } else {
    return true;
  }
})

export default router


