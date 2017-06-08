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
            <th v-for="key of asTableData(timeslots)[0]">{{ key }}</th>
          </tr>
        </thead>
        <thead>
          <tr v-for="row of asTableData(timeslots).slice(1)">
            <td v-for="val of row">{{ val }}</td>
          </tr>
        </thead>
      </table>      <table>
        <thead>
          <tr>
            <th v-for="key of asTableData(dancersRaw)[0]">{{ key }}</th>
          </tr>
        </thead>
        <thead>
          <tr v-for="row of asTableData(dancersRaw).slice(1)">
            <td v-for="val of row">{{ val }}</td>
          </tr>
        </thead>
      </table>
    </div>
  </section>
</template>

<script>
import {
  // firebase,
  // idKey,
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
  // computed: {
  //   users() {
  //     return this.usersRaw.map(($item) => {
  //       const item = {
  //         ...$item,
  //       };
  //       return item;
  //     });
  //   },
  //   dancersRaw() {
  //     const dancersRaw = [];
  //     this.users.forEach((user) => {
  //       dancersRaw.splice(0, 0, user.dancers);
  //     });
  //     return dancersRaw;
  //   },
  //   adminTimeslots() {
  //     return this.timeslots.map(($item) => {
  //       const item = {
  //         ...$item,
  //       };
  //       item.$dancers = this.dancers
  //         .filter(d => Object.keys(item['@dancers']).includes(d[idKey]));
  //       return item;
  //     });
  //   },
  // },
  methods: {
    asTableData(arrayOfObjects) {
      const keys = [].concat.apply([], arrayOfObjects // eslint-disable-line prefer-spread
        .map(item => Object.keys(item)))
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort();

      return [keys].concat(arrayOfObjects.map(item => [].concat(keys).map(key => item[key])));
    },

    // resolveRelations(item) {

    // },

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
