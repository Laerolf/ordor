<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useMenuStore } from '@/stores/menu'
import MenuItemCard from '@/components/MenuItemCard.vue'

const menuStore = useMenuStore()

onMounted(() => {
  menuStore.fetchMenuItems()
})

const selectedCategory = ref<string | null>(null)

const filteredMenuItems = computed(() => {
  if (!selectedCategory.value) {
    return menuStore.availableMenuItems
  }
  return menuStore.getMenuItemsByCategory(selectedCategory.value)
})
</script>

<template>
  <div class="menu-view">
    <h1>メニュー</h1>

    <div class="category-filter">
      <button
        v-for="category in menuStore.categories"
        :key="category"
        :class="{ active: selectedCategory === category }"
        @click="selectedCategory = selectedCategory === category ? null : category"
      >
        {{ category }}
      </button>
    </div>

    <div v-if="menuStore.isLoading" class="loading">
      読み込み中...
    </div>

    <div v-else-if="menuStore.error" class="error">
      {{ menuStore.error }}
    </div>

    <div v-else class="menu-grid">
      <MenuItemCard
        v-for="item in filteredMenuItems"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    margin: 0 0 2rem 0;
    font-size: 2rem;
    color: #2d3748;
  }

  .category-filter {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;

    button {
      padding: 0.5rem 1rem;
      background-color: #f7fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      color: #4a5568;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background-color: #edf2f7;
      }

      &.active {
        background-color: #4299e1;
        color: white;
        border-color: #4299e1;
      }
    }
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
</style>
