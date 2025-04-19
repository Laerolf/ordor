<template>
  <div class="menu-view">
    <h1>メニュー</h1>

    <div class="category-filter">
      <button
        class="category-button"
        @click="selectCategory(null)"
        :class="{ active: !selectedCategory }"
      >
        すべて
      </button>
      <button
        v-for="category in categories"
        :key="category"
        class="category-button"
        :class="{ active: selectedCategory === category }"
        @click="selectCategory(category)"
      >
        {{ getCategoryName(category) }}
      </button>
    </div>

    <div class="menu-items">
      <div v-for="item in filteredItems" :key="item.id" class="menu-item">
        <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" class="menu-item-image" />
        <div class="menu-item-details">
          <h3>{{ item.name }}</h3>
          <p class="description">{{ item.description }}</p>
          <p class="price">¥{{ item.price.toLocaleString() }}</p>
          <button class="order-button" @click="addToOrder(item)">注文に追加</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/stores/menuStore'
import { useOrderStore } from '@/stores/orderStore'
import { MenuCategory } from '@/types/menu'
import type { MenuItem } from '@/types/menu'

const router = useRouter()
const menuStore = useMenuStore()
const orderStore = useOrderStore()

const { categories, filteredItems } = menuStore
const selectedCategory = computed(() => menuStore.$state.selectedCategory)

onMounted(() => {
  menuStore.setMockData()
})

const selectCategory = (category: MenuCategory) => {
  menuStore.setSelectedCategory(category)
}

const getCategoryName = (category: MenuCategory): string => {
  const names: Record<MenuCategory, string> = {
    [MenuCategory.APPETIZER]: '前菜',
    [MenuCategory.MAIN]: 'メイン',
    [MenuCategory.DESSERT]: 'デザート',
    [MenuCategory.DRINK]: 'ドリンク'
  }
  return names[category]
}

const addToOrder = (item: MenuItem) => {
  // テーブル番号の入力を促すダイアログを表示
  const tableNumber = prompt('テーブル番号を入力してください')
  if (tableNumber) {
    orderStore.setTableNumber(tableNumber)
    orderStore.addItem(item)
    router.push('/order')
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleItemClick = (item: MenuItem) => {
  // TODO: 注文画面への遷移やカートへの追加など、必要な処理を実装
  console.log('Item clicked:', item)
}
</script>

<style scoped>
.menu-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.category-filter {
  margin: 2rem 0;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.category-button {
  padding: 0.75rem 1.5rem;
  border: 2px solid #4caf50;
  border-radius: 25px;
  background: white;
  color: #4caf50;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-button:hover {
  background: #4caf50;
  color: white;
}

.category-button.active {
  background: #4caf50;
  color: white;
}

.menu-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.menu-item {
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  background: white;
  cursor: pointer;
}

.menu-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.menu-item-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.menu-item-details {
  padding: 1.5rem;
}

.menu-item h3 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: #333;
}

.description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.price {
  font-size: 1.4rem;
  font-weight: bold;
  color: #4caf50;
  margin: 1rem 0;
}

.order-button {
  width: 100%;
  background: #4caf50;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.order-button:hover {
  background: #45a049;
}

@media (max-width: 768px) {
  .menu-view {
    padding: 1rem;
  }

  .menu-items {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
}
</style>
