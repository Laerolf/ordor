<template>
    <div id="backoffice">

        <BrandHeader/>

        <section class="section">

            <div class="columns">

                <div class="column is-one-quarter">
                    <MainNavigation/>
                </div>

                <div class="column">
                    <router-view/>
                </div>

            </div>

        </section>

        <BackOfficeFooter :button="{text:'Ordor'}"/>

    </div>
</template>

<script>

    import BrandHeader from '@/components/backoffice/headers/BrandHeader'
    import MainNavigation from "@/components/backoffice/navigation/MainNavigation";
    import BackOfficeFooter from "@/components/backoffice/footers/BackOfficeFooter";

    export default {
        components: {
            MainNavigation,
            BrandHeader,
            BackOfficeFooter
        }
    }
</script>

<style scoped>

    body {
        color: #1E2019;
        background-color: #F4F7F5;
    }

    .navigation {
        padding: 0;
    }

    html,
    body {
        height: 100%;
        position: relative;
    }

    #backoffice {
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
