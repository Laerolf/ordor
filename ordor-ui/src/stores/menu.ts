import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { MenuItem, MenuCategory } from '@/types/menu'

// スタブデータ
const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'ハンバーガー',
    description: '新鮮な野菜とジューシーなパティ',
    price: 500,
    category: 'バーガー',
    imageUrl: '/images/hamburger.jpg',
    allergens: ['小麦', '乳'],
    isAvailable: true,
    preparationTime: 10
  },
  {
    id: '2',
    name: 'フライドポテト',
    description: 'カリカリのポテト',
    price: 300,
    category: 'サイド',
    imageUrl: '/images/fries.jpg',
    allergens: [],
    isAvailable: true,
    preparationTime: 5
  }
]

const MOCK_CATEGORIES: MenuCategory[] = [
  { id: '1', name: 'バーガー', description: 'ジューシーなバーガー各種' },
  { id: '2', name: 'サイド', description: 'サイドメニュー' },
  { id: '3', name: 'ドリンク', description: '各種ドリンク' }
]

export const useMenuStore = defineStore('menu', () => {
  const menuItems = ref<MenuItem[]>([])
  const categories = ref<MenuCategory[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')

  // 利用可能なメニュー項目
  const availableMenuItems = computed(() => {
    return menuItems.value.filter(item => item.isAvailable)
  })

  // 検索結果
  const searchResults = computed(() => {
    if (!searchQuery.value) return availableMenuItems.value
    
    const query = searchQuery.value.toLowerCase()
    return availableMenuItems.value.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    )
  })

  // カテゴリーでフィルタリング
  const getMenuItemsByCategory = (category: string) => {
    return availableMenuItems.value.filter(item => item.category === category)
  }

  // メニュー項目の取得（スタブ）
  const fetchMenuItems = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // APIコール（スタブ）
      await new Promise(resolve => setTimeout(resolve, 1000))
      menuItems.value = MOCK_MENU_ITEMS
      categories.value = MOCK_CATEGORIES
    } catch (e) {
      error.value = '商品の取得に失敗しました'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  return {
    menuItems,
    categories,
    isLoading,
    error,
    searchQuery,
    availableMenuItems,
    searchResults,
    getMenuItemsByCategory,
    fetchMenuItems
  }
}) 