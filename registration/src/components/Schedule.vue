<template>
  <table class="schedule">
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th v-for="day of days" :class="`day-${day}`">{{ moment().days(day).format(dayFormat) }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="hour of hours" :class="`hour-${hour}`">
        <th>{{ moment('0').add(hour, 'hours').format(hourFormat) }}</th>
        <td v-for="day of days" :class="`day-${day}`"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import moment from 'moment';

export default {
  name: 'schedule',
  props: {
    dayFormat: {
      type: String,
      default: 'dddd',
    },
    startDay: {
      type: Number,
      default: 0,
    },
    endDay: {
      type: Number,
      default: 6,
    },

    hourFormat: {
      type: String,
      default: 'h a',
    },
    startHour: {
      type: Number,
      default: 0,
    },
    endHour: {
      type: Number,
      default: 24,
    },
    gridInterval: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    days() {
      const days = [];
      for (let d = this.startDay; d <= this.endDay; d += 1) {
        days.push(d);
      }
      return days;
    },
    hours() {
      const hours = [];
      for (let h = this.startHour; h <= this.endHour; h += this.gridInterval) {
        hours.push(h);
      }
      return hours;
    },
  },
  methods: {
    moment,
  },
};
</script>

<style lang="scss">
table {
  width: 100%;
  border-spacing: 0;

  th {
    font-size: small;
    font-weight: normal;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: .1em;
    padding: 5px;
    opacity: .5;
  }
  thead {
    th {
      padding-bottom: 1em;
    }
  }
  tbody {
    th {
      text-align: right;
      white-space: nowrap;
      transform: translateY(-50%);
    }
  }
  td {
    width: 1/7*100%;
    border-top: 1px solid rgba(0,0,0,.1);

    &.day-0,
    &.day-6 {
      background-color: rgba(0,0,0,.05);
    }
    &.day-2,
    &.day-3,
    &.day-4,
    &.day-5 {
      border-left: 1px solid rgba(0,0,0,.1);
    }
  }
  tr:last-child {
    td {
      // display: none;
      background: none;
      border-left: none;
    }
  }
}
</style>
