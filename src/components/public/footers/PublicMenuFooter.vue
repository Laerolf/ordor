<template>
    <nav class="navbar ordor-footer" role="navigation" aria-label="main navigation">

        <div class="navbar-menu is-active">
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons is-right">
                        <button v-if="order" class="button is-info has-text-centered" @click="orderButtonClicked">
                            {{order.price | currencyify(currency)}} | {{'item' |
                            orderListify(order.totalAmountOfItems)}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "PublicMenuFooter",
        props: ['order', 'currency'],
        methods: {
            orderButtonClicked() {
                this.$emit('orderButtonClicked')
            }
        }
    }
</script>

<style scoped>
    @media screen and (max-width: 1023px) {
        .navbar-menu.is-active {
            background-color: #8FD694;
        }
    }

    .ordor-footer {
        background-color: #8FD694;
    }

</style>
