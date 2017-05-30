<template>
  <form class="enrollment align-center" @submit.prevent="handleSubmit">
    <header>
      <ol class="breadcrumbs">
        <li v-for="(step, i) in steps">
          <button @click.prevent="stepIndex = i" :class="{breadcrumb: true, active: i === stepIndex}" :disabled="i > stepIndex">{{ step.name }}</button>
        </li>
      </ol>
    </header>

    <div v-if="stepIndex === 0">
      <header>
        <p>Save yourself some time by linking an account below; if you do, <br />next season we'll have all your info stored and ready to go.</p>
      </header>
      <div class="flex-rows">
        <auth v-if="!user" />
        <aside v-if="user" class="card bg-tartan">
          <p>Already logged in.</p>
          <p><button v-if="user" @click.prevent="logout" class="btn">Log Out</button></p>
        </aside>
      </div>
      <footer v-if="!user">
        <a class="btn-add" @click.prevent="loginAnonymously">
          <big style="margin-top: -7px;">&raquo;</big> Skip <small>(and don't save info for next time)</small>
        </a>
      </footer>
    </div>

    <div v-if="stepIndex === 1">
      <header>
        <p>Who will be dancing with us?</p>
        <p><small>For private lesson slots, we ask that you please pick the earliest one available<br/> on that day—that way we won't have gaps between classes.</small></p>
      </header>
      <div class="flex-rows">
        <article v-for="(dancer, dancerIndex) of dancers" class="card bg-tartan">
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
                  <input type="date" v-model="dancer.birthday" required />
                </td>
              </tr>
  <!--             <tr>
                <td>Competitive level</td>
                <td>
                  <select v-model="dancer.ability" required>
                    <optgroup>
                      <option>Non-competitive</option>
                    </optgroup>
                    <optgroup>
                      <option>New</option>
                      <option>Beginner</option>
                      <option>Novice</option>
                      <option>Intermediate</option>
                      <option>Premier</option>
                    </optgroup>
                    <optgroup>
                      <option>New Adult</option>
                      <option>Returning/Experienced Adult</option>
                    </optgroup>
                  </select>
                </td>
              </tr> -->
              <tr>
                <td>Classes</td>
                <td>
                  <label title="Pick classes" class="selectable">
                    <input @click="schedulePickerDancerId = dancer[idKey]" placeholder="0 selected" :value="dancer.timeslotIds && Object.keys(dancer.timeslotIds).length ? `${Object.keys(dancer.timeslotIds).length} selected` : null" required />
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
          <aside v-if="dancerIndex || dancers.length > 1">
            <button @click.prevent="removeDancer(dancerIndex)" title="Remove dancer" class="btn-close">&times;</button>
          </aside>
        </article>
      </div>
      <footer>
        <a class="btn-add" @click.prevent="addDancer">
          <big>&plus;</big> Add another dancer
        </a>
      </footer>
      <aside v-if="schedulePickerDancerId !== null" @click.self="schedulePickerDancerId = null" class="schedule-picker-container align-left">
        <schedule-picker :timeslots="schedulePickerDancerTimeslots" @select="pickClass" @done="schedulePickerDancerId = null" />
      </aside>
    </div>

    <div v-if="stepIndex === 2">
      <header>
        <p>Who should we contact if something goes awry?</p>
        <p><small>We suggest you add at least 2 people—always better to be prepared!</small></p>
      </header>
      <div class="flex-rows">
        <article v-for="(contact, contactIndex) of contacts" class="card bg-tartan">
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
          <aside v-if="contactIndex || contacts.length > 1">
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
        <h2>All done</h2>
      </header>
      <div>
        <p>Thanks for enrolling with us this season! :)</p>
      </div>
    </div>

    <footer v-if="user" class="call-to-action align-center">
      <button type="submit" class="btn">{{ stepIndex === steps.length - 1 ? 'Home' : 'Next' }}</button>
    </footer>
  </form>
</template>

<script>
import moment from 'moment';
import {
  firebase,
  idKey,
  loadUserCollectionItems,
  createOrUpdateUserCollectionItems,
} from '../helpers/firebase';
import Auth from './Auth';
import SchedulePicker from './SchedulePicker';

