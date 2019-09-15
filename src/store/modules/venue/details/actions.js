import axios from "axios";

export default {
    setVenueDetail: function (context, detailInfo) {
        context.commit('setVenueDetail', detailInfo)
    },
    updateVenueDetails: async function (context) {

        const updatedDetails = await axios.put(`/venues/${context.rootState.venue._id}/details`, context.getters.getVenueDetails);

        for (let key in updatedDetails.data) {
            if (updatedDetails.data.hasOwnProperty(key)) {

                await context.dispatch("setVenueDetail", {key: key, value: updatedDetails.data[key]})

            }
        }
    }
}
