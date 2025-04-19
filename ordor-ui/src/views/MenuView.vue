<template>
  <div class="menu-view">
    <h1>メニュー</h1>
    
    <div class="category-filter">
      <button
        v-for="category in categories"
        :key="category"
        :class="{ active: selectedCategory === category }"
        @click="selectCategory(category)"
      >
        {{ getCategoryName(category) }}
      </button>
    </div>

    <div class="menu-items">
      <div v-for="item in filteredItems" :key="item.id" class="menu-item">
        <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" />
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <p class="price">¥{{ item.price.toLocaleString() }}</p>
        <button @click="addToOrder(item)">注文に追加</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/stores/menuStore';
import { MenuCategory } from '@/types/menu';

const router = useRouter();
const menuStore = useMenuStore();

const { categories, filteredItems, selectedCategory } = menuStore;

onMounted(() => {
  menuStore.setMockData();
});

const selectCategory = (category: MenuCategory) => {
  menuStore.setSelectedCategory(category);
};

const getCategoryName = (category: MenuCategory): string => {
  const names: Record<MenuCategory, string> = {
    [MenuCategory.APPETIZER]: '前菜',
    [MenuCategory.MAIN]: 'メイン',
    [MenuCategory.DESSERT]: 'デザート',
    [MenuCategory.DRINK]: 'ドリンク',
  };
  return names[category];
};

const addToOrder = (item: MenuItem) => {
  // テーブル番号の入力を促すダイアログを表示
  const tableNumber = prompt('テーブル番号を入力してください');
  if (tableNumber) {
    router.push(`/order/${tableNumber}`);
  }
};
</script>

<style scoped>
.menu-view {
  padding: 20px;
}

.category-filter {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

.category-filter button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.category-filter button.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.menu-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.menu-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.menu-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.menu-item h3 {
  margin: 10px 0;
}

.price {
  font-size: 1.2em;
  font-weight: bold;
  color: #4CAF50;
}

button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #45a049;
}
</style>
