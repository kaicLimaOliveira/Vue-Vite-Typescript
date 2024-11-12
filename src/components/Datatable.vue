<template>
  <div class="datatable">
    <slot></slot>
    
    <div class="datatable-options">
      <div class="datatable-options-left">
        <DebounceInput
          :has-details-icon="true" 
          :details-label="searchInputDetailsLabel"
          :details-data="searchInputDetailsData" 
          :details-position="props.searchInputDetailsPosition"
          @update:modelValue="state.search = $event"
        ></DebounceInput>

        <Icon 
          icon="filter"
          class="filter"
          @click="emit('filter', true)"
        ></Icon>

        <!-- <button 
          @click="emit('clearFilters')"
          class="button is-red has-text-weight-medium mr-4">Limpar filtros</button> -->
          
        <div class="show-items">
          <label>Mostrar 
            <select 
              v-model="state.itemsPerPage"
              @change="(event:any) => {
                emit('limit', Number(event.target.value))
                setLocalStorage(event)
              }"
              class="button mx-2 px-2" 
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>  
      </div>

      <div class="date-container">
        <div class="is-flex is-align-items-center" v-if="enableDateFilter">
          <!-- <DatePicker 
            :start-date="dateFilterStart" 
            @update:model-value="state.date = $event"
          ></DatePicker> -->
        </div>
<!-- 
        <button v-if="enableFiltering" class="button is-link has-text-weight-medium ml-3"
          @click="emit('filterData', state.date)">Filtrar</button> -->
      </div>
    </div>
    
    <div 
      class="table-container" 
      @scroll="handleScroll" 
      ref="tableContainer"
      :class="state.scroll ? 'table-container-with-scrollbar' : ''"    
    >
      <table v-show="!state.isLoading" >
        <thead>
          <tr>
            <th 
              v-for="header, key in computedHeaders" 
              @click="() => {
                if (header === actionHeaderLabel) return 
                state.orderingField = key as string
                iconOrder(header)
                queryFilterTable()
              }" 
              :key="key"
            >
              {{ header }}
              <icon v-if="header !== actionHeaderLabel" :icon="state.iconClicked === header ? state.icon : 'sort'"></icon>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr 
            v-for="column, key in list[state.page - 1]" 
            :key="key"
            v-show="column !== undefined"
          >
            <td 
              v-for="row, tdKey in column" 
              :key="tdKey" 
              v-show="tdKey != 0" 
              @click="selectItem((column)[0], 'view')"
            >
              <div 
                v-if="(row as any)?.html !== undefined"
                v-html="(row as any).html"
              ></div>
              <div v-else>
                {{ row }}
              </div>
            </td>

            
            <td v-if="((enableUpdate || enableDelete) && (state.canDelete || state.canUpdate))" class="vertical-align-middle">

              <Icon 
                v-if="enableUpdate && state.canUpdate && state.indexTd !== key" 
                class="is-clickable has-text-link mr-4" 
                icon="edit"
                @click="[selectItem((column)[0], 'update'), state.indexTd = key]"
              ></Icon>

              <Icon 
                v-if="enableDelete && state.canDelete" 
                class="is-clickable has-text-danger" 
                icon="times-circle"
                @click="selectItem((column)[0], 'delete')"
              ></Icon>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <div v-if="props.data.value.length == 0 && !state.isLoading" class="no-data">
            <span>Nenhum dado disponível...</span>
          </div>

          <div v-else class="quantity-data">
            Total de {{ props.data.value.length }} ite
            <span v-if="props.data.value.length != 1">ns</span>
            <span v-else>m</span>.
          </div>
        </tfoot>
      </table>

      <div v-show="state.isLoading" class="anim-container">
        <div v-for="_ in 3" class="table-loader-container">
          <div class="table-loader-anim margin-table"></div>
          <div class="table-loader-anim margin-table"></div>
          <div class="table-loader-anim"></div>
        </div>
      </div>
    </div>

    <Pagination v-model="state.page" :pages="tablePages" :showButtonsOnBounderies="showButtonsOnBounderies" />
  </div>
</template>

<script setup lang="ts">
import DebounceInput from "./Form/DebounceInput.vue";
import Pagination from "./Pagination.vue";

import { reactive, computed, watch, onMounted, ref } from "vue";
// import { integerMask } from "../utils/inputs";
import { parseQueryParams } from "../utils/parsers";

