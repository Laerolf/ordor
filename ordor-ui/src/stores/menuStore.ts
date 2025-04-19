import { defineStore } from 'pinia';
import type { MenuItem } from '@/types/menu';
import { MenuCategory } from '@/types/menu';

interface MenuState {
  items: MenuItem[];
  selectedCategory: MenuCategory | null;
}

export const useMenuStore = defineStore('menu', {
  state: (): MenuState => ({
    items: [],
    selectedCategory: null,
  }),

  getters: {
    filteredItems: (state) => {
      if (!state.selectedCategory) return state.items;
      return state.items.filter(item => item.category === state.selectedCategory);
    },
    
    categories: (state) => {
      return Object.values(MenuCategory);
    }
  },

  actions: {
    setSelectedCategory(category: MenuCategory | null) {
      this.selectedCategory = category;
    },

    addMenuItem(item: MenuItem) {
      this.items.push(item);
    },

    removeMenuItem(id: string) {
      this.items = this.items.filter(item => item.id !== id);
    },

    // 仮のデータを設定するメソッド（後でAPIから取得するように変更予定）
    setMockData() {
      this.items = [
        {
          id: '1',
          name: 'シーザーサラダ',
          price: 800,
          category: MenuCategory.APPETIZER,
          description: '新鮮なレタスとパルメザンチーズ、クラッカーをトッピング',
        },
        {
          id: '2',
          name: 'ステーキ',
          price: 2800,
          category: MenuCategory.MAIN,
          description: '厳選されたビーフを炭火で焼き上げ',
        },
      ];
    }
  }
}); 