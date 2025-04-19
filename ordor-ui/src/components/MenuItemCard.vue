<script setup lang="ts">
import { ref } from 'vue'
import type { MenuItem } from '@/types/menu'
import { useOrderStore } from '@/stores/order'

const props = defineProps<{
  item: MenuItem
}>()

const orderStore = useOrderStore()
const quantity = ref(1)
const showDetails = ref(false)
const specialInstructions = ref('')

const addToCart = () => {
  orderStore.addToCart({
    ...props.item,
    quantity: quantity.value,
    specialInstructions: specialInstructions.value || undefined
  })
  quantity.value = 1
  specialInstructions.value = ''
}
</script>

<template>
  <div class="menu-item-card">
    <img :src="item.imageUrl" :alt="item.name" class="item-image" />
    
    <div class="item-content">
      <h3>{{ item.name }}</h3>
      <p class="description">{{ item.description }}</p>
      <p class="price">¥{{ item.price.toLocaleString() }}</p>
      
      <button 
        class="details-button"
        @click="showDetails = !showDetails"
      >
        {{ showDetails ? '詳細を閉じる' : '詳細を見る' }}
      </button>

      <div v-if="showDetails" class="details">
        <p v-if="item.allergens.length > 0" class="allergens">
          <strong>アレルギー:</strong> {{ item.allergens.join(', ') }}
        </p>
        <p class="preparation-time">
          <strong>調理時間:</strong> 約{{ item.preparationTime }}分
        </p>
      </div>

      <div class="order-controls">
        <div class="quantity-control">
          <button 
            @click="quantity > 1 ? quantity-- : null"
            :disabled="quantity <= 1"
          >-</button>
          <span>{{ quantity }}</span>
          <button @click="quantity++">+</button>
        </div>

        <textarea
          v-model="specialInstructions"
          placeholder="特別な要望があればご記入ください"
          rows="2"
          class="special-instructions"
        ></textarea>

        <button 
          class="add-to-cart"
          @click="addToCart"
          :disabled="!item.isAvailable"
        >
          {{ item.isAvailable ? 'カートに追加' : '現在ご注文いただけません' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-item-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  .item-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .item-content {
    padding: 1rem;

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.25rem;
      color: #2d3748;
    }

    .description {
      color: #4a5568;
      margin-bottom: 1rem;
    }

    .price {
      font-size: 1.25rem;
      font-weight: bold;
      color: #2d3748;
      margin-bottom: 1rem;
    }

    .details-button {
      background: none;
      border: none;
      color: #4299e1;
      cursor: pointer;
      padding: 0;
      margin-bottom: 1rem;

      &:hover {
        text-decoration: underline;
      }
    }

    .details {
      margin-bottom: 1rem;
      padding: 1rem;
      background: #f7fafc;
      border-radius: 4px;

      p {
        margin: 0.5rem 0;
        color: #4a5568;

        strong {
          color: #2d3748;
        }
      }
    }

    .order-controls {
      .quantity-control {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;

        button {
          width: 32px;
          height: 32px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          background: white;
          color: #2d3748;
          cursor: pointer;

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          &:hover:not(:disabled) {
            background: #f7fafc;
          }
        }

        span {
          min-width: 32px;
          text-align: center;
        }
      }

      .special-instructions {
        width: 100%;
        margin-bottom: 1rem;
        padding: 0.5rem;
        border: 1px solid #e2e8f0;
        border-radius: 4px;
        resize: vertical;
      }

      .add-to-cart {
        width: 100%;
        padding: 0.75rem;
        background: #4299e1;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover:not(:disabled) {
          background: #3182ce;
        }

        &:disabled {
          background: #cbd5e0;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style> 