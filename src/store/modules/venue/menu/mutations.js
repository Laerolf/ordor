import Vue from 'vue'

export default {
    addMenuCategory: function (state, menuCategoryInfo) {
        Vue.set(this.state.venue.menu.menuCategories, menuCategoryInfo._id, menuCategoryInfo)
    },
    updateMenuCategory: function (state, menuCategoryInfo) {
        Vue.set(this.state.venue.menu.menuCategories[menuCategoryInfo.category], menuCategoryInfo.key, menuCategoryInfo.value)
    },
    addMenuCategoryItem: function (state, menuCategoryItemInfo) {
        Vue.set(this.state.venue.menu.menuCategories[menuCategoryItemInfo.category].menuItems, menuCategoryItemInfo.item._id, menuCategoryItemInfo.item)
    },
    updateMenuCategoryItem: function (state, menuCategoryItemInfo) {
        Vue.set(this.state.venue.menu.menuCategories[menuCategoryItemInfo.category].menuItems, menuCategoryItemInfo.item._id, menuCategoryItemInfo.item)
    },
    saveMenu: function (state, menuInfo) {
        Vue.set(this.state.venue, 'menu', menuInfo.menu)
    },
    setMenuCategories: function (state, menuCategories) {
        Vue.set(this.state.venue.menu, "menuCategories", menuCategories)
    },
    setMenuCategoryItems: function (state, menuCategoryItemsInfo) {
        Vue.set(this.state.venue.menu.menuCategories[menuCategoryItemsInfo.category], "menuItems", menuCategoryItemsInfo.menuItems)
    }
}
