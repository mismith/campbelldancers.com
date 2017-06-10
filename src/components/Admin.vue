<template>
  <section id="admin">
    <div v-if="!user || !userRaw.admin" class="align-center">
      <div v-if="!user">
        <p>Please login to continue.</p>
        <auth />
      </div>
      <aside v-if="user">Sorry, you need to be an admin.</aside>
    </div>
    <div v-if="user && userRaw.admin">
      <schedule-picker :timeslots="adminTimeslots" content-key="$name" :show-footer="false" @select="handleTimeslotSelect" />
      <div class="details">
        <div class="dancers">
          <header>
            <h6>Dancers</h6>
            <h6 v-if="selected.id" class="color-accent">{{ dancers.filter(d => d.props.active).length }}/</h6>
            <h6>{{ dancers.length }}</h6>
          </header>
          <div>
            <article v-for="dancer of dancers" @click="handleDancerSelect($event, dancer)" class="dancer timeslot" :class="dancer.props">
              <div :title="dancer.name"><strong>{{ dancer.name }}</strong></div>
              <div v-show="dancer.birthday" :title="`${moment(dancer.birthday).fromNow(true)} old`">{{ moment(dancer.birthday).format('MMM D, YYYY') }}</div>
              <div :title="dancer.ability">{{ dancer.ability }}</div>
              <div :title="dancer.medical">{{ dancer.medical }}</div>
            </article>
          </div>
        </div>
        <div class="contacts">
          <header>
            <h6>Emergency Contacts</h6>
            <h6 v-if="selected.id" class="color-accent">{{ contacts.filter(c => c.props.active).length }}/</h6>
            <h6>{{ contacts.length }}</h6>
          </header>
          <div>
            <article v-for="contact of contacts" @click="handleContactSelect($event, contact)" class="timeslot contact" :class="contact.props">
              <div :title="contact.name"><strong>{{ contact.name }}</strong></div>
              <a :href="`mailto:${contact.email}`" :title="contact.email">{{ contact.email }}</a>
              <a :href="`tel:${contact.phone}`">{{ contact.phone }}</a>
              <a :href="`tel:${contact.phone2}`">{{ contact.phone2 }}</a>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment';
import {
  // firebase,
  idKey,
  db,
  dba,
} from '../helpers/firebase';
import AuthedMixin from '../helpers/firebase.authed.mixin';
import PublicCollectionsMixin from '../helpers/firebase.publicCollections.mixin';
import SchedulePicker from './SchedulePicker';

export default {
  name: 'admin',
  mixins: [
    AuthedMixin,
    PublicCollectionsMixin,
  ],
  data() {
    return {
      idKey,
      selected: {},
    };
  },
  firebase: {
    enrollmentsRaw: dba.child('enrollments'),
    dancersRaw: dba.child('dancers'),
    contactsRaw: dba.child('contacts'),
    usersRaw: db.child('users'),
  },
  computed: {
    adminTimeslots() {
      return this.timeslots.map(($item) => {
        const item = {
          ...$item,
        };
        item.$dancers = this.dancersRaw
          .filter(d => Object.keys(item['@dancers']).includes(d[idKey]));
        item.props.active = this.selected.type === 'timeslot' && this.selected.id === item[idKey];
        item.props.active = item.props.active || (this.selected.type === 'dancer' && item['@dancers'][this.selected.id]);
        item.props.disabled = !item.$dancers.length;
        return item;
      });
    },
    dancers() {
      return this.dancersRaw.map(($item) => {
        const item = {
          '@timeslots': {},
          '@users': {},
          props: {
            active: false,
            disabled: false,
          },
          ...$item,
        };
        item.$timeslots = this.timeslotsRaw
          .filter(t => Object.keys(item['@timeslots']).includes(t[idKey]));
        item.props.active = this.selected.type === 'dancer' && this.selected.id === item[idKey];
        item.props.active = item.props.active ||
          (this.selected.type === 'timeslot' && item['@timeslots'][this.selected.id]) ||
          (this.selected.type === 'contact' && (Object.keys((this.contacts.find(c => c[idKey] === this.selected.id) || {})['@users'] || {}) || []).includes(Object.keys(item['@users'])[0]));
        return item;
      }).reverse();
    },
    contacts() {
      return this.contactsRaw.map(($item) => {
        const item = {
          '@users': {},
          props: {
            active: false,
            disabled: false,
          },
          ...$item,
        };
        item.props.active = this.selected.type === 'contact' && this.selected.id === item[idKey];
        item.props.active = item.props.active || (this.selected.type === 'dancer' && (Object.keys((this.dancers.find(d => d[idKey] === this.selected.id) || {})['@users'] || {}) || []).includes(Object.keys(item['@users'])[0]));
        return item;
      }).reverse();
    },
    users() {
      return this.usersRaw.map(($item) => {
        const item = {
          ...$item,
        };
        return item;
      });
    },
  },
  methods: {
    moment,

    toggleSelected(item) {
      if (this.selected && this.selected.type === item.type && this.selected.id === item.id) {
        this.selected = {};
      } else {
        this.selected = item;
      }
    },
    handleTimeslotSelect(e, timeslot) {
      this.toggleSelected({
        type: 'timeslot',
        id: timeslot[idKey],
      });
    },
    handleDancerSelect(e, dancer) {
      this.toggleSelected({
        type: 'dancer',
        id: dancer[idKey],
      });
    },
    handleContactSelect(e, contact) {
      this.toggleSelected({
        type: 'contact',
        id: contact[idKey],
      });
    },
  },
  components: {
    SchedulePicker,
  },
};
</script>

<style lang="postcss" scoped>
@import '../variables.css';

#admin {
  height: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 20px;

  & > div {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
    width: 100%;
    max-width: none;
  }
}
.timeslot {
  &.disabled {
    cursor: auto;
  }
}
.schedule-picker,
.details {
  flex-basis: 50%;
}
.schedule-picker {
  flex-grow: 1;
  height: 100%;
  max-height: 400px;
}
.details {
  display: flex;
  justify-content: space-between;

  & > * {
    display: flex;
    flex-direction: column;
    width: calc(50% - 10px);
    flex-shrink: 1;

    & > header {
      display: flex;
      padding: 5px;

      & > *:first-child {
        margin-right: auto;
      }
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-shrink: 1;
      overflow: auto;
    }
  }
  & .timeslot {
    padding: 5px;
    margin: 1px 0;
  }
}
.dancer,
.contact {
  display: flex;
  width: 100%;

  & > * {
    flex-basis: 25%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
