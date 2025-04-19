import { MenuItem } from './menu';

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  specialRequests?: string;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  createdAt: Date;
  status: OrderStatus;
  totalAmount: number;
}

export enum OrderStatus {
  NEW = 'NEW',
  PREPARING = 'PREPARING',
  SERVED = 'SERVED',
  PAID = 'PAID'
} 