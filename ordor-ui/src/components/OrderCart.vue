<script setup lang="ts">
import { computed } from 'vue'
import { useOrderStore } from '@/stores/order'
import { useMenuStore } from '@/stores/menu'

const orderStore = useOrderStore()
const menuStore = useMenuStore()

const removeItem = (orderItemId: string) => {
  orderStore.removeItemFromOrder(orderItemId)
}

const updateQuantity = (orderItemId: string, quantity: number) => {
  if (quantity < 1) return
  orderStore.updateItemQuantity(orderItemId, quantity)
}

const submitOrder = async () => {
  await orderStore.submitOrder()
}
</script>

<template>
  <div class="order-cart">
    <h2>注文カート</h2>

    <div v-if="!orderStore.currentOrder?.items.length" class="empty-cart">
      カートは空です
    </div>

    <div v-else class="cart-items">
      <div v-for="item in orderStore.currentOrder?.items" :key="item.id" class="cart-item">
        <div class="item-info">
          <h3>{{ menuStore.getMenuItemById(item.menuItemId)?.name }}</h3>
          <p v-if="item.specialInstructions" class="special-instructions">
            {{ item.specialInstructions }}
          </p>
        </div>

        <div class="item-controls">
          <div class="quantity-control">
            <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
          </div>

          <button class="remove-item" @click="removeItem(item.id)">
            削除
          </button>
        </div>

        <div class="item-price">
          {{ (menuStore.getMenuItemById(item.menuItemId)?.price || 0) * item.quantity }}円
        </div>
      </div>
    </div>

    <div v-if="orderStore.currentOrder?.items.length" class="cart-summary">
      <div class="total">
        <span>合計:</span>
        <span>{{ orderStore.currentOrder?.totalAmount.toLocaleString('ja-JP') }}円</span>
      </div>

      <button
        class="submit-order"
        @click="submitOrder"
        :disabled="orderStore.isLoading"
      >
        {{ orderStore.isLoading ? '注文中...' : '注文を確定' }}
      </button>
    </div>

    <div v-if="orderStore.error" class="error">
      {{ orderStore.error }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-cart {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    margin: 0 0 1.5rem 0;
    font-size: 1.5rem;
    color: #2d3748;
  }

  .empty-cart {
    text-align: center;
    padding: 2rem;
    color: #718096;
  }

  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f7fafc;
    border-radius: 4px;

    .item-info {
      flex: 1;

      h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
        color: #2d3748;
      }

      .special-instructions {
        margin: 0;
        font-size: 0.875rem;
        color: #718096;
      }
    }

    .item-controls {
      display: flex;
      align-items: center;
      gap: 1rem;

      .quantity-control {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        button {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #edf2f7;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          color: #4a5568;

          &:hover {
            background: #e2e8f0;
          }
        }

        span {
          min-width: 24px;
          text-align: center;
        }
      }

      .remove-item {
        padding: 0.25rem 0.5rem;
        background: #fed7d7;
        border: none;
        border-radius: 4px;
        color: #c53030;
        cursor: pointer;
        font-size: 0.875rem;

        &:hover {
          background: #feb2b2;
        }
      }
    }

    .item-price {
      font-weight: bold;
      color: #2d3748;
    }
  }

  .cart-summary {
    border-top: 1px solid #e2e8f0;
    padding-top: 1.5rem;

    .total {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      font-size: 1.25rem;
      font-weight: bold;
      color: #2d3748;
    }

    .submit-order {
      width: 100%;
      padding: 1rem;
      background: #4299e1;
      border: none;
      border-radius: 4px;
      color: white;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover:not(:disabled) {
        background: #3182ce;
      }

      &:disabled {
        background: #a0aec0;
        cursor: not-allowed;
      }
    }
  }

  .error {
    margin-top: 1rem;
    padding: 0.75rem;
    background: #fff5f5;
    border: 1px solid #fed7d7;
    border-radius: 4px;
    color: #c53030;
    font-size: 0.875rem;
  }
}
</style> 