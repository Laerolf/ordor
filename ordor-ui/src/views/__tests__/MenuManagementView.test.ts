import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MenuManagementView from '../MenuManagementView.vue'

describe('MenuManagementView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', () => {
    const wrapper = mount(MenuManagementView)
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the correct title', () => {
    const wrapper = mount(MenuManagementView)
    expect(wrapper.find('h1').text()).toBe('メニュー管理')
  })

  it('has all required form fields', () => {
    const wrapper = mount(MenuManagementView)
    expect(wrapper.find('input[name="name"]').exists()).toBe(true)
    expect(wrapper.find('input[name="price"]').exists()).toBe(true)
    expect(wrapper.find('select[name="category"]').exists()).toBe(true)
    expect(wrapper.find('textarea[name="description"]').exists()).toBe(true)
  })

  it('has a submit button', () => {
    const wrapper = mount(MenuManagementView)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })
}) 