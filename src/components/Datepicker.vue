<template>
  <div>
    <div class="bg" v-show="state.isCalendarOpen" @click="state.isCalendarOpen = false"></div>
    <div class="datepicker-wrapper">
      <Input
        type="text"
        class="datepicker-input"
        style="cursor: pointer;"
        readonly
        :value="formattedInputValue"
        @click="toggleCalendar"
        :placeholder="props.range ? 'Select a date range' : 'Select a date'"
      />
      
      <div v-if="state.isCalendarOpen" class="datepicker">
        <div class="datepicker-content">
          <div class="datepicker-header">
            <Icon icon="chevron-left" @click="prevMonth"></Icon>
            <span>{{ firstCalendarformattedMonthYear }}</span>
            <Icon icon="chevron-right" @click="nextMonth"></Icon>
          </div>
  
          <div class="datepicker-grid">
            <div class="day-name" v-for="day in daysOfWeek" :key="day">{{ day }}</div>
            <div
              class="day"
              v-for="day, key in calendarDays"
              :key="key"
              :class="{ 
                'is-today': day.isToday, 
                'is-selected': isSelected(day.date),
                'is-start': isSelected(day.date) === 'is-start',
                'is-end': isSelected(day.date) === 'is-end',
                'is-outside-month': day.isCurrentMonth
              }"
              @click="selectDate(day.date)"
            >
              {{ day.date.getDate() }}
            </div>
          </div>
        </div>
        
        <div class="datepicker-content" v-if="props.range">
          <div class="datepicker-header">
            <Icon icon="chevron-left" @click="prevMonth"></Icon>
            <span>{{ secondCalendarformattedMonthYear }}</span>
            <Icon icon="chevron-right" @click="nextMonth"></Icon>
          </div>
    
          <div  class="datepicker-grid">
            <div class="day-name" v-for="day in daysOfWeek" :key="day">{{ day }}</div>
            <div
              class="day"
              v-for="day, key in secondCalendarDays"
              :key="key"
              :class="{ 'is-today': day.isToday, 'is-selected': isSelected(day.date) }"
              @click="selectDate(day.date, true)"
            >
              {{ day.date.getDate() }}
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';

interface CalendarDay {
  date: Date;
  isToday: boolean;
  isSelected: boolean;
  isCurrentMonth: boolean;
}

interface DatepickerProps {
  range?: boolean;
  localeFormat?: Intl.LocalesArgument;
  daysOfWeek?: string[];
}

const props = withDefaults(defineProps<DatepickerProps>(), {
  localeFormat: 'pt-BR',
  daysOfWeek: () => ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
})

interface State {
  isCalendarOpen: boolean;
}

const state: State = reactive({
  isCalendarOpen: false,
})

const selectedDate = ref<Date | null>(null);
const secondSelectedDate = ref<Date | null>(null);
const currentDate = ref(new Date());
const secondCalendarDate = ref(
  new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
);

const toggleCalendar = () => {
  state.isCalendarOpen = !state.isCalendarOpen;
};

const firstCalendarformattedMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString(props.localeFormat, {
    year: 'numeric',
    month: 'long',
  });
});

const secondCalendarformattedMonthYear = computed(() => {
  return secondCalendarDate.value.toLocaleDateString(props.localeFormat, {
    year: 'numeric',
    month: 'long',
  });
});

const formattedInputValue = computed(() => {
  if (props.range && selectedDate.value && secondSelectedDate.value) {
    return `${selectedDate.value.toLocaleDateString()} - ${secondSelectedDate.value.toLocaleDateString()}`;
  }
  return selectedDate.value ? selectedDate.value.toLocaleDateString() : '';
});

