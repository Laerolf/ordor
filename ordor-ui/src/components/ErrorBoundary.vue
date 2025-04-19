<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

const error = ref<Error | null>(null)
const errorInfo = ref<string>('')

onErrorCaptured((err, instance, info) => {
  error.value = err
  errorInfo.value = info
  return false
})
</script>

<template>
  <div v-if="error" class="error-boundary">
    <h2>エラーが発生しました</h2>
    <details>
      <summary>エラーの詳細</summary>
      <pre>{{ error?.message }}</pre>
      <pre>{{ errorInfo }}</pre>
    </details>
    <button @click="error = null">再試行</button>
  </div>
  <slot v-else />
</template>

<style scoped lang="scss">
.error-boundary {
  padding: 1rem;
  border: 1px solid #ff4444;
  border-radius: 4px;
  background-color: #fff5f5;
  color: #ff4444;

  h2 {
    margin: 0 0 1rem 0;
  }

  details {
    margin: 1rem 0;
    
    summary {
      cursor: pointer;
    }

    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
      background-color: #fff;
      padding: 0.5rem;
      border-radius: 4px;
    }
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #ff4444;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #ff3333;
    }
  }
}
</style> 