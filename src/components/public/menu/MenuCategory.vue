<template>
    <div>
        <section class="hero is-info is-bold">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title is-2-desktop-only is-10-mobile">
                        {{category.name}}
                    </h1>
                    <h2 class="subtitle">
                        {{category.description}}
                    </h2>
                </div>
            </div>
        </section>

        <section class="section">
            <MenuItem v-if="haveMenuItems && item.active" v-for="item in category.menuItems" :item="item" :key="item.id"
                      @orderUpdate="updateOrder"/>
            <p v-if="!haveMenuItems">No items available</p>
        </section>
    </div>
</template>

<script>

    import MenuItem from '@/components/public/menu/MenuItem'

    export default {
        name: "MenuCategory",
        components: {MenuItem},
        props: ['category'],
        methods: {
            updateOrder(updateInfo) {
                this.$emit("orderUpdate", {
                    category: this.category._id,
                    item: updateInfo.item,
                    quantity: updateInfo.quantity
                })
            }
        },
        computed: {
            menu: function () {
                return this.$store.getters.getMenu
            },
            haveMenuItems: function () {
                return Object.keys(this.menu.menuCategories[this.category._id].menuItems).length > 0
            }
        }
    }
</script>

<style scoped>

</style>
