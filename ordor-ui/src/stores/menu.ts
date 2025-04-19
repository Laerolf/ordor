import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { MenuItem } from '@/types'

export const useMenuStore = defineStore('menu', () => {
  const menuItems = ref<MenuItem[]>([])
  const categories = ref<string[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const availableMenuItems = computed(() => 
    menuItems.value.filter(item => item.isAvailable)
  )

  const getMenuItemsByCategory = computed(() => (category: string) => 
    availableMenuItems.value.filter(item => item.category === category)
  )

  const getMenuItemById = (id: string) => 
    menuItems.value.find(item => item.id === id)

  const fetchMenuItems = async () => {
    isLoading.value = true
    error.value = null
    try {
      // TODO: API呼び出しを実装
      // const response = await fetch('/api/menu')
      // menuItems.value = await response.json()
      // categories.value = [...new Set(menuItems.value.map(item => item.category))]
      
      // モックデータ
      menuItems.value = [
        {
          id: '1',
          name: 'マルゲリータピザ',
          description: 'トマトソース、モッツァレラチーズ、バジル',
          price: 1500,
          category: 'ピザ',
          isAvailable: true,
          ingredients: ['トマト', 'モッツァレラチーズ', 'バジル'],
          allergens: ['乳製品']
        },
        {
          id: '2',
          name: 'カルボナーラ',
          description: 'クリーミーな卵黄ソース、パンチェッタ、パルメザンチーズ',
          price: 1200,
          category: 'パスタ',
          isAvailable: true,
          ingredients: ['パスタ', '卵', 'パンチェッタ', 'パルメザンチーズ'],
          allergens: ['卵', '乳製品']
        }
      ]
      categories.value = ['ピザ', 'パスタ']
    } catch (err) {
      error.value = 'メニューの取得に失敗しました'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    menuItems,
    categories,
    isLoading,
    error,
    availableMenuItems,
    getMenuItemsByCategory,
    getMenuItemById,
    fetchMenuItems
  }
}) 