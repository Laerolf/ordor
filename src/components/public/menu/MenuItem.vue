<template>

    <div class="tile box">
        <div class="container is-fluid">

            <h5 class="title is-5">{{item.name}}</h5>

            <p>{{item.description}}</p>

            <p>Price: {{item.price | currencyify(venueDetails.currency)}}</p>

            <div class="columns is-centered">
                <div class="column is-2 has-text-centered">
                    <MenuItemQuantityCounter @updated="updateItemQuantity"/>
                </div>
            </div>

        </div>
    </div>

</template>

<script>

    import MenuItemQuantityCounter from '@/components/public/menu/MenuItemQuantityCounter'

    export default {
        name: "MenuItem",
        components: {MenuItemQuantityCounter},
        props: ['item'],
        computed: {
            venueDetails: function () {
                return this.$store.getters.getVenueDetails;
            }
        },
        methods: {
            updateItemQuantity: function (newQuantity) {
                this.$emit("orderUpdate", {item: this.item._id, quantity: newQuantity})
            }
        }
    }
</script>

<style scoped>

    .col {
        padding: 0;
    }

</style>
