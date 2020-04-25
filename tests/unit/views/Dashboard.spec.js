import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import Dashboard from '@/views/Dashboard'

Vue.use(BootstrapVue)

describe('Dashboard.vue', () => {
  it('has a name', () => {
    expect(Dashboard.name).toMatch('dashboard')
  })
  it('is Vue instance', () => {
    const wrapper = shallowMount(Dashboard)
    expect(wrapper.isVueInstance()).toBe(true)
  })
  it('is Dashboard', () => {
    const wrapper = shallowMount(Dashboard)
    expect(wrapper.is(Dashboard)).toBe(true)
  })
  it('should render correct content', () => {
    const wrapper = shallowMount(Dashboard)
    expect(wrapper.find('#Dashboard').text()).toMatch('Dashboard')
  })
  test('renders correctly', () => {
    const wrapper = shallowMount(Dashboard)
    expect(wrapper.element).toMatchSnapshot()
  })
})
