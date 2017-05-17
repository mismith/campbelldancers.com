<template>
  <form class="registration">
    <section>
      <schedule />
    </section>
    <section>
      <header>
        <h2>Dancers</h2>
      </header>
      <fieldset v-for="(dancer, dancerIndex) of dancers" class="bg-tartan">
        <aside v-if="dancerIndex || dancers.length > 1" style="float: right;">
          <button @click.prevent="removeDancer(dancerIndex)">&times;</button>
        </aside>
        <table>
          <tbody>
            <tr>
              <td>Full name</td>
              <td>
                <input type="text" v-model="dancer.name" name="name" placeholder="First Last" required autofocus />
              </td>
            </tr>
            <tr>
              <td>Birthday</td>
              <td>
                <input type="date" v-model="dancer.birthday" name="birthday" required />
              </td>
            </tr>
            <tr>
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
            </tr>
            <tr>
              <td>Allergies / Medical concerns</td>
              <td>
                <textarea name="medical" v-model="dancer.medical" placeholder="(if any)"></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </fieldset>
      <footer class="call-to-action">
        <button @click.prevent="addDancer">Add another dancer</button>
      </footer>
    </section>

    <section>
      <header>
        <h2>Emergency Contacts</h2>
      </header>
      <fieldset v-for="(contact, contactIndex) of contacts" class="bg-tartan">
        <aside v-if="contactIndex || contacts.length > 1" style="float: right;">
          <button @click.prevent="removeContact(contactIndex)">&times;</button>
        </aside>
        <table>
          <tbody>
            <tr>
              <td>Full name</td>
              <td>
                <input type="text" v-model="contact.name" name="name" placeholder="First Last" required />
              </td>
            </tr>
            <tr>
              <td>Primary phone number</td>
              <td>
                <input type="tel" v-model="contact.primaryPhone" name="primaryPhone" required />
              </td>
            </tr>
            <tr>
              <td>Secondary phone number</td>
              <td>
                <input type="tel" v-model="contact.secondaryPhone" name="secondaryPhone" placeholder="(optional)" />
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <input type="email" v-model="contact.email" name="email" required />
              </td>
            </tr>
          </tbody>
        </table>
      </fieldset>
      <footer class="call-to-action">
        <button @click.prevent="addContact">Add another emergency contact</button>
      </footer>
    </section>

    <footer class="align-center">
      <button type="submit">Register</button>
    </footer>
  </form>
</template>

<script>
import Schedule from './Schedule';

export default {
  name: 'registration',
  data() {
    return {
      dancers: [{}],
      contacts: [{}],
    };
  },
  methods: {
    addDancer() {
      this.dancers.push({});
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
  },
  components: {
    Schedule,
  },
};
</script>

<style lang="scss">
@import url(../../../style.css);
</style>
