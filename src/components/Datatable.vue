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

        <div class="filter">
          <Icon 
            icon="filter"
            @click="emit('filter', true)"
          ></Icon>
        </div>
          
        <div class="show-items" v-if="props.tableOptions?.showItems">
          <Select 
            label="Mostrar"
            v-model="itemsPerPage" 
            :options="state.selectOptions"
            style="width: 70px;"
          ></Select>
        </div>  
      </div>

      <div>
        
      </div>

      <div class="date-container">
        <div class="filter" v-if="props.tableOptions?.showExportFileCSV">
          <Icon 
            icon="file-csv"
            @click="jsonToCsv(props.data.value)"
          ></Icon>
        </div>

        <!-- <div class="is-flex is-align-items-center" v-if="enableDateFilter"> -->
          <!-- <DatePicker 
            :start-date="dateFilterStart" 
            @update:model-value="state.date = $event"
          ></DatePicker> -->
        <!-- </div> -->
      </div>
    </div>
    
    <div 
      class="table-container" 
      @scroll="handleScroll" 
      ref="tableContainer"
      :class="state.scroll ? 'table-container-with-scrollbar' : ''"    
    >
      <table v-show="!props.isLoading" >
        <thead>
          <tr>
            <th 
              v-for="header, key in computedHeaders" 
              @click="() => {
                if (header === actionHeaderLabel) return 
                state.orderingField = key
                iconOrder(header)
                queryFilterTable()
              }" 
              :key="key"
            >
              {{ header }}
              <Icon v-if="header !== actionHeaderLabel" :icon="state.iconClicked === header ? state.icon : 'sort'"></Icon>
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
            
            <td v-if="(enableUpdate || enableDelete)" class="action-icons">
              <Icon 
                v-if="enableUpdate"  
                icon="edit"
                @click="selectItem((column)[0], 'update')"
              ></Icon>

              <Icon 
                v-if="enableDelete" 
                icon="times-circle"
                @click="selectItem((column)[0], 'delete')"
              ></Icon>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <div v-if="props.tableLength == 0 && !props.isLoading" class="no-data">
            <span>Nenhum dado disponível...</span>
          </div>

          <div v-else class="quantity-data">
            Total de {{ props.tableLength }} ite
            <span v-if="props.tableLength != 1">ns</span>
            <span v-else>m</span>.
          </div>
        </tfoot>
      </table>

      <div v-show="props.isLoading" class="anim-container">
        <div v-for="_ in 3" class="table-loader-container">
          <div class="table-loader-anim margin-table"></div>
          <div class="table-loader-anim margin-table"></div>
          <div class="table-loader-anim margin-table"></div>
          <div class="table-loader-anim"></div>
        </div>
      </div>
    </div>
    
    <Pagination v-model="state.page" :pages="tablePages" />
  </div>
</template>

<script setup lang="ts">
import DebounceInput from "./form/DebounceInput.vue";
import Pagination from "./Pagination.vue";
import Select from "./form/Select.vue";

import { reactive, computed, watch, onMounted, ref } from "vue";
import { parseQueryParams } from "../utils/parsers";
import { useFileConverter } from "../composables/useFileConverter";

interface TableProps {
  headers: Record<string, string>;
  data: {
    value: any[];
  };
  tableLength?: number;
  service: {
    getMany: (params: any) => Promise<any>;
    get: (...params: any) => Promise<any>;
  };
  enableUpdate?: boolean;
  enableDelete?: boolean;
  isLoading?: boolean;

  tableOptions?: {
    showExportFileCSV?: boolean;
    showItems?: boolean;
  };

  idFieldName?: string;
  enableDateFilter?: boolean;
  searchInputDetailsLabel?: string;
  searchInputDetailsPosition?: string;
  searchInputDetailsData?: string[];
  reloadTable?: boolean;
  selectedObj?: number | string;
  viewMode?: string;
  canLoadData?: boolean;
}

const props = withDefaults(defineProps<TableProps>(), {
  tableLength: 0,
  enableUpdate: true,
  enableDelete: true,
  idFieldName: 'id',
  isLoading: false,
  enableDateFilter: false,
  searchInputDetailsLabel: 'Você pode filtrar os seguintes campos:',
  searchInputDetailsPosition: 'right',
  reloadTable: false,
  selectedObj: 0,
  viewMode: 'view',
  canLoadData: true,
})


const emit = defineEmits<{
  currentPage: [value: number];
  limit: [value: number];
  filter: [value: boolean];
  filterData: [value: [Date, Date]];
  dateValue: [value: [Date, Date]];
  selectedItem: [value: number | string];
  'reset-reload': [];
  view: [value: number];
  update: [value: number];
  delete: [value: number];
}>();


