import { mount } from '@vue/test-utils'
import { expect } from 'vitest'
import PaymentView from '../src/views/PaymentView.vue'

describe('PaymentView', () => {
  it('selects payment method', async () => {
    const wrapper = mount(PaymentView)
    const creditRadio = wrapper.find('input[value="credit"]')
    const cashRadio = wrapper.find('input[value="cash"]')

    await creditRadio.trigger('click')
    expect(wrapper.find('input[value="credit"]').element.checked).toBe(true)

    await cashRadio.trigger('click')
    expect(wrapper.find('input[value="cash"]').element.checked).toBe(true)
  })

  it('completes payment', async () => {
    const wrapper = mount(PaymentView)
    await wrapper.find('button').trigger('submit')

    expect(wrapper.text()).toContain('支払いが完了しました！')
  })
}) 