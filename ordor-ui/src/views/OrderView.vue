<template>
  <div>
    <h1>注文</h1>
    <ul>
      <li v-for="item in menuItems" :key="item.id">
        <label>
          <input type="checkbox" v-model="item.selected" />
          {{ item.name }} - {{ item.price }}円
        </label>
      </li>
    </ul>
    <button @click="placeOrder">注文する</button>
    <div v-if="orderPlaced">
      <h2>注文が完了しました！</h2>
      <ul>
        <li v-for="item in selectedItems" :key="item.id">
          {{ item.name }} - {{ item.price }}円
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const menuItems = ref([
  { id: 1, name: 'カレー', price: 500, selected: false },
  { id: 2, name: 'ラーメン', price: 700, selected: false }
])

const orderPlaced = ref(false)

const selectedItems = computed(() => menuItems.value.filter(item => item.selected))

function placeOrder() {
  if (selectedItems.value.length > 0) {
    orderPlaced.value = true
    // 注文処理をここに追加
  }
}
</script> 