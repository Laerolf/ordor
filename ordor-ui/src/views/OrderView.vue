<script setup lang="ts">
import { onMounted } from 'vue'
import { useMenuStore } from '@/stores/menu'
import MenuItemCard from '@/components/MenuItemCard.vue'
import OrderCart from '@/components/OrderCart.vue'

const menuStore = useMenuStore()

onMounted(() => {
  menuStore.fetchMenuItems()
})
</script>

<template>
  <div class="order-view">
    <div class="menu-section">
      <h1>メニュー</h1>
      <div v-if="menuStore.isLoading" class="loading">
        読み込み中...
      </div>
      <div v-else-if="menuStore.error" class="error">
        {{ menuStore.error }}
      </div>
      <div v-else class="menu-grid">
        <MenuItemCard
          v-for="item in menuStore.availableMenuItems"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>

    <div class="cart-section">
      <OrderCart />
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-view {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;

  .menu-section {
    h1 {
      margin: 0 0 2rem 0;
      font-size: 2rem;
      color: #2d3748;
    }

    .loading,
    .error {
      text-align: center;
      padding: 2rem;
      font-size: 1.25rem;
    }

    .error {
      color: #e53e3e;
    }

    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
  }

  .cart-section {
    position: sticky;
    top: 2rem;
    height: fit-content;
  }
}
</style> 