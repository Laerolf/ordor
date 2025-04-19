import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import StaffManagementView from '../StaffManagementView.vue'
import { staffApi } from '@/api/staff'
import StaffFormModal from '@/components/staff/StaffFormModal.vue'

vi.mock('@/api/staff', () => ({
  staffApi: {
    getStaffList: vi.fn(),
    createStaff: vi.fn(),
    updateStaff: vi.fn()
  }
}))

describe('StaffManagementView', () => {
  const mockStaffList = [
    {
      id: 1,
      name: '山田太郎',
      email: 'yamada@example.com',
      role: 'manager',
      isActive: true
    },
    {
      id: 2,
      name: '鈴木花子',
      email: 'suzuki@example.com',
      role: 'staff',
      isActive: false
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(staffApi.getStaffList).mockResolvedValue(mockStaffList)
  })

  it('スタッフ一覧を正しく表示する', async () => {
    const wrapper = mount(StaffManagementView)
    
    // ローディング中はローディングメッセージを表示
    expect(wrapper.find('.loading').exists()).toBe(true)
    
    // データが読み込まれるのを待つ
    await wrapper.vm.$nextTick()
    
    // スタッフ一覧が正しく表示されているか確認
    const staffCards = wrapper.findAll('.staff-card')
    expect(staffCards).toHaveLength(2)
    
    // 各スタッフの情報が正しく表示されているか確認
    expect(staffCards[0].find('h3').text()).toBe('山田太郎')
    expect(staffCards[0].find('.staff-details p').text()).toBe('yamada@example.com')
    expect(staffCards[0].find('.status').text()).toBe('アクティブ')
    expect(staffCards[0].find('.status').classes('active')).toBe(true)
  })

  it('エラー時にエラーメッセージを表示する', async () => {
    vi.mocked(staffApi.getStaffList).mockRejectedValue(new Error('API Error'))
    const wrapper = mount(StaffManagementView)
    
    // エラーが発生するのを待つ
    await wrapper.vm.$nextTick()
    
    // エラーメッセージが表示されているか確認
    expect(wrapper.find('.error').exists()).toBe(true)
    expect(wrapper.find('.error').text()).toContain('スタッフ情報の取得に失敗しました')
  })

  it('新規スタッフを追加できる', async () => {
    const wrapper = mount(StaffManagementView)
    
    // データが読み込まれるのを待つ
    await wrapper.vm.$nextTick()
    
    // 「新規追加」ボタンをクリック
    await wrapper.find('.add-button').trigger('click')
    
    // モーダルが表示されるか確認
    expect(wrapper.findComponent(StaffFormModal).exists()).toBe(true)
    expect(wrapper.findComponent(StaffFormModal).props('isEdit')).toBe(false)
  })

  it('スタッフを編集できる', async () => {
    const wrapper = mount(StaffManagementView)
    
    // データが読み込まれるのを待つ
    await wrapper.vm.$nextTick()
    
    // 「編集」ボタンをクリック
    await wrapper.find('.edit-button').trigger('click')
    
    // モーダルが表示され、正しいデータが渡されているか確認
    expect(wrapper.findComponent(StaffFormModal).exists()).toBe(true)
    expect(wrapper.findComponent(StaffFormModal).props('isEdit')).toBe(true)
    expect(wrapper.findComponent(StaffFormModal).props('initialData')).toEqual(mockStaffList[0])
  })

  it('スタッフのステータスを切り替えられる', async () => {
    const wrapper = mount(StaffManagementView)
    
    // データが読み込まれるのを待つ
    await wrapper.vm.$nextTick()
    
    // 「無効化」ボタンをクリック
    await wrapper.find('.status-button').trigger('click')
    
    // updateStaffが正しい引数で呼ばれたか確認
    expect(staffApi.updateStaff).toHaveBeenCalledWith(1, { isActive: false })
  })

  it('非アクティブなスタッフのステータスを切り替えられる', async () => {
    const wrapper = mount(StaffManagementView)
    
    // データが読み込まれるのを待つ
    await wrapper.vm.$nextTick()
    
    // 2番目のスタッフの「有効化」ボタンをクリック
    await wrapper.findAll('.status-button')[1].trigger('click')
    
    // updateStaffが正しい引数で呼ばれたか確認
    expect(staffApi.updateStaff).toHaveBeenCalledWith(2, { isActive: true })
  })
}) 