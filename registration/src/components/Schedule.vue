<template>
  <table class="schedule">
    <thead>
      <tr>
        <th></th>
        <th v-for="day of days" :class="`day-${day.format('d')}`">{{ day.format(dayLabelFormat) }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="time of times" :class="`time-${time.format('HHmm')}`">
        <th>{{ time.format(timeLabelFormat) }}</th>
        <td v-for="day of days" :class="`day-${day.format('d')}`">
          <ul>
            <li
              v-for="timeslot in filterTimeslots(day, time)"
              @click="$emit('timeslot-click', $event, timeslot)"
              class="timeslot"
              :class="timeslot.props"
              :style="{top: calculateDimension(moment(timeslot.startTime, 'HH:mm').valueOf(), time), height: calculateDimension(moment(timeslot.endTime, 'HH:mm').valueOf() - moment(timeslot.startTime, 'HH:mm').valueOf() + time.valueOf(), time)}"
            >
              <small>{{ timeslot.startTime }} &ndash; {{ timeslot.endTime }}</small>
              <div v-html="timeslot.name"></div>
            </li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import moment from 'moment';

export default {
  name: 'schedule',
  props: {
    dayLabelFormat: {
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

    timeLabelFormat: {
      type: String,
      default: 'h a',
    },
    timeInterval: {
      type: String,
      default: '01:00',
    },
    startTime: {
      type: String,
      default: '00:00',
    },
    endTime: {
      type: String,
      default: '24:00',
    },

    timeslots: {
      type: Array,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    interval() {
      return moment.duration(this.timeInterval);
    },
    days() {
      const days = [];
      for (let d = this.startDay; d <= this.endDay; d += 1) {
        days.push(moment().startOf('week').add(d, 'days'));
      }
      return days;
    },
    times() {
      const times = [];
      const t = moment(this.startTime, 'HH:mm');
      while (t.isSameOrBefore(moment(this.endTime, 'HH:mm'))) {
        times.push(moment(t));
        t.add(this.interval);
      }
      return times;
    },
  },
  methods: {
    moment,
    filterTimeslots(day, time) {
      return this.timeslots.filter((timeslot) => {
        if (timeslot.startDay === parseInt(day.format('d'), 10)) {
          if (moment(timeslot.startTime, 'HH:mm').isBetween(time, moment(time).add(this.interval), null, '[)')) {
            return true;
          }
        }
        return false;
      });
    },
    calculateDimension(progress, time) {
      const start = time.valueOf();
      const mid = progress;
      const end = time + this.interval.valueOf();

      return `${((mid - start) / (end - start)) * 100}%`;
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  height: 100%;
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
  tbody {
    th {
      width: 1%;
      text-align: right;
      white-space: nowrap;
      transform: translateY(-50%);
    }
    td + td {
      border-left: 1px solid rgba(0,0,0,.1);
    }
  }
  td {
    width: 1/7*100%;
    vertical-align: top;
    padding: 0;
    border-top: 1px solid rgba(0,0,0,.1);

    ul {
      position: relative;
      width: 100%;
      height: 100%;
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        border: 1px solid rgba(0,0,0,.5);
        overflow: hidden;
        z-index: 2;
      }
    }
  }
  tr:last-child {
    height: 1px;

    td {
      background: none;
      border-left: none;
    }
  }
}
</style>
