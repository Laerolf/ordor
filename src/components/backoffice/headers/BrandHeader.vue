<template>

    <nav class="navbar order-header" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item title is-4" to="/backoffice" tag="h4">
                Ordor
            </router-link>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">

            <div class="navbar-end">

                <div class="navbar-item">
                    <div class="field is-grouped">
                        <p class="control button is-info">
                                <span>Hello {{activeUser.name.firstName}}!</span>
                        </p>
                    </div>
                </div>


                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-danger" @click="logout">
                            Log out
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

</template>

<script>
    export default {
        name: "BrandHeader",
        computed: {
          activeUser(){
              return this.$store.getters.getActiveUser;
          }
        },
        methods: {
            logout() {
                this.$cookies.remove("token")
                this.$router.push("/login")
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
