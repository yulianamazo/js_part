import Vue from 'vue';
import App from './App.vue';
import store from './store';

import { Table, TableColumn, Loading, Button, InputNumber } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(InputNumber);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App),
}).$mount('#app');
