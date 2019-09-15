import Vue from 'vue'
import Router from 'vue-router'

import BackOffice from '@/views/backoffice/BackOffice'
import Venue from '@/views/backoffice/Venue'
import Tables from '@/views/backoffice/Tables'
import BackOfficeMenu from '@/views/backoffice/Menu'
import Orders from '@/views/backoffice/Orders'
import Staff from '@/views/backoffice/Staff'

import Public from '@/views/public/Public'
import PublicMenu from '@/views/public/Menu'

import Login from '@/views/public/Login'
import Register from '@/views/public/Register'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'is-active',
    routes: [
        {
            path: '/backoffice',
            component: BackOffice,
            children: [
                {
                    path: '',
                    redirect: 'venue'
                },
                {
                    path: 'venue',
                    name: 'Venue',
                    component: Venue
                },
                {
                    path: 'tables',
                    name: 'Tables',
                    component: Tables
                },
                {
                    path: 'menu',
                    name: 'BackOfficeMenu',
                    component: BackOfficeMenu
                },
                {
                    path: 'orders',
                    name: 'Orders',
                    component: Orders
                },
                {
                    path: 'staff',
                    name: 'Staff',
                    component: Staff
                }
            ]
        },
        {
            path: '/',
            component: Public,
            children: [
                {
                    path: "",
                    redirect: "login"
                },
                {
                    path: "register",
                    name: "Register",
                    component: Register
                },
                {
                    path: "login",
                    name: "Login",
                    component: Login
                }
            ]
        },
        {
            path: "/venue/:venueId/table/:tableId",
            name: "PublicMenu",
            component: PublicMenu
        }
    ]
})

import axios from "axios"
import VueCookies from "vue-cookies"
import store from "@/store"

router.beforeEach(async (to, from, next) => {
    //console.log("FROM", from)
    //console.log("TO", to)

    if (/^\/backoffice+/i.exec(to.path)) {
        if (VueCookies.isKey('token')) {

            const token = VueCookies.get('token')
            const feedback = await axios.post("/validatetoken", token)
            //console.log("AUTHENTICATION FEEDBACK", feedback);

            if (!feedback.data.successful) {
                VueCookies.remove("token")

                router.push("/login")
            }
        } else {
            router.push("/login")
        }
    } else {
        next()
    }

    if (from.path === "/" && /^\/backoffice+/i.exec(to.path)) {
        if (VueCookies.isKey('token')) {

            const token = VueCookies.get('token')

            const venueData = await axios.get(`/venues`, {params: {token: token}})
            const userData = await axios.get(`/venues/${venueData.data._id}/users`, {params: {token: token}})
            //console.log("VENUE DATA", venueData)
            //console.log("USER DATA", userData)

            await store.dispatch("loadVenue", venueData.data)
            await store.dispatch("loadUser", userData.data)

            next()
        }
    } else {
        next()
    }

})

export default router;
