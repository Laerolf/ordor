<template>
  <div>
    <h1>メニュー</h1>
    <ul>
      <li v-for="item in menuItems" :key="item.id">
        <img :src="item.imageUrl" alt="{{ item.name }}" style="width: 100px; height: auto;" />
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
  { id: 1, name: 'カレー', price: 500, imageUrl: 'https://picsum.photos/seed/curry/100' },
  { id: 2, name: 'ラーメン', price: 700, imageUrl: 'https://picsum.photos/seed/ramen/100' },
  { id: 3, name: 'そば', price: 600, imageUrl: 'https://picsum.photos/seed/soba/100' },
  { id: 4, name: '焼きカレー', price: 800, imageUrl: 'https://picsum.photos/seed/yaki-curry/100' },
  { id: 5, name: 'ピザ', price: 1000, imageUrl: 'https://picsum.photos/seed/pizza/100' }
])

const newItem = ref({ name: '', price: 0 })

function addItem() {
  if (newItem.value.name && newItem.value.price) {
    menuItems.value.push({
      id: menuItems.value.length + 1,
      name: newItem.value.name,
      price: newItem.value.price,
      imageUrl: ''
    })
    newItem.value.name = ''
    newItem.value.price = 0
  }
}

function editItem(item: { id: number; name: string; price: number; imageUrl: string }) {
  newItem.value = { ...item }
  alert(`編集モード: ${item.name}`);
}

function deleteItem(id: number) {
  const item = menuItems.value.find(item => item.id === id);
  if (item) {
    newItem.value.name = `削除: ${item.name}`;
    alert(`削除: ${item.name}`);
  }
}
</script>
