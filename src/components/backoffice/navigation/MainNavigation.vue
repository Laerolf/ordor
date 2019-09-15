<template>
    <aside class="menu">

        <p class="menu-label" v-if="venueName">
            {{venueName}}
        </p>

        <p class="menu-label" v-if="!venueName">
            Your venue
        </p>

        <ul class="menu-list">
            <router-link :to="{name: 'Venue'}"><font-awesome-icon icon="store"></font-awesome-icon> Venue</router-link>
            <router-link :to="{name: 'Tables'}"><font-awesome-icon icon="chair"></font-awesome-icon> Tables</router-link>
            <router-link :to="{name: 'BackOfficeMenu'}"><font-awesome-icon icon="book-open"></font-awesome-icon> Menu</router-link>
            <router-link :to="{name: 'Orders'}"><font-awesome-icon icon="list-ul"></font-awesome-icon> Orders</router-link>
            <router-link :to="{name: 'Staff'}"><font-awesome-icon icon="users"></font-awesome-icon> Staff</router-link>
        </ul>

    </aside>
</template>

<script>
    export default {
        name: "MainNavigation",
        computed: {
            venueName: function () {
                return this.$store.getters.getVenueDetails.name
            }
        }
    }
</script>

<style scoped>

    .menu {
        user-select: none;
    }

</style>
