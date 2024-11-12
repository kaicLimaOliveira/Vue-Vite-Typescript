<template>
  <div class="debounce-input">
    <Input  
      icon="magnifying-glass"
      type="text" 
      :placeholder="placeholder"
      @input="triggerDebounce(($event.target as HTMLInputElement).value)"
    />

    <span v-if="hasDetailsIcon" class="details">
      <Icon icon="ellipsis-v" class="details-icon"></Icon>
      <Transition name="fade">
        <div 
          class="details-box"
          :class="[props.detailsPosition === 'right' ? 'details-right' : 'details-bottom']"
        >
          <span>{{ detailsLabel }}</span>
          <span class="triangle"></span>
          <ul class="mt-1">
            <li v-for="detail, key in detailsData" :key="key" class="ml-5">
              {{ detail }}
            </li>
          </ul>
        </div>
      </Transition>
    </span>
  </div>
</template>
    
<script setup lang="ts">
import { debounce } from '../../utils/inputs';

const emit = defineEmits(['update:modelValue'])

interface Props {
  placeholder?: string;
  delay?: number;
  hasDetailsIcon?: boolean;
  detailsLabel?: string;
  detailsData?: string[];
  detailsPosition?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Pesquisar...',
  delay: 0.5,
  hasDetailsIcon: false,
  detailsLabel: 'Você pode filtrar os seguintes campos:',
  detailsData: (props: Readonly<Props>) => [],
  detailsPosition: 'right',
})


const triggerDebounce = debounce((text: string) => {
  emit('update:modelValue', text)
}, props.delay * 1000)

</script>
    
<style lang="scss" scoped>
.debounce-input {
  display: flex;
  align-items: center;
  position: relative;

  .details {
    cursor: pointer;
    position: absolute;
    right: .75rem;
    
    &:hover svg {
      color: grey !important;
    }
  
    &:hover .details-box {
      display: block;
    }

    .details-icon {
      transition: all .150ms ease-in-out;
      /* color: #f5f5f5; */
    }
  }

  .details-box {
    display: none;
    position: absolute;
    border-radius: 6px;
    box-shadow: -1px 6px 18px rgb(0 0 0 / 14%);
    width: 300px;
    background-color: white;
    padding: 1rem;
    font-size: 13px;
    z-index: 500;
    text-align: left;

    .triangle {
      position: absolute;
      width: 0; 
      height: 0; 
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 10px solid rgb(255, 255, 255);
      left: -3%;
      top: 38%;
    }
  
    &.details-right {
      left: 50px;
    }
  
    &.details-bottom {
      top: 35px;
    }

    ul {
      margin-top: .25rem;

      li {
        list-style-type: disc;
      }
    }
  
  }
}
</style>   