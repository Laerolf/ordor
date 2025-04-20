import { mount } from '@vue/test-utils'
import OrderView from '../src/views/OrderView.vue'

describe('OrderView', () => {
  it('renders order items', () => {
    const wrapper = mount(OrderView)
    const items = wrapper.findAll('li')
    expect(items).toHaveLength(2)
  })

  it('places an order', async () => {
    const wrapper = mount(OrderView)
    await wrapper.find('input[type="checkbox"]').setChecked()
    await wrapper.find('button').trigger('click')

    expect(wrapper.text()).toContain('注文が完了しました！')
  })
}) 