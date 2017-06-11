<template>
  <div class="schedule">
    <div class="times">
      <header>&nbsp;</header>
      <header v-for="time in times" :class="`time time-${time.format('HHmm')}`">
        {{ time.format(timeLabelFormat) }}
      </header>
    </div>
    <div v-for="day in days" :class="`day day-${day.format('d')}`">
      <header>
        {{ day.format(dayLabelFormat) }}
      </header>
      <div v-for="time in times" :class="`time time-${time.format('HHmm')}`">
        <article
          v-for="timeslot in filterTimeslots(day, time)"
          @click="$emit('timeslot-click', $event, timeslot)"
          class="timeslot"
          :class="timeslot.props"
          :style="{top: calculateDimension(moment(timeslot.startTime, 'HH:mm').valueOf(), time), height: calculateDimension(moment(timeslot.endTime, 'HH:mm').valueOf() - moment(timeslot.startTime, 'HH:mm').valueOf() + time.valueOf(), time)}"
        >
          <small>{{ timeslot.startTime }} &ndash; {{ timeslot.endTime }}</small>
          <div v-html="timeslot[contentKey]"></div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'schedule',
  props: {
    contentKey: {
      type: String,
      default: 'name',
    },

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
      while (t.isBefore(moment(this.endTime, 'HH:mm'))) {
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

<style lang="postcss" scoped>
.schedule {
  display: flex;
  width: 100%;

  & > * {
    display: flex;
    flex-direction: column;
  }
  & header {
    flex-grow: 0;
    font-size: small;
    font-weight: normal;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: .1em;
    padding: 5px;
    opacity: .5;
  }
  & .time {
    flex-grow: 1;
    flex-shrink: 1;
  }
  & .times {
    & .time {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      white-space: nowrap;
      transform: translateY(-50%);
    }
  }
  & .day {
    flex-basis: 10%; /* even width columns */
    flex-grow: 1;

    & .time {
      & .timeslot {
        width: 100%;
        border: 1px solid rgba(0,0,0,.5);
      }
    }
  }

  @media (width <= 800px) {
    flex-wrap: wrap;
    height: auto;

    & .time {
      flex-grow: 0;
      flex-shrink: 0;
    }
    & .times {
      display: none;
    }
    & .day {
      flex-basis: 50%;
      padding-right: 1px;
      margin-bottom: 10px;

      & .time {
        flex-shrink: 1;
        flex-grow: 0;

        & .timeslot {
          margin-bottom: 1px;
        }
      }
    }
  }
  @media (width > 800px) {
    height: 100%;

    & .day {
      flex-basis: 10%; /* even width columns */
      flex-grow: 1;

      & .time {
        position: relative;
        border-top: 1px solid rgba(0,0,0,.1);

        & .timeslot {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          z-index: 2;
        }
      }
      & + .day {
        border-left: 1px solid rgba(0,0,0,0.1);
      }
    }
  }
}
</style>
