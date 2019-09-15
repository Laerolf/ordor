import Vue from 'vue'

export default {
    setVenueDetail: function (state,detailInfo) {
        Vue.set(this.state.venue.details, detailInfo.key, detailInfo.value)
    }
}
