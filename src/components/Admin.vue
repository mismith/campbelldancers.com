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
            <h4>Dancers</h4>
          </header>
          <article v-for="dancer of dancers" @click="handleDancerSelect($event, dancer)" class="dancer timeslot" :class="dancer.props">
            <div :title="dancer.name">{{ dancer.name }}</div>
            <div :title="`${moment(dancer.birthday).fromNow(true)} old`">{{ moment(dancer.birthday).format('MMM d, YYYY') }}</div>
            <div :title="dancer.ability">{{ dancer.ability }}</div>
            <div :title="dancer.medical">{{ dancer.medical }}</div>
          </article>
        </div>
        <div class="contacts">
          <header>
            <h4>Emergency Contacts</h4>
          </header>
          <article v-for="contact of contacts" class="timeslot contact" :class="contact.props">
            <div :title="contact.name">{{ contact.name }}</div>
            <a :href="`mailto:${contact.email}`" :title="contact.email">{{ contact.email }}</a>
            <a :href="`tel:${contact.phone}`">{{ contact.phone }}</a>
            <a :href="`tel:${contact.phone2}`">{{ contact.phone2 }}</a>
          </article>
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
        item.props.active = item.props.active || (this.selected.type === 'timeslot' && item['@timeslots'][this.selected.id]);
        return item;
      }).sort((a, b) => (a.name === b.name ? 0 : (a.name < b.name ? -1 : 1))); // eslint-disable-line
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
        item.props.disabled = !(this.selected.type === 'dancer' && (Object.keys((this.dancers.find(d => d[idKey] === this.selected.id) || {})['@users'] || {}) || []).includes(Object.keys(item['@users'])[0]));
        return item;
      });
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
    handleTimeslotSelect(e, timeslot) {
      this.selected = {
        type: 'timeslot',
        id: timeslot[idKey],
      };
    },
    handleDancerSelect(e, dancer) {
      this.selected = {
        type: 'dancer',
        id: dancer[idKey],
      };
    },
  },
  components: {
    SchedulePicker,
  },
};
</script>

<style lang="postcss">
@import '../variables.css';

#admin {
  height: 100%;

  & > div {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
    width: 100%;
    max-width: none;

    & > * {
      flex-basis: 50%;
      flex-grow: 1;
    }
  }
}
.details {
  display: flex;
  justify-content: space-between;

  & > * {
    display: flex;
    flex-direction: column;
    flex-basis: calc(50% - 20px);

    & header {
      padding-left: 5px;
      padding-right: 5px;
    }
    & .timeslot {
      padding: 5px;
      margin: 1px;
    }
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
.contact {
  cursor: auto;
}
</style>
