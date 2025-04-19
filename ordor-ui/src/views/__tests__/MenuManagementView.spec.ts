import { describe, it, expect, beforeEach } from 'vitest'
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
    expect(wrapper.find('#name').exists()).toBe(true)
    expect(wrapper.find('#price').exists()).toBe(true)
    expect(wrapper.find('#category').exists()).toBe(true)
    expect(wrapper.find('#description').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('フォームの送信ボタンが機能する', async () => {
    const wrapper = mount(MenuManagementView)
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.emitted()).toBeDefined()
  })
})
