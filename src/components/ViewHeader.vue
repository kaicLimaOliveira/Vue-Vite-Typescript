<template>
  <div class="view">
    <div class="view-header">
      <div class="view-header-title">
        <span class="header-title">{{ props.title }}</span>
        <span v-if="props.subtitle" class="header-subtitle">
          {{ props.subtitle }}
        </span>
      </div>

      <Button @click="onClick()" 
        class="is-primary"
      >
        {{ buttonText }}
      </Button>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
// import { useViewStore } from '../store/viewStore';

interface CrudLayoutProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  viewName?: string;
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
.view {
  
  .view-header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
    
    .view-header-title {
      display: flex;
      text-align: left;
      flex-direction: column;
      justify-content: center;
      align-items: start;    

      .header-title {
        font-size: 18px;
        font-weight: 600;
      } 

      .header-subtitle {
        font-size: 14px;
        color: var(--grey-800);
      } 
    }

  }
}
</style>