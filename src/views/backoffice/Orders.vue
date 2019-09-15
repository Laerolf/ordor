<template>
    <div class="container">
        <h5 class="title is-5">
            <font-awesome-icon icon="list-ul"></font-awesome-icon>
            Orders
        </h5>

        <div class="field is-grouped" v-if="activeUserHasPermission('orders','orders','full')">
            <p class="control">
                <button class="button is-danger" @click="deleteOrders" :disabled="!haveSelectedOrders">Delete orders
                </button>
            </p>
        </div>

        <table class="table is-hoverable is-fullwidth">
            <thead>
            <tr>
            <th><input type="checkbox" v-show="haveOrders" v-model="selectAllOrders" aria-label="Select label"/></th>
                <th scope="col">#</th>
                <th scope="col">Table</th>
                <th scope="col">Status</th>
                <th scope="col">Ticket total</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="haveOrders" v-for="order in orders" :key="order._id">
                <td><input type="checkbox" v-model="selectedOrders" :value="order._id" aria-label="Select label"/></td>
                <td @click="viewOrder(order)">{{order.orderNumber}}</td>
                <td @click="viewOrder(order)" v-if="getTableById(order.table)">{{getTableById(order.table).name}}</td>
                <td @click="viewOrder(order)" v-if="!getTableById(order.table)">Deleted</td>
                <td @click="viewOrder(order)">{{order.status}}</td>
                <td @click="viewOrder(order)">{{order.price | currencyify(venueCurrency)}}</td>
            </tr>
            <tr v-if="!haveOrders">
                <td colspan="5" class="has-text-centered">No orders available</td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import _ from 'lodash';
    import OrderModal from '@/components/backoffice/modals/OrderModal'

    export default {
        name: "Orders",
        data() {
            return {
                selectedOrders: [],
                selectAllOrders: false
            }
        },
        watch: {
          selectAllOrders() {
              if (!this.selectAllOrders && this.selectedOrders.length === Object.keys(this.orders).length) {
                  this.selectedOrders = [];
              }
              else {
                  this.selectedOrders = this.selectAllOrders ? Object.keys(this.orders) : this.selectedOrders;
              }
          },
            selectedOrders() {
              this.selectAllOrders = this.selectedOrders.length === Object.keys(this.orders).length;
            }
        },
        computed: {
            orders: function () {
                return this.$store.getters.getOrders
            },
            haveOrders: function () {
                return Object.keys(this.orders).length > 0
            },
            venueCurrency: function () {
                return this.$store.getters.getVenueDetails.currency
            },
            haveSelectedOrders() {
                return this.selectedOrders.length > 0
            },
            roles() {
                return this.$store.getters.getRoles;
            },
            activeUserPermissions() {
                return this.roles[this.$store.getters.getActiveUser.role].permissions
            }
        },
        methods: {
            activeUserHasPermission(subject, item, permission) {
                return this.activeUserPermissions[subject].items[item].permissions[permission]
            },
            viewOrder(order) {
                if (this.activeUserHasPermission('orders', 'orders', 'read')) {
                    this.$modal.show(OrderModal, {
                        order: _.cloneDeep(order)
                    }, {height: 'auto', adaptive: true, clickToClose: false})
                }
            },
            getTableById(tableId) {

                let neededTable = undefined

                for (let table in this.$store.getters.getTables) {
                    if (this.$store.getters.getTables.hasOwnProperty(table)) {
                        const selectedTable = this.$store.getters.getTables[table];

                        if (tableId === selectedTable._id) {
                            neededTable = selectedTable;
                            return selectedTable
                        }

                    }
                }

                return neededTable
            },
            deleteOrders() {
                this.$store.dispatch('deleteOrders', this.selectedOrders)
                this.selectAllOrders = false;
            }
        }
    }
</script>

<style scoped>

</style>