interface Props {
  headers: Record<string, string>;
  data: {
    value: any[];
  };
  tableLength?: number;
  service: {
    getMany: (params: any) => Promise<any>;
    get: (...params: any) => Promise<any>;
  };
  queryParamsManyObjects?: any;
  queryParamsSingleObject?: any;
  itemsPerPage: number;
  enableUpdate?: boolean;
  enableDelete?: boolean;
  idFieldName?: string;
  isLoading?: boolean;
  loadingDelay?: number;
  showButtonsOnBounderies?: boolean;
  enableFiltering?: boolean;
  enableDateFilter?: boolean;
  searchInputDetailsLabel?: string;
  searchInputDetailsPosition?: string;
  searchInputDetailsData?: string[];
  viewName: string;
  reloadTable?: boolean;
  selectedObj?: number | string;
  viewMode?: string;
  canLoadData?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  tableLength: 0,
  queryParamsManyObjects: {},
  queryParamsSingleObject: {},
  itemsPerPage: Number(localStorage.getItem('itemsPerPage')) || 10,
  enableUpdate: true,
  enableDelete: true,
  idFieldName: 'id',
  isLoading: false,
  loadingDelay: 400,
  showButtonsOnBounderies: true,
  enableFiltering: false,
  enableDateFilter: false,
  searchInputDetailsLabel: 'Você pode filtrar os seguintes campos:',
  searchInputDetailsPosition: 'right',
  reloadTable: false,
  selectedObj: 0,
  viewMode: 'view',
  canLoadData: true
})

const emit = defineEmits<{
  (e: 'currentPage', value: number): void
  (e: 'limit', value: number): void
  (e: 'filter', value: boolean): void
  (e: 'filterData', value: [Date, Date]): void
  (e: 'dateValue', value: [Date, Date]): void
  (e: 'selectedItem', value: number | string): void
  (e: 'reset-reload'): void
  (e: 'view'): void
  (e: 'update'): void
  (e: 'delete'): void
}>();

// ['view', 'update', 'delete', 'selectedItem', 'reset-reload', 'clearFilters', 'changeLimit', 'filter']

interface State {
  date: [Date, Date]
  search: string;
  page: number;
  isLoading: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  orderingField: string | null;
  orderingFlow: string | null;
  icon: string;
  iconClicked: string;
  scroll: boolean;
  indexTd: number;
  itemsPerPage?: number;
}

const state: State = reactive({
  date: [new Date(), new Date()],
  search: '',
  page: 1,
  isLoading: false,
  canUpdate: false,
  canDelete: false,
  orderingField: '',
  orderingFlow: '',
  icon: 'sort',
  iconClicked: '',
  scroll: false,
  indexTd: -1,
  itemsPerPage: Number(localStorage.getItem('itemsPerPage') ?? 10),
})

onMounted(() => {
  
  if (props.canLoadData)
    queryFilterTable()

  if (props.selectedObj != 0 && props.selectedObj != '')
    selectItem(props.selectedObj, props.viewMode)
  console.log(props.data);
})

const tableContainer = ref<HTMLElement | null>(null)

function handleScroll() {
  if (tableContainer.value){
    if (tableContainer.value.scrollWidth === tableContainer.value.clientWidth) {
      state.scroll = false
    } else {
      state.scroll = true
    }
  }
}

const list = computed(() => {

  let pagesList: number[][][] = []
  let columnList = []  

  for (let i = 0; i < props.data.value.length; i++) {

    const el = props.data.value[i]; 
    let rowList = []

    if (el === undefined) {
      columnList.push(el)
      continue
    }

    if (el.hasOwnProperty(props.idFieldName)) {
      rowList.unshift(el[props.idFieldName])
    }

    for (const h in props.headers) {
      Object.entries(el).forEach(([key, value]) => {
        if (h == key) {
          return rowList.push(value)
        }
      })
    }

    columnList.push(rowList)
  }

  let pagesLength = Math.ceil(columnList.length / props.itemsPerPage)
  for (let i = 0; i < pagesLength; i++) {
    pagesList.push(columnList.splice(0, props.itemsPerPage))
  }

  return pagesList
})

const actionHeaderLabel = 'Ações'

const computedHeaders = computed(() => {
  ((props.enableUpdate || props.enableDelete) && (state.canDelete || state.canUpdate)) ? props.headers['options'] = actionHeaderLabel : props.headers
  return props.headers
})

watch(
  () => props.isLoading,
  async (newValue) => {

    state.isLoading = true

    await new Promise(() => {
      setTimeout(() => {

        if (newValue === false)
          state.isLoading = false

      }, props.loadingDelay)
    })
  }
)

const tablePages = computed(() => {
  return Math.ceil(props.tableLength / props.itemsPerPage)
})

const offset = computed(() => (state.page - 1) * props.itemsPerPage)

watch(
  () => state.page,
  (newValue) => {

    emit('currentPage', newValue)

    if (props.data.value.length <= offset.value) {
      props.data.value.length = offset.value + props.itemsPerPage
      queryFilterTable(false)

    } else if (props.data.value[offset.value] === undefined) {
      queryFilterTable(false)
    }
  }
)

watch(
  () => state.date,
  (newDate, oldDate) => {

    if (!oldDate) {
      emit('dateValue', newDate)
      return
    }

    const [nSt, nEd] = newDate
    const [oSt, oEd] = oldDate

    if (nSt.toLocaleDateString() != oSt.toLocaleDateString() || nEd.toLocaleDateString() != oEd.toLocaleDateString()) {
      emit('dateValue', newDate)
    }
  }
)

