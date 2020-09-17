import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const MIN_EXCHANGE = 20;
const MAX_EXCHANGE = 80;

export default new Vuex.Store({
    state: {
        products: [],
        names: {},
        exchange: 0,
    },
    getters: {
        /* Составление мапы товаров */
        preparedProducts({ products, names }) {
            return products.reduce(
                (prevent, { P, C, G, T }) => ({ ...prevent, [T]: { count: P, price: C, name: names[G]?.B[T]?.N } }),
                {},
            );
        },
        /* Составление мапы категорий */
        preparedCategories({ products, names }) {
            return products.reduce(
                (prevent, { G, T }) => ({
                    ...prevent,
                    [G]: { name: names[G]?.G, products: prevent[G] ? [...prevent[G]?.products, T] : [T] },
                }),
                {},
            );
        },
    },
    mutations: {
        setProducts(state, data) {
            state.products = data;
        },
        setNames(state, data) {
            state.names = data;
        },
        setExchange(state, value) {
            state.exchange = value;
        },
    },
    actions: {
        /* Запросы на получение данных из файлов data.json и names.json */
        async getProducts({ commit }) {
            try {
                let response = await fetch('data.json');

                let data = await response.json();
                commit('setProducts', data?.Value?.Goods);
            } catch (e) {
                commit('setProducts', []);
            }
        },
        async getNames({ commit }) {
            try {
                let response = await fetch('names.json');

                let data = await response.json();
                commit('setNames', data);
            } catch (e) {
                commit('setNames', {});
            }
        },
        /* Обновление курса доллара от 20 до 80*/
        async getExchange({ commit }) {
            commit('setExchange', +(Math.random() * (MAX_EXCHANGE - MIN_EXCHANGE) + MIN_EXCHANGE).toFixed(2));
        },
    },
});
