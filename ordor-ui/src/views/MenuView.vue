<template>
  <div>
    <h1>メニュー</h1>
    <ul>
      <li v-for="item in menuItems" :key="item.id">
        {{ item.name }} - {{ item.price }}円
        <button @click="editItem(item)">編集</button>
        <button @click="deleteItem(item.id)">削除</button>
      </li>
    </ul>
    <form @submit.prevent="addItem">
      <input v-model="newItem.name" placeholder="アイテム名" required />
      <input v-model.number="newItem.price" placeholder="価格" required />
      <button type="submit">追加</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menuItems = ref([
  { id: 1, name: 'カレー', price: 500 },
  { id: 2, name: 'ラーメン', price: 700 }
])

const newItem = ref({ name: '', price: 0 })

function addItem() {
  if (newItem.value.name && newItem.value.price) {
    menuItems.value.push({
      id: menuItems.value.length + 1,
      name: newItem.value.name,
      price: newItem.value.price
    })
    newItem.value.name = ''
    newItem.value.price = 0
  }
}

function editItem(item: { id: number; name: string; price: number }) {
  newItem.value = { ...item }
  deleteItem(item.id)
}

function deleteItem(id: number) {
  menuItems.value = menuItems.value.filter(item => item.id !== id)
}
</script>
