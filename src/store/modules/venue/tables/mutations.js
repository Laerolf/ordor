import Vue from 'vue'

export default {
    deleteTable: function (state, tableInfo) {
        if (this.state.venue.tables[tableInfo.index] === tableInfo.data) {

            Vue.delete(this.state.venue.tables, tableInfo.index)
        }
    },
    setTables: function (state, tables) {
        Vue.set(this.state.venue, "tables", tables);
    },
    addTable: function (state, tableInfo) {
        Vue.set(this.state.venue.tables, tableInfo._id, tableInfo)
    }
}
