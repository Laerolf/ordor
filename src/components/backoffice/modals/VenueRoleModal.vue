<template>
    <div class="card">
        <div class="card-header">
            <p v-if="action !== 'edit'" class="card-header-title">New role <span v-if="haveName">&nbsp;|&nbsp;{{role.name}}</span>
            </p>
            <p v-if="action === 'edit'" class="card-header-title">Edit role | {{role.name}}</p>
        </div>
        <div class="card-content">
            <div class="content">

                <h6 class="title is-6">Details</h6>

                <div class="field">
                    <label class="label" id="ordor-roles-name-label">Role name</label>
                    <div class="control">
                        <input v-model="role.name" class="input"
                               aria-describedby="ordor-roles-name-label" type="text" aria-label="Name">
                    </div>
                </div>

                <h6 class="title is-6">Permissions</h6>

                <div class="box" v-for="(subject, subjectMapName) in role.permissions" :key="subjectMapName">

                    <h6 class="title is-6">{{subject.subject}}</h6>

                    <table class="table is-hoverable is-fullwidth">
                        <thead>
                        <tr>
                            <th scope="col">Item</th>
                            <th scope="col" class="has-text-centered">Read</th>
                            <th scope="col" class="has-text-centered">Edit</th>
                            <th scope="col" class="has-text-centered">Full control</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, itemMapName) in subject.items" :key="`${subjectMapName}-${itemMapName}`">
                            <td>{{item.item}}</td>
                            <td class="has-text-centered"><input
                                    v-on:input="setSelectedPermission(subjectMapName, itemMapName,'read')"
                                    type="checkbox"
                                    v-model="item.permissions['read']"
                                    :disabled="isOwnerRole"
                                    aria-label="Read"/></td>
                            <td class="has-text-centered"><input
                                    v-on:input="setSelectedPermission(subjectMapName, itemMapName,'edit')"
                                    type="checkbox"
                                    v-model="item.permissions['edit']"
                                    :disabled="isOwnerRole"
                                    aria-label="Edit"/></td>
                            <td class="has-text-centered"><input
                                    v-on:input="setSelectedPermission(subjectMapName, itemMapName,'full')"
                                    type="checkbox"
                                    v-model="item.permissions['full']"
                                    :disabled="isOwnerRole"
                                    aria-label="Full control"/></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        <div class="card-footer">
            <div class="card-footer-item field is-grouped">
                <p class="control">
                    <button class="button is-success" @click="saveRole">Save role</button>
                </p>
                <p class="control">
                    <button v-if="action==='edit' && !isOwnerRole" class="button is-danger" @click="deleteRole">Delete role</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VenueRoleModal",
        props: ['action', 'role'],
        computed: {
            haveName() {
                if (this.role.name) {
                    return this.role.name.length > 0
                } else {
                    return false
                }
            },
            isOwnerRole () {
                if (this.action !== 'add') {
                    return this.$store.getters.getRoles[this.role._id]._id === this.$store.getters.getVenue.ownerRole_id
                }
            }
        },
        methods: {
            setSelectedPermission(subjectMapName, itemMapName, permissionType) {

                const value = !this.role.permissions[subjectMapName].items[itemMapName].permissions[permissionType]

                switch (permissionType) {
                    case "full":
                        this.role.permissions[subjectMapName].items[itemMapName].permissions["read"] = value;
                        this.role.permissions[subjectMapName].items[itemMapName].permissions["edit"] = value;
                        this.role.permissions[subjectMapName].items[itemMapName].permissions["full"] = value;
                        break;

                    case "edit":
                        this.role.permissions[subjectMapName].items[itemMapName].permissions["read"] = true;
                        this.role.permissions[subjectMapName].items[itemMapName].permissions["edit"] = value;
                        this.role.permissions[subjectMapName].items[itemMapName].permissions["full"] = false;
                        break;

                    case "read":
                        this.role.permissions[subjectMapName].items[itemMapName].permissions["read"] = value;
                        this.role.permissions[subjectMapName].items[itemMapName].permissions["edit"] = false;
                        this.role.permissions[subjectMapName].items[itemMapName].permissions["full"] = false;
                        break;
                }

            },
            async saveRole() {
                if (this.action === 'add') {
                    this.$store.dispatch("addVenueRole", this.role)
                } else {
                    this.$store.dispatch("editVenueRole", this.role)
                }
                this.$emit('close')
            },
            async deleteRole() {
                    this.$emit('close')
                    await this.$store.dispatch("deleteVenueRole", this.role)
            }
        }
    }
</script>

<style scoped>

</style>
