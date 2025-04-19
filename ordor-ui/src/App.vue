<script setup lang="ts">
import { RouterView } from 'vue-router'
import { currentError, clearError } from '@/utils/errorHandler'
import ErrorAlert from '@/components/common/ErrorAlert.vue'
</script>

<template>
  <ErrorAlert
    v-if="currentError"
    :error="currentError"
    type="error"
    dismissible
    @dismiss="clearError"
  />
  <RouterView />
</template>

<style>
#app {
  min-height: 100vh;
}
</style>
