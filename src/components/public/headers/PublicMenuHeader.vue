<template>

    <nav class="navbar order-header" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <p class="navbar-item">
                Ordor
            </p>

            <a role="button" class="navbar-burger burger" @click="toggleMenu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
    </nav>

</template>

<script>
    export default {
        name: "PublicMenuHeader",
        computed: {
            venueDetails () {
                return this.$store.getters.getVenueDetails;
            }
        },
        methods: {
            toggleMenu() {
                this.$emit("toggleMenu")
            }
        }
    }
</script>

<style scoped>

    .order-header {
        background-color: #8FD694;
    }

    .order-header > a {
        text-decoration: none;
        color: inherit;
    }

    .order-header h4 {
        cursor: pointer;
    }

</style>
