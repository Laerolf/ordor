import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import InventoryView from '../InventoryView.vue'
import { inventoryApi } from '@/api/inventory'
import InventoryFormModal from '@/components/inventory/InventoryFormModal.vue'

vi.mock('@/api/inventory', () => ({
  inventoryApi: {
    getInventoryItems: vi.fn(),
    createInventoryItem: vi.fn(),
    updateInventoryItem: vi.fn(),
    updateInventoryQuantity: vi.fn(),
    deleteInventoryItem: vi.fn()
  }
}))

describe('InventoryView', () => {
  const mockInventoryItems = [
    {
      id: 1,
      name: 'ハンバーグ',
      category: 'food',
      quantity: 10,
      unit: '個',
      lowStockThreshold: 5
    },
    {
      id: 2,
      name: 'コーラ',
      category: 'drink',
      quantity: 20,
      unit: '本',
      lowStockThreshold: 10
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(inventoryApi.getInventoryItems).mockResolvedValue(mockInventoryItems)
  })

  it('在庫アイテムを正しく表示する', async () => {
    const wrapper = mount(InventoryView)
    
    // ローディング中はローディングメッセージを表示
    expect(wrapper.find('.loading').exists()).toBe(true)
    
    // データが読み込まれるのを待つ
    await wrapper.vm.$nextTick()
    
    // 在庫アイテムが正しく表示されているか確認
    const inventoryCards = wrapper.findAll('.inventory-card')
    expect(inventoryCards).toHaveLength(2)
    
    // 各アイテムの情報が正しく表示されているか確認
    expect(inventoryCards[0].find('h3').text()).toBe('ハンバーグ')
    expect(inventoryCards[0].find('.category').text()).toBe('food')
    expect(inventoryCards[0].find('.quantity input').element.value).toBe('10')
    expect(inventoryCards[0].find('.threshold').text()).toBe('最低在庫数: 5 個')
  })

  it('エラー時にエラーメッセージを表示する', async () => {
    vi.mocked(inventoryApi.getInventoryItems).mockRejectedValue(new Error('API Error'))
    const wrapper = mount(InventoryView)
    
    // エラーが発生するのを待つ
    await wrapper.vm.$nextTick()
    
    // エラーメッセージが表示されているか確認
    expect(wrapper.find('.error').exists()).toBe(true)
    expect(wrapper.find('.error').text()).toContain('在庫情報の取得に失敗しました')
  })

  it('在庫数を更新できる', async () => {
    const wrapper = mount(InventoryView)
    
    // データが読み込まれるのを待つ
    await wrapper.vm.$nextTick()
    
    // 在庫数を更新
    const quantityInput = wrapper.find('.quantity input')
    await quantityInput.setValue(15)
    await quantityInput.trigger('change')
    
    // updateInventoryQuantityが正しい引数で呼ばれたか確認
    expect(inventoryApi.updateInventoryQuantity).toHaveBeenCalledWith(1, 15)
  })

  it('新規アイテムを追加できる', async () => {
    const wrapper = mount(InventoryView)
    
    // データが読み込まれるのを待つ
    await wrapper.vm.$nextTick()
    
    // 「新規追加」ボタンをクリック
    await wrapper.find('.add-button').trigger('click')
    
    // モーダルが表示されるか確認
    expect(wrapper.findComponent(InventoryFormModal).exists()).toBe(true)
    expect(wrapper.findComponent(InventoryFormModal).props('isEdit')).toBe(false)
  })

  it('アイテムを編集できる', async () => {
    const wrapper = mount(InventoryView)
    
    // データが読み込まれるのを待つ
    await wrapper.vm.$nextTick()
    
    // 「編集」ボタンをクリック
    await wrapper.find('.edit-button').trigger('click')
    
    // モーダルが表示され、正しいデータが渡されているか確認
    expect(wrapper.findComponent(InventoryFormModal).exists()).toBe(true)
    expect(wrapper.findComponent(InventoryFormModal).props('isEdit')).toBe(true)
    expect(wrapper.findComponent(InventoryFormModal).props('initialData')).toEqual(mockInventoryItems[0])
  })

  it('アイテムを削除できる', async () => {
    const wrapper = mount(InventoryView)
    
    // データが読み込まれるのを待つ
    await wrapper.vm.$nextTick()
    
    // 「削除」ボタンをクリック
    await wrapper.find('.delete-button').trigger('click')
    
    // deleteInventoryItemが正しい引数で呼ばれたか確認
    expect(inventoryApi.deleteInventoryItem).toHaveBeenCalledWith(1)
  })
}) 