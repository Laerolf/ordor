<template>
    <div class="card">
        <div class="card-header">
            <div class="card-header-title">{{table.name}}</div>
        </div>
        <div class="card-content">

            <h6 class="title is-6">Overview</h6>

            <div v-if="!haveOrderItems" class="content">
                <p>No items</p>
            </div>

            <div v-if="haveOrderItems" class="content">

                <table class="table is-striped is-fullwidth">
                    <thead>
                    <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Subtotal</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="line in order.items">
                        <td>{{getItemByCategoryIdAndItemId(line.category, line.item).name}}</td>
                        <td>{{line.quantity}}</td>
                        <td>{{getItemByCategoryIdAndItemId(line.category, line.item).price |
                            currencyify(venueCurrency)}}
                        </td>
                        <td>{{getItemByCategoryIdAndItemId(line.category, line.item).price * line.quantity |
                            currencyify(venueCurrency)}}
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colspan="2"></td>
                        <td>Total price</td>
                        <td>{{order.price | currencyify(venueCurrency)}}</td>
                    </tr>
                    </tfoot>
                </table>

            </div>
        </div>
        <div class="card-footer">

            <div class="card-footer-item field is-grouped">
                <p class="control">
                    <button class="button is-success" @click="closeModal">Continue</button>
                </p>
                <p class="control">
                    <button v-if="haveOrderItems" class="button is-danger" @click="payOrder">Pay</button>
                </p>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "OrderListModal",
        props: ['table', 'order'],
        computed: {
            venueCategories: function () {
                return this.$store.getters.getMenu.menuCategories
            },
            venueCurrency: function () {
                return this.$store.getters.getVenueDetails.currency
            },
            haveOrderItems: function () {
                return Object.keys(this.order.items).length > 0
            }
        },
        methods: {
            getCategoryById(categoryId) {
                return this.venueCategories[categoryId]
            },
            getItemByCategoryIdAndItemId(categoryId, itemId) {
                return this.getCategoryById(categoryId).menuItems[itemId]
            },
            closeModal() {
                this.$emit("close")
            },
            payOrder() {
                this.closeModal()
            }
        }
    }
</script>
