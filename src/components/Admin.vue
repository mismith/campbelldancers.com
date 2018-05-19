<template>
  <section id="admin">
    <div v-if="user && userRaw.admin">
      <header>
        <label class="selectable">
          <select v-model="activeSeasonId" required>
            <option v-for="season in seasons" :key="season[idKey]" :value="season[idKey]">
              {{ season.name }}
            </option>
          </select>
        </label>
      </header>
      <schedule-picker
        v-for="season in adminSeasons"
        :key="season[idKey]"
        v-show="season[idKey] === activeSeasonId"
        :timeslots="season.$timeslots"
        content-key="$name"
        :show-footer="false"
        @timeslot-click="handleTimeslotSelect"
        @timeslot-dblclick="handleTimeslotEdit"
      />
      <div class="details">
        <div class="dancers">
          <header>
            <h6>Dancers</h6>
            <h6 v-if="selected.id" class="color-accent">{{ dancers.filter(d => d.props.active).length }}/</h6>
            <h6>{{ dancers.length }}</h6>
          </header>
          <div>
            <article
              v-for="dancer of dancers"
              :key="dancer[idKey]"
              v-show="!selected.id || selected.type === 'dancer' || dancer.props.active"
              :id="`dancer-${dancer[idKey]}`"
              @click="handleDancerSelect($event, dancer)"
              @dblclick="handleDancerEdit($event, dancer)"
              class="dancer timeslot"
              :class="dancer.props"
            >
              <div :title="dancer.name"><strong>{{ dancer.name }}</strong></div>
              <small v-show="dancer.birthday" :title="`${moment(dancer.birthday).fromNow(true)} old`">{{ moment(dancer.birthday).format('MMM D, YYYY') }}</small>
              <small :title="dancer.ability">{{ dancer.ability }}</small>
              <small :title="dancer.medical">{{ dancer.medical }}</small>
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
            <article
              v-for="contact of contacts"
              :key="contact[idKey]"
              v-show="!selected.id || selected.type === 'contact' || contact.props.active"
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
            </article>
          </div>
        </div>
      </div>
      <modal name="editing" height="80%">
        <pre v-if="editing.type">{{ editingObject }}</pre>
      </modal>
    </div>
    <div v-else class="align-center">
      <div v-if="!user">
        <p>Please login to continue.</p>
        <auth />
      </div>
      <aside v-else>Sorry, you need to be an admin.</aside>
    </div>
  </section>
</template>

<script>
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
      selected: {
        type: undefined,
        id: undefined,
      },
      editing: {},
      activeSeasonId: undefined,
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
        item.$users = this.usersRaw
          .filter(u => Object.keys(item['@users']).includes(u[idKey]));
        item.$hasContacts = this.getUserRelations(item, 'contacts').length;

        item.props.active = this.selected.type === 'dancer' && this.selected.id === item[idKey];
        item.props.active = item.props.active ||
          (this.selected.type === 'timeslot' && item['@timeslots'][this.selected.id]) ||
          (this.selected.type === 'contact' && (Object.keys((this.contacts.find(c => c[idKey] === this.selected.id) || {})['@users'] || {}) || []).includes(Object.keys(item['@users'])[0]));
        item.props.disabled = !item.$timeslots.length || !item.$hasContacts;

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

        item.$users = this.usersRaw
          .filter(u => Object.keys(item['@users']).includes(u[idKey]));
        item.$hasDancers = this.getUserRelations(item, 'dancers').length;

        item.props.active = this.selected.type === 'contact' && this.selected.id === item[idKey];
        item.props.active = item.props.active || (this.selected.type === 'dancer' && (Object.keys((this.dancers.find(d => d[idKey] === this.selected.id) || {})['@users'] || {}) || []).includes(Object.keys(item['@users'])[0]));
        item.props.disabled = !item.$hasDancers;

        return item;
      }).reverse().filter(item => item.name);
    },
    users() {
      return this.usersRaw.map(($item) => {
        const item = {
          ...$item,
        };

        return item;
      });
    },

    editingObject() {
      if (this.editing && this.editing.type) {
        let collection;
        switch (this.editing.type) {
          case 'timeslot':
            collection = this.adminTimeslots;
            break;
          default:
            collection = this[`${this.editing.type}s`];
            break;
        }
        return collection.find(item => item[idKey] === this.editing.id);
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

    toggleEditing(type, item) {
      if (this.editing && this.editing.type === type && this.editing.id === item[idKey]) {
        this.editing = {};
        this.$modal.hide('editing');
      } else {
        this.editing = {
          type,
          id: item[idKey],
        };
        this.$modal.show('editing');
      }
    },
    handleTimeslotEdit(e, timeslot) {
      this.toggleEditing('timeslot', timeslot);
    },
    handleDancerEdit(e, dancer) {
      this.toggleEditing('dancer', dancer);
    },
    handleContactEdit(e, contact) {
      this.toggleEditing('contact', contact);
    },

    formatPhone(phone) {
      return (phone || '').replace(/[^0-9]/g, '').replace(/^(\d{3})(\d{3})(\d+$)/, '$1-$2-$3');
    },
    getUserRelations(item, type) {
      let relations = [];
      Object.keys(item['@users'] || {}).forEach((userId) => {
        relations = [
          ...relations,
          ...this[`${type}Raw`].filter(typeItem => Object.keys(typeItem['@users'] || {}).includes(userId)),
        ];
      });
      return relations;
    },
  },
  created() {
    this.$firebaseRefs.seasonsRaw.once('value').then((snap) => {
      this.activeSeasonId = Object.keys(snap.val()).sort().slice(-1).pop();
    });
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

  & .selectable {
    justify-content: center;
    margin-bottom: 5px;

    & select {
      padding-right: 30px;
    }
  }

  & .timeslot {
    &.disabled {
      cursor: auto;
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
      & > header {
        display: flex;
        padding: 5px;

        & > * {
          flex-shrink: 1;

          &:first-child {
            @apply --ellipsis;
            margin-right: auto;
          }
        }
      }
      & > div {
        display: flex;
        flex-direction: column;
        flex-shrink: 1;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }
    }
    & .timeslot {
      margin: 1px 0;
    }
  }
  & .dancer,
  & .contact {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;

    & > * {
      @apply --ellipsis;
      padding: 3px 5px;

      @media (--medium-min) {
        flex-basis: 50%;
      }
    }
  }
}
.v--modal-overlay {
  & .v--modal-box {
    overflow: auto !important;

    & pre {
      margin: 20px;
    }
  }
}
</style>
