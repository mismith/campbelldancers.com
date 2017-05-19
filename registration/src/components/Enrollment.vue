<template>
  <form class="enrollment" @submit.prevent="handleSubmit">
    <div class="flex-cols" style="max-width: none;">
      <div>
        <header>
          <h3>Dancers</h3>
        </header>
        <div class="flex-rows">
          <article v-for="(dancer, dancerIndex) of dancers" class="card bg-tartan">
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>
                    <input type="text" v-model="dancer.name" name="name" placeholder="First Last" required />
                  </td>
                </tr>
                <tr>
                  <td>Birthday</td>
                  <td>
                    <input type="date" v-model="dancer.birthday" name="birthday" required />
                  </td>
                </tr>
    <!--             <tr>
                  <td>Competitive level</td>
                  <td>
                    <select name="ability" v-model="dancer.ability" required>
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
                    <input @click.prevent="pickClasses(dancerIndex)" title="Pick classes" placeholder="0 selected" :value="dancer.events.length ? `${dancer.events.length} selected` : null" @keydown.prevent required />
                  </td>
                </tr>
                <tr>
                  <td>Allergies / <br />Medical <br />concerns</td>
                  <td>
                    <textarea name="medical" v-model="dancer.medical" placeholder="(optional)"></textarea>
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
            <big>&plus;</big> Add dancer
          </a>
        </footer>
        <aside v-if="dancerPickingClasses !== null" class="schedule-picker-container">
          <schedule-picker :events="dancerEvents" @click.stop @select="pickClass" @done="pickClasses()" />
        </aside>
      </div>

      <div>
        <header>
          <h3>Emergency Contacts</h3>
        </header>
        <div class="flex-rows">
          <article v-for="(contact, contactIndex) of contacts" class="card bg-tartan">
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>
                    <input type="text" v-model="contact.name" name="name" placeholder="First Last" required />
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    <input type="email" v-model="contact.email" name="email" required />
                  </td>
                </tr>
                <tr>
                  <td>Primary phone</td>
                  <td>
                    <input type="tel" v-model="contact.phone" name="phone" required />
                  </td>
                </tr>
                <tr>
                  <td>Secondary phone</td>
                  <td>
                    <input type="tel" v-model="contact.altPhone" name="altPhone" placeholder="(optional)" />
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
            <big>&plus;</big> Add emergency contact
          </a>
        </footer>
      </div>
    </div>

    <footer class="call-to-action align-center">
      <button type="submit" class="btn">Enroll</button>
    </footer>
    <pre>{{ enrollment }}</pre>
  </form>
</template>

<script>
import moment from 'moment';
import SchedulePicker from './SchedulePicker';

export default {
  name: 'enrollment',
  data() {
    return {
      dancers: [{ events: [] }],
      contacts: [{}],
      dancerPickingClasses: null, // @TODO: improve modal behaviour
      classes: [
        {
          name: 'Private',
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
      eventData: [
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
        //   props: {
        //     disabled: true,
        //   },
        // },
        {
          classes: [0],
          startDay: 4,
          startTime: '16:30',
          endTime: '17:00',
          props: {
            disabled: true,
          },
        },
        {
          classes: [0],
          startDay: 4,
          startTime: '17:00',
          endTime: '17:30',
          props: {
            disabled: true,
          },
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
      enrollment: undefined,
    };
  },
  computed: {
    events() {
      return this.eventData.map((eventData, eventIndex) => {
        // normalize for consumption by Schedule
        const event = { ...eventData };

        event.id = eventIndex; // @TEMP

        event.classes = event.classes || [];
        event.name = event.classes.map(classIndex => this.classes[classIndex].name).join(' / ');

        event.props = event.props || {};
        event.props.active = false;
        event.props.disabled = false;

        return event;
      });
    },
    dancer() {
      if (this.dancerPickingClasses !== null) {
        return this.dancers[this.dancerPickingClasses];
      }
      return undefined;
    },
    dancerEvents() {
      if (!this.dancer) return this.events;

      const age = moment().diff(this.dancer.birthday, 'years');

      return this.events.map((event) => {
        /* eslint-disable no-param-reassign */
        // selected
        event.props.active = false;
        if (this.dancer.events && this.dancer.events.includes(event.id)) {
          event.props.active = true;
        }

        // unavailable
        if (age) {
          const classes = event.classes.map(classId => this.classes[classId]);
          event.props.disabled = !classes.reduce((disabled, c) => {
            const ageInRange = (!c.minAge || (c.minAge && age >= c.minAge)) &&
              (!c.maxAge || (c.maxAge && age <= c.maxAge));
            return disabled || ageInRange;
          }, event.props.active);
        }
        // @TODO: disable 'claimed' Privates by adding 'capacity' prop to classes

        return event;
        /* eslint-enable no-param-reassign */
      });
    },
  },
  methods: {
    addDancer() {
      this.dancers.push({ events: [] });
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
    pickClass(e, event) {
      if (this.dancer) {
        if (event && event.props && !event.props.disabled) {
          if (this.dancer.events.includes(event.id)) {
            this.dancer.events.splice(this.dancer.events.indexOf(event.id), 1);
          } else {
            this.dancer.events.push(event.id);
          }
        }
      }
    },

    handleSubmit() {
      const json = {
        dancers: this.dancers,
        contacts: this.contacts,
      };
      this.enrollment = JSON.stringify(json, null, 2);
    },
  },
  components: {
    SchedulePicker,
  },
};
</script>

<style lang="scss">
@import url(../../../style.css);

.card {
  // for close button
  display: flex;
  flex-wrap: nowrap;
}
.schedule-picker-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.75);
  padding: 20px;
  z-index: 101;

  .schedule-picker {
    height: 100%;
    background-color: #FFF;
    padding: 20px;
  }
}
</style>
