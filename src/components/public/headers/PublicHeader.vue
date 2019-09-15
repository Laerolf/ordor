<template>

    <nav class="navbar order-header" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item title is-4" to="/" tag="h4">
                Ordor
            </router-link>
        </div>
    </nav>

</template>

<script>
    export default {
        name: "PublicHeader"
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
