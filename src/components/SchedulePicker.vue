<template>
  <div class="schedule-picker">
    <div>
      <schedule
        v-for="(block, index) in blocks"
        :key="index"
        :content-key="contentKey"
        :start-time="block.startTime"
        :end-time="block.endTime"
        :start-day="block.startDay"
        :end-day="block.endDay"
        :time-interval="block.timeInterval"
        :timeslots="timeslots"
        @timeslot-click="handleTimeslotClick"
        @timeslot-dblclick="handleTimeslotDblClick"
        @time-dblclick="handleTimeDblClick"
        :style="{ flex: (block.endDay || 0) - (block.startDay || 0) + 1 }"
      />
    </div>
    <footer v-if="showFooter">
      <div>
        <strong>{{ selected.length || 0 }} class{{ selected.length === 1 ? '' : 'es' }} selected</strong>
      </div>
      <aside>
        <div class="timeslot newbies">Classes suitable for new dancers</div>
        <div class="timeslot disabled">Unavailable</div>
        <div class="timeslot">Available</div>
        <div class="timeslot active">Selected</div>
      </aside>
      <div>
        <button @click.prevent="$emit('done', $event)" class="btn">Done</button>
      </div>
    </footer>
  </div>
</template>

<script>
import Schedule from './Schedule';

export default {
  name: 'schedule-picker',
  props: {
    blocks: {
      type: Array,
    },
    timeslots: {
      type: Array,
    },
    contentKey: {
      type: String,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    selected() {
      return this.timeslots.filter(timeslot => timeslot && timeslot.props && timeslot.props.active);
    },
  },
  methods: {
    handleTimeslotClick(...args) {
      this.$emit('timeslot-click', ...args);
    },
    handleTimeslotDblClick(...args) {
      this.$emit('timeslot-dblclick', ...args);
    },
    handleTimeDblClick(...args) {
      this.$emit('time-dblclick', ...args);
    },
  },
  components: {
    Schedule,
  },
};
</script>

<style lang="postcss">
@import '../variables.css';

.schedule-picker {
  display: flex;
  flex-direction: column;
  max-width: 100%;

  & > div {
    display: flex;
    flex-wrap: wrap;
    flex-shrink: 1;
    position: relative;
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    & .schedule {
      & .times {
        & .time:nth-child(2n + 1) {
          visibility: hidden;
        }
      }
    }

    @media (--medium-min) {
      height: 100%;

      & .schedule {
        & + .schedule {
          margin-left: 2.5%;
        }
      }
    }
  }
  & > footer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;
    z-index: 2;
    
    & > * {
      margin: 5px;
    }
    & aside {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      max-width: 100%;
      margin: auto;

      & > * {
        margin: 5px;
      }
    }
  }
}
</style>
