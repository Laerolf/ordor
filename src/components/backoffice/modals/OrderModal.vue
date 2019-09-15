<template>

    <div class="card">
        <div class="card-header">
            <p class="card-header-title">Order #{{order.orderNumber}}</p>
        </div>
        <div class="card-content">

            <div class="card-content">

                <div class="content">

                    <h6 class="title is-6">Overview</h6>

                    <p>Status: {{order.status}}</p>
                    <p>Added on {{order.startTime | dateify(true)}}</p>
                    <p v-if="order.endTime">Finished on {{order.endTime | dateify(true)}}</p>

                    <table class="table is-hoverable is-fullwidth">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="haveItems" v-for="item in order.items" :key="item._id">
                            <td>{{getOrderItemByCategoryAndId(item).name}}</td>
                            <td>{{item.quantity}}</td>
                        </tr>
                        <tr v-if="!haveItems">
                            <td colspan="2" class="has-text-centered">No items available</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>

        </div>
        <div class="card-footer">

            <div class="card-footer-item field is-grouped">
                <p class="control">
                    <button class="button is-danger" @click="closeModal">Close</button>
                </p>
                <p class="control">
                    <button class="button is-danger" @click="deleteOrder">Delete order</button>
                </p>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "OrderModal",
        props: ['order'],
        computed: {
            haveItems: function () {
                return Object.keys(this.order.items).length > 0
            }
        },
        methods: {
            closeModal() {
                this.$emit('close')
            },
            async deleteOrder() {
                await this.$store.dispatch("deleteOrder", {order: this.order._id})
                this.closeModal()
            },
            getOrderItemByCategoryAndId(line) {
                return this.$store.getters.getMenu.menuCategories[line.category].menuItems[line.item]
            }
        }
    }
</script>

<style scoped>
</style>
