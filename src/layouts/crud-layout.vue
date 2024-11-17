<template>
  <div class="crud-layout">
    <div class="crud-layout-header">
      <div class="crud-layout-header-title">
        <span class="header-title">{{ props.title }}</span>
        <span class="header-subtitle">{{ props.subtitle }}</span>
      </div>

      <Button @click="onClick()" 
        class="is-primary"
      >
        {{ buttonText }}
      </Button>
    </div>

    <slot />
  </div>
</template>
  
<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
// import { useViewStore } from '../store/viewStore';

interface CrudLayoutProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  viewName: string;
  onClick: () => void
}

const props = withDefaults(defineProps<CrudLayoutProps>(), {
  title: 'Título',
  subtitle: 'Subtítulo',
  buttonText: 'Cadastrar'
})

// const viewStore = useViewStore()

const state = reactive({
  canCreate: false
})

// onBeforeMount(() => {
//   state.canCreate = viewStore.checkPermission(props.viewName, 'create') ?? false
// })

</script>
  
<style lang="scss" scoped>
.crud-layout {
  
  .crud-layout-header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
    
    .crud-layout-header-title {
      display: flex;
      text-align: left;
      flex-direction: column;
      justify-content: center;
      align-items: start;    

      .header-title {
        font-size: 24px;
        font-weight: 600;
      } 

      .header-subtitle {
        color: var(--grey-800);
      } 
    }

  }
}
</style>