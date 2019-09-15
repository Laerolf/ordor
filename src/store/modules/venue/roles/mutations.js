import Vue from 'vue'

export default {
    setVenueRoles: function (state, venueRoles) {
        Vue.set(this.state.venue, "roles", venueRoles)
    },
    addVenueRole: function (state, roleInfo) {
        Vue.set(this.state.venue.roles, roleInfo._id, roleInfo)
    }
}