watch(
  () => state.search,
  () => {
    queryFilterTable()
  }
)

watch(
  () => props.data.value.length,
  (newValue) => {
      
    const limit = Math.ceil(newValue / props.itemsPerPage)
    if (limit < state.page && state.page != 1) {
      state.page--
    }
  }
)

watch(
  () => props.reloadTable,
  (newValue) => {
    if (newValue) {
      queryFilterTable()
      emit('reset-reload')
    }
  }
)

watch(
  () => props.selectedObj,
  (newValue) => {
    if (newValue != 0 && newValue != '') {
      selectItem(props.selectedObj, props.viewMode)
    }
  }
)

watch(
  () => props.itemsPerPage,
  (newValue) => {
    state.itemsPerPage = newValue ?? 10
    queryFilterTable()
  }
)

function selectItem(id: number | string, emitOption: any) {
  emit('selectedItem', id)
  props.service?.get(id, parseQueryParams(props.queryParamsSingleObject))
  .then((res: any) => {
    if (emitOption) emit(emitOption, res)
  })
}

async function queryFilterTable(resetOffset = true) {
  
  if (resetOffset) {
    state.page = 1
    props.data.value = []
  }
  
  const params = {
    'search': state.search,
    'offset': offset.value,
    'limit': props.itemsPerPage
  }

  const res = await props.service?.getMany(parseQueryParams(params))  
  console.log(res);
  
}

function setLocalStorage(event: any) {
  localStorage.setItem('itemsPerPage', event.target.value)
}

function iconOrder(header: string) {
  if (state.iconClicked === '' || state.iconClicked !== header){
    state.iconClicked = header
    state.icon = 'sort'
  }  
  switch (state.icon) {
    case 'sort':
      state.icon = 'sort-down'
      state.orderingFlow = 'asc'
      break;
    case 'sort-down':
      state.icon = 'sort-up'
      state.orderingFlow = 'desc'
      break;
    case 'sort-up':
      state.icon = 'sort'
      state.orderingField = null
      state.orderingFlow = null
      break;
  }
}

</script>

<style lang="scss" scoped>
.datatable {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .datatable-options {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    .datatable-options-left {
      display: flex;
      align-items: center;

      .filter {
        margin: 0 1rem;
      }
      
      .show-items {
        font-weight: medium; 
        margin-right: 0.75rem;

        label {
          display: flex;
          align-items: center;
        }
      }
    }

    .date-container {
      display: flex;
    }
  }

  .table-container {
    width: 78.8vw;
    min-width: 100%;
    box-sizing: border-box;

    table {
      border-collapse: collapse;
      overflow-x: scroll;
      text-align: left;
      width: 100%;
      border-spacing: 0;
      background-color: white;
      margin-bottom: 1rem;

      thead {
        th {
          text-wrap: nowrap;
        }
      }

      tbody {
        tr {
          td {
            vertical-align: middle;
            cursor: pointer;
            word-break: break-word;
          }
        }
      }

      tfoot {
        .no-data {
          margin-top: 1rem;
        }

        .quantity-data {
          display: flex;
          font-weight: bold;
          margin-top: .75rem;
        }
      }

    }
  }
}


.table-container-with-scrollbar {
  width: 78.8vw;
  min-width: 100%;
  padding-right: 0.1em;
  box-sizing: border-box;
  overflow-x: auto;
}

.table-padding-1 th,
.table-padding-1 td {
  padding: 0.25em 0.5em;
}

.table-padding-2 th,
.table-padding-2 td {
  padding: 0.35em 0.65em;
}

.table-padding-3 th,
.table-padding-3 td {
  padding: 0.5em 0.75em;
}

.table-padding-4 th,
.table-padding-4 td {
  padding: 0.75em 1em;
}

.anim-container {
  height: 4rem;
  position: relative;
  margin-bottom: 1.5rem;

  .table-loader-container {
    display: flex;

    .margin-table {
      margin-right: .25rem;
    }

    .table-loader-anim {
      background-color: rgba(128, 128, 128, 0.199);
      min-width: 100px;
      height: 25px;
      border-radius: 5px;
      overflow: hidden;
      position: relative;
      margin-bottom: .25rem;
      flex-grow: 1;
    }
    
    .table-loader-anim::after {
      content: '';
      background-color: rgba(255, 255, 255, 0.719);
      width: 30px;
      height: 150%;
      position: absolute;
      filter: blur(20px);
      top: 50%;
      left: -10%;
      transform: translateY(-50%);
      animation: table-loader-anim .7s infinite ease-in-out;
    }
  }
}


@keyframes table-loader-anim {
  0% {
    left: -10%;
  }

  100% {
    left: 110%;
  }
}
</style>