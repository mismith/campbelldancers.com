<template>
  <div class="home">
    <section id="banner" ref="banner">
      <img src="/static/images/logo.svg" style="max-height: 60vh;" :style="{transformOrigin: 'center bottom', transform: `scale(${Math.max(0, Math.min(1 - bannerOffset, 1))})`}" />
    </section>
    <section id="about" class="bg-tartan align-center">
      <header>
        <h2><a href="#about">About</a></h2>
      </header>
      <div class="align-justify">
        <p>Welcome! We are a traditional <strong>Scottish Highland dancing studio</strong> for dancers of all ages, abilities, and motivations. Located in <span v-if="country === 'AU'"><strong>Alfred Cove</strong>, Western Australia</span><span v-else><strong>Calgary</strong>, Alberta, Canada</span>, we combine the love of dancing with focused technical development and strength<span v-if="country === 'AU'"> for students in <strong>Perth and surrounding areas</strong></span>.</p>
        <p>Our values of <strong>athleticism</strong>, <strong>community</strong>, and <strong>mindfulness</strong> foster an environment where dancers—and their families—can thrive. We believe a strong sense of community encourages balanced and joyful performance.</p>
        <p><strong>Enrollment</strong> is ongoing throughout the year with classes for new dancers, boys, choreography, recreation, amd competition.</p>
      </div>
      <footer class="call-to-action align-center">
        <p>Are you located in <strong>{{ otherInfo.flag }}{{ otherInfo.name }}</strong>, not {{info.flag}}{{ info.name }}?</p>
        <a :href="otherInfo.url" class="btn">Visit {{ otherInfo.nationality }} Site</a>
      </footer>
    </section>
    <section id="instructors">
      <header>
        <h2><a href="#instructors">Instructors</a></h2>
      </header>
      <div v-if="country === 'AU'">
        <article id="aurian" class="right">
          <figure>
            <img src="/static/images/aurian.jpg" alt="Aurian Clarkson" width="200" height="200" />
          </figure>
          <div>
            <header>
              <h3><a href="#aurian">Aurian Clarkson</a></h3>
              <h4>Director</h4>
            </header>
            <div>
              <p>Aurian comes from a family of dancers and rejoined highland as an adult when her loungeroom hosted the beginning of the parent dance school to CSHD in Perth. She loves dance, movement, and the community that is built around practise, performance, and competition. Aurian genuinely enjoys instilling the love of dance in our community of dancers and helping them to use their classes and practise to build life skills and resilience. She is a member of the BATD, an engineer, a management consultant by day, and a mother to 2 fantastic little dancers.</p>
            </div>
          </div>
        </article>
        <br />
        <br />
        <article id="finley">
          <figure>
            <img src="/static/images/finley.jpg" alt="Finley Duncan" width="200" height="200" />
          </figure>
          <div>
            <header>
              <h3><a href="#aurian">Finley Duncan</a></h3>
              <h4>Instructor</h4>
            </header>
            <div>
              <p>Finley is a qualified highland teacher (UKA) and continues to dance at the highest level all over the world. She was 4th in the World and Best Scottish Junior Dancer in Cowal in 2016, and brings her love of dance to our students with a perfect balance of precision and fairy wings!  She’s got a wonderful sense of humour, is very playful with our younger faces and brings lots of experience to our developing dancers.  She was born in Banff in Scotland, and she is with us for a limited time in Australia.</p>
            </div>
          </div>
        </article>
      </div>
      <div v-else>
        <article id="alexandra" class="right">
          <figure>
            <img src="/static/images/alexandra.jpg" alt="Alexandra Campbell" width="200" height="274" />
          </figure>
          <div>
            <header>
              <h3><a href="#alexandra">Alexandra Campbell</a></h3>
              <h4>Co-Director</h4>
            </header>
            <div>
              <p>Alexandra has been dancing and teaching for almost 20 years, competing with enthusiasm for the large majority. She is a Member of the SDTA and ScotDance Canada. In her spare time, Alexandra is a geophysicist, mom of two, and owns Amora Creative, a business that brings your Pinterest boards to life. Alexandra has always been drawn to the athleticism and community that dance provides, and enjoys developing dancers to their full potential while encouraging the bonds that dance creates.</p>
            </div>
          </div>
        </article>
        <br />
        <br />
        <article id="elayna">
          <figure>
            <img src="/static/images/elayna.jpg" alt="Elayna Campbell" width="200" height="274" />
          </figure>
          <div>
            <header>
              <h3><a href="#elayna">Elayna Campbell</a></h3>
              <h4>Co-Director</h4>
            </header>
            <div>
              <p>Elayna began dancing at the age of 9 and enjoyed competing and performing before realizing her passion lay in teaching. She is currently a Member of both the SDTA and ScotDance Canada. She has danced at multiple international events including the Tattoos at Basel and Edinburgh. Complementing her love of dance, Elayna is also a passionate elementary school teacher with the Calgary Board of Education. Elayna uses her natural positivity and compassionate nature to help each dancer achieve their goals.</p>
            </div>
          </div>
        </article>
        <br />
        <br />
        <article id="carol" class="right">
          <figure>
            <img src="/static/images/carol.jpg" alt="Carol McNaughton" width="200" height="277" />
          </figure>
          <div>
            <header>
              <h3><a href="#carol">Carol McNaughton</a></h3>
              <h4>Instructor</h4>
            </header>
            <div>
              <p>Carol stumbled upon highland dance at age 8, and has been dancing ever since. She has also trained in contemporary and ballet, and currently preforms with Erisa Dance. She has completed her SDTA members exam and has a minor in dance. Internationally, Carol has performed in Tattoos in Basel and Moscow, and has taught dance in the Philippines and Cambodia. Besides dancing, she is a registered social worker who currently works in education, advocacy, and peace. Carol strives to create a safe, supportive place for dancers to develop a love of movement.</p>
            </div>
          </div>
        </article>
        <br />
        <br />
        <article id="kendra">
          <figure>
            <img src="/static/images/kendra.jpg" alt="Kendra McNabb" width="200" height="200" />
          </figure>
          <div>
            <header>
              <h3><a href="#kendra">Kendra McNabb</a></h3>
              <h4>Junior Instructor</h4>
            </header>
            <div>
              <p>Kendra has been performing and competing for the past 7 years. To date, she has danced for the JL Mackenzie Scholarship Award, completed Grade 5 of Highland Dance Theory, and is working towards earning her Associates. She has been assisting teaching for two years, and enjoys sharing her love of dance with kids of all ages!</p>
            </div>
          </div>
        </article>
      </div>
      <footer class="call-to-action align-center">
        <router-link to="/enroll" class="btn">Enroll</router-link>
      </footer>
    </section>
    <section id="classes">
      <header>
        <h2><a href="#classes">Classes</a></h2>
      </header>
      <div class="align-justify">
        <p>Our youngest dancers begin with <strong>learning about movement</strong> through play-based activities and instruction. The basics of <strong>highland technique</strong> are introduced in a fun, easy, low pressure environment. Our little leapers also begin to <strong>feel comfortable</strong> with being on stage through many opportunities to perform for small audiences.</p>
        <p>Beginner dancers (all ages) develop a high level of technique while learning the <strong>five basic dances</strong> (Fling, Sword, Seann Truibhas, Lilt, Flora) through a combination of traditional technique, cross-training, and strength-based movement exercises. The basics of <strong>choreography and performing</strong> are introduced in low pressure settings, while competition is encouraged (but not mandatory!). Dance <strong>friendships and bonds</strong> are nurtured as we introduce our core values of <strong>athleticism</strong>, <strong>community</strong>, and <strong>mindfulness</strong>.</p>
        <p>As dancers progress, a high level of <strong>technique and precision</strong> become the main focus of classes, along with learning <strong>additional dances</strong>. Competition, cross-training, choreographies, performance, and strength-training all help build a <strong>well rounded, enthusiastic dancer</strong> who embodies our core values.</p>
        <p>Classes are loosely grouped by both age and ability; if you are unsure which class is appropriate, please <router-link to="/#contact">contact us</router-link>!</p>
      </div>
      <div id="schedule">
        <header class="align-center">
          <h3><a href="#schedule">Schedule</a></h3>
        </header>
        <article v-for="season in seasons.filter(s => s.props.active)" :key="season[idKey]">
          <header class="align-center">
            <h4>{{ season.name }}</h4>
          </header>
          <schedule-picker
            :blocks="season.blocks"
            :timeslots="season.$timeslots"
            content-key="$name"
            @timeslot-click="handleTimeslotClick"
          />
          <modal :open.sync="activeTimeslot">
            <div v-if="activeTimeslot" class="enroll-modal-content">
              <div>Want to join for<br /><br /> <big v-html="activeTimeslot.$name"></big>?</div>
              <router-link to="/enroll" class="btn">Enroll</router-link>
            </div>
          </modal>
        </article>
      </div>
      <div id="prices" class="align-center">
        <header>
          <h3><a href="#prices">Prices</a></h3>
          <h4>Per dancer</h4>
        </header>
        <table v-if="country === 'AU'" class="table align-center">
          <thead>
            <tr>
              <th style="width: 33%;">Class time per week</th>
              <th style="width: 33%;">Cost per term</th>
              <th style="width: 33%;">Cost per casual class</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>30 mins</td>
              <td>$60</td>
              <td>$7.50</td>
            </tr>
            <tr>
              <td>45 mins</td>
              <td>$90</td>
              <td>$12.50</td>
            </tr>
            <tr>
              <td>60 mins</td>
              <td>$120</td>
              <td>$15</td>
            </tr>
            <tr>
              <td>Private 60 mins</td>
              <td>$250</td>
              <td>$30</td>
            </tr>
            <tr>
              <td>Sibling discount</td>
              <td>25%</td>
              <td>25%</td>
            </tr>
          </tbody>
        </table>
        <table v-else class="table">
          <thead>
            <tr>
              <th style="width: 50%;">Classes per week</th>
              <th style="width: 50%;">Cost per month</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 group</td>
              <td>$55</td>
            </tr>
            <tr>
              <td>2 group</td>
              <td>$100</td>
            </tr>
            <tr>
              <td>1 group + 1 private</td>
              <td>$140</td>
            </tr>
            <tr>
              <td>2 group + 1 private</td>
              <td>$165</td>
            </tr>
            <tr>
              <td colspan="2"><hr style="margin: 10px auto;" /></td>
            </tr>
            <tr>
              <td>Individual privates</td>
              <td>$40</td>
            </tr>
          </tbody>
        </table>
        <footer class="call-to-action align-center">
          <router-link to="/enroll" class="btn">Enroll</router-link>
        </footer>
      </div>
    </section>
    <section id="contact" class="bg-tartan">
      <header>
        <h2><a href="#contact">Contact</a></h2>
      </header>
      <div class="flex-cols">
        <table class="table">
          <tbody>
            <tr>
              <td>Email</td>
              <td><a :href="`mailto:${info.email}`">{{ info.email }}</a></td>
            </tr>
            <tr>
              <td>Phone</td>
              <td><a :href="`tel:+${info.phone.replace(/[^\d]/g, '')}`">{{ info.phone }}</a></td>
            </tr>
            <tr>
              <td>Locations</td>
              <td>
                <ul>
                  <li
                    v-for="location in locations"
                    :key="location.name"
                  >
                    <em>{{ location.name }}</em><br />
                    <a :href="`https://www.google.ca/maps/place/${encodeURIComponent(location.address)}`" target="_blank">{{ location.address }}</a>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Links</td>
              <td>
                <ul>
                  <li v-for="link in info.links" :key="link.url">
                    <a :href="link.url" target="_blank">{{ link.name }}</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>

        <form
          method="post"
          :action="`//formspree.io/${info.email}`"
          target="_blank"
        >
          <input type="text" name="_gotcha" style="display: none;" />
          <input type="hidden" name="_subject" value="Contact Form on CSHD" />
          <table class="table">
            <tbody>
              <tr>
                <td>Your name</td>
                <td>
                  <input type="text" name="name" required />
                </td>
              </tr>
              <tr>
                <td>Your email</td>
                <td>
                  <input type="email" name="email" required />
                </td>
              </tr>
              <tr>
                <td>Your message</td>
                <td>
                  <textarea name="message" required></textarea>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>
                  <button type="submit" class="btn btn-default">Send</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </section>
    <section id="photos">
      <header>
        <h2><a href="#photos">Photos</a></h2>
      </header>
      <div id="instafeed" class="flex-cols"></div>
      <footer class="call-to-action align-center">
        <a :href="`https://www.instagram.com/${info.instagram}/`" target="_blank" class="btn">More Photos</a>
      </footer>
    </section>
  </div>
