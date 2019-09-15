import Vue from 'vue'

export default {
    addOrder: function (state, orderInfo) {
        Vue.set(this.state.venue.orders, orderInfo._id, orderInfo)
    },
    updateOrder: function (state, orderInfo) {
        Vue.set(this.state.venue.orders[orderInfo.order].items, orderInfo.item, {
            item: orderInfo.item,
            quantity: orderInfo.quantity,
            category: orderInfo.category
        });
    },
    setOrders: function (state, orders) {
        Vue.set(this.state.venue, "orders", orders)
    },
    setOrder: function(state, order) {
        Vue.set(this.state.venue.orders, order._id, order);
    }
}
