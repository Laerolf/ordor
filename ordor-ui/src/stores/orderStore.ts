import { defineStore } from 'pinia';
import { Order, OrderItem, OrderStatus } from '@/types/order';
import { MenuItem } from '@/types/menu';

interface OrderState {
  currentOrder: Order | null;
  orderHistory: Order[];
}

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    currentOrder: null,
    orderHistory: [],
  }),

  getters: {
    activeOrders: (state) => {
      return state.orderHistory.filter(order => order.status !== OrderStatus.PAID);
    },
  },

  actions: {
    createOrder(tableNumber: number) {
      this.currentOrder = {
        id: Date.now().toString(),
        tableNumber,
        items: [],
        createdAt: new Date(),
        status: OrderStatus.NEW,
        totalAmount: 0,
      };
    },

    addItemToOrder(menuItem: MenuItem, quantity: number, specialRequests?: string) {
      if (!this.currentOrder) return;

      const orderItem: OrderItem = {
        menuItem,
        quantity,
        specialRequests,
      };

      this.currentOrder.items.push(orderItem);
      this.updateTotalAmount();
    },

    updateTotalAmount() {
      if (!this.currentOrder) return;
      
      this.currentOrder.totalAmount = this.currentOrder.items.reduce(
        (total, item) => total + (item.menuItem.price * item.quantity),
        0
      );
    },

    submitOrder() {
      if (!this.currentOrder) return;

      this.orderHistory.push(this.currentOrder);
      this.currentOrder = null;
    },

    updateOrderStatus(orderId: string, status: OrderStatus) {
      const order = this.orderHistory.find(o => o.id === orderId);
      if (order) {
        order.status = status;
      }
    },
  },
}); 