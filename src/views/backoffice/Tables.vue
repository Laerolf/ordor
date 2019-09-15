<template>
    <div class="container">
        <h5 class="title is-5"><font-awesome-icon icon="chair"></font-awesome-icon> Tables</h5>

        <div class="field is-grouped" v-if="activeUserHasPermission('tables','tables','full')">
            <p class="control">
                <button class="button is-success" @click="addTable">Add Table</button>
            </p>
        </div>

        <table class="table is-hoverable is-fullwidth" :class="{'no-edit':activeUserHasPermission('tables','tables','edit')}">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="table in tables" :key="table._id" @click="editTable(table)">
                <td>{{table.number}}</td>
                <td>{{table.name}}</td>
                <td>{{table.status}}</td>
            </tr>
            <tr v-if="!haveTables">
                <td colspan="3" class="has-text-centered">No tables to be found.</td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import TableModal from '@/components/backoffice/modals/TableModal'

    export default {
        name: "Tables",
        computed: {
            tables() {
                return this.$store.getters.getTables;
            },
            haveTables () {
                return Object.keys(this.tables).length > 0
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
            editTable(table) {
                if (this.activeUserHasPermission('tables','tables','edit')) {
                    this.$modal.show(TableModal, {
                        table: _.cloneDeep(table),
                        action: 'edit'
                    }, {height: 'auto', adaptive: true, clickToClose: false})
                }
            },
            async addTable() {
                await this.$store.dispatch('addTable')
            }
        }
    }
</script>

<style scoped>

    tr {
        cursor: pointer;
    }

    .no-edit{
        cursor: default;
    }

</style>
