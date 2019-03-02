<template>
  <section id="admin">
    <div v-if="user && userRaw.admin">
      <schedule-picker
        v-for="season in adminSeasons"
        :key="season[idKey]"
        v-if="season[idKey] === activeSeasonId"
        :blocks="season.blocks"
        :timeslots="season.$timeslots"
        content-key="$name"
        :show-footer="false"
        @timeslot-click="handleTimeslotSelect"
        @timeslot-dblclick="handleTimeslotEdit"
        @time-dblclick="handleTimeslotAdd"
      />
      <div class="schedule-selector">
        <label class="selectable" style="margin-top: 5px;">
          <select v-model="activeSeasonId" required>
            <option v-for="season in seasons" :key="season[idKey]" :value="season[idKey]">
              {{ season.name }}
            </option>
          </select>
        </label>
      </div>
      <div class="details">
        <article class="dancers">
          <header>
            <h6>
              Dancers
            </h6>
            <a @click="showAll = !showAll" class="toggler">Show {{ showAll ? 'Only Enrolled' : 'All' }}</a>
            <h6 v-if="selected.id" class="color-accent">{{ dancers.filter(d => d.props.active).length }}/</h6>
            <h6>{{ dancers.length }}</h6>
          </header>
          <ul>
            <li
              v-for="dancer of dancers.filter(d => showAll || !d.props.disabled)"
              :key="dancer[idKey]"
              :id="`dancer-${dancer[idKey]}`"
              @click="handleDancerSelect($event, dancer)"
              @dblclick="handleDancerEdit($event, dancer)"
              class="dancer timeslot"
              :class="dancer.props"
            >
              <header>
                <div><strong>{{ dancer.name }}</strong></div>
                <button
                  v-if="selected.type === 'timeslot'"
                  @click.stop="toggleDancerTimeslot(dancer, selected.id)"
                >
                  {{ dancer.props.active ? 'Remove from' : 'Add to' }} class
                </button>
              </header>
              <small v-show="dancer.birthday" :title="`${moment(dancer.birthday).fromNow(true)} old`">{{ moment(dancer.birthday).format('MMM D, YYYY') }}</small>
              <small v-show="dancer.ability">{{ dancer.ability }}</small>
              <small v-show="dancer.medical">{{ dancer.medical }}</small>
            </li>
          </ul>
        </article>
        <article class="contacts">
          <header>
            <h6>Emergency Contacts</h6>
            <h6 v-if="selected.id" class="color-accent">{{ contacts.filter(c => c.props.active).length }}/</h6>
            <h6>{{ contacts.length }}</h6>
          </header>
          <ul>
            <li
              v-for="contact of contacts"
              :key="contact[idKey]"
              :id="`contact-${contact[idKey]}`"
              @click="handleContactSelect($event, contact)"
              @dblclick="handleContactEdit($event, contact)"
              class="timeslot contact"
              :class="contact.props"
            >
              <div :title="contact.name"><strong>{{ contact.name }}</strong></div>
              <small><a :href="`tel:${contact.phone}`">{{ formatPhone(contact.phone) }}</a></small>
              <small><a :href="`tel:${contact.phone2}`">{{ formatPhone(contact.phone2) }}</a></small>
              <small><a :href="`mailto:${contact.email}`" :title="contact.email">{{ contact.email }}</a></small>
            </li>
          </ul>
        </article>
      </div>
      <modal name="editing" height="80%">
        <div class="two-inputs">
          <form v-if="editing.type === 'timeslot' && editingObject" @submit.prevent="handleTimeslotUpdate">
            <table>
              <tbody>
                <tr>
                  <td>Day</td>
                  <td>
                    <label class="selectable">
                      <select v-model="editingObject.startDay" required>
                        <option value="0">Sunday</option>
                        <option value="1">Monday</option>
                        <option value="2">Tuesday</option>
                        <option value="3">Wednesday</option>
                        <option value="4">Thursday</option>
                        <option value="5">Friday</option>
                        <option value="6">Saturday</option>
                      </select>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>Start Time</td>
                  <td>
                    <input type="text" v-model="editingObject.startTime" required />
                  </td>
                </tr>
                <tr>
                  <td>End Time</td>
                  <td>
                    <input type="text" v-model="editingObject.endTime" required />
                  </td>
                </tr>
                <tr>
                  <td>Location</td>
                  <td>
                    <select v-model="editingObject['@@locations']" required multiple>
                      <option v-for="location in locations" :key="location[idKey]" :value="location[idKey]">
                        {{ location.nickname }}
                      </option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Classes</td>
                  <td>
                    <select v-model="editingObject['@@classes']" required multiple>
                      <option v-for="c in classes" :key="c[idKey]" :value="c[idKey]">
                        {{ c.name }}
                      </option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit" class="btn">Save</button>
            <button type="button" class="btn" @click="handleTimeslotRemove($event, editingObject)">
              Delete
            </button>
          </form>
          <pre v-if="editing.type">{{ editingObject }}</pre>
        </div>
      </modal>
    </div>
    <div v-else class="align-center">
      <div v-if="!user">
        <p>Please login to continue.</p>
        <auth />
      </div>
      <div v-else-if="!user.id"><img src="/static/images/loading.svg" /></div>
      <aside v-else>Sorry, you need to be an admin.</aside>
    </div>
  </section>
