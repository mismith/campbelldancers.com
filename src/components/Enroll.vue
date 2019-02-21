<template>
  <form id="enroll" class="align-center" @submit.prevent="handleSubmit">
    <header>
      <ol class="breadcrumbs">
        <li v-for="(step, i) in steps" :key="i" v-if="step.name" @click.prevent="i < enrollment.stepIndex && setStepIndex(i)" :class="{breadcrumb: true, active: i === enrollment.stepIndex, disabled: i > enrollment.stepIndex}">
          <span>{{ step.name }}</span>
        </li>
      </ol>
    </header>

    <div v-if="enrollment.stepIndex === 0 && !user">
      <header>
        <p>Save yourself some typing by linking an account below; if you do, <br />next time we'll have all your info stored and ready to go.</p>
      </header>
      <div class="flex-rows">
        <auth />
      </div>
      <footer>
        <a class="btn-add" @click.prevent="loginAnonymously">
          <big style="margin-top: -7px;">&raquo;</big> Enter Details Manually <small>(and don't save info for next time)</small>
        </a>
      </footer>
    </div>
    <div v-if="enrollment.stepIndex === 0 && user">
      <header>
        <p>First off, let's confirm some info about you:</p>
      </header>
      <div class="flex-rows">
        <article class="card bg-tartan">
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input type="text" name="name" v-model="enrollment.name" @input="sync(`~/enrollments/${enrollment[idKey]}/name`, $event.target.value)" placeholder="First Last" required autofocus />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input type="email" name="email" v-model="enrollment.email" @input="sync(`~/enrollments/${enrollment[idKey]}/email`, $event.target.value)" required />
                </td>
              </tr>
              <tr>
                <td>I'm enrolling:</td>
                <td>
                  <label class="selectable">
                    <select v-model="enrollment.for" @change="sync(`~/enrollments/${enrollment[idKey]}/for`, $event.target.value)" required>
                      <optgroup>
                        <option value="children">my child/children</option>
                        <option value="self">myself</option>
                      </optgroup>
                      <optgroup>
                        <option value="other">other</option>
                      </optgroup>
                    </select>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    </div>

    <div v-if="enrollment.stepIndex === 1">
      <header>
        <p>Who will be dancing with us?</p>
      </header>
      <div class="flex-rows">
        <article v-for="(dancer, dancerIndex) of dancers" :key="dancerIndex" class="card bg-tartan">
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input type="text" v-model="dancer.name" @input="sync(`~/dancers/${dancer[idKey]}/name`, $event.target.value)" placeholder="First Last" required autofocus />
                </td>
              </tr>
              <tr>
                <td>Birthday</td>
                <td>
                  <datepicker v-model="dancer.birthday" name="birthday" @input="sync(`~/dancers/${dancer[idKey]}/birthday`, moment($event).format())" format="MMMM d, yyyy" default-view="year" required />
                </td>
              </tr>
              <tr>
                <td>Competitive level</td>
                <td>
                  <label class="selectable">
                    <select v-model="dancer.ability" @change="sync(`~/dancers/${dancer[idKey]}/ability`, $event.target.value)" required>
                      <optgroup>
                        <option>New / Unsure</option>
                        <option>Not competing</option>
                      </optgroup>
                      <optgroup>
                        <option>Primary</option>
                        <option>Beginner</option>
                        <option>Novice</option>
                        <option>Intermediate</option>
                        <option>Premier</option>
                      </optgroup>
                    </select>
                  </label>
                </td>
              </tr>
              <tr>
                <td>Classes</td>
                <td>
                  <label title="Pick classes" class="selectable">
                    <input
                      @click="schedulePickerDancerIndex = dancerIndex"
                      :value="dancer.$timeslots.length ? `${dancer.$timeslots.length} selected` : null"
                      placeholder="0 selected"
                      @focus="$event.target.blur()"
                      required />
                  </label>
                </td>
              </tr>
              <tr>
                <td>Allergies / <br />Medical <br />concerns</td>
                <td>
                  <textarea v-model="dancer.medical" @input="sync(`~/dancers/${dancer[idKey]}/medical`, $event.target.value)" placeholder="(optional)"></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <aside v-if="dancerIndex > 0 || dancers.length > 1">
            <button @click.prevent="removeDancer(dancer)" title="Remove dancer" class="btn-close">&times;</button>
          </aside>
        </article>
      </div>
      <footer>
        <a class="btn-add" @click.prevent="addDancer">
          <big>&plus;</big> Add another dancer
        </a>
      </footer>
      <aside v-if="schedulePickerDancerIndex !== null && activeSeason" @click.self="schedulePickerDancerIndex = null" class="schedule-picker-container align-left">
        <schedule-picker
          content-key="$name"
          :blocks="activeSeason.blocks"
          :timeslots="schedulePickerDancerTimeslots"
          @timeslot-click="toggleTimeslot"
          @done="schedulePickerDancerIndex = null"
        />
      </aside>
    </div>

    <div v-if="enrollment.stepIndex === 2">
      <header>
        <p>Who should we contact if something goes awry?</p>
        <p><small>We suggest you add at least 2 people—always better to be prepared!</small></p>
      </header>
      <div class="flex-rows">
        <article v-for="(contact, contactIndex) of contacts" :key="contactIndex" class="card bg-tartan">
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input type="text" v-model="contact.name" @input="sync(`~/contacts/${contact[idKey]}/name`, $event.target.value)" placeholder="First Last" required autofocus />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input type="email" v-model="contact.email" @input="sync(`~/contacts/${contact[idKey]}/email`, $event.target.value)" required />
                </td>
              </tr>
              <tr>
                <td>Primary phone</td>
                <td>
                  <input type="tel" v-model="contact.phone" @input="sync(`~/contacts/${contact[idKey]}/phone`, $event.target.value)" required />
                </td>
              </tr>
              <tr>
                <td>Secondary phone</td>
                <td>
                  <input type="tel" v-model="contact.phone2" @input="sync(`~/contacts/${contact[idKey]}/phone2`, $event.target.value)" placeholder="(optional)" />
                </td>
              </tr>
            </tbody>
          </table>
          <aside v-if="contactIndex > 0 || contacts.length > 1">
            <button @click.prevent="removeContact(contact)" title="Remove emergency contact" class="btn-close">&times;</button>
          </aside>
        </article>
      </div>
      <footer>
        <a class="btn-add" @click.prevent="addContact">
          <big>&plus;</big> Add another emergency contact
        </a>
      </footer>
    </div>

    <img src="/static/images/feet.jpg" role="presentation" class="img-preload" />
    <div v-if="enrollment.stepIndex === steps.length - 1">
      <header>
        <h2 class="heading">Enrolled</h2>
      </header>
      <div class="thanks">
        <img src="/static/images/feet.jpg" role="presentation" />
        <aside class="card bg-tartan">
          <div>
            <p><strong>We're so glad you're joining us!</strong> ✨</p>
            <p>(P.S. an email is on its way to you with more info)</p>
          </div>
        </aside>
      </div>
    </div>

    <footer v-if="user" class="call-to-action align-center">
      <button type="button" v-if="enrollment.stepIndex === 0" @click.prevent="logout" class="btn dimmed">Sign Out</button>
      <button type="button" v-if="1 <= enrollment.stepIndex && enrollment.stepIndex < 3" @click.prevent="setStepIndex(enrollment.stepIndex - 1)" class="btn btn-left dimmed">Back</button>
      <button type="submit" v-if="enrollment.stepIndex < steps.length - 1" class="btn btn-right">Next</button>
    </footer>
  </form>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import moment from 'moment-mini';
import Datepicker from './Datepicker';
import {
  idKey,
  db,
  relate,
  unrelate,
  sync,
} from '../helpers/firebase';
import AuthedMixin from '../helpers/firebase.authed.mixin';
import PublicCollectionsMixin from '../helpers/firebase.publicCollections.mixin';
import SchedulePicker from './SchedulePicker';

export default {
  name: 'enroll',
  mixins: [
    AuthedMixin,
    PublicCollectionsMixin,
  ],
  data() {
    return {
      idKey,
      enrollmentRaw: null,
      enrollmentsRaw: [],
      dancersRaw: [],
      contactsRaw: [],

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

      schedulePickerDancerIndex: null,
    };
  },
  computed: {
    // models
    enrollment() {
      const item = {
        stepIndex: 0,
        for: 'children',
        ...this.enrollmentRaw,
      };
      return item;
    },
    dancers() {
      return this.dancersRaw.map(($item) => {
        const timeslotIds = Object.keys($item['@timeslots'] || {});
        const item = {
          '@timeslots': {},
          '@contacts': {},
          ...$item,
          $timeslots: this.timeslots
            .filter(t => timeslotIds.includes(t[idKey]))
            .filter(this.isTimeslotInActiveSeason),
        };
        return item;
      });
    },
    contacts() {
      return this.contactsRaw.map(($item) => {
        const item = {
          '@dancers': {},
          ...$item,
        };
        return item;
      });
    },

    activeSeason() {
      return this.seasons.find(season => season.props.active && !season.props.disabled);
    },

    schedulePickerDancerTimeslots() {
      // augment timeslots with dancer-specific props for interactivity
      const dancer = this.dancers[this.schedulePickerDancerIndex];
      const age = moment().diff(dancer.birthday, 'years');

      return this.timeslots
      .filter(this.isTimeslotInActiveSeason)
      .map((t) => {
        const timeslot = { ...t };

        if (timeslot['@dancers'][dancer[idKey]]) {
          timeslot.props.active = true;
          timeslot.props.disabled = false;
        } else {
          timeslot.props.disabled = false;
          timeslot.props.active = false;

          // disable if (any of the classes in this timeslot are) over capacity
          if (timeslot.$capacity > 0) {
            timeslot.props.disabled = Object.keys(timeslot['@dancers'] || {}).length >= timeslot.$capacity;
          }

          // disable if dancer is out of (any of the classes') age range
          if (age > 0 && !timeslot.props.disabled) {
            timeslot.props.disabled = !timeslot.$classes.reduce((enabled, c) => {
              if (enabled) return true;

              return (
                (!c.minAge || (c.minAge && age >= c.minAge)) &&
                (!c.maxAge || (c.maxAge && age <= c.maxAge))
              );
            }, timeslot.props.disabled);
          }
        }

        return timeslot;
      });
    },
  },
  methods: {
    sync(path, value) {
      return sync(path.replace(/^~/i, db.child(`users/${this.user.uid}`).path), value);
    },

    isTimeslotInActiveSeason(timeslot) {
      const timeslotSeasonIds = Object.keys(timeslot['@seasons'] || {});
      return this.seasons
        .filter(season => season.props.active && !season.props.disabled)
        .some(season => timeslotSeasonIds.includes(season[idKey]));
    },

    // schedule picker
    toggleTimeslot(e, timeslot) {
      if (timeslot && timeslot.props && !timeslot.props.disabled) { // make sure it's toggleable
        const timeslotId = timeslot[idKey];
        const dancer = this.dancers[this.schedulePickerDancerIndex];
        const dancerId = dancer[idKey];

        if (e) e.stopPropagation();
        if (dancer['@timeslots'][timeslotId] || timeslot['@dancers'][dancerId]) {
          // unselect/remove
          unrelate({
            path: db.child(`users/${this.user.uid}`).path,
            collection: 'dancers',
            id: dancerId,
          }, {
            collection: 'timeslots',
            id: timeslotId,
          });
        } else {
          // select/add
          relate({
            path: db.child(`users/${this.user.uid}`).path,
            collection: 'dancers',
            id: dancerId,
          }, {
            collection: 'timeslots',
            id: timeslotId,
          });
        }
      }
    },
    closeSchedulePicker(e) {
      if (e.key === 'Escape') {
        this.schedulePickerDancerIndex = null;
      }
    },

    // data manipulation
    addDancer() {
      return this.$firebaseRefs.dancersRaw.push({
        _created: moment().format(),
      });
    },
    removeDancer(item) {
      return Promise.all(Object.keys(item['@timeslots'])
        .map(timeslotId =>
          unrelate({
            path: db.child(`users/${this.user.uid}`).path,
            collection: 'dancers',
            id: item[idKey],
          }, {
            collection: 'timeslots',
            id: timeslotId,
          })))
        .then(() =>
          this.$firebaseRefs.dancersRaw.child(item[idKey]).remove());
    },

    addContact() {
      return this.$firebaseRefs.contactsRaw.push({
        _created: moment().format(),
      });
    },
    removeContact(item) {
      return this.$firebaseRefs.contactsRaw.child(item[idKey]).remove();
    },

    setStepIndex(stepIndex) {
      return this.$firebaseRefs.enrollmentRaw.child('stepIndex').set(stepIndex);
    },

    // data storage
    handleSubmit() {
      if (this.enrollment.stepIndex === this.steps.length - 2) {
        // mark as submitted
        this.$firebaseRefs.enrollmentRaw.update({
          _submitted: moment().format(),
        });
      } else if (this.enrollment.stepIndex === 1) {
        // auto-add first entry if dancers empty
        // port over enroller info based on 'for' choice
        if (!this.contacts.length) {
          this.$firebaseRefs.contactsRaw.push({
            _created: moment().format(),
            name: this.enrollment.for !== 'self' ? (this.enrollment.name || this.user.displayName) : null,
            email: this.enrollment.for !== 'self' ? (this.enrollment.email || this.user.email) : null,
            phone: this.enrollment.for !== 'self' ? (this.user.phoneNumber) : null,
          });
        }
      } else if (this.enrollment.stepIndex === 0) {
        // auto-add first entry if dancers empty
        // port over enroller info based on 'for' choice
        if (!this.dancers.length) {
          this.$firebaseRefs.dancersRaw.push({
            _created: moment().format(),
            name: this.enrollment.for === 'self' ? (this.enrollment.name || this.user.displayName) : null,
          });
        }
      }
      // move to next step (uses browser validation only)
      this.setStepIndex(this.enrollment.stepIndex + 1);
    },
  },
  created() {
    // handle user
    this.$on('login', () => {
      // load user relations/data
      this.$bindAsArray('enrollmentsRaw', this.$firebaseRefs.userRaw.child('enrollments'), undefined, () => {
        if (!this.enrollmentRaw) {
          const enrollmentRaw = this.enrollmentsRaw.reverse().find(e => !e._submitted);
          let enrollmentId;
          if (!enrollmentRaw) {
            enrollmentId = this.$firebaseRefs.enrollmentsRaw.push({
              _created: moment().format(),
              userAgent: window.navigator.userAgent,
              name: this.user.displayName,
              email: this.user.email,
            }).key;
          } else {
            enrollmentId = enrollmentRaw[idKey];
          }
          this.$bindAsObject('enrollmentRaw', this.$firebaseRefs.enrollmentsRaw.child(enrollmentId));
        }
      });
      this.$bindAsArray('dancersRaw', this.$firebaseRefs.userRaw.child('dancers'));
      this.$bindAsArray('contactsRaw', this.$firebaseRefs.userRaw.child('contacts'));
    });
    this.$on('logout', () => {
      // force back to login step if logged out
      // NB: only this locally since saving to db fails with a permission error
      if (this.enrollment) {
        this.enrollment.stepIndex = 0;
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
    SchedulePicker,
    Datepicker,
  },
};
</script>

<style lang="postcss">
@import '../variables.css';

#enroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;

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

  & .img-preload {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  & .breadcrumbs {
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
        border: double 3px var(--primary);
        border-radius: 50%;
        margin-right: 10px;
      }
      &.active {
        color: var(--primary);

        &:before {
          background-color: var(--primary);
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

  & article.card {
    /* for close button */
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    flex-shrink: 1;
    text-align: left;
  }
  & aside.card {
    min-width: 200px;
  }

  & .schedule-picker-container {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.75);
    z-index: 1002;

    & .schedule-picker {
      display: flex;
      height: 100%;
      background-color: var(--lightest);
      padding: 20px;
    }
    @media (--small-min) {
      padding: 30px;

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
  }

  & .thanks {
    display: flex;
    flex-direction: column;
    padding: 0 20px;

    & img {
      width: 100%;
      max-width: 400px;
    }
    & aside {
      @keyframes rise {
        0% {
          transform: translateY(0);
          opacity: 0;
        }
        100% {
          transform: translateY(-120%);
          opacity: 1;
        }
      }
      max-width: 440px;
      margin-left: -20px;
      margin-right: -20px;
      opacity: 1;
      transform: translateY(-120%);
      animation: rise 1s;
    }
  }
}
</style>
