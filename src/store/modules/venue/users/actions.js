import axios from "axios";

export default {
    loadUser: function (context, userData) {
        context.commit("loadUser", userData)
    },
    saveUser: async function (context, user) {

        const updatedUser = await axios.put(`/venues/${context.rootState.venue._id}/users/${user._id}`, user)

        context.commit("saveUser", updatedUser.data)
    },
    addUser: async function (context, user) {

        const newUser = await axios.post(`/venues/${context.rootState.venue._id}/users`, user)

        context.commit("addUser", newUser.data)

        return newUser;
    }
}
