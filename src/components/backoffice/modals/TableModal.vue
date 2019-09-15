<template>
    <div class="card">
        <div class="card-header">
            <div class="card-header-title">{{table.name}}</div>
        </div>
        <div class="card-content">

            <div class="content">

                <div class="field">
                    <label class="label" id="ordor-tables-name-label">Name</label>
                    <div class="control">
                        <input v-model="table.name" class="input"
                               aria-describedby="ordor-tables-name-label" type="text" aria-label="Name">
                    </div>
                </div>

                <div class="container has-text-centered" v-if="table._id">
                <QRCode :url='`http://192.168.1.59:8080/venue/${venueId}/table/${table._id}`'/>
                </div>

            </div>
        </div>
        <div class="card-footer">

            <div class="card-footer-item field is-grouped">
                <p class="control">
                    <button v-if="action==='edit'" class="button is-success" @click="saveTable">Save table</button>
                </p>
                <p class="control">
                    <button v-if="action==='edit'" class="button is-danger" @click="deleteTable">Delete table</button>
                </p>
            </div>

        </div>
    </div>
</template>

<script>

    import Vue from 'vue'
    import QRCode from '@/components/backoffice/QRCode'

    import axios from 'axios'

    export default {
        name: "TableModal",
        components: {QRCode},
        props: ['table', 'action'],
        computed: {
          venueId () {
              return this.$store.getters.getVenueId;
          }
        },
        methods: {
            async saveTable() {
                await this.$store.dispatch("updateTable",this.table)

                this.$emit('close')
            },
            deleteTable() {
                this.$store.dispatch('deleteTable', {_id: this.table._id})
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>
