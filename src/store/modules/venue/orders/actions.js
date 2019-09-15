import axios from "axios";

export default {
    addOrder: async function (context, table) {

        const newOrder = await axios.post(`/venues/${context.getters.getVenueId}/orders`, table);

        context.commit("addOrder", newOrder.data)

        return newOrder.data;
    },
    deleteOrder: async function (context, order) {
        const orders = await axios.delete(`/venues/${context.getters.getVenueId}/orders/${order.order}`)

        context.commit("setOrders", orders.data)
    },
    deleteOrders: async function (context, orders) {
        const currentOrders = await axios.delete(`/venues/${context.getters.getVenueId}/orders`, {data: orders})
        context.commit("setOrders", currentOrders.data)
    },
    updateOrder: async function (context, orderUpdate) {
        context.commit("updateOrder", orderUpdate.update)

        const savedOrder = await axios.put(`/venues/${orderUpdate.venue}/orders/${orderUpdate.update.order}`, context.getters.getOrders[orderUpdate.update.order])

        context.commit("setOrder", savedOrder.data)
    }
}
