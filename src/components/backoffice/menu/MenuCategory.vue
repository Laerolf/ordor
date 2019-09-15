<template>
    <div class="card">
        <div class="card-header">
            <p class="card-header-title">{{category.name}}</p>
        </div>
        <div class="card-content">
            <div class="content">

                <h6 class="title is-6">Details</h6>

                <div class="field">
                    <label class="label" id="ordor-menu-category-name-label">Name</label>
                    <div class="control">
                        <input v-model.lazy="category.name" class="input"
                               aria-describedby="ordor-menu-category-name-label" type="text" aria-label="Name"
                               @change="updateMenuCategory('name')"
                               :disabled="!activeUserHasPermission('menu','menu category','edit')">
                    </div>
                </div>

                <div class="field">
                    <label class="label" id="ordor-menu-category-description-label">Description</label>
                    <div class="control">
                        <input v-model.lazy="category.description" class="input"
                               aria-describedby="ordor-menu-category-description-label" type="text" aria-label="Description"
                               @change="updateMenuCategory('description')"
                               :disabled="!activeUserHasPermission('menu','menu category','edit')">
                    </div>
                </div>

                <h6 class="title is-6">Options</h6>

                <label class="checkbox">
                    <input type="checkbox" v-model="category.active" :disabled="!activeUserHasPermission('menu','menu category','edit')">
                    Available category
                </label>

                <h6 class="title is-6">{{'item' | quantify(category.menuItems.length)}}</h6>

                <table class="table is-hoverable">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in category.menuItems" @click="editCategoryItem(item)" :class="{'no-edit':!activeUserHasPermission('menu','menu category items','edit')}">
                            <td>{{item.name}}</td>
                            <td>{{item.price | currencyify(venueCurrency)}}</td>
                            <td>{{item.active | itemAvailability | capitalize}}</td>
                        </tr>
                        <tr class="no-items" v-if="!haveMenuItems">
                            <td colspan="3" class="has-text-centered">No menu items available</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
        <div class="card-footer">

            <div class="card-footer-item field is-grouped">
                <p class="control">
                    <button class="button is-success" @click="addMenuCategoryItem" :disabled="!activeUserHasPermission('menu','menu category items','full')">Add item</button>
                </p>
                <p class="control">
                    <button class="button is-danger" @click="deleteMenuCategory" :disabled="!activeUserHasPermission('menu','menu category items','full')">Remove category</button>
                </p>
            </div>

        </div>
    </div>
</template>

<script>

    import MenuCategoryItemModal from "@/components/backoffice/modals/MenuCategoryItemModal"

    export default {
        name: "MenuCategory",
        props: ['category'],
        data () {
          return {
              updated: false
          }
        },
        computed: {
            venueCurrency: function () {
                return this.$store.getters.getVenueDetails.currency
            },
            haveMenuItems: function () {
                return Object.keys(this.category.menuItems).length > 0;
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
            addMenuCategoryItem: async function () {
                const newItem = await this.$store.dispatch('addMenuCategoryItem', {category: this.category._id})
                this.editCategoryItem(newItem);
            },
            updateMenuCategory: function (key) {
                this.$store.dispatch('updateMenuCategory', {
                    category: this.category._id,
                    key: key,
                    value: this.category[key]
                })

                this.updated = true;
            },
            deleteMenuCategory: function () {
                this.$store.dispatch('deleteMenuCategory', {_id: this.category._id})
            },
            editCategoryItem: function (item) {
                if(this.activeUserHasPermission('menu','menu category items','edit')) {
                    this.$modal.show(MenuCategoryItemModal, {
                        category: this.category._id,
                        item: item
                    }, {height: 'auto', adaptive: true, clickToClose: false})
                }
            }
        },
        beforeDestroy() {
            if (this.updated) {
                this.$store.dispatch("saveMenuCategory", this.category)
            }
        }
    }
</script>

<style scoped>
    tbody > tr {
        cursor: pointer;
    }

    .no-items {
        cursor:inherit;
    }

    .no-edit > td{
        cursor: default;
    }


</style>