export default {
  name: 'enrollment',
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

      dancersData: [],
      contactsData: [],

      schedulePickerDancerId: null,
    };
  },
  firebase: {
    classesData: firebase.database().ref('classes'),
    timeslotsData: firebase.database().ref('timeslots'),
  },
  computed: {
    dancers() {
      return this.dancersData.map((dancerData) => {
        const dancer = {
          timeslotIds: {},
          ...dancerData,
        };

        return dancer;
      });
    },
    contacts() {
      return this.contactsData;
    },
    classes() {
      return this.classesData;
    },
    timeslots() {
      return this.timeslotsData.map((timeslotsData) => {
        // normalize for consumption by Schedule
        const timeslot = {
          enrolled: 0, // @TODO
          props: {
            active: false,
            disabled: false,
          },
          ...timeslotsData,
        };

        timeslot.classes = this.classes
          .filter(c => Object.keys(timeslot.classIds).includes(c[idKey]));
        timeslot.name = timeslot.classes.map(c => c.name).join(' / ');

        return timeslot;
      });
    },

    schedulePickerDancer() {
      try {
        return this.dancers.find(d => d[idKey] === this.schedulePickerDancerId);
      } catch (err) {
        return null;
      }
    },
    schedulePickerDancerTimeslots() {
      const age = moment().diff(this.schedulePickerDancer.birthday, 'years'); // eslint-disable-line

      return this.timeslots.map((timeslot) => {
        /* eslint-disable no-param-reassign */
        const timeslotId = timeslot[idKey];

        // selected
        timeslot.props.active = false;
        if (this.schedulePickerDancer.timeslotIds[timeslotId]) {
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
        /* eslint-enable no-param-reassign */
      });
    },
  },
  methods: {
    addDancer() {
      this.dancersData.push({});
    },
    removeDancer(dancerIndex) {
      this.dancersData.splice(dancerIndex, 1);
    },

    addContact() {
      this.contactsData.push({});
    },
    removeContact(contactIndex) {
      this.contactsData.splice(contactIndex, 1);
    },

    pickClass(e, timeslotData) {
      if (this.schedulePickerDancer) {
        if (timeslotData && timeslotData.props && !timeslotData.props.disabled) {
          const timeslotId = timeslotData[idKey];
          const timeslot = this.timeslots.find(t2 => t2[idKey] === timeslotId);

          if (this.schedulePickerDancer.timeslotIds[timeslotId]) {
            // unselect/remove
            delete this.schedulePickerDancer.timeslotIds[timeslotId];
            timeslot.enrolled -= 1;
          } else {
            // select/add
            this.schedulePickerDancer.timeslotIds[timeslotId] = timeslotId;
            timeslot.enrolled += 1;
          }
          if (e) e.stopPropagation();
        }
      }
    },

    handleSubmit() {
      const json = {
        dancers: this.dancers,
        contacts: this.contacts,
      };
      console.log(json); // @TEMP

      switch (this.stepIndex) {
        case this.steps.length - 1:
          // redirect to home
          window.location.href = '//campbelldancers.com'; // @TODO: do this properly?
          break;

        case this.steps.length - 2:
          // save form data
          createOrUpdateUserCollectionItems(this.dancers, 'dancers');
          createOrUpdateUserCollectionItems(this.contacts, 'contacts');

        // esline-disable-next no-fallthrough
        default:
          this.stepIndex += 1;
      }
    },

    userLoaded(user = firebase.auth().currentUser) {
      console.log('userLoaded', user); // @DEBUG

      // initialize dancers and contacts (using stored values, if possible)
      if (!this.dancersData.length) {
        loadUserCollectionItems('dancers')
          .then((dancers) => {
            if (!dancers.length) {
              // no saved dancers, add an empty one for the user to begin with
              this.dancersData.push({});
            } else {
              dancers.forEach((dancer) => {
                this.dancersData.push(dancer);
              });
            }
          });
      }
      if (!this.contactsData.length) {
        loadUserCollectionItems('contacts')
          .then((contacts) => {
            if (!contacts.length) {
              // no saved contacts, add an empty one for the user to begin with
              this.contactsData.push({});
            } else {
              contacts.forEach((contact) => {
                this.contactsData.push(contact);
              });
            }
          });
      }
    },
    loginAnonymously() {
      return firebase.auth().signInAnonymously();
    },
    logout() {
      return firebase.auth().signOut();
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;

      if (user) {
        // skip login step if already logged in (e.g. on page reload)
        if (this.stepIndex === 0) {
          this.stepIndex += 1;
        }

        // store/update user info
        if (user.providerData && user.providerData.length) {
          firebase.database().ref('users').child(user.uid).update(user.providerData[0]);
        }

        this.userLoaded();
      } else {
        // force back to login step if logged out
        this.stepIndex = 0;
      }
    });
  },
  components: {
    Auth,
    SchedulePicker,
  },
};
</script>

<style lang="scss">
@import url(../../../style.css);

$accent: #50c5d8;

.enrollment {
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.breadcrumbs {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  list-style: none;
  padding: 0;
  margin: 20px;
  counter-reset: breadcrumbs;

  .breadcrumb {
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
      border: double 3px $accent;
      border-radius: 50%;
      padding: 5px 10px;
      margin-right: 10px;
    }
    &.active {
      font-weight: bold;

      &:before {
        background-color: $accent;
        color: #fff;
        border-color: #fff;
      }
    }
  }
}

article {
  // for close button
  display: inline-flex;
  flex-wrap: nowrap;
  text-align: left;
}

.schedule-picker-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.75);
  padding: 30px;
  z-index: 101;

  .schedule-picker {
    height: 100%;
    background-color: #FFF;
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
