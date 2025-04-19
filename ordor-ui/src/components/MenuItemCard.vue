<script setup lang="ts">
import { ref } from 'vue'
import type { MenuItem } from '@/types'
import { useOrderStore } from '@/stores/order'

const props = defineProps<{
  item: MenuItem
}>()

const orderStore = useOrderStore()
const quantity = ref(1)
const specialInstructions = ref('')

const addToOrder = () => {
  orderStore.addItemToOrder(props.item.id, quantity.value, specialInstructions.value)
  quantity.value = 1
  specialInstructions.value = ''
}
</script>

<template>
  <div class="menu-item-card">
    <div class="menu-item-image" v-if="item.imageUrl">
      <img :src="item.imageUrl" :alt="item.name">
    </div>
    <div class="menu-item-content">
      <h3>{{ item.name }}</h3>
      <p class="description">{{ item.description }}</p>
      <p class="price">{{ item.price.toLocaleString('ja-JP') }}円</p>
      
      <div class="allergens" v-if="item.allergens.length">
        <span class="allergen-tag" v-for="allergen in item.allergens" :key="allergen">
          {{ allergen }}
        </span>
      </div>

      <div class="order-controls">
        <div class="quantity-control">
          <label for="quantity">数量:</label>
          <input
            type="number"
            id="quantity"
            v-model="quantity"
            min="1"
            max="10"
          >
        </div>

        <div class="special-instructions">
          <label for="instructions">特記事項:</label>
          <input
            type="text"
            id="instructions"
            v-model="specialInstructions"
            placeholder="アレルギーや調理方法のご要望"
          >
        </div>

        <button @click="addToOrder" class="add-to-order">
          注文に追加
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-item-card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  .menu-item-image {
    width: 100%;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .menu-item-content {
    padding: 1rem;

    h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
      color: #2d3748;
    }

    .description {
      margin: 0 0 0.5rem 0;
      color: #718096;
      font-size: 0.875rem;
    }

    .price {
      margin: 0 0 1rem 0;
      font-size: 1.125rem;
      font-weight: bold;
      color: #2d3748;
    }

    .allergens {
      margin-bottom: 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .allergen-tag {
        padding: 0.25rem 0.5rem;
        background-color: #f7fafc;
        border: 1px solid #e2e8f0;
        border-radius: 4px;
        font-size: 0.75rem;
        color: #4a5568;
      }
    }

    .order-controls {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      .quantity-control,
      .special-instructions {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        label {
          font-size: 0.875rem;
          color: #4a5568;
        }

        input {
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          font-size: 1rem;

          &:focus {
            outline: none;
            border-color: #4299e1;
          }
        }
      }

      .add-to-order {
        padding: 0.75rem;
        background-color: #4299e1;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: #3182ce;
        }

        &:active {
          background-color: #2c5282;
        }
      }
    }
  }
}
</style> 