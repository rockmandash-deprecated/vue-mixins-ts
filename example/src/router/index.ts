import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import mixinMousePositionAtPage from '../../../src/mixins/sensors/mixinMousePositionAtPage/Example.vue';
import mixinWindowSize from '../../../src/mixins/sensors/mixinWindowSize/Example.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/mixinMousePositionAtPage',
    name: 'mixinMousePositionAtPage',
    component: mixinMousePositionAtPage,
  },
  {
    path: '/mixinWindowSize',
    name: 'mixinWindowSize',
    component: mixinWindowSize,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export { routes, router };
