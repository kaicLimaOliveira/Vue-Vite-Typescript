<template>
  <div class="dropdown">
    <div
      @click="state.show = !state.show"
      :class="{ 'closed': props.isClosed }"
      @mouseover="state.wrapperHovered = true"
      @mouseleave="state.wrapperHovered = false"
      class="dropdown-container"
      :title="props.label"
    >
      <div class="dropdown-container-label">
        <Icon :icon="props.icon" class="dropdown-container-label-icon" size="sm" />
        <span class="dropdown-container-label-content">
          {{ props.label }}
        </span>
      </div>
  
      <Icon
        v-show="!props.isClosed"
        icon="chevron-right"
        size="xs"
        :class="{ 'rotate-arrow': state.show }"
      ></Icon>
    </div>
   
    <div class="dropdown-links-container">
      <TransitionGroup name="fade-list">
        <div
          v-for="{ icon, label, params, routeName }, key in state.linksList"
          :key="key"
          :style="{ 'transition-delay': key / 20 + 's' }"
        >
          <RouterLink
            :class="{ 'closed': props.isClosed}"
            @mouseover="state.currentLinkHovered = key + 1"
            @mouseleave="state.currentLinkHovered = null"
            class="router-link"
            :to="{ name: routeName, params }"
            :title="label"
          >
            <Icon :icon class="dropdown-links-icon" size="sm" />
            <span class="dropdown-links-label">{{ label }}</span>
          </RouterLink>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>
 
<script setup lang="ts">
import { reactive, watch } from 'vue';
import { Link } from '../../interfaces/Menu';
 
 
const emit = defineEmits<{
  currentLinkHovered: [value: number | null]
}>()
 
interface Props {
  links: Link[];
  label: string;
  icon?: string | string[];
  isClosed: boolean;
}
 
const props = withDefaults(defineProps<Props>(), {
  links: () => [],
  isClosed: false,
})
 
 
interface State {
  show: boolean;
  linksList: Link[]
  sideBar: string;
  search: string;
  currentLinkHovered: number | null;
  wrapperHovered: boolean;
}
 
const state: State = reactive({
  show: false,
  linksList: [],
  sideBar: localStorage.getItem('sideBar') || 'opened',
  search: '',
  currentLinkHovered: null,
  wrapperHovered: false
})
 
watch(
  () => state.currentLinkHovered,
  (newValue) => {
    emit('currentLinkHovered', newValue === null ? null : -newValue)
  }
)
 
watch(
  () => state.wrapperHovered,
  (newValue) => {
    emit('currentLinkHovered', newValue ? 999 : null)
  }
)
 
watch(
  () => state.show,
  (newValue) => {
    if (newValue)
      state.linksList = props.links
    else
      state.linksList = []
  }
)
 
watch(
  () => props.links,
  (newValue) => {
    if (newValue && state.show)
      state.linksList = props.links
  }
)
</script>
 
<style scoped lang="scss">
.dropdown {
  width: 100%;
  display: flex;
  flex-direction: column;

  &-container {
    margin: 0px 0px 5px;
    border-radius: 4px;
    transition: .12s;
    padding: 10px;
    background-color: #ebebeb;
    font-family: 'Montserrat';
    color: var(--black-700);
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
   
    &:hover {
      background-color: var(--grey-600);
    }

    &-label {
      display: flex;

      &-icon {
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 5px;
      }
    
      &-content {
        font-size: 11px;
        margin-left: 10px;
      }
    }
  
    .rotate-arrow {
      transform: rotate(90deg);
    }
   
    &:hover .dropdown-container-label-icon,
    &:hover .dropdown-container-label-content {
      color: #fff;
    }
  }

  &-links-container {
    .router-link {
      border-radius: 4px;
      transition: .12s;
      padding: 10px;
      margin: 0px 0px 5px;
      background-color: #ebebeb;
      color: var(--black-700);
      display: flex;
      font-weight: 600;
      width: 100%;
      height: 100%;
      text-decoration: none;

      &:hover {
        background-color: var(--grey-600);

        svg, span {
          color: #fff !important;
        }
      }

      &-active {
        background-color: var(--grey-600);
        color: #fff !important;
      
        svg,
        span {
          color: #fff !important;
        }
      }
    
      .dropdown-links-icon {
        width: 1.5rem;
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .dropdown-links-label {
        font-size: 11px;
        margin-left: 10px;
      }
    }
  }
}
 
.closed .router-link,
.closed .dropdown {
  span {
    display: none;
  }
}
 
.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.5s ease;
}
 
.fade-list-enter-from,
.fade-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>