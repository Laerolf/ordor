<template>
    <div class="container">
        <h5 class="title is-5"><font-awesome-icon icon="book-open"></font-awesome-icon> Menu</h5>

        <div class="field is-grouped">
            <p class="control" v-if="firstTable">
                <router-link class="button is-info" :to="{name: 'PublicMenu', params: {venueId: venueId,tableId: firstTable._id}}"
                             target="_blank">Preview menu
                </router-link>
            </p>
            <p class="control" v-if="activeUserHasPermission('menu','menu category','full')">
                <button class="button is-success" @click="addMenuCategory">Add category</button>
            </p>
        </div>

        <section class="section ordor-section" v-if="haveMenuCategories" v-for="category in menuCategories">
            <MenuCategory :category="category"/>
        </section>

        <section class="section" v-if="!haveMenuCategories">
            <p>No menu categories available.</p>
        </section>

        <div class="field is-grouped" v-if="activeUserHasPermission('menu','menu category','full')">
            <p class="control">
                <button class="button is-success" @click="addMenuCategory">Add category</button>
            </p>
        </div>

    </div>
</template>

<script>

    import MenuCategory from '@/components/backoffice/menu/MenuCategory'

    export default {
        name: "BackOfficeMenu",
        components: {MenuCategory},
        computed: {
            menu: {
                get() {
                    return this.$store.getters.getMenu
                },
                set() {
                    this.$store.dispatch('saveMenu', this.menu)
                }
            },
            menuCategories: function () {
                return this.$store.getters.getMenu.menuCategories
            },
            firstTable: function () {
                return this.$store.getters.getTables[Object.keys(this.$store.getters.getTables)[0]];
            },
            haveMenuCategories: function () {
                return Object.keys(this.menuCategories).length > 0;
            },
            venueId(){
                return this.$store.getters.getVenueId;
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
            addMenuCategory() {
                this.$store.dispatch('addMenuCategory')
            }
        }
    }
</script>

<style scoped>
    .ordor-section {
        padding: 2% 0;
    }

    .ordor-section:last-of-type {
        margin-bottom: 0.75rem;
    }
</style>
