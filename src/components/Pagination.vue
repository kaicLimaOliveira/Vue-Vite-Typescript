<template>
  <div class="pagination">
    <div class="pagination-previous">
      <Button 
        :class="!isPrevControlsActive && !showButtonsOnBounderies ? 'is-invisible' : 'control-items-active'"
        @click="goToPrev"
      >
        Anterior
      </Button>
    </div>

    <div class="pagination-pages">
      <span v-for="page, key in pagination" :key="key">
        <Transition name="slide">
          <Button 
            v-if="page" 
            class="page" 
            :aria-label="`Page ${page}`"
            :class="{ 'page-active': isActive(page) }"
            :style="`background-color: ${isActive(page) ? '' : 'transparent'};`" 
            @click="updatePageHandler(page)"
          >
            {{ page }}
          </Button>
        </Transition>
        </span>
    </div>

    <div class="pagination-next">
      <Button 
        :class="!isNextControlsActive && !showButtonsOnBounderies ? 'is-invisible' : 'control-items-active'"
        @click="goToNext"
      >
        Próximo
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Button from "./Button.vue";

interface PaginationProps {
  pages: number;
  modelValue: number;
  rangeSize?: number;
  showButtonsOnBounderies?: boolean;
}

const props = withDefaults(defineProps<PaginationProps>(), {
  pages: 0,
  rangeSize: 1,
  modelValue: 0,
  showButtonsOnBounderies: true,
})

const emit = defineEmits<{
  "update:modelValue": [value: number ]
}>()
const isActive = (page: number) => page === props.modelValue;


const pagination = computed(() => {
  const { pages, modelValue, rangeSize } = props;

  const res: (number | null)[] = [];
  const minPaginationElems = 5 + rangeSize * 2;

  let rangeStart = pages <= minPaginationElems ? 1 : modelValue - rangeSize;
  let rangeEnd = pages <= minPaginationElems ? pages : modelValue + rangeSize;

  rangeEnd = Math.min(rangeEnd, pages);
  rangeStart = Math.max(rangeStart, 1);

  if (pages > minPaginationElems) {
    const isStartBoundaryReached = rangeStart - 1 < 3;
    const isEndBoundaryReached = pages - rangeEnd < 3;

    if (isStartBoundaryReached) {
      rangeEnd = minPaginationElems - 2;
      for (let i = 1; i < rangeStart; i++) {
        res.push(i);
      }
    } else {
      res.push(1, null);
    }

    if (isEndBoundaryReached) {
      rangeStart = pages - (minPaginationElems - 3);
      for (let i = rangeStart; i <= pages; i++) {
        res.push(i);
      }
    } else {
      for (let i = rangeStart; i <= rangeEnd; i++) {
        res.push(i);
      }
      res.push(null, pages);
    }
  } else {
    for (let i = rangeStart; i <= rangeEnd; i++) {
      res.push(i);
    }
  }

  return res;
});

const isPrevControlsActive = computed(() => props.modelValue > 1);
const isNextControlsActive = computed(() => props.modelValue < props.pages);


function updatePageHandler(params: number) {
  emit("update:modelValue", params);
}


function goToPrev() {
  if (isPrevControlsActive.value) 
    emit("update:modelValue", props.modelValue - 1);
}


function goToNext() {
  if (isNextControlsActive.value) 
    emit("update:modelValue", props.modelValue + 1);
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;

  .pagination-previous {
    display: flex;
    align-items: center;
    margin-right: .25rem;
  }

  .pagination-pages {
    display: flex;

    .page {
      background-color: #e6e6e6;
      border: 1px solid hsl(0, 0%, 84%);
      color: #3f4244;
      min-width: 2rem;
      transition: box-shadow 0.2s;
      border-radius: 4px;
      transition: .17s;
      cursor: pointer;
      padding: .75rem;
      margin: .25rem;
      height: 42px;

      &:hover {
        filter: brightness(0.9);
      }

      &-active {
        background-color: var(--primary-color) !important;
        color: #fff;
      }
    }
  }

  .pagination-next {
    display: flex;
    align-items: center;
    margin-left: .25rem;
  }

  .control-items-active {
    fill: #000;
    transition: fill 0.2s ease-in-out;
  
    &:hover {
      fill: #000;
      transition: fill 0.2s ease-in-out;
    }
  }
}


.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>