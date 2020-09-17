<template>
    <div class="cart">
        <p class="cart__title">Корзина:</p>
        <div v-if="products.length">
            <el-table :data="products" style="width: 100%">
                <el-table-column :min-width="40" prop="name" label="Наименование товара и описание"> </el-table-column>
                <el-table-column :min-width="20" label="Количество">
                    <template slot-scope="scope">
                        <div>
                            <el-input-number
                                :value="scope.row.orderCount"
                                :max="scope.row.count"
                                :step="1"
                                :min="0"
                                class="cart__input"
                                step-strictly
                                @change="val => onChangeCount(scope.row.id, val)"
                            ></el-input-number>
                            <span class="cart__count">шт.</span>
                        </div>
                        <div class="cart__maxCount">Максимум: {{ scope.row.count }}</div>
                    </template>
                </el-table-column>
                <el-table-column :min-width="20" label="Цена">
                    <template slot-scope="scope">
                        <div>
                            <span class="cart__price">{{ scope.row.price }} руб.</span>
                            <span class="cart__count">/шт.</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :min-width="20" align="right">
                    <template slot-scope="scope">
                        <el-button type="text" @click="onRemove(scope.row.id)">Удалить</el-button>
                    </template></el-table-column
                >
            </el-table>
            <p class="cart__total">
                Общая стоимость: <span class="cart__total-amount">{{ amount }} руб.</span>
            </p>
        </div>
        <p v-else class="cart__text">Корзина пуста</p>
    </div>
</template>

<script>
/* Компонент корзины, выводит данные о добавленных товарах и рассчитывает общую сумму */
export default {
    name: 'Cart',
    props: {
        products: {
            type: Array,
            required: true,
        },
        onRemove: {
            type: Function,
            required: true,
        },
        onChangeCount: {
            type: Function,
            required: true,
        },
    },
    computed: {
        amount() {
            return this.products.reduce((prev, { price, orderCount }) => prev + price * orderCount, 0).toFixed(2);
        },
    },
};
</script>

<style lang="less" scoped>
.cart {
    &__title {
        font-weight: bold;
        font-size: 24px;
    }
    &__text {
        text-align: center;
        font-size: 18px;
    }
    &__total {
        display: flex;
        justify-content: flex-end;
        font-size: 18px;
        color: #909399;
        align-items: center;
        &-amount {
            color: #e6a23c;
            font-size: 24px;
            font-weight: bold;
            margin-left: 10px;
        }
    }
    &__input {
        margin-right: 10px;
    }
    &__price {
        font-weight: bold;
        font-size: 24px;
    }
    &__count {
        color: #909399;
        font-size: 18px;
    }
    &__maxCount {
        margin-top: 5px;
    }
}
</style>
