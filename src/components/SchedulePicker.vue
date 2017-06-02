<template>
  <div class="schedule-picker">
    <div>
      <schedule
        :content-key="contentKey"
        start-time="16:00"
        end-time="20:00"
        :start-day="1"
        :end-day="4"
        time-interval="00:30"
        :timeslots="timeslots"
        @timeslot-click="handleTimeslotClick"
        style="width: 75%;"
      />
      <schedule
        :content-key="contentKey"
        start-time="10:00"
        end-time="14:00"
        :start-day="6"
        time-interval="00:30"
        :timeslots="timeslots"
        @timeslot-click="handleTimeslotClick"
        style="width: 22.5%; margin-left: 2.5%"
      />
    </div>
    <footer>
      <div>
        <strong>{{ selected.length || 0 }} class{{ selected.length === 1 ? '' : 'es' }} selected</strong>
      </div>
      <aside class="two-inputs">
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
    contentKey: {
      type: String,
    },
    timeslots: {
      type: Array,
    },
  },
  computed: {
    selected() {
      return this.timeslots.filter(timeslot => timeslot && timeslot.props && timeslot.props.active);
    },
  },
  methods: {
    handleTimeslotClick(e, timeslot) {
      this.$emit('select', e, timeslot);
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
  overflow: hidden;

  & table.schedule {
    & tbody {
      & tr:nth-child(2n) {
        & th {
          visibility: hidden;
        }
      }
    }
  }
  & > div {
    display: flex;
    flex-grow: 1;
    height: 100%;
  }
  & > footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    z-index: 2;
  }
}
.timeslot {
  background: rgba(var(--accent-rgb), .15);
  padding: 0 3px;
  border: 1px solid var(--accent) !important;
  border-radius: 3px;
  cursor: pointer;

  & small {
    font-size: 12px;
  }
  &:not(.disabled, .active) {
    &:hover {
      background-color: rgba(var(--accent-rgb), .333);
    }
  }
  &.disabled {
    opacity: .5;
    cursor: not-allowed;
  }
  &.active {
    background: rgba(var(--accent-rgb), .666);
  }
}
</style>
