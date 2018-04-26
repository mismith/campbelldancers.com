<template>
  <div class="schedule-picker">
    <div>
      <schedule
        :content-key="contentKey"
        start-time="15:00"
        end-time="20:00"
        :start-day="1"
        :end-day="4"
        time-interval="00:30"
        :timeslots="timeslots"
        @timeslot-click="handleTimeslotClick"
        @timeslot-dblclick="handleTimeslotDblClick"
      />
      <schedule
        :content-key="contentKey"
        start-time="9:00"
        end-time="14:00"
        :start-day="6"
        time-interval="00:30"
        :timeslots="timeslots"
        @timeslot-click="handleTimeslotClick"
        @timeslot-dblclick="handleTimeslotDblClick"
      />
    </div>
    <footer v-if="showFooter">
      <div>
        <strong>{{ selected.length || 0 }} class{{ selected.length === 1 ? '' : 'es' }} selected</strong>
      </div>
      <aside>
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
    handleTimeslotClick(e, timeslot) {
      this.$emit('timeslot-click', e, timeslot);
    },
    handleTimeslotDblClick(e, timeslot) {
      this.$emit('timeslot-dblclick', e, timeslot);
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
        flex-basis: 75%;

        & + .schedule {
          flex-basis: 22.5%;
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
      margin: auto;

      & > * {
        margin: 5px;
      }
    }
  }
}
</style>
