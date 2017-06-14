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
        <p>Welcome! We are a traditional <strong>Scottish Highland dancing studio</strong> for dancers of all ages, abilities, and motivations. Located in <strong>Calgary</strong>, Alberta, Canada, we combine the love of dancing with focused technical development and strength.</p>
        <p>Our values of <strong>athleticism</strong>, <strong>community</strong>, and <strong>mindfulness</strong> foster an environment where dancers—and their families—can thrive. We believe a strong sense of community encourages balanced and joyful performance.</p>
        <p><strong>Enrollment</strong> is ongoing throughout the year with classes for new dancers, boys, choreography, recreation, competition, and adults.</p>
      </div>
      <footer class="call-to-action align-center">
        <router-link to="/enroll" class="btn">Enroll</router-link>
      </footer>
    </section>
    <section id="instructors">
      <header>
        <h2><a href="#instructors">Instructors</a></h2>
      </header>
      <div>
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
        <article id="kendra" class="right">
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
          <h4>Fall 2017</h4>
        </header>
        <schedule-picker :timeslots="timeslots" content-key="$name" :show-footer="false" />
      </div>
      <div id="prices" class="align-center">
        <header>
          <h3><a href="#prices">Prices</a></h3>
          <h4>Per dancer</h4>
        </header>
        <table class="table align-left">
          <tbody>
            <tr>
              <td style="width: 50%;">1 class/week</td>
              <td style="width: 50%;">$50/month</td>
            </tr>
            <tr>
              <td>2 classes/week</td>
              <td>$90/month</td>
            </tr>
            <tr>
              <td>1 class/week + 1 private lesson/week</td>
              <td>$125/month</td>
            </tr>
            <tr>
              <td>2 classes/week + 1 private lesson/week</td>
              <td>$150/month</td>
            </tr>
            <tr>
              <td>Individual privates</td>
              <td>$25</td>
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
              <td>Email</tD>
              <td><a href="mailto:hello@campbelldancers.com">hello@campbelldancers.com</a></td>
            </tr>
            <tr>
              <td>Phone</tD>
              <td><a href="tel:+14039980111">403-998-0111</a></td>
            </tr>
            <tr>
              <td>Locations</td>
              <td>
                <ul>
                  <li v-for="location in locations">
                    <em>{{ location.name }}</em><br />
                    <a :href="`https://www.google.ca/maps/place/${encodeURIComponent(location.address)}`" target="_blank">{{ location.address }}</a>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Links</tD>
              <td>
                <ul>
                  <li><a href="https://www.facebook.com/campbelldancers/" target="_blank">CSHD on Facebook</a></li>
                  <li><a href="https://www.instagram.com/campbelldancers/" target="_blank">CSHD on Instagram</a></li>
                  <li><a href="http://www.chda.ab.ca/" target="_blank">Calgary Highland Dancing Association</a></li>
                  <li><a href="http://www.ahda.ab.ca/" target="_blank">Alberta Highland Dancing Association</a></li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>

        <form method="post" action="//formspree.io/hello@campbelldancers.com" target="_blank">
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
        <router-link to="/enroll" class="btn">Enroll</router-link>
      </footer>
    </section>
  </div>
</template>

<script>
import Instafeed from 'instafeed.js';
import PublicCollectionsMixin from '../helpers/firebase.publicCollections.mixin';
import SchedulePicker from './SchedulePicker';

export default {
  name: 'home',
  mixins: [
    PublicCollectionsMixin,
  ],
  data() {
    return {
      menuToggled: false,
      scrollTop: 0,
    };
  },
  computed: {
    bannerOffset() {
      const height = this.$refs.banner ? this.$refs.banner.offsetHeight : 0;
      return this.scrollTop && height ? 1 - ((height - this.scrollTop) / height) : 0;
    },
  },
  methods: {
    encodeURIComponent: window.encodeURIComponent,

    handleScroll(e) {
      if (e.target.scrollingElement) {
        this.scrollTop = e.target.scrollingElement.scrollTop;
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);

    try {
      new Instafeed({
        clientId: 'c4d7db79bf68469ba1b71aebf43bc8df',
        accessToken: '3519946526.c4d7db7.797de8ffa53b4185abc0e877ba80b847',
        get: 'user',
        userId: 'self',
        limit: 4,
        resolution: 'standard_resolution',
        template: '<figure><a href="{{link}}"><img src="{{image}}" width="{{width}}" height="{{height}}" /></a><figcaption>{{caption}}</figcaption></figure>',
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

    @media (--medium-min) {
      height: var(--small);
    }
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
