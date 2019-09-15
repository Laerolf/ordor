<template>
    <div class="container">
        <VueQrCode :value="url"/>
    </div>
</template>

<script>

    import VueQrCode from '@chenfengyuan/vue-qrcode'

    export default {
        name: "QRCode",
        props: ['url'],
        components: {VueQrCode}
    }
</script>

<style scoped>

</style>