</template>

<script>
import { countryFilter } from '@/main';
import {
  idKey,
  db,
  relate,
  unrelate,
  toArray,
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
      selected: {
        type: undefined,
        id: undefined,
      },
      showAll: true,
      editing: {},
      activeSeasonId: undefined,
    };
  },
  firebase: {
    usersRaw: db.child('users'),
    timeslotsRaw: db.child('timeslots'),
  },
  computed: {
    enrollmentsRaw() {
      return this.users.reduce((enrollments, user) => enrollments.concat(user.$enrollments), []);
    },
    dancersRaw() {
      return this.users.reduce((dancers, user) => dancers.concat(user.$dancers), []);
    },
    contactsRaw() {
      return this.users.reduce((contacts, user) => contacts.concat(user.$contacts), []);
    },

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
    adminSeasons() {
      return this.seasons.map(($item) => {
        const item = {
          ...$item,
        };

        item.$timeslots = this.adminTimeslots
          .filter(t => Object.keys(item['@timeslots']).includes(t[idKey]));

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
        item.props.disabled = !item.$timeslots.length || !item.$contacts.length;

        return item;
      }).reverse().filter(item => item.name);
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
        item.props.disabled = !item.$dancers.length;

        return item;
      }).reverse().filter(item => item.name);
    },
    users() {
      return this.usersRaw
        .filter(countryFilter)
        .map(($item) => {
          const $enrollments = this.pluckUserCollection($item, 'enrollments');
          const $dancers = this.pluckUserCollection($item, 'dancers');
          const $contacts = this.pluckUserCollection($item, 'contacts');
          const item = {
            ...$item,
            $enrollments: $enrollments.map(e => ({ ...e, $contacts, $dancers })),
            $dancers: $dancers.map(d => ({ ...d, $contacts })),
            $contacts: $contacts.map(c => ({ ...c, $dancers })),
          };
          return item;
        })
        // eslint-disable-next-line no-underscore-dangle
        .sort((a, b) => this.moment(a._loggedin) - this.moment(b._loggedin));
    },

    editingObject() {
      if (this.editing && this.editing.type && this.editing.id) {
        switch (this.editing.type) {
          case 'timeslot': {
            const timeslot = this.adminTimeslots.find(item => item[idKey] === this.editing.id);
            if (timeslot) {
              return Object.entries(timeslot).reduce((acc, [k, v]) => {
                if (/^@/.test(k)) {
                  acc[`@${k}`] = Object.keys(v);
                } else {
                  acc[k] = v;
                }
                return acc;
              }, {});
            }
            break;
          }
          default: {
            return this[`${this.editing.type}s`].find(item => item[idKey] === this.editing.id);
          }
        }
      }
      return null;
    },
  },
  methods: {
    toggleSelected(type, item) {
      if (this.selected && this.selected.type === type && this.selected.id === item[idKey]) {
        this.selected = {
          type: null,
          id: null,
        };
      } else {
        this.selected = {
          type,
          id: item[idKey],
        };
      }
    },
    handleTimeslotSelect(e, timeslot) {
      this.toggleSelected('timeslot', timeslot);
    },
    handleDancerSelect(e, dancer) {
      this.toggleSelected('dancer', dancer);
    },
    handleContactSelect(e, contact) {
      this.toggleSelected('contact', contact);
    },

    toggleEditing(type, id) {
      if (this.editing && this.editing.type === type && this.editing.id === id) {
        this.editing = {};
        this.$modal.hide('editing');
      } else {
        this.editing = {
          type,
          id,
        };
        this.$modal.show('editing');
      }
    },
    handleTimeslotEdit(e, timeslot) {
      this.toggleEditing('timeslot', timeslot[idKey]);
    },
    async handleTimeslotAdd(e, startDay, startTime, endTime) {
      const timeslot = {
        startDay: Number.parseInt(startDay.format('d'), 10),
        startTime: startTime.format('HH:mm'),
        endTime: endTime.format('HH:mm'),
      };

      const { key } = await this.$firebaseRefs.timeslotsRaw.push(timeslot);
      timeslot[idKey] = key;

      // link to season
      await relate({
        collection: 'seasons',
        id: this.activeSeasonId,
      }, {
        collection: 'timeslots',
        id: timeslot[idKey],
      });

      this.toggleEditing('timeslot', timeslot[idKey]);
    },
    async handleTimeslotUpdate() {
      const changes = Object.entries(this.editingObject).reduce((acc, [k, v]) => {
        if (/^@@/.test(k)) {
          const ids = Array.isArray(v) ? v : [v];
          acc[k.replace(/^@@/, '@')] = ids.reduce((relations, id) => {
            relations[id] = id; // eslint-disable-line no-param-reassign
            return relations;
          }, {});
        } else if (!/^[@$.]/.test(k) && k !== 'props') {
          const val = /^\d+$/.test(v) ? Number.parseInt(v, 10) : v;
          acc[k] = val;
        }
        return acc;
      }, {});

      await this.$firebaseRefs.timeslotsRaw.child(this.editing.id).update(changes);

      this.toggleEditing('timeslot', this.editing.id);
    },
    async handleTimeslotRemove() {
      if (window.confirm('Are you sure?')) { // eslint-disable-line no-alert
        const timeslotId = this.editing.id;

        this.toggleEditing('timeslot', timeslotId);

        await Promise.all([
          this.$firebaseRefs.timeslotsRaw
            .child(timeslotId)
            .remove(),
          this.$firebaseRefs.seasonsRaw
            .child(this.activeSeasonId).child('@timeslots').child(timeslotId)
            .remove(),
        ]);
      }
    },
    handleDancerEdit(e, dancer) {
      this.toggleEditing('dancer', dancer[idKey]);
    },
    handleContactEdit(e, contact) {
      this.toggleEditing('contact', contact[idKey]);
    },

    formatPhone(phone) {
      return (phone || '').replace(/[^0-9]/g, '').replace(/^(\d{3})(\d{3})(\d+$)/, '$1-$2-$3');
    },
    pluckUserCollection(user, collection) {
      const userId = user[idKey];
      return toArray(user[collection]).map(item => ({
        '@users': {
          [userId]: userId,
        },
        $users: [
          user,
        ],
        ...item,
      }));
    },

    toggleDancerTimeslot(dancer, timeslotId) {
      const action = dancer['@timeslots'][timeslotId] ? unrelate : relate;

      return Promise.all(Object.keys(dancer['@users']).map(userId => action({
        path: db.child(`users/${userId}`).path,
        collection: 'dancers',
        id: dancer[idKey],
      }, {
        collection: 'timeslots',
        id: timeslotId,
      })));
    },
  },
  async created() {
    await this.$firebaseRefs.seasonsRaw.once('value');
    this.activeSeasonId = this.seasons.slice(-1).pop()[idKey];
  },
  components: {
    SchedulePicker,
  },
};
</script>

