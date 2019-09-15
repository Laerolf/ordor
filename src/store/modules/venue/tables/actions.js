import axios from "axios";

export default {
    deleteTable: async function (context, tableInfo) {

        const tables = await axios.delete(`/venues/${context.getters.getVenueId}/tables/${tableInfo._id}`)

        context.commit('setTables', tables.data)

        //context.commit('renumberTables')
    },
    addTable: async function (context, tableData) {

        const newTable = await axios.post(`/venues/${context.getters.getVenueId}/tables`, tableData)

        await context.commit('addTable', newTable.data)

    },
    updateTable: async function (context, table) {

        const tableSafe = await axios.put(`/venues/${context.getters.getVenueId}/tables/${table._id}`, table)

        await context.commit('addTable', tableSafe.data)

    }
}
