import axios from "axios";

export default {
    addMenuCategory: async function (context) {
        const newMenuCategory = await axios.post(`/venues/${context.getters.getVenueId}/menu/menucategories`)
        context.commit('addMenuCategory', newMenuCategory.data)
    },
    updateMenuCategory: function (context, menuCategoryInfo) {
        context.commit('updateMenuCategory', menuCategoryInfo)
    },
    deleteMenuCategory: async function (context, menuCategory) {
        const menuCategories = await axios.delete(`/venues/${context.getters.getVenueId}/menu/menucategories/${menuCategory._id}`)

        context.commit('setMenuCategories', menuCategories.data)
    },
    addMenuCategoryItem: async function (context, categoryInfo) {

        const newItem = await axios.post(`/venues/${context.getters.getVenueId}/menu/menucategories/${categoryInfo.category}/menuitems`)

        context.commit('addMenuCategoryItem', {
            category: categoryInfo.category,
            item: newItem.data
        })

        return newItem.data;
    },
    deleteMenuCategoryItem: async function (context, menuItemInfo) {
        const menuItems = await axios.delete(`/venues/${context.getters.getVenueId}/menu/menucategories/${menuItemInfo.category}/menuitems/${menuItemInfo.item}`)

        context.commit("setMenuCategoryItems", {category: menuItemInfo.category, menuItems: menuItems.data})
    },
    updateMenuCategoryItem: async function (context, menuCategoryItemInfo) {
        context.commit('updateMenuCategoryItem', menuCategoryItemInfo)
    },
    saveMenu: function (context, menuInfo) {
        context.commit('saveMenu', menuInfo)
    },
    saveMenuCategoryItem: async function (context, menuCategoryItemInfo) {
        await axios.put(`/venues/${context.getters.getVenueId}/menu/menucategories/${menuCategoryItemInfo.category}/menuitems/${menuCategoryItemInfo.item._id}`, menuCategoryItemInfo.item)
    },
    saveMenuCategory: async function (context, menuCategoryInfo) {
        await axios.put(`/venues/${context.getters.getVenueId}/menu/menucategories/${menuCategoryInfo._id}`, menuCategoryInfo)
    }
}
