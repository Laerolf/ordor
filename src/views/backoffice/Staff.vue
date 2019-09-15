<template>
    <div class="container">
        <h5 class="title is-5"><font-awesome-icon icon="users"></font-awesome-icon> Staff</h5>

        <div class="field is-grouped" v-if="activeUserHasPermission('staff','details','full')">
            <p class="control">
                <button class="button is-success" @click="addUser">Add staff user</button>
            </p>
        </div>

        <table class="table is-hoverable is-fullwidth">
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Function</th>
                <th scope="col">Created on</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="haveUsers" v-for="user in users" @click="showUserDetails(user)" :class="{'no-edit' : !activeUserHasPermission('staff','details','edit')}">
                <td>{{user.name.firstName}} {{user.name.lastName}}</td>
                <td>{{getVenueRoleById(user.role).name}}</td>
                <td>{{user.creationDate | dateify}}</td>
            </tr>
            <tr v-if="!haveUsers" class="no-users">
                <td colspan="3" class="has-text-centered">No staff users available</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import _ from 'lodash';
    import UserModal from "@/components/backoffice/modals/UserModal"

    export default {
        name: "Users",
        computed: {
            users: function () {
                return this.$store.getters.getUsers
            },
            haveUsers: function() {
                if (this.users) {
                    return Object.keys(this.users).length > 0
                }
                return false
            },
            venueRoles: function () {
                return this.$store.getters.getRoles;
            },
            activeUserPermissions() {
                return this.venueRoles[this.$store.getters.getActiveUser.role].permissions
            }
        },
        methods: {
            activeUserHasPermission(subject, item, permission) {
                return this.activeUserPermissions[subject].items[item].permissions[permission]
            },
            addUser: async function() {

                const emptyUser = {
                    name: {
                        firstName: undefined,
                        lastName: undefined
                    },
                    emailAddress: undefined,
                    role: undefined,
                    password: undefined
                }

                this.$modal.show(UserModal, {
                    user: emptyUser,
                    action: 'add'
                }, {height: 'auto', adaptive: true, clickToClose: false})
            },
            showUserDetails: function(user) {
                if(this.activeUserHasPermission('staff','details','edit'))
                this.$modal.show(UserModal, {
                    user: _.cloneDeep(user) ,
                    action: 'edit'
                }, {height: 'auto', adaptive: true, clickToClose: false})
            },
            getVenueRoleById: function (roleId) {
                return this.venueRoles[roleId]
            }
        }
    }
</script>

<style scoped>

    tr {
        cursor: pointer;
    }

    .no-users {
        cursor: inherit;
    }

    .no-edit > td {
        cursor: default;
    }

</style>
