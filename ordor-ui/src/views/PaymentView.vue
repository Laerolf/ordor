<template>
  <div>
    <h1>支払い</h1>
    <form @submit.prevent="processPayment">
      <label>
        <input type="radio" v-model="paymentMethod" value="credit" /> クレジットカード
      </label>
      <label>
        <input type="radio" v-model="paymentMethod" value="cash" /> 現金
      </label>
      <button type="submit">支払いを完了する</button>
    </form>
    <div v-if="paymentCompleted">
      <h2>支払いが完了しました！</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const paymentMethod = ref('credit')
const paymentCompleted = ref(false)

function processPayment() {
  if (paymentMethod.value) {
    paymentCompleted.value = true
    // 支払い処理をここに追加
  }
}
</script> 