<template>
    <aside class="menu">

        <p class="menu-label" v-if="venueDetails.name">
            {{venueDetails.name}}
        </p>

        <p class="menu-label" v-if="!venueDetails.name">
            Your venue
        </p>

        <ul class="menu-list">
            <li v-for="category in menu.menuCategories">
                <a>{{category.name}}</a>
            </li>

        </ul>

    </aside>
</template>

<script>
    export default {
        name: "PublicMenuNavigation",
        computed: {
            menu () {
                return this.$store.getters.getMenu
            },
            venueDetails () {
                return this.$store.getters.getVenue.details
            }
        }
    }
</script>

<style scoped>

    .menu {
        user-select: none;
    }

</style>
