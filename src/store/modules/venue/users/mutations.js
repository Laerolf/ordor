import Vue from 'vue'

export default {
    loadUser: function (state, userData) {
        Vue.set(this.state, "user", userData)
    },
    saveUser: function (state, user) {
        Vue.set(this.state.venue.users, user._id, user)
    },
    addUser: function (state, user) {
        Vue.set(this.state.venue.users, user._id, user)
    },
    setUsers: function (state, users) {
        Vue.set(this.state.venue, "users", users)
    }
}
