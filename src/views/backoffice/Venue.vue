<template>
    <div class="container">
        <h5 class="title is-5">
            <font-awesome-icon icon="store"></font-awesome-icon>
            Venue
        </h5>

        <section class="section" v-if="activeUserHasPermission('venue','details','read')">
            <h6 class="title is-6">Venue details</h6>

            <div class="field">
                <label class="label" id="ordor-venue-details-name-label">Name</label>
                <div class="control">
                    <input v-model="venueName" class="input"
                           aria-describedby="ordor-venue-details-name-label" v-on:blur="saveDetails" type="text"
                           aria-label="Name"
                           :disabled="!activeUserHasPermission('venue','details','edit')">
                </div>
            </div>

            <div class="field">
                <label class="label" id="ordor-venue-details-currency-label">Currency</label>
                <div class="control">
                    <div class="select is-rounded">
                        <select aria-label="Name" v-model="venueCurrency" v-on:blur="saveDetails"
                                aria-describedby="ordor-venue-details-currency-label"
                                :disabled="!activeUserHasPermission('venue','details','edit')">
                            <option value="€">Euro</option>
                            <option value="$">Dollar</option>
                            <option value="¥">Yuan</option>
                        </select>
                    </div>
                </div>
            </div>

        </section>

        <section class="section">
            <h6 class="title is-6">Roles</h6>

            <div class="field is-grouped" v-if="activeUserHasPermission('venue','roles','full')">
                <p class="control">
                    <button class="button is-success" @click="addRole">Add role</button>
                </p>
            </div>

            <table class="table is-hoverable is-fullwidth">
                <thead>
                <tr>
                    <th scope="col" class="border-right"></th>
                    <th scope="col" colspan="2" class="has-text-centered border-right">Venue</th>
                    <th scope="col" class="has-text-centered border-left border-right">Tables</th>
                    <th scope="col" colspan="3" class="has-text-centered border-left border-right">Menu</th>
                    <th scope="col" class="has-text-centered border-left border-right">Orders</th>
                    <th scope="col" colspan="3" class="has-text-centered border-left">Staff</th>
                </tr>
                <tr>
                    <th scope="col" class="border-right">Role name</th>

                    <th scope="col" class="has-text-centered">Details</th>
                    <th scope="col" class="has-text-centered border-right">Roles</th>

                    <th scope="col" class="has-text-centered border-left border-right">Tables</th>

                    <th scope="col" class="has-text-centered border-left">Menu</th>
                    <th scope="col" class="has-text-centered">Menu category</th>
                    <th scope="col" class="has-text-centered border-right">Menu category items</th>

                    <th scope="col" class="has-text-centered border-left border-right">Orders</th>

                    <th scope="col" class="has-text-centered border-left">Details</th>
                    <th scope="col" class="has-text-centered">Password</th>
                    <th scope="col" class="has-text-centered">Role</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(role, roleId) in roles" @click="editRole(role)" :class="{'no-edit':!activeUserHasPermission('venue','roles','edit')}">
                    <td class="border-right">{{role.name}}</td>
                    <td class="has-text-centered">
                        <font-awesome-icon :icon="getRoleItemPermissionIcon(roleId,'venue','details')"
                                           :class="{'has-text-success':getRoleItemPermissionIcon(roleId,'venue','details')==='check','has-text-danger':getRoleItemPermissionIcon(roleId,'venue','details')==='times'}"></font-awesome-icon>
                    </td>
                    <td class="has-text-centered border-right">
                        <font-awesome-icon :icon="getRoleItemPermissionIcon(roleId,'venue','roles')"
                                           :class="{'has-text-success':getRoleItemPermissionIcon(roleId,'venue','roles')==='check','has-text-danger':getRoleItemPermissionIcon(roleId,'venue','roles')==='times'}"></font-awesome-icon>
                    </td>
                    <td class="has-text-centered border-left border-right">
                        <font-awesome-icon :icon="getRoleItemPermissionIcon(roleId,'tables', 'tables')"
                                           :class="{'has-text-success':getRoleItemPermissionIcon(roleId,'tables','tables')==='check','has-text-danger':getRoleItemPermissionIcon(roleId,'tables','tables')==='times'}"></font-awesome-icon>
                    </td>
                    <td class="has-text-centered border-left">
                        <font-awesome-icon :icon="getRoleItemPermissionIcon(roleId,'menu', 'menu')"
                                           :class="{'has-text-success':getRoleItemPermissionIcon(roleId,'menu','menu')==='check','has-text-danger':getRoleItemPermissionIcon(roleId,'menu','menu')==='times'}"></font-awesome-icon>
                    </td>
                    <td class="has-text-centered">
                        <font-awesome-icon :icon="getRoleItemPermissionIcon(roleId,'menu','menu category')"
                                           :class="{'has-text-success':getRoleItemPermissionIcon(roleId,'menu','menu category')==='check','has-text-danger':getRoleItemPermissionIcon(roleId,'menu','menu category')==='times'}"></font-awesome-icon>
                    </td>
                    <td class="has-text-centered border-right">
                        <font-awesome-icon :icon="getRoleItemPermissionIcon(roleId,'menu','menu category items')"
                                           :class="{'has-text-success':getRoleItemPermissionIcon(roleId,'menu','menu category items')==='check','has-text-danger':getRoleItemPermissionIcon(roleId,'menu','menu category items')==='times'}"></font-awesome-icon>
                    </td>
                    <td class="has-text-centered border-left border-right">
                        <font-awesome-icon :icon="getRoleItemPermissionIcon(roleId,'orders', 'orders')"
                                           :class="{'has-text-success':getRoleItemPermissionIcon(roleId,'orders','orders')==='check','has-text-danger':getRoleItemPermissionIcon(roleId,'orders','orders')==='times'}"></font-awesome-icon>
                    </td>
                    <td class="has-text-centered border-left">
                        <font-awesome-icon :icon="getRoleItemPermissionIcon(roleId,'staff','details')"
                                           :class="{'has-text-success':getRoleItemPermissionIcon(roleId,'staff','details')==='check','has-text-danger':getRoleItemPermissionIcon(roleId,'staff','details')==='times'}"></font-awesome-icon>
                    </td>
                    <td class="has-text-centered">
                        <font-awesome-icon :icon="getRoleItemPermissionIcon(roleId,'staff','password')"
                                           :class="{'has-text-success':getRoleItemPermissionIcon(roleId,'staff','password')==='check','has-text-danger':getRoleItemPermissionIcon(roleId,'staff','password')==='times'}"></font-awesome-icon>
                    </td>
                    <td class="has-text-centered">
                        <font-awesome-icon :icon="getRoleItemPermissionIcon(roleId,'staff','role')"
                                           :class="{'has-text-success':getRoleItemPermissionIcon(roleId,'staff','role')==='check','has-text-danger':getRoleItemPermissionIcon(roleId,'staff','role')==='times'}"></font-awesome-icon>
                    </td>
                </tr>
                </tbody>
            </table>
        </section>

    </div>
