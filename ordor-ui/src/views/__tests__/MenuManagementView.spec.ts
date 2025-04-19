import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MenuManagementView from '../MenuManagementView.vue'
import { createPinia, setActivePinia } from 'pinia'

describe('MenuManagementView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('コンポーネントが正しくレンダリングされる', () => {
    const wrapper = mount(MenuManagementView)
    expect(wrapper.exists()).toBe(true)
  })

  it('タイトルが「メニュー管理」と表示される', () => {
    const wrapper = mount(MenuManagementView)
    expect(wrapper.find('h1').text()).toBe('メニュー管理')
  })

  it('必要なフォームフィールドが存在する', () => {
    const wrapper = mount(MenuManagementView)
    expect(wrapper.find('input[name="name"]').exists()).toBe(true)
    expect(wrapper.find('input[name="price"]').exists()).toBe(true)
    expect(wrapper.find('select[name="category"]').exists()).toBe(true)
    expect(wrapper.find('textarea[name="description"]').exists()).toBe(true)
  })
}) 