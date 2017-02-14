import Vue from 'vue';
import VueRouter from 'vue-router';

import index from '../components/index/index.vue';
import seller from '../components/seller/seller.vue';
import goods from '../components/goods/goods.vue';
import ratings from '../components/goods/content/ratings.vue';

Vue.use(VueRouter);

const routes = [
        {path: '/', component: index, name: 'index'},
        {path: '/goods', component: goods, name: 'goods'},
        {path: '/seller', component: seller},
        {path: '/ratings', component: ratings},
      ],
      router = new VueRouter({routes});
export default router
