<template>
    <div id="app" v-loading="loading">
        <div class="container">
            <Category
                v-for="(item, index) in preparedCategories"
                :key="index"
                :category="item"
                :products="exchangedProducts"
                :onAdd="addToCart"
            />
        </div>
        <Cart :products="cartProducts" :onRemove="removeFromCart" :onChangeCount="changeCartCount" />
    </div>
</template>

<script>
/* Главный компонент приложения */
import { mapActions, mapGetters, mapState } from 'vuex';
import Category from './components/Category/index.vue';
import Cart from './components/Cart/index.vue';

export default {
    name: 'App',
    components: {
        Cart,
        Category,
    },
    data() {
        return {
            cart: {},
            loading: false,
            timeoutId: null,
        };
    },
    computed: {
        ...mapState({
            exchange: state => state.exchange,
        }),
        ...mapGetters({
            preparedCategories: 'preparedCategories',
            preparedProducts: 'preparedProducts',
        }),
        exchangedProducts() {
            return Object.keys(this.preparedProducts).reduce(
                (prev, cur) => ({
                    ...prev,
                    [cur]: {
                        ...this.preparedProducts[cur],
                        price: +(this.preparedProducts[cur].price * this.exchange).toFixed(2),
                    },
                }),
                {},
            );
        },
        cartProducts() {
            return Object.keys(this.cart).map(id => ({ id, orderCount: this.cart[id], ...this.exchangedProducts[id] }));
        },
    },
    methods: {
        ...mapActions({
            getProducts: 'getProducts',
            getNames: 'getNames',
            getExchange: 'getExchange',
        }),
        addToCart(item) {
            this.cart = { ...this.cart, [item]: 1 };
        },
        removeFromCart(item) {
            this.$delete(this.cart, item);
        },
        changeCartCount(id, count) {
            if (count === 0) {
                this.removeFromCart(id);
            } else {
                this.cart[id] = count;
            }
        },
        //инициализация данных при загрузке приложения и повторное полечение данных и смена курса каждые 15 секунд
        async init() {
            this.loading = true;
            await Promise.all([this.getProducts(), this.getNames(), this.getExchange()]);
            this.loading = false;
            this.updateDataTimeot();
        },
        async updateDataTimeot() {
            this.timeoutId = setTimeout(async () => {
                await Promise.all([this.getProducts(), this.getExchange()]);
                this.updateDataTimeot();
            }, 15000);
        },
    },
    async created() {
        await this.init();
    },
    beforeDestroy() {
        if (this.timeoutId) clearTimeout(this.timeoutId);
    },
};
</script>

<style lang="less" scoped>
#app {
    font-family: 'Helvetica Neue', Arial, sans-serif;
}
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    @media (max-width: 768px) {
        flex-direction: column;
    }
}
</style>
