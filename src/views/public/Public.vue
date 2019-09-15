<template>
    <div id="public">

        <PublicHeader/>

        <div>

            <div class="columns is-centered">
                <div class="column is-half">
                    <router-view/>
                </div>
            </div>

        </div>

        <PublicFooter/>

    </div>
</template>

<script>

    import PublicHeader from '@/components/public/headers/PublicHeader'
    import PublicFooter from '@/components/public/footers/PublicFooter'

    export default {
        name: "public",
        components: {
            PublicFooter,
            PublicHeader
        }
    }
</script>

<style scoped>

    #public {
        min-height: 100vh;
        overflow: hidden;
        display: block;
        position: relative;
        padding-bottom: 15%;
    }

    footer {
        position: absolute;
        bottom: 0;
        width: 100%;
    }

</style>
