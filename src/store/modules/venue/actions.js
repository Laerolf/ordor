export default {
    loadVenue: function (context, venueLoad) {

        context.commit('loadVenue', venueLoad);

        for (let detailKey in venueLoad.details) {
            if (venueLoad.details.hasOwnProperty(detailKey)) {
                context.commit("setVenueDetail", {key: detailKey, value: venueLoad.details[detailKey]})
            }
        }

        context.commit("saveMenu", {menu: venueLoad.menu})
        context.commit("setOrders", venueLoad.orders)
        context.commit("setUsers", venueLoad.users)
        context.commit("setTables", venueLoad.tables)
    }
}
