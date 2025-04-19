import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { OrderHistory } from '@/types';

export const useOrderHistoryStore = defineStore('orderHistory', () => {
  const orderHistories = ref<OrderHistory[]>([]);

  const addOrderHistory = (order: OrderHistory) => {
    orderHistories.value.push(order);
  };

  const getOrderHistory = (id: string) => {
    return orderHistories.value.find(order => order.id === id);
  };

  const getAllOrderHistories = () => {
    return orderHistories.value;
  };

  return {
    orderHistories,
    addOrderHistory,
    getOrderHistory,
    getAllOrderHistories
  };
}); 