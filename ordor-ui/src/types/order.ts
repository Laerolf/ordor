export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  createdAt: string;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  items: OrderItem[];
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}

export const getStatusText = (status: Order['status']): string => {
  const statusMap: Record<Order['status'], string> = {
    'pending': '処理中',
    'completed': '完了',
    'cancelled': 'キャンセル'
  };
  return statusMap[status];
}; 