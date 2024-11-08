import { mount } from '@vue/test-utils';
import Loader from '../Loader.vue'; 
import { describe, expect, it } from 'vitest';


describe('Loader', () => {
  it('should render the loader correctly', () => {
    const wrapper = mount(Loader);
    expect(wrapper.exists()).toBe(true);
    
    const loaderDiv = wrapper.find('.page-loader');
    expect(loaderDiv.exists()).toBe(true);
    
    const animDivs = wrapper.findAll('.anim-11 div');
    expect(animDivs.length).toBe(4); 
    
    const [div1, div2, div3, div4 ] = animDivs;
    expect(div1.element).toBeTruthy(); 
    expect(div2.element).toBeTruthy(); 
    expect(div3.element).toBeTruthy(); 
    expect(div4.element).toBeTruthy(); 
  });

  it('should have the correct CSS class applied', () => {
    const wrapper = mount(Loader);
    expect(wrapper.classes()).toContain('page-loader');
  });
});