interface State {
  date: [Date, Date]
  search: string;
  page: number;
  orderingField: string | null;
  orderingFlow: string | null;
  icon: string;
  iconClicked: string;
  scroll: boolean;

  selectOptions: {
    label: string;
    value: number;
  }[]
}

const state: State = reactive({
  date: [new Date(), new Date()],
  search: '',
  page: 1,
  orderingField: '',
  orderingFlow: '',
  icon: 'sort',
  iconClicked: '',
  scroll: false,
  selectOptions: [
    {
      label: '10',
      value: 10,
    },
    {
      label: '25',
      value: 25,
    },
    {
      label: '50',
      value: 50,
    }
  ]
})

const itemsPerPage = defineModel<number>('itemsPerPage', {
  default: Number(localStorage.getItem('itemsPerPage') || 10)
});

onMounted(async () => {
  if (props.canLoadData) {
    await queryFilterTable()
  }

  if (props.selectedObj != 0 && props.selectedObj != '') {
    await selectItem(props.selectedObj, props.viewMode)
  }
})

const tableContainer = ref<HTMLElement | null>(null)

const { jsonToCsv } = useFileConverter();
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

  let pagesLength = Math.ceil(columnList.length / itemsPerPage.value)
  for (let i = 0; i < pagesLength; i++) {
    pagesList.push(columnList.splice(0, itemsPerPage.value))
  }

  return pagesList
})

const actionHeaderLabel = 'Ações'

const computedHeaders = computed(() => {
  (props.enableUpdate || props.enableDelete) ? props.headers['options'] = actionHeaderLabel : props.headers
  return props.headers
})


const tablePages = computed(() => {
  return Math.ceil(props.tableLength / itemsPerPage.value)
})

const offset = computed(() => (state.page - 1) * itemsPerPage.value)

watch(
  () => state.page,
  (newValue) => {

    emit('currentPage', newValue)

    if (props.data.value.length <= offset.value) {
      props.data.value.length = offset.value + itemsPerPage.value
      queryFilterTable(false)

    } else if (props.data.value[offset.value] === undefined) {
      queryFilterTable(false)
    }
  }
)

// watch(
//   () => state.date,
//   (newDate, oldDate) => {

//     if (!oldDate) {
//       emit('dateValue', newDate)
//       return
//     }

//     const [nSt, nEd] = newDate
//     const [oSt, oEd] = oldDate

//     if (nSt.toLocaleDateString() != oSt.toLocaleDateString() || nEd.toLocaleDateString() != oEd.toLocaleDateString()) {
//       emit('dateValue', newDate)
//     }
//   }
// )

watch(
  () => state.search,
  () => {
    queryFilterTable()
  }
)

watch(
  () => props.data.value.length,
  (newValue) => {
      
    const limit = Math.ceil(newValue / itemsPerPage.value)
    if (limit < state.page && state.page != 1) {
      state.page--
    }
  }
)

// watch(
//   () => props.reloadTable,
//   (newValue) => {
//     if (newValue) {
//       queryFilterTable()
//       emit('reset-reload')
//     }
//   }
// )

watch(
  () => props.selectedObj,
  (newValue) => {
    if (newValue != 0 && newValue != '') {
      selectItem(props.selectedObj, props.viewMode)
    }
  }
)

watch(
  () => itemsPerPage.value,
  (newValue) => {
    itemsPerPage.value = newValue ?? 10
    queryFilterTable()
  }
)

function selectItem(id: number | string, emitOption: any) {
  emit('selectedItem', id)
  props.service?.get(id)
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
    'skip': offset.value,
    'limit': itemsPerPage.value
  }

  await props.service?.getMany(parseQueryParams(params));  
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
  padding: 1rem;

  .datatable-options {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    .datatable-options-left {
      display: flex;
      align-items: center;
      
      .show-items {
        font-weight: medium; 
        margin-right: 0.75rem;

        label {
          display: flex;
          align-items: center;
        }
      }
    }

    .filter {
      margin: 0 1rem;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 10px;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #ddd;
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
        background-color: #f5f5f5;
        th {
          text-wrap: nowrap;
          padding: .35rem;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 13px;
          letter-spacing: .05em;
          abbr {
            text-decoration: none;
          }
        }
      }

      tbody {
        tr {
          line-height: 24px;
          
          td, th {
            padding: .35rem;
            font-size: 14px;
            text-align: left;
            border-top: 1px solid #ddd;
            vertical-align: middle;
            cursor: pointer;
            word-break: break-word;
          }

          &:hover {
            background-color: #f1f1f1;
          }

          &.is-selected {
            background-color: #e6f7ff;
          }

          .action-icons {
            .fa-pen-to-square {
              color: var(--link-color);
              margin: 0 8px;
            }

            .fa-circle-xmark {
              color: var(--danger-color);
            }
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
          margin-top: 1rem;
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