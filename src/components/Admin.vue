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
      <schedule-picker :timeslots="timeslots" content-key="$name" :show-footer="false" @select="handleTimeslotSelect" />

      <table>
        <thead>
          <tr>
            <th v-for="key of asTableData(adminTimeslots)[0]">{{ key }}</th>
          </tr>
        </thead>
        <thead>
          <tr v-for="row of asTableData(adminTimeslots).slice(1)">
            <td v-for="val of row">{{ val }}</td>
          </tr>
        </thead>
      </table>
      <table>
        <thead>
          <tr>
            <th v-for="key of asTableData(adminDancers)[0]">{{ key }}</th>
          </tr>
        </thead>
        <thead>
          <tr v-for="row of asTableData(adminDancers).slice(1)">
            <td v-for="val of row">{{ val }}</td>
          </tr>
        </thead>
      </table>
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
        item.dancers = this.dancers
          .filter(d => Object.keys(item['@dancers']).includes(d[idKey]))
          .map(d => d.name);
        item.classes = item.$classes.map(c => c.name);
        item.locations = item.$locations.map(l => l.nickname);

        delete item.$capacity;
        delete item.$name;
        delete item['@dancers'];
        delete item['@classes'];
        delete item.$classes;
        delete item['@locations'];
        delete item.$locations;
        delete item.props;
        return item;
      }).sort((a, b) => (a.startDay < b.startDay ? -1 : 1));
    },
    adminDancers() {
      return this.dancers.map(($item) => {
        const item = {
          ...$item,
          birthday: moment($item.birthday).format('MMMM d, YYYY'),
        };
        item.timeslots = this.timeslots
            .filter(t => Object.keys(item['@timeslots']).includes(t[idKey]))
            .map(t => `${moment().day(t.startDay).format('dddd')} @ ${t.startTime}`);

        delete item['@timeslots'];
        delete item['@users'];
        return item;
      });
    },
    dancers() {
      return this.dancersRaw.map(($item) => {
        const item = {
          '@timeslots': {},
          '@users': {},
          ...$item,
        };
        return item;
      });
    },
    contacts() {
      return this.contactsRaw.map(($item) => {
        const item = {
          '@users': {},
          ...$item,
        };
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
    getCollectionKeys(arrayOfObjects) {
      const keys = [].concat.apply([], arrayOfObjects // eslint-disable-line prefer-spread
        .map(item => Object.keys(item)))
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort();

      return keys;
    },
    asTableData(arrayOfObjects) {
      const keys = this.getCollectionKeys(arrayOfObjects);

      return [keys].concat(arrayOfObjects.map(item => [].concat(keys).map(key => item[key])));
    },

    handleTimeslotSelect(e, timeslot) {
      console.log(timeslot);
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
  & > div {
    width: 100%;
    max-width: none;
  }
}
</style>
