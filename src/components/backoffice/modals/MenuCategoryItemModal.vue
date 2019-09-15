<template>

    <div class="card">
        <div class="card-header">
            <p class="card-header-title">{{item.name}}</p>
        </div>
        <div class="card-content">

            <div class="card-content">

                <div class="content">

                    <div class="field">
                        <label class="label" id="ordor-menu-category-item-name-label">Name</label>
                        <div class="control">
                            <input v-model="item.name" class="input"
                                   aria-describedby="ordor-menu-category-item-name-label" type="text"
                                   aria-label="Name" @change="updateMenuCategoryItem">
                        </div>
                    </div>

                    <div class="field">
                        <label class="label" id="ordor-menu-category-item-price-label">Price</label>
                        <div class="control">
                            <input v-model.number="item.price" class="input"
                                   aria-describedby="ordor-menu-category-item-price-label" min="0" type="number"
                                   aria-label="Price" @change="updateMenuCategoryItem">
                        </div>
                    </div>

                    <div class="field">
                        <label class="label" id="ordor-menu-category-item-description-label">Description</label>
                        <div class="control">
                            <input v-model="item.description" class="input"
                                   aria-describedby="ordor-menu-category-item-description-label" type="text"
                                   aria-label="Description" @change="updateMenuCategoryItem">
                        </div>
                    </div>

                    <h6 class="title is-6">Options</h6>

                    <div class="field">
                        <label class="checkbox">
                            <input type="checkbox" v-model="item.active">
                            Available item
                        </label>
                    </div>

                </div>
            </div>

        </div>
        <div class="card-footer">

            <div class="card-footer-item field is-grouped">
                <p class="control">
                    <button class="button is-success" @click="saveMenuCategoryItem">Save item</button>
                </p>
                <p class="control">
                    <button class="button is-danger" @click="removeMenuCategoryItem">Remove item</button>
                </p>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "MenuCategoryItemModal",
        props: ['category', 'item'],
        methods: {
            updateMenuCategoryItem: function () {
                this.$store.dispatch('updateMenuCategoryItem', {category: this.category, item: this.item})
            },
            saveMenuCategoryItem: async function () {

                await this.$store.dispatch('saveMenuCategoryItem', {category: this.category, item: this.item})

                this.$emit('close')
            },
            removeMenuCategoryItem: async function () {

                await this.$store.dispatch('deleteMenuCategoryItem', {category: this.category, item: this.item._id})

                this.$emit('close')
            }
        }
    }
</script>

<style scoped>
</style>
