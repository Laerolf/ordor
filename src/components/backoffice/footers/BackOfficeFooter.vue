<template>
    <footer class="footer ordor-footer">
        <div class="content">
        </div>
    </footer>
</template>

<script>
    export default {
        name: "PublicMenuFooter",
        props: ['button'],
        methods: {
            buttonClicked () {
                this.$emit('buttonClicked')
            }
        }
    }
</script>

<style scoped>

    .ordor-footer {
        background-color: #8FD694;
    }

</style>
