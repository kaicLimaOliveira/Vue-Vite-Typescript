import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ForgottenPassword from '../forgotten-password.vue'
import FormControl from '../../components/Form/FormControl.vue';
import Button from '../../components/Button.vue';

describe('forgotten-password.vue', () => {
  it('should render componente correctly', () => {
    const wrapper = mount(ForgottenPassword, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    });

    expect(wrapper.find('h2.title').text()).toBe('Entre com seu e-mail');
    expect(wrapper.findComponent(FormControl).exists()).toBeTruthy();
    expect(wrapper.findComponent(Button).exists()).toBeTruthy();
  });

  it('should allow to type in e-mail field', async () => {
    const wrapper = mount(ForgottenPassword, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    });

    const emailInput = wrapper.findComponent(FormControl);
    await emailInput.setValue('teste@exemplo.com');

    expect(wrapper.vm.state.email).toBe('teste@exemplo.com');
  });

  it('should have "Back" button with the correct link', () => {
    const wrapper = mount(ForgottenPassword, {
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>', 
          },
        },
      },
    });

    const voltarButton = wrapper.find('a.button.is-primary');
    expect(voltarButton.exists()).toBeTruthy();
  });

  it('should submit the form by clicking "Submit"', async () => {
    const wrapper = mount(ForgottenPassword);

    const sendButton = wrapper.find('button.button.is-primary');
    expect(sendButton.exists()).toBeTruthy();

    await sendButton.trigger('click');
    expect(wrapper.exists()).toBeTruthy();
  });
});
