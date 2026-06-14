<template>
  <div>
    <h1>ユーザー管理</h1>
    <form @submit.prevent="registerUser">
      <input v-model="newUser.username" placeholder="ユーザー名" required />
      <button type="submit">登録</button>
    </form>
    <div v-if="userRegistered">
      <h2>{{ newUser.username }} さん、ようこそ！</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const newUser = ref({ username: '' })
const userRegistered = ref(false)

function registerUser() {
  if (newUser.value.username) {
    userRegistered.value = true
    // ユーザー登録処理をここに追加
  }
}
</script> 