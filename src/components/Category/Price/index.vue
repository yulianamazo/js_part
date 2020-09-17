<template>
    <div :class="['price', color]">{{ price }}</div>
</template>

<script>
/* Компонент цены товара, изменяет цвет ячейки на основе старого и нового значения цены в watch*/
export default {
    props: {
        price: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            color: 'gray',
        };
    },
    watch: {
        price(newVal, oldVal) {
            if (newVal > oldVal) return (this.color = 'red');
            if (newVal < oldVal) return (this.color = 'green');
            return (this.color = 'gray');
        },
    },
};
</script>

<style lang="less" scoped>
.price {
    font-weight: bold;
    padding: 10px;
    margin: 0;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    white-space: nowrap;
    &.gray {
        background: #ebeef5;
    }
    &.green {
        background: #67c23a;
    }
    &.red {
        background: #f56c6c;
    }
}
</style>
