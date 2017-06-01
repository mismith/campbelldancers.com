<template>
  <form class="enroll align-center" @submit.prevent="handleSubmit">
    <header>
      <ol class="breadcrumbs">
        <li v-for="(step, i) in steps" v-if="step.name" @click.prevent="i < stepIndex && (stepIndex = i)" :class="{breadcrumb: true, active: i === stepIndex, disabled: i > stepIndex}">
          <span>{{ step.name }}</span>
        </li>
      </ol>
    </header>

    <div v-if="stepIndex === 0 && !user">
      <header>
        <p>Save yourself some typing by linking an account below; if you do, <br />next time we'll have all your info stored and ready to go.</p>
      </header>
      <div class="flex-rows">
        <auth />
      </div>
      <footer>
        <a class="btn-add" @click.prevent="loginAnonymously">
          <big style="margin-top: -7px;">&raquo;</big> Skip <small>(and don't save info for next time)</small>
        </a>
      </footer>
    </div>
    <div v-if="stepIndex === 0 && user">
      <header>
        <p>First off, let's confirm some info about you.</p>
      </header>
      <div class="flex-rows">
        <article class="card bg-tartan">
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input type="text" name="name" v-model="enroller.name" placeholder="First Last" required autofocus />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input type="email" name="email" v-model="enroller.email" required />
                </td>
              </tr>
              <tr>
                <td>I'm enrolling:</td>
                <td>
                  <label class="selectable">
                    <select v-model="enroller.for" required>
                      <option value="children">my child/children</option>
                      <option value="self">myself</option>
                    </select>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    </div>

    <div v-if="stepIndex === 1">
      <header>
        <p>Who will be dancing with us?</p>
        <p><small>For private lessons, we ask that you please pick the earliest slot available <br/>on that day—that way we won't have gaps between classes.</small></p>
      </header>
      <div class="flex-rows">
        <article v-for="(dancer, dancerIndex) of dancers" v-if="!dancer['@deleted']" class="card bg-tartan">
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input type="text" v-model="dancer.name" placeholder="First Last" required autofocus />
                </td>
              </tr>
              <tr>
                <td>Birthday</td>
                <td>
                  <input type="date" v-model="dancer.birthday" placeholder="YYYY-MM-DD" required />
                </td>
              </tr>
              <tr>
                <td>Competitive level</td>
                <td>
                  <label class="selectable">
                    <select v-model="dancer.ability" required>
                      <optgroup>
                        <option>New / Unsure</option>
                      </optgroup>
                      <optgroup>
                        <option>Beginner</option>
                        <option>Novice</option>
                        <option>Intermediate</option>
                        <option>Premier</option>
                      </optgroup>
                      <optgroup>
                        <option>Non-competitive</option>
                      </optgroup>
                    </select>
                  </label>
                </td>
              </tr>
              <tr>
                <td>Classes</td>
                <td>
                  <label title="Pick classes" class="selectable">
                    <input @click.prevent="schedulePickerDancerIndex = dancerIndex" placeholder="0 selected" :value="dancer.timeslotIds && Object.keys(dancer.timeslotIds).length ? `${Object.keys(dancer.timeslotIds).length} selected` : null" required />
                  </label>
                </td>
              </tr>
              <tr>
                <td>Allergies / <br />Medical <br />concerns</td>
                <td>
                  <textarea v-model="dancer.medical" placeholder="(optional)"></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <aside v-if="dancerIndex > 0 || dancers.filter(filterDeleted).length > 1">
            <button @click.prevent="removeDancer(dancerIndex)" title="Remove dancer" class="btn-close">&times;</button>
          </aside>
        </article>
      </div>
      <footer>
        <a class="btn-add" @click.prevent="addDancer">
          <big>&plus;</big> Add another dancer
        </a>
      </footer>
      <aside v-if="schedulePickerDancerIndex !== null" @click.self="schedulePickerDancerIndex = null" class="schedule-picker-container align-left">
        <schedule-picker :timeslots="schedulePickerDancerTimeslots" @select="pickClass" @done="schedulePickerDancerIndex = null" />
      </aside>
    </div>

    <div v-if="stepIndex === 2">
      <header>
        <p>Who should we contact if something goes awry?</p>
        <p><small>We suggest you add at least 2 people—always better to be prepared!</small></p>
      </header>
      <div class="flex-rows">
        <article v-for="(contact, contactIndex) of contacts" v-if="!contact['@deleted']" class="card bg-tartan">
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input type="text" v-model="contact.name" placeholder="First Last" required autofocus />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input type="email" v-model="contact.email" required />
                </td>
              </tr>
              <tr>
                <td>Primary phone</td>
                <td>
                  <input type="tel" v-model="contact.phone" required />
                </td>
              </tr>
              <tr>
                <td>Secondary phone</td>
                <td>
                  <input type="tel" v-model="contact.phone2" placeholder="(optional)" />
                </td>
              </tr>
            </tbody>
          </table>
          <aside v-if="contactIndex > 0 || contacts.filter(filterDeleted).length > 1">
            <button @click.prevent="removeContact(contactIndex)" title="Remove emergency contact" class="btn-close">&times;</button>
          </aside>
        </article>
      </div>
      <footer>
        <a class="btn-add" @click.prevent="addContact">
          <big>&plus;</big> Add another emergency contact
        </a>
      </footer>
    </div>

    <div v-if="stepIndex === steps.length - 1">
      <header>
        <h2 class="heading">Enrolled</h2>
      </header>
      <div>
        <p>We can't wait to enjoy dance together :)</p>
        <p>&nbsp;</p>
        <p><img src="/static/images/instructors.jpg" alt="Our instructors" /></p>
      </div>
    </div>

    <footer v-if="user" class="call-to-action align-center">
      <button v-if="stepIndex === 0" @click.prevent="logout" class="btn dimmed">Sign Out</button>
      <button v-if="1 <= stepIndex && stepIndex < 3" @click.prevent="stepIndex -= 1" class="btn btn-left dimmed">Back</button>
      <button v-if="stepIndex < steps.length - 1" type="submit" class="btn btn-right">Next</button>
    </footer>
  </form>
</template>

<script>
import moment from 'moment';
import {
  firebase,
  idKey,
  loadCollectionItems,
  loadUserCollectionItems,
  createOrUpdateUserCollectionItem,
  createOrUpdateUserCollectionItems,
} from '../helpers/firebase';
import Auth from './Auth';
import SchedulePicker from './SchedulePicker';

export default {
  name: 'enroll',
  data() {
    return {
      user: firebase.auth().currentUser,
      idKey,

      stepIndex: 0,
      steps: [
        {
          name: 'Account',
        },
        {
          name: 'Dancers',
        },
        {
          name: 'Emergency Contacts',
        },
        {}, // Done
      ],


      dancers: [],
      contacts: [],
      classes: [],
      timeslots: [],

      enroller: {},
      enrollment: {},

      schedulePickerDancerIndex: null,
    };
  },
  computed: {
    schedulePickerDancerTimeslots() {
      const dancer = this.dancers[this.schedulePickerDancerIndex];
      const age = moment().diff(dancer.birthday, 'years');

      return this.timeslots.map((t) => {
        const timeslot = { ...t };
        const timeslotId = timeslot[idKey];

        // selected
        timeslot.props.active = false;
        if (dancer.timeslotIds[timeslotId]) {
          timeslot.props.active = true;
        }

        // unavailable
        timeslot.props.disabled = !timeslot.classes.reduce((enabled, c) => {
          if (enabled) return true;
          if (c.capacity && timeslot.enrolled >= c.capacity) return false;

          return !age || (age &&
            (!c.minAge || (c.minAge && age >= c.minAge)) &&
            (!c.maxAge || (c.maxAge && age <= c.maxAge))
          );
        }, timeslot.props.active);

        return timeslot;
      });
    },
  },
  methods: {
    // schedule picker
    pickClass(e, timeslot) {
      if (timeslot && timeslot.props && !timeslot.props.disabled) { // make sure it's selectable
        const timeslotId = timeslot[idKey];
        const timeslotData = this.timeslots.find(t => t[idKey] === timeslotId);
        const dancerData = this.dancers[this.schedulePickerDancerIndex];

        if (dancerData.timeslotIds[timeslotId]) {
          // unselect/remove
          delete dancerData.timeslotIds[timeslotId];
          timeslotData.enrolled -= 1;
        } else {
          // select/add
          dancerData.timeslotIds[timeslotId] = timeslotId;
          timeslotData.enrolled += 1;
        }
        if (e) e.stopPropagation();
      }
    },
    closeSchedulePicker(e) {
      if (e.key === 'Escape') {
        this.schedulePickerDancerIndex = null;
      }
    },

    // data-processing layers
    formatItem(collection, item = {}) {
      const formattedItem = {
        '@created': moment().format(),
        ...item,
      };
      switch (collection) {
        default:
          return formattedItem;
        case 'dancers':
          return {
            timeslotIds: {},
            ...formattedItem,
          };
        case 'timeslots': // eslint-disable-line no-case-declarations
          const timeslot = {
            enrolled: 0, // @TODO
            props: {
              active: false,
              disabled: false,
            },
            ...formattedItem,
          };

          timeslot.classes = this.classes
            .filter(c => Object.keys(timeslot.classIds).includes(c[idKey]));
          timeslot.name = timeslot.classes.map(c => c.name).join(' / ');

          return timeslot;
        case 'enroller':
          return {
            for: 'children',
            ...formattedItem,
          };
      }
    },
    filterDeleted(item) {
      return !item['@deleted'];
    },

    // data manipulation
    addDancer() {
      this.dancers.push(this.formatItem('dancers'));
    },
    removeDancer(dancerIndex) {
      if (this.dancers[dancerIndex][idKey]) {
        this.$set(this.dancers[dancerIndex], '@deleted', moment().format()); // @NB: use $set here since we are adding a new prop to the dancer
      } else {
        this.dancers.splice(dancerIndex, 1);
      }
    },

    addContact() {
      this.contacts.push(this.formatItem('contacts'));
    },
    removeContact(contactIndex) {
      if (this.contacts[contactIndex][idKey]) {
        this.$set(this.contacts[contactIndex], '@deleted', moment().format()); // @NB: use $set here since we are adding a new prop to the dancer
      } else {
        this.contacts.splice(contactIndex, 1);
      }
    },

    // data storage
    handleSubmit() {
      if (this.stepIndex === this.steps.length - 1) {
        // redirect to home
        window.location.href = '//campbelldancers.com'; // @TODO: do this properly?
        return;
      } else if (this.stepIndex === this.steps.length - 2) {
        // save form data
        Promise.all([
          createOrUpdateUserCollectionItems(this.dancers, 'dancers'),
          createOrUpdateUserCollectionItems(this.contacts, 'contacts'),
        ])
          .then(([userDancerIds, userContactIds]) => {
            // save dancers:contacts
            userDancerIds.forEach((dancerId) => {
              userContactIds.forEach((contactId) => {
                firebase.database().ref(`dancers:contacts/${dancerId}/${contactId}`).set(contactId);
              });
            });

            // save enrollment
            const dancerIds = {};
            this.dancers.forEach((d, i) => {
              if (d['@deleted']) return;
              dancerIds[userDancerIds[i]] = userDancerIds[i];
            });
            const contactIds = {};
            this.contacts.forEach((c, i) => {
              if (c['@deleted']) return;
              contactIds[userContactIds[i]] = userContactIds[i];
            });
            this.enrollment = {
              ...this.enrollment,
              '@created': moment().format(),
              '@userAgent': window.navigator.userAgent,
              enroller: this.enroller,
              dancerIds,
              contactIds,
            };
            return createOrUpdateUserCollectionItem(this.enrollment, 'enrollments');
          })
          .then((enrollmentId) => {
            this.enrollment[idKey] = enrollmentId;
          });
      } else if (this.stepIndex === 0) {
        // move enroller info to dancers or contacts based on 'for' choice
        if (this.enroller.for === 'self') {
          this.dancers[0].name = this.dancers[0].name || this.enroller.name;
        } else {
          this.contacts[0].name = this.contacts[0].name || this.enroller.name;
          this.contacts[0].email = this.contacts[0].email || this.enroller.email;
          this.contacts[0].phone = this.contacts[0].phone || this.enroller.phone;
        }
      }
      // move to next step (uses browser validation only)
      this.stepIndex += 1;
    },

    // auth
    userLoaded(user = firebase.auth().currentUser) { // eslint-disable-line no-unused-vars
      // initialize enroller
      this.enroller = this.formatItem('enroller', {
        name: user.displayName,
        email: user.email,
        phone: user.phoneNumber,
        ...this.enroller,
      });

      // initialize user data
      loadUserCollectionItems('dancers')
        .then(dancers => (dancers.length ? dancers : [{}]).map(d => this.formatItem('dancers', d)))
        .then(dancers => (this.dancers = dancers));
      loadUserCollectionItems('contacts')
        .then(contacts => (contacts.length ? contacts : [{}]).map(c => this.formatItem('contacts', c)))
        .then(contacts => (this.contacts = contacts));

      // initialize schedule picker data
      loadCollectionItems('classes')
        .then(classes => classes.map(c => this.formatItem('classes', c)))
        .then(classes => (this.classes = classes));
      loadCollectionItems('timeslots')
        .then(timeslots => timeslots.map(t => this.formatItem('timeslots', t)))
        .then(timeslots => (this.timeslots = timeslots));
    },
    loginAnonymously() {
      return firebase.auth().signInAnonymously();
    },
    logout() {
      return firebase.auth().signOut();
    },
  },
  created() {
    // handle user
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;

      if (user) {
        // store/update user info
        if (user.providerData && user.providerData.length) {
          firebase.database().ref('users').child(user.uid).update(user.providerData[0]);
        }

        this.userLoaded(user);
      } else {
        // force back to login step if logged out
        this.stepIndex = 0;

        this.enroller = this.formatItem('enroller');
      }
    });
  },
  mounted() {
    document.addEventListener('keydown', this.closeSchedulePicker);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.closeSchedulePicker);
  },
  components: {
    Auth,
    SchedulePicker,
  },
};
</script>