<style lang="postcss">
@import '../variables.css';

#admin {
  padding: 20px;

  & > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: none;
  }

  & .schedule-selector .selectable {
    justify-content: center;
    margin-bottom: 5px;

    & select {
      padding-right: 30px;
    }
  }

  & .toggler {
    font-size: xx-small;
    margin-right: 30px;
    margin-bottom: -2px;
    cursor: pointer;
  }

  & .timeslot {
    &.disabled {
      cursor: auto;
    }
  }
  & article {
    & > header {
      display: flex;
      align-items: center;
      padding: 5px;

      & > * {
        flex-shrink: 1;

        &:first-child {
          @apply --ellipsis;
          margin-right: auto;
        }
      }
    }
    & ul {
      padding: 0;
      margin: 0;

      & > li {
        margin: 1px 0;

        & > header {
          display: flex;
          align-items: center;

          & > *:first-child {
            margin-right: auto;
          }
        }
      }
    }
  }
  @media (--medium-min) {
    & .schedule-picker {
      height: 400px;
    }
  }
  & .details {
    display: flex;
    justify-content: space-between;

    & > * {
      display: flex;
      flex-direction: column;
      width: calc(50% - 1px);
      flex-shrink: 1;

      @media (--medium-min) {
        width: calc(50% - 10px);
      }
      & > div {
        display: flex;
        flex-direction: column;
        flex-shrink: 1;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }
    }
  }
  & .dancer,
  & .contact {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;

    & > * {
      padding: 3px 5px;
    }
  }
}
.v--modal-overlay {
  & .v--modal-box {
    overflow: auto !important;

    & > * {
      margin: 20px;
    }
  }
}
</style>
