<template>
  <div v-if="error" class="error-alert" :class="type">
    <div class="error-content">
      <span class="error-icon">⚠️</span>
      <div class="error-message">
        <h3>{{ error.message }}</h3>
        <p v-if="error.details && typeof error.details === 'object'">
          {{ JSON.stringify(error.details, null, 2) }}
        </p>
      </div>
    </div>
    <button v-if="dismissible" class="dismiss-button" @click="$emit('dismiss')">×</button>
  </div>
</template>

<script setup lang="ts">
import type { AppError } from '@/utils/errorHandler'

defineProps<{
  error: AppError
  type?: 'error' | 'warning' | 'info'
  dismissible?: boolean
}>()

defineEmits<{
  (e: 'dismiss'): void
}>()
</script>

<style scoped>
.error-alert {
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.error-alert.error {
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  color: #991b1b;
}

.error-alert.warning {
  background-color: #fef3c7;
  border: 1px solid #f59e0b;
  color: #92400e;
}

.error-alert.info {
  background-color: #e0f2fe;
  border: 1px solid #3b82f6;
  color: #1e40af;
}

.error-content {
  display: flex;
  gap: 1rem;
  flex: 1;
}

.error-icon {
  font-size: 1.5rem;
}

.error-message {
  flex: 1;
}

.error-message h3 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

.error-message p {
  margin: 0;
  font-size: 0.875rem;
  white-space: pre-wrap;
}

.dismiss-button {
  background: none;
  border: none;
  color: inherit;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 0.5rem;
}

.dismiss-button:hover {
  opacity: 0.8;
}
</style> 