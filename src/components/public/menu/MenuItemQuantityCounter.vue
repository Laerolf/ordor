<template>
    <div class="container is-fluid">
        <div class="columns is-vcentered is-centered">

            <div class="column is-inline-block is-right" id="minus">
                <button class="button is-info" @click="decreaseCount">-</button>
            </div>

            <div class="column is-inline-block has-text-centered" id="count">
                {{count}}
            </div>

            <div class="column is-inline-block is-left " id="plus">
                <button class="button is-info" @click="increaseCount">+</button>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "MenuItemQuantityCounter",
        data() {
            return {
                count: 0,
                minimumCount: 0
            }
        },
        watch: {
            count: function () {
                this.$emit('updated', Number(this.count))
            }
        },
        methods: {
            increaseCount: function () {
                this.count++
            },
            decreaseCount: function () {
                if (this.count > this.minimumCount) {
                    this.count--
                }
            }
        }
    }
</script>

<style scoped>
#count{
    vertical-align: middle;
}

@media screen and (max-width: 1023px) {
    #count {
        margin-top: 8%;
    }
}

</style>
