import { mount } from '@vue/test-utils'
import MenuView from '../src/views/MenuView.vue'

describe('MenuView', () => {
  it('renders menu items', () => {
    const wrapper = mount(MenuView)
    const items = wrapper.findAll('li')
    expect(items).toHaveLength(2)
  })

  it('adds a new menu item', async () => {
    const wrapper = mount(MenuView)
    await wrapper.find('input[placeholder="アイテム名"]').setValue('うどん')
    await wrapper.find('input[placeholder="価格"]').setValue('600')
    await wrapper.find('button[type="submit"]').trigger('submit')

    const items = wrapper.findAll('li')
    expect(items).toHaveLength(3)
    expect(wrapper.text()).toContain('うどん - 600円')
  })
}) 