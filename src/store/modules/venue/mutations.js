import Vue from 'vue'

export default {
    loadVenue: function (state, venue) {
        Vue.set(this.state, "venue", venue);
    }
}
