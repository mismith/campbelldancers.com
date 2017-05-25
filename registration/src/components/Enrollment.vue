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
        <a class="btn-add" @click.prevent="skipLogin">
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
                    <input @focus="pickClasses(dancerIndex)" @keydown.prevent placeholder="0 selected" :value="dancer.timeslots.length ? `${dancer.timeslots.length} selected` : null" required />
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
      <aside v-if="dancerPickingClasses !== null" @click="$event.target === $event.currentTarget && pickClasses()" class="schedule-picker-container">
        <schedule-picker :timeslots="dancerTimeslots" @select="pickClass" @done="pickClasses()" />
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
import { firebase } from '../helpers/firebase';
import Auth from './Auth';
import SchedulePicker from './SchedulePicker';

/* eslint-disable no-param-reassign */
export default {
  name: 'enrollment',
  data() {
    return {
      user: firebase.auth().currentUser,

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

      dancers: [{ timeslots: [] }],
      contacts: [{}],
      dancerPickingClasses: null,

      classes: [
        {
          name: 'Private',
          capacity: 1,
        },
        {
          name: 'Little Leapers',
          description: 'The perfect way for little ones to learn how to move and work their muscles! This play based class introduces the kids to the basics of Highland dance through games, activities, and fun in an easy, low pressure environment.',
          minAge: 2,
          maxAge: 4,
        },
        {
          name: 'Ages 5-7',
          description: 'New dancers or graduates of Tiny Stars. Primaries learn Highland technique and dances through a combination of traditional dance teaching, cross training, and movement based activities. Primaries are eligible to compete at sanctioned competitions if they so choose. We also foster and encourage dance friendships and bonds to begin building a sense of family.',
          minAge: 5,
          maxAge: 7,
        },
        {
          name: 'Ages 7-9',
          description: 'New dancers, graduates from Primary and those competing at a Beginner level. Beginners develop a high level of technique while learning the 5 basic Highland and National dances. Dancers have a strong focus on building muscle and endurance stamina through cross training, stretching, and activities designed for Highland dancers. Introduction of our core values: athleticism, community, and mindfulness.',
          minAge: 7,
          maxAge: 9,
        },
        {
          name: 'Ages 8-11',
          description: 'Novice dancers continue building technique and strive to compete with a high level of precision at a novice level. Cross training and strength training help to develop the whole dancer into a strong, well balanced contender. Dancers continue to develop our core values: athleticism, community, and mindfulness.',
          minAge: 8,
          maxAge: 11,
        },
        {
          name: 'Ages 10-15',
          description: 'Classes focus heavily on technique, precision, and strength as we prepare the dancers for championships and competitions at the intermediate and premier level. Graceful embodiment of our core values of athleticism, community, and mindfulness.',
          minAge: 10,
          maxAge: 15,
        },
        {
          name: 'Adult',
          description: 'A recreational class for new and returning dancers. New dancers learn technique and all traditional dances while returning/competitive dancers hone skills. A welcoming atmosphere for any age and ability level!',
          minAge: 15,
        },
      ],
      timeslotData: [
        {
          classes: [3],
          startDay: 1,
          startTime: '16:30',
          endTime: '17:15',
        },
        {
          classes: [4],
          startDay: 1,
          startTime: '17:15',
          endTime: '18:15',
        },
        {
          classes: [5],
          startDay: 1,
          startTime: '18:15',
          endTime: '19:15',
        },

        {
          classes: [4],
          startDay: 3,
          startTime: '16:30',
          endTime: '17:30',
        },
        {
          classes: [5],
          startDay: 3,
          startTime: '17:30',
          endTime: '18:30',
        },
        {
          classes: [6],
          startDay: 3,
          startTime: '18:30',
          endTime: '19:30',
        },

        {
          classes: [1],
          startDay: 6,
          startTime: '10:00',
          endTime: '10:30',
        },
        {
          classes: [2, 3],
          startDay: 6,
          startTime: '10:30',
          endTime: '11:15',
        },
        {
          classes: [4, 5],
          startDay: 6,
          startTime: '11:15',
          endTime: '12:15',
        },
        {
          classes: [6],
          startDay: 6,
          startTime: '12:15',
          endTime: '13:15',
        },

        {
          classes: [0],
          startDay: 2,
          startTime: '16:30',
          endTime: '17:00',
        },
        {
          classes: [0],
          startDay: 2,
          startTime: '17:00',
          endTime: '17:30',
        },
        {
          classes: [0],
          startDay: 2,
          startTime: '17:30',
          endTime: '18:00',
        },
        {
          classes: [0],
          startDay: 2,
          startTime: '18:00',
          endTime: '18:30',
        },
        {
          classes: [0],
          startDay: 2,
          startTime: '18:30',
          endTime: '19:00',
        },

        // {
        //   classes: [0],
        //   startDay: 4,
        //   startTime: '16:15',
        //   endTime: '16:30',
        //   enrolled: 1,
        // },
        {
          classes: [0],
          startDay: 4,
          startTime: '16:30',
          endTime: '17:00',
          enrolled: 1,
        },
        {
          classes: [0],
          startDay: 4,
          startTime: '17:00',
          endTime: '17:30',
          enrolled: 1,
        },
        {
          classes: [0],
          startDay: 4,
          startTime: '17:30',
          endTime: '18:00',
        },
        {
          classes: [0],
          startDay: 4,
          startTime: '18:00',
          endTime: '18:30',
        },
        {
          classes: [0],
          startDay: 4,
          startTime: '18:30',
          endTime: '19:00',
        },
      ],
    };
  },
  computed: {
    timeslots() {
      return this.timeslotData.map((timeslotData, timeslotIndex) => {
        // normalize for consumption by Schedule
        const timeslot = { ...timeslotData };

        timeslot.id = timeslotIndex; // @TEMP

        timeslot.classes = timeslot.classes || [];
        timeslot.name = timeslot.classes.map(classIndex => this.classes[classIndex].name).join(' / ');

        timeslot.props = timeslot.props || {};
        timeslot.props.active = timeslot.props.active || false;
        timeslot.props.disabled = timeslot.props.disabled || false;

        timeslot.enrolled = timeslot.enrolled || 0;

        return timeslot;
      });
    },
    dancer() {
      if (this.dancerPickingClasses !== null) {
        return this.dancers[this.dancerPickingClasses];
      }
      return undefined;
    },
    dancerTimeslots() {
      if (!this.dancer) return this.timeslots;

      const age = moment().diff(this.dancer.birthday, 'years');

      return this.timeslots.map((timeslot) => {
        // selected
        timeslot.props.active = false;
        if (this.dancer.timeslots && this.dancer.timeslots.includes(timeslot.id)) {
          timeslot.props.active = true;
        }

        // unavailable
        const classes = timeslot.classes.map(classId => this.classes[classId]);
        timeslot.props.disabled = !classes.reduce((enabled, c) => {
          if (enabled) return true;
          if (timeslot.enrolled >= c.capacity) return false;

          return !age || (age &&
            (!c.minAge || (c.minAge && age >= c.minAge)) &&
            (!c.maxAge || (c.maxAge && age <= c.maxAge))
          );
        }, timeslot.props.active);
        // @TODO: disable 'claimed' Privates by adding 'capacity' prop to classes

        return timeslot;
      });
    },
  },
  methods: {
    addDancer() {
      this.dancers.push({ timeslots: [] });
    },
    removeDancer(dancerIndex) {
      this.dancers.splice(dancerIndex, 1);
    },

    addContact() {
      this.contacts.push({});
    },
    removeContact(contactIndex) {
      this.contacts.splice(contactIndex, 1);
    },

    pickClasses(dancerId = null) {
      this.dancerPickingClasses = dancerId;
    },
    pickClass(e, timeslot) {
      if (this.dancer) {
        if (timeslot && timeslot.props && !timeslot.props.disabled) {
          if (this.dancer.timeslots.includes(timeslot.id)) {
            this.dancer.timeslots.splice(this.dancer.timeslots.indexOf(timeslot.id), 1);
            timeslot.enrolled -= 1;
          } else {
            this.dancer.timeslots.push(timeslot.id);
            timeslot.enrolled += 1;
          }
          e.stopPropagation();
        }
      }
    },

    handleSubmit() {
      if (this.stepIndex === this.steps.length - 2) {
        const json = {
          dancers: this.dancers,
          contacts: this.contacts,
        };
        console.log(json); // @TEMP
      } else if (this.stepIndex === this.steps.length - 1) {
        window.location.href = '//campbelldancers.com';
      }

      this.stepIndex += 1;
    },
    skipLogin() {
      return firebase.auth().signInAnonymously();
    },
    logout() {
      return firebase.auth().signOut();
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
      console.log(user);

      if (user) {
        // skip login step if already logged in (e.g. on page reload)
        if (this.stepIndex === 0) {
          this.stepIndex += 1;
        }
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