</template>

<script>

    import VenueRoleModal from '@/components/backoffice/modals/VenueRoleModal'

    export default {
        name: "Venue",
        data() {
            return {
                updatedDetails: false
            }
        },
        computed: {
            venueName: {
                get() {
                    return this.$store.getters.getVenueDetails.name
                },
                set(value) {
                    this.$store.dispatch('setVenueDetail', {key: 'name', value: value})
                    this.updatedDetails = true
                }
            },
            venueCurrency: {
                get() {
                    return this.$store.getters.getVenueDetails.currency
                },
                set(value) {
                    this.$store.dispatch('setVenueDetail', {key: 'currency', value: value})
                    this.updatedDetails = true
                }
            },
            roles() {
                return this.$store.getters.getRoles;
            },
            activeUserPermissions() {
                return this.roles[this.$store.getters.getActiveUser.role].permissions
            }
        },
        methods: {
            activeUserHasPermission(subject, item, permission) {
                return this.activeUserPermissions[subject].items[item].permissions[permission]
            },
            saveDetails() {
                this.$store.dispatch("updateVenueDetails")
            },
            addRole() {
                this.$modal.show(VenueRoleModal, {
                        role: {
                            name: undefined,
                            permissions: {
                                venue: {
                                    subject: "Venue",
                                    items: {
                                        details: {
                                            item: "Details",
                                            permissions: {
                                                read: false,
                                                edit: false,
                                                full: false
                                            }
                                        },
                                        roles: {
                                            item: "Roles",
                                            permissions: {
                                                read: false,
                                                edit: false,
                                                full: false
                                            }
                                        }
                                    }
                                },
                                tables: {
                                    subject: "Tables",
                                    items: {
                                        tables: {
                                            item: "Tables",
                                            permissions: {
                                                read: false,
                                                edit: false,
                                                full: false
                                            }
                                        }
                                    }
                                },
                                menu: {
                                    subject: "Menu",
                                    items: {
                                        menu: {
                                            item: "Menu",
                                            permissions: {
                                                read: false,
                                                edit: false,
                                                full: false
                                            }
                                        },
                                        "menu category": {
                                            item: "Menu category",
                                            permissions: {
                                                read: false,
                                                edit: false,
                                                full: false
                                            }
                                        },
                                        "menu category items": {
                                            item: "Menu category items",
                                            permissions: {
                                                read: false,
                                                edit: false,
                                                full: false
                                            }
                                        }
                                    }
                                },
                                orders: {
                                    subject: "Orders",
                                    items: {
                                        orders: {
                                            item: "Orders",
                                            permissions: {
                                                read: false,
                                                edit: false,
                                                full: false
                                            }
                                        }
                                    }
                                },
                                staff: {
                                    subject: "Staff",
                                    items: {
                                        details: {
                                            item: "Details",
                                            permissions: {
                                                read: false,
                                                edit: false,
                                                full: false
                                            }
                                        },
                                        password: {
                                            item: "Password",
                                            permissions: {
                                                read: false,
                                                edit: false,
                                                full: false
                                            }
                                        },
                                        role: {
                                            item: "Role",
                                            permissions: {
                                                read: false,
                                                edit: false,
                                                full: false
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        action:
                            'add'
                    },
                    {
                        height: 'auto',
                        adaptive: true,
                        scrollable: true,
                        clickToClose: false
                    }
                )
            },
            editRole(role) {
                if (this.activeUserHasPermission('venue', 'roles', 'edit')) {
                    this.$modal.show(VenueRoleModal, {
                        role: _.cloneDeep(role),
                        action: 'edit'
                    }, {
                        height: 'auto',
                        adaptive: true,
                        scrollable: true,
                        clickToClose: false
                    })
                }
            },
            getRoleItemPermission(roleId, subject, item) {
                let itemPermission = undefined

                for (let permission in this.$store.getters.getRoles[roleId].permissions[subject].items[item].permissions) {
                    if (this.$store.getters.getRoles[roleId].permissions[subject].items[item].permissions.hasOwnProperty(permission)) {

                        const selectedPermission = this.$store.getters.getRoles[roleId].permissions[subject].items[item].permissions[permission]

                        if (selectedPermission) {
                            itemPermission = permission
                        }
                    }
                }
                return itemPermission
            },
            getRoleItemPermissionIcon(roleId, subject, item) {

                const itemPermission = this.getRoleItemPermission(roleId, subject, item)

                let icon = 'times'

                switch (itemPermission) {
                    case 'full':
                        icon = 'check'
                        break;
                    case 'edit':
                        icon = 'pen'
                        break;
                    case 'read':
                        icon = 'eye'
                        break;
                }


                return icon

            }
        }
    }
</script>

<style scoped>

    .input-group.col-4 {
        padding: 0;
    }

    tbody > tr {
        cursor: pointer;
    }

    .no-edit > td {
        cursor: default;
    }

    .border-left {
        border-left-width: 1px;
    }

    .border-right {
        border-right-width: 1px;
    }

</style>
