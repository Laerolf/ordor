<template>
  <div class="menu-management">
    <h1>メニュー管理</h1>

    <div class="menu-form">
      <h2>新規メニュー追加</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">商品名</label>
          <input
            id="name"
            v-model="newItem.name"
            type="text"
            required
          >
        </div>
        <div class="form-group">
          <label for="price">価格</label>
          <input
            id="price"
            v-model.number="newItem.price"
            type="number"
            required
          >
        </div>
        <div class="form-group">
          <label for="category">カテゴリー</label>
          <select
            id="category"
            v-model="newItem.category"
            required
          >
            <option value="appetizer">前菜</option>
            <option value="main">メイン</option>
            <option value="dessert">デザート</option>
            <option value="drink">ドリンク</option>
          </select>
        </div>
        <div class="form-group">
          <label for="description">説明</label>
          <textarea
            id="description"
            v-model="newItem.description"
            rows="3"
          ></textarea>
        </div>
        <button type="submit">追加</button>
      </form>
    </div>

    <div class="menu-list">
      <h2>メニュー一覧</h2>
      <div class="menu-items">
        <div
          v-for="item in menuItems"
          :key="item.id"
          class="menu-item"
        >
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p class="price">¥{{ item.price.toLocaleString() }}</p>
            <p class="category">{{ getCategoryName(item.category) }}</p>
            <p class="description">{{ item.description }}</p>
          </div>
          <button
            class="delete-button"
            @click="handleDelete(item.id)"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMenuStore } from '@/stores/menuStore';
import type { MenuItem } from '@/types/menu';
import { MenuCategory } from '@/types/menu';

const menuStore = useMenuStore();
const menuItems = ref<MenuItem[]>([]);

const newItem = ref<Omit<MenuItem, 'id'>>({
  name: '',
  price: 0,
  category: MenuCategory.MAIN,
  description: ''
});

const getCategoryName = (category: MenuCategory): string => {
  const categories: Record<MenuCategory, string> = {
    [MenuCategory.APPETIZER]: '前菜',
    [MenuCategory.MAIN]: 'メイン',
    [MenuCategory.DESSERT]: 'デザート',
    [MenuCategory.DRINK]: 'ドリンク'
  };
  return categories[category];
};

const handleSubmit = () => {
  menuStore.addMenuItem({
    ...newItem.value,
    id: crypto.randomUUID()
  });
  newItem.value = {
    name: '',
    price: 0,
    category: MenuCategory.MAIN,
    description: ''
  };
};

const handleDelete = (id: string) => {
  menuStore.removeMenuItem(id);
};

onMounted(() => {
  menuStore.setMockData();
  menuItems.value = menuStore.items;
});
</script>

<style scoped>
.menu-management {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.menu-form {
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.menu-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.menu-item {
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.item-info {
  flex-grow: 1;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #4CAF50;
}

.category {
  color: #666;
  font-size: 0.9rem;
}

.description {
  margin-top: 0.5rem;
  color: #444;
}

.delete-button {
  background-color: #f44336;
  margin-left: 1rem;
}

.delete-button:hover {
  background-color: #da190b;
}
</style> 