import Vue from 'vue'
import Vuex from 'vuex'

import venue from '@/store/modules/venue';
import user from '@/store/modules/user';

import details from './modules/venue/details';
import tables from './modules/venue/tables';
import menu from './modules/venue/menu';
import orders from './modules/venue/orders';
import users from './modules/venue/users';
import roles from './modules/venue/roles';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {venue: {}, user: {}},
    mutations: {
        patch: function (state, patchInfo) {
            console.log(patchInfo)

            const key = patchInfo[0].path[patchInfo[0].path.length - 1]
            patchInfo[0].path.pop(patchInfo[0].path.length - 1, 1)


            let subject = state.venue

            patchInfo[0].path.forEach(step => {
                subject = subject[step]
            })

            Vue.set(subject, key, patchInfo[0].patch)
        }
    },
    actions: {
        loadPublicData: function (context, publicData) {
            context.commit("loadVenue", publicData)
        },
        patch: function (context, patchInfo) {
            context.commit("patch", patchInfo)
        }
    }
})
store.registerModule('venue', venue)

store.registerModule(['venue','details'], details)
store.registerModule(['venue','tables'], tables)
store.registerModule(['venue','menu'], menu)
store.registerModule(['venue','orders'], orders)
store.registerModule(['venue','users'], users)
store.registerModule(['venue','roles'], roles )

store.registerModule('user', user)

export default store;
