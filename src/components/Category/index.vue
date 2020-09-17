<template>
    <div class="category">
        <p class="category__title">{{ category.name }}</p>
        <div class="product" v-for="(item, index) in category.products" :key="index">
            <p class="product__name">{{ products[item].name }} ({{ products[item].count }})</p>
            <el-button type="text" class="product__button" @click="onAdd(item)">В корзину</el-button>
            <Price :price="products[item].price" />
        </div>
    </div>
</template>

<script>
/* Компонент категории, выводит данные о товарах, относящихся к этой категории */
import Price from './Price';

export default {
    components: {
        Price,
    },
    props: {
        category: {
            type: Object,
            required: true,
        },
        products: {
            type: Object,
            required: true,
        },
        onAdd: {
            type: Function,
            required: true,
        },
    },
};
</script>

<style lang="less" scoped>
.category {
    width: calc(50% - 5px);
    border: 1px solid #c0c4cc;
    box-sizing: border-box;
    margin-bottom: 10px;
    @media (max-width: 768px) {
        width: 100%;
    }
    &__title {
        font-weight: bold;
        margin: 0;
        padding: 10px;
        background: #409eff;
        color: #fff;
    }
}
.product {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #c0c4cc;
    align-items: center;
    &__name {
        padding: 10px;
        margin: 0;
        cursor: pointer;
        width: 75%;
    }
    &__button {
        margin: 0 10px;
    }
}
</style>
