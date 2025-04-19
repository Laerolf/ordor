import { defineStore } from 'pinia'
import type { MenuItem } from '@/types/menu'
import { MenuCategory } from '@/types/menu'
import { setError, handleApiError } from '@/utils/errorHandler'
import { ApiService } from '@/services/api'

interface MenuState {
  items: MenuItem[]
  selectedCategory: MenuCategory | null
  isLoading: boolean
  error: string | null
}

export const useMenuStore = defineStore('menu', {
  state: (): MenuState => ({
    items: [],
    selectedCategory: null,
    isLoading: false,
    error: null
  }),

  getters: {
    filteredItems: (state: MenuState) => {
      if (!state.selectedCategory) return state.items
      return state.items.filter((item) => item.category === state.selectedCategory)
    },

    categories: () => {
      return Object.values(MenuCategory)
    }
  },

  actions: {
    setSelectedCategory(category: MenuCategory | null) {
      try {
        this.selectedCategory = category
      } catch (error) {
        setError(handleApiError(error))
      }
    },

    async fetchMenuItems() {
      try {
        this.isLoading = true
        this.error = null
        this.items = await ApiService.getMenuItems()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'メニューの取得に失敗しました'
        setError(handleApiError(error))
      } finally {
        this.isLoading = false
      }
    },

    async addMenuItem(item: Omit<MenuItem, 'id'>) {
      try {
        this.isLoading = true
        this.error = null

        if (!item.name || !item.price || !item.category) {
          throw new Error('必須項目が入力されていません')
        }

        if (item.price < 0) {
          throw new Error('価格は0以上を指定してください')
        }

        const newItem = await ApiService.createMenuItem(item)
        this.items.push(newItem)
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'メニューの追加に失敗しました'
        setError(handleApiError(error))
      } finally {
        this.isLoading = false
      }
    },

    async removeMenuItem(id: string) {
      try {
        this.isLoading = true
        this.error = null

        const itemExists = this.items.some(item => item.id === id)
        if (!itemExists) {
          throw new Error('指定された商品が見つかりません')
        }

        await ApiService.deleteMenuItem(id)
        this.items = this.items.filter((item) => item.id !== id)
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'メニューの削除に失敗しました'
        setError(handleApiError(error))
      } finally {
        this.isLoading = false
      }
    },

    async updateMenuItem(id: string, updates: Partial<MenuItem>) {
      try {
        this.isLoading = true
        this.error = null

        const updatedItem = await ApiService.updateMenuItem(id, updates)
        const index = this.items.findIndex(item => item.id === id)
        if (index !== -1) {
          this.items[index] = updatedItem
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'メニューの更新に失敗しました'
        setError(handleApiError(error))
      } finally {
        this.isLoading = false
      }
    }
  }
})
