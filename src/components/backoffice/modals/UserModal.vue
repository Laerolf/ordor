<template>

    <div class="card">
        <div class="card-header">
            <p class="card-header-title" v-if="action !== 'add' && haveName">{{user.name.firstName}}
                {{user.name.lastName}}</p>
            <p class="card-header-title" v-if="action !== 'add'  && !haveName">John Doe</p>
            <p class="card-header-title" v-if="action === 'add'">New user <span v-if="haveName">&nbsp;|&nbsp;</span>
                {{user.name.firstName}} {{user.name.lastName}}</p>
        </div>
        <div class="card-content">

            <div class="card-content">

                <div class="content">

                    <h6 class="title is-6">Overview</h6>

                    <p v-if="action !== 'add'">{{user.name.firstName}} was added on {{user.creationDate | dateify}}</p>

                    <div class="field ">
                        <label class="label" id="ordor-users-name-label">Name</label>
                        <div class="field-body is-horizontal">
                            <div class="field">
                                <p class="control">
                                    <input aria-label="ordor-users-name-label" class="input" type="text"
                                           placeholder="First name" v-model="user.name.firstName"/>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control">
                                    <input aria-label="ordor-users-name-label" class="input" type="text"
                                           placeholder="Last name" v-model="user.name.lastName">
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label" id="ordor-users-emailAddress-label">Email address</label>
                        <div class="control">
                            <input v-model="user.emailAddress" class="input"
                                   aria-describedby="ordor-users-emailAddress-label" type="text"
                                   aria-label="Email address">
                        </div>
                    </div>

                    <div class="field">
                        <label class="label" id="ordor-users-password-label">Password</label>
                        <div class="control">
                            <input v-model="user.password" class="input"
                                   aria-describedby="ordor-users-password-label" type="password"
                                   aria-label="Password">
                        </div>
                    </div>

                    <div class="field">
                        <label class="label" id="ordor-users-role-label">Role</label>
                        <div class="control">
                            <div class="select is-rounded">
                                <select aria-label="Role" v-model="user.role"
                                        aria-describedby="ordor-users-role-label" :disabled="!haveOtherOwnerRole">
                                    <option v-for="role in venueRoles" :value="role._id">{{role.name}}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        <div class="card-footer">

            <div class="card-footer-item field is-grouped">
                <p class="control">
                    <button class="button is-danger" @click="closeModal">Close</button>
                </p>
                <p class="control" v-if="action==='add'">
                    <button class="button is-success" @click="addUser">Add user</button>
                </p>
                <p class="control" v-if="action!=='add'">
                    <button class="button is-success" @click="saveUser">Save user</button>
                </p>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "UserModal",
        props: ['action', 'user'],
        computed: {
            haveName() {
                return !!(this.user.name.firstName || this.user.name.lastName)
            },
            venueRoles() {
                return this.$store.getters.getRoles
            },
            venueUsers() {
                return this.$store.getters.getUsers
            },
            haveOtherOwnerRole() {

                let haveOtherOwner = true;

                if (this.user.role === this.$store.getters.getVenue.ownerRole_id) {

                    haveOtherOwner = false

                    for (let user in this.venueUsers) {
                        if (this.venueUsers.hasOwnProperty(user)) {

                            const selectedUser = this.venueUsers[user];

                            if (selectedUser.role === this.$store.getters.getVenue.ownerRole_id && selectedUser._id !== this.user._id) {
                                haveOtherOwner = true
                            }
                        }
                    }
                }

                return haveOtherOwner
            }
        },
        methods: {
            closeModal() {
                this.$emit('close')
            },
            async addUser() {
                await this.$store.dispatch('addUser', this.user);
                this.closeModal()
            },
            async saveUser() {
                await this.$store.dispatch('saveUser', this.user);
                this.closeModal()
            }
        }
    }
</script>

<style scoped>
</style>
