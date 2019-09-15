export default {
    getVenueId: function (localState, getters, state) {
            return state.venue._id
    },
    getVenueDetails: function (localState, getters, state) {
            return state.venue.details
    }
}