const generateCalendarDays = (date: Date) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const days: CalendarDay[] = [];

  // Add leading days from the previous month
  for (let i = firstDayOfMonth.getDay(); i > 0; i--) {
    const prevDate = new Date(
      firstDayOfMonth.getFullYear(),
      firstDayOfMonth.getMonth(),
      1 - i
    );

    days.push({ 
      date: prevDate, 
      isToday: false, 
      isSelected: false, 
      isCurrentMonth: false, 
    });
  }

  // Add current month days
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    const currentDate = new Date(
      firstDayOfMonth.getFullYear(),
      firstDayOfMonth.getMonth(),
      day
    );
    days.push({
      date: currentDate,
      isToday: currentDate.toDateString() === new Date().toDateString(),
      isSelected: false,
      isCurrentMonth: true,
    });
  }

  // Add trailing days from the next month
  for (let i = 1; days.length % 7 !== 0; i++) {
    const nextDate = new Date(
      lastDayOfMonth.getFullYear(),
      lastDayOfMonth.getMonth(),
      lastDayOfMonth.getDate() + i
    );

    days.push({ 
      date: nextDate, 
      isToday: false, 
      isSelected: false,
      isCurrentMonth: false,
    });
  }

  return days;
};

const calendarDays = computed(() => generateCalendarDays(currentDate.value));
const secondCalendarDays = computed(() =>
  generateCalendarDays(secondCalendarDate.value)
);

const selectDate = (date: Date, isSecondCalendar = false) => {
  if (props.range) {
    if (!selectedDate.value || secondSelectedDate.value) {
      selectedDate.value = date;
      secondSelectedDate.value = null;
    } else {
      secondSelectedDate.value = date;
    }
  } else {
    selectedDate.value = date;
  }

  if (!props.range) {
    state.isCalendarOpen = false;
  }
};

const isSelected = (date: Date) => {
  if (props.range) {
    const first = selectedDate.value;
    const second = secondSelectedDate.value;
    if (first && second) {
      const start = new Date(Math.min(first.getTime(), second.getTime()));
      const end = new Date(Math.max(first.getTime(), second.getTime()));

      if (date.toDateString() === start.toDateString()) return 'is-start';
      if (date.toDateString() === end.toDateString()) return 'is-end';
      if (date >= start && date <= end) return 'is-selected';
    }
  }
  return date.toDateString() === selectedDate.value?.toDateString()
    ? 'is-selected'
    : '';
};

const prevMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
  if (props.range) {
    secondCalendarDate.value = new Date(
      secondCalendarDate.value.getFullYear(),
      secondCalendarDate.value.getMonth() - 1,
      1
    );
  }
};

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
  if (props.range) {
    secondCalendarDate.value = new Date(
      secondCalendarDate.value.getFullYear(),
      secondCalendarDate.value.getMonth() + 1,
      1
    );
  }
};
</script>

<style lang="scss" scoped>
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 150;
}

.datepicker-wrapper {
  position: relative;
}

.datepicker {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 9999;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  display: flex;
  margin-top: 8px;

  .datepicker-content {
    padding: 16px;

    .datepicker-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0px;

      span {
        font-weight: 600;
      }
      
      svg {
        background: none;
        border: 1px solid #e7e7e7;
        border-radius: 4px;
        padding: 6px 10px;
        cursor: pointer;
        box-shadow: 2px 2px 8px 0px rgba(0,0,0,0.14);
      }
    }
  }
  
  .datepicker-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 16px;

    .day-name {
      text-align: center;
      padding: 8px 4px;
      color: var();
      font-weight: 500;
    }

    .day {
      text-align: center;
      padding: 8px;
      cursor: pointer;
      margin: 4px 0;

      &:hover {
        background: var(--grey-300);
      }

      &.is-start {
        background: var(--black-800);
        color: #e5e5e5;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
      }

      &.is-end {
        background: var(--black-800);
        color: #e5e5e5;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }
      
      &.is-today {
        background: var(--grey-400);
        
      }

      &.is-selected {
        background: var(--black-800);
        color: #e5e5e5;

        &:hover {
          background: var(--black-900);
        }
      }

      .is-outside-month {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
  }
}
</style>
