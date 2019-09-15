import axios from "axios";

export default {
    setVenueRoles: function (context, venueRoles) {
        context.commit("setVenueRoles", venueRoles)
    },
    addVenueRole: async function (context, roleInfo) {

        console.log(roleInfo)

        const newRole = await axios.post(`/venues/${context.rootState.venue._id}/roles`, roleInfo)

        console.log("NEW ROLE", newRole)

        context.commit("addVenueRole", newRole.data)
    },
    editVenueRole: async function (context, roleInfo) {

        const updatedRole = await axios.put(`/venues/${context.rootState.venue._id}/roles/${roleInfo._id}`, roleInfo)

        context.commit("addVenueRole", updatedRole.data)

    },
    deleteVenueRole: async function (context, roleInfo) {
        const leftRoles = await axios.delete(`/venues/${context.rootState.venue._id}/roles/${roleInfo._id}`)

        context.dispatch("setVenueRoles", leftRoles.data)
    }
}