<style lang="postcss">
@import '../variables.css';

.enroll {
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    @media (--medium-max) {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
  }
  & > footer {
    display: flex;
    justify-content: center;
    align-self: stretch;
    max-width: var(--medium);
    width: 100%;
    margin-left: auto;
    margin-right: auto;

    & .btn:not([type=submit]) {
      margin-right: auto;
    }
  }
}

.breadcrumbs {
  @apply --heading;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 12px;
  list-style: none;
  padding: 0;
  margin: 20px 0;
  counter-reset: breadcrumbs;

  & .breadcrumb {
    display: inline-flex;
    align-items: center;
    background: none;
    padding: 10px 30px;
    border: 0;
    margin: 0;
    cursor: pointer;
    text-decoration: none;
    counter-increment: breadcrumbs;

    &:before {
      content: counter(breadcrumbs);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      letter-spacing: 0;
      border: double 3px var(--accent);
      border-radius: 50%;
      margin-right: 10px;
    }
    &.active {
      color: var(--accent);

      &:before {
        background-color: var(--accent);
        color: var(--lightest);
        border-color: var(--lightest);
      }
    }
    &.disabled {
      opacity: .5;
      cursor: not-allowed;
    }
    @media (--medium-max) {
      & span {
        display: none;
      }
    }
  }
}

article.card {
  /* for close button */
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  flex-shrink: 1;
  text-align: left;
}
aside.card {
  min-width: 200px;
}

.schedule-picker-container {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.75);
  padding: 30px;
  z-index: 101;

  & .schedule-picker {
    display: flex;
    height: 100%;
    background-color: var(--lightest);
    padding: 20px;
  }
  &:after {
    content: '×';
    position: absolute;
    top: 5px;
    right: 5px;
    color: rgba(255,255,255,1);
    font-size: 40px;
    line-height: 20px;
    vertical-align: top;
    cursor: pointer;
    opacity: .75;
  }
}
</style>