</template>

<script>
import Instafeed from 'instafeed.js';
import { idKey } from '@/helpers/firebase';
import countries from '@/helpers/countries';
import PublicCollectionsMixin from '../helpers/firebase.publicCollections.mixin';
import SchedulePicker from './SchedulePicker';
import Modal from './Modal';

export default {
  name: 'home',
  mixins: [
    PublicCollectionsMixin,
  ],
  data() {
    return {
      idKey,
      menuToggled: false,
      scrollTop: 0,
      activeTimeslot: undefined,
      countries,
    };
  },
  computed: {
    bannerOffset() {
      const height = this.$refs.banner ? this.$refs.banner.offsetHeight : 0;
      return this.scrollTop && height ? 1 - ((height - this.scrollTop) / height) : 0;
    },

    info() {
      return this.countries[this.country];
    },
    otherCountry() {
      if (this.country === 'CA') {
        return 'AU';
      }
      return 'CA';
    },
    otherInfo() {
      return this.countries[this.otherCountry];
    },
  },
  methods: {
    encodeURIComponent: window.encodeURIComponent,

    handleScroll(e) {
      if (e.target.scrollingElement) {
        this.scrollTop = e.target.scrollingElement.scrollTop;
      }
    },
    handleTimeslotClick(e, timeslot) {
      this.activeTimeslot = timeslot;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);

    try {
      new Instafeed({
        clientId: this.country === 'AU' ? '5f7be1e5e12e4e919e0db93dc70d6f31' : 'c4d7db79bf68469ba1b71aebf43bc8df',
        accessToken: this.country === 'AU' ? '10328240745.5f7be1e.a8d9edd98ebb4ff89ba3914c1c63e174' : '3519946526.c4d7db7.797de8ffa53b4185abc0e877ba80b847',
        get: 'user',
        userId: 'self',
        limit: 4,
        resolution: 'standard_resolution',
        template: '<figure><a href="{{link}}" target="_blank"><img src="{{image}}" width="{{width}}" height="{{height}}" /></a><figcaption>{{caption}}</figcaption></figure>',
      }).run();
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  components: {
    SchedulePicker,
    Modal,
  },
};
</script>

<style lang="postcss">
@import '../variables.css';

#schedule {
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;

  & .schedule-picker {
    margin-top: 40px;
    margin-bottom: 20px;

    & > div {
      overflow: unset; /* prevent 1px overflow (from position: absolute?) */
    }

    & > footer {
      padding: 15px;

      & > div {
        display: none;
      }
      & > aside {
        & .timeslot:not(:first-child) {
          display: none;
        }
      }
    }

    @media (--medium-min) {
      height: var(--small);
    }
  }

  & .enroll-modal-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    flex: auto;
    text-align: center;
  }
}

#instructors {
  & article {
    & h3 {
      margin-top: 5px;
    }

    @media (--small-min) {
      display: flex;

      & figure {
        padding-right: 40px;
      }
      & div {
        flex-shrink: 1;
      }
      &.right {
        text-align: right;

        & figure {
          order: 2;
          padding-right: 0;
          padding-left: 40px;
        }
      }
    }
  }
}

#contact {
  & li {
    & a {
      white-space: pre-wrap;
    }
  }
}

#instafeed {
  & > * {
    flex-shrink: 1;

    & img {
      width: 100%;
      height: auto;
      vertical-align: middle;
    }
    & a {
      display: inline-block;
      border: solid 1px var(--light);
      border-radius: 3px;
      overflow: hidden;
    }
    & figcaption {
      font-size: 13px;
      margin-top: 10px;
    }
  }
}
</style>
