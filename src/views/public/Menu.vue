<template>
    <div>
        <PublicMenuHeader class="is-fixed-top" @toggleMenu="toggleMenu"/>
        <section class="section" v-if="menu">

            <div class="columns is-flex-mobile">

                <div id="menuNav" v-show="menuShown" class="column is-one-fifth is-one-fifths-mobile">
                    <PublicMenuNavigation :venueName="venueDetails.name" :menu="menu"/>
                </div>

                <div id="menu" class="column is-four-fifths is-full-mobile">
                    <h5 class="title is-5">Menu <span v-if="table">| {{table.name}}</span></h5>

                    <MenuCategory v-for="category in menu.menuCategories" v-if="category" :key="category._id" :category="category"
                                  :categoryId="category._id" @orderUpdate="updateOrder" :menu="menu"/>
                </div>

            </div>

        </section>
        <PublicMenuFooter class="is-fixed-bottom" :order="order" :currency="venueDetails.currency" @orderButtonClicked="showOrder"/>
    </div>
</template>

<script>
    import _ from 'lodash'
    import axios from "axios"

    import PublicMenuHeader from '@/components/public/headers/PublicMenuHeader'
    import PublicMenuFooter from '@/components/public/footers/PublicMenuFooter'
    import PublicMenuNavigation from '@/components/public/navigation/PublicMenuNavigation'

    import MenuCategory from '@/components/public/menu/MenuCategory'
    import OrderListModal from "@/components/public/modals/OrderListModal";

    export default {
        name: "PublicMenu",
        components: {
            MenuCategory,
            PublicMenuFooter,
            PublicMenuHeader,
            PublicMenuNavigation
        },
        data() {
            return {
                orderId: undefined,
                menuShown: false
            }
        },
        computed: {
            order() {
                return this.$store.getters.getOrders[this.orderId];
            },
            menu() {
                return this.$store.getters.getMenu
            },
            venueDetails() {
                return this.$store.getters.getVenueDetails
            },
            table() {
                return this.$store.getters.getTables[this.$route.params.tableId];
            }
        },
        async created() {

            const venueId = this.$route.params.venueId
            const tableId = this.$route.params.tableId

            if (!this.$cookies.isKey("token")) {

                const feedback = await axios.post("public/login", {
                    venueId: venueId,
                    tableId: tableId
                })

                this.$cookies.set("token", feedback.data.data.token)
            }

            if (this.$cookies.get("token")) {

                const response = await axios.get(`/venues/`, {params: {token:this.$cookies.get("token")}})

                await this.$store.dispatch("loadPublicData", response.data)

                const order = await this.$store.dispatch('addOrder', {table: tableId});

                this.$set(this,'orderId',order._id);

            }
        },
        watch: {

            "order.items":
                {
                    handler: function () {
                        if (this.order) {
                            this.$set(this.order, 'price', this.calculatePrice())
                            this.$set(this.order, 'totalAmountOfItems', this.countTotalAmountOfOrderItems())
                        }
                    },
                    deep: true
                }

        },
        methods: {
            showOrder() {

                this.$modal.show(OrderListModal, {
                    order: _.cloneDeep(this.order),
                    table: this.table
                }, {height: 'auto', adaptive: true, clickToClose: false})

            },
            toggleMenu(){
              console.log('TOGGLE')
                this.menuShown = !this.menuShown
            },
            async updateOrder(updateInfo) {

                const updateData = {
                    update: {
                        order: this.order._id,
                        category: updateInfo.category,
                        item: updateInfo.item,
                        quantity: updateInfo.quantity
                    },
                    venue: this.$route.params.venueId,
                    table: this.$route.params.tableId
                }

                await this.$store.dispatch("updateOrder", updateData)

            },
            getItemByCategoryAndId(categoryId, itemId) {
                return this.menu.menuCategories[categoryId].menuItems[itemId]
            },
            calculatePrice() {
                let totalSum = 0

                if (Object.keys(this.order.items).length > 0) {
                    for (let line in this.order.items) {
                        if (this.order.items.hasOwnProperty(line)) {

                            let selectedLine = this.order.items[line];

                            totalSum += (this.getItemByCategoryAndId(selectedLine.category, selectedLine.item).price * selectedLine.quantity)

                        }
                    }
                }

                return totalSum
            },
            countTotalAmountOfOrderItems() {

                let totalAmountOfItems = 0

                for (let line in this.order.items) {
                    if (this.order.items.hasOwnProperty(line)) {

                        let selectedLine = this.order.items[line];

                        totalAmountOfItems += eval(selectedLine.quantity)

                    }
                }

                return totalAmountOfItems

            },
            finishOrder() {
                this.order.status = "Ordered";
                this.$store.dispatch("updateOrder", this.order)
            }
        }
    }
</script>

<style scoped>

    body {
        overflow-x: hidden;
    }

    section {
        margin-top: 5%;
    }

    #menuNav{
        transition: .5s;
    }

    #menu{
        transition: .5s;

    }

</style>
