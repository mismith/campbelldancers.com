<template>
  <div class="home">
    <section id="banner" ref="banner">
      <img src="/static/images/logo.svg" style="max-height: 60vh;" :style="{transformOrigin: 'center bottom', transform: `scale(${Math.max(0, Math.min(1 - bannerOffset, 1))})`}" />
    </section>
    <VueperSlides autoplay>
      <VueperSlide
        v-for="image in images"
        :key="image"
        :image="image"
      />
    </VueperSlides>
    <section class="bg-tartan align-center">
      <div class="align-justify">
        <p>We are a modern <strong>Scottish Highland dancing studio</strong> for competitive and recreational dancers located in <span v-if="country === 'AU'"><strong>Alfred Cove</strong>, Western Australia</span><span v-else><strong>Calgary</strong>, Alberta, Canada</span>.</p>
        <p v-if="country === 'AU'">CSHD values <span><strong>sustainability</strong>, <strong>community</strong>, and <strong>athleticism</strong></span>, which foster an environment where dancers and their families thrive. Our training program develops strong, confident, and joyful performers, focusing on technical excellence and a love of dance.</p>
        <p v-else><strong>Excellence</strong>, <strong>athleticism</strong>, and <strong>community</strong> are the core values that guide our instruction, creating a supportive and enthusiastic space where dancers and their families thrive. Our training develops strong, confident, and joyful performers, focusing on technical excellence and a life-long love of dance.</p>
      </div>
      <footer class="call-to-action align-center">
        <p>Are you located in <strong>{{ otherInfo.flag }}{{ otherInfo.name }}</strong>, not {{info.flag}}{{ info.name }}?</p>
        <a :href="otherInfo.url" class="btn">Visit {{ otherInfo.nationality }} Site</a>
      </footer>
    </section>
    <section id="about">
      <header>
        <h2><a href="#about">About</a></h2>
      </header>
      <div class="align-justify">
        <p>Our youngest dancers <strong>learn about movement</strong> through play-based activities and technical instruction. The basics of <strong>highland technique</strong> are introduced in a fun, easy, low pressure environment. Our little leapers <span v-if="country === 'AU'">can also</span> begin to <strong>develop stage presence</strong> through opportunities to perform for small audiences.</p>
        <p>Dancers develop a high level of technique through a combination of traditional exercises, cross-training, and strength training. Contemporary group <strong>choreography and performances</strong> quickly become a happy staple in their dance training. Competition is encouraged for returning dancers, to build confidence and comfort with performing. <strong>Friendships and bonds</strong> are nurtured through our core values of <span v-if="country === 'AU'">sustainability, community, and athleticism</span><span v-else>excellence, athleticism, and community</span>, helping to build well-rounded, enthusiastic dancers who feel <strong>supported</strong>, <strong>loved</strong>, and <strong>challenged</strong>.</p>
      </div>
      <footer class="call-to-action align-center">
        <EnrollButton />
      </footer>
    </section>
    <section id="schedule" class="bg-tartan">
      <header class="align-center">
        <h2><a href="#schedule">Registration</a></h2>
      </header>
      <div class="align-center">
        <p><strong>Now accepting new dancers in the following classes:</strong></p>
        <template v-if="country === 'AU'">
          <p>Mondays - 3:30-4:10pm</p>
          <p>Mondays - 4:15-4:55pm</p>
        </template>
        <template v-else>
          <p>Dancers 4-6 Years - Mondays - 3:45-4:30pm</p>
          <p>Dancers 7 Years &amp; Older - Wednesdays - 4:30-5:15pm</p>
        </template>
        <br />
        <p v-if="country === 'AU'">
          For expressions of interest for other days, please <router-link to="/#contact">contact us</router-link>.
        </p>
        <p>
          Classes are loosely grouped by both age and ability; if you are unsure which class is appropriate, please <router-link to="/#contact">contact us</router-link>!
        </p>
        <footer class="call-to-action align-center">
          <EnrollButton />
        </footer>
      </div>
      <div id="prices" v-if="country !== 'AU'" class="align-center">
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
              <th style="width: 50%;">Cost per <abbr title="5 months">semester</abbr></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 group</td>
              <td>$450</td>
            </tr>
            <tr>
              <td>2 group</td>
              <td>$900</td>
            </tr>
            <tr>
              <td>2 group + private</td>
              <td>$1,225</td>
            </tr>
            <tr>
              <td colspan="2"><hr style="margin: 10px auto;" /></td>
            </tr>
            <tr>
              <td>Individual privates</td>
              <td>$40-$60</td>
            </tr>
          </tbody>
        </table>
        <aside>
          <p>A proud partner of <strong>KidSport Society of Calgary</strong>, which provides grants to cover registration costs. <a href="https://kidsportcanada.ca/alberta/calgary/" target="_blank">Apply online</a></p>
          <p><strong>Triwood Dancers Society</strong> (our parent council) also provides grants to dancers in need to help cover registration costs. For more info, contact <a href="mailto:triwooddancers@gmail.com" target="_blank">triwooddancers@gmail.com</a></p>
        </aside>
        <footer class="call-to-action align-center">
          <router-link to="/#contact" class="btn">Contact Us</router-link>
        </footer>
      </div>
    </section>
    <section id="instructors">
      <header>
        <h2><a href="#instructors">Instructor{{ country === 'AU' ? '' : 's' }}</a></h2>
      </header>
      <div v-if="country === 'AU'">
        <article id="aurian" class="right">
          <figure>
            <img src="/static/images/aurian.jpg" alt="Aurian Clarkson" width="200" height="200" />
          </figure>
          <div>
            <header>
              <h3><a href="#aurian">Aurian Clarkson</a></h3>
              <h4>Teacher</h4>
            </header>
            <div>
              <p>Aurian comes from a family of dancers and rejoined highland as an adult when her loungeroom hosted the beginning of the parent dance school to CSHD in Perth. She loves dance, movement, and the community that is built around practise and performance. Aurian genuinely enjoys instilling the love of dance in our community of dancers and helping them to use their classes and practise to build life skills and resilience. She is a member of the BATD, an engineer, a management consultant by day, and a mother to 3 fantastic dancers.</p>
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
              <h4>Director</h4>
            </header>
            <div>
              <p>Alexandra has been dancing and teaching for more than 30 years, competing and performing with enthusiasm for the large majority. She's a member of SDTA and ScotDance Canada and performed in the Spasskaya Tower International Military Tattoo in Moscow, Russia. In her spare time, Alexandra is a geophysicist, a mom of two, and creates handmade choreography outfits for the studio. Alexandra’s natural competitiveness, coupled with a high energy teaching style, brings out the athleticism, technical precision, and joy of excellence in her dancers. Alexandra also deeply values the community that dance provides, and loves watching dancers discover their full potential because of the friendships that form in classes.</p>
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
              <h4>Director</h4>
            </header>
            <div>
              <p>Elayna's dance career began at age nine, and quickly became her main focus. She has now been competing, performing, and teaching for over 25 years, including dancing in the world-famous Basel and Edinburgh International Tattoos. She is currently a member of both SDTA and ScotDance Canada. Complementing her love of dance, Elayna is also a passionate elementary teacher with the Calgary Board of Education. Elayna uses her natural positivity and compassionate nature, balanced with high expectations, to help each dancer achieve their goals.</p>
            </div>
          </div>
        </article>
      </div>
      <footer class="call-to-action align-center">
        <router-link to="/#contact" class="btn">Contact Us</router-link>
      </footer>
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
      <footer class="call-to-action align-center">
        <a :href="`https://www.instagram.com/${info.instagram}/`" target="_blank" class="btn">Visit Instagram</a>
      </footer>
    </section>
    <section id="guides" class="bg-tartan align-center">
      <header>
        <h2><a href="#guides">Guides</a></h2>
      </header>
      <div>
        <p>We've collected together some handy information to help dancers and parents navigate the world of Highland dancing&mdash;take a look if you are curious (or can't remember)!</p>
        <p><a href="https://drive.google.com/open?id=1Ep1Jb9GeEBkH8OiXCu3v_DW_sel4RHbt" target="_blank" class="btn">View Guides</a></p>
      </div>
    </section>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';
import countries from '@/../functions/helpers/countries';
import EnrollButton from './EnrollButton';

export default {
  name: 'home',
  data() {
    return {
      menuToggled: false,
      scrollTop: 0,
      countries,
      // eslint-disable-next-line
      images: require.context('@/images/carousel', true, /\.jpe?g$/).keys().map(key => require(`@/images/carousel/${key.replace('./', '')}`)),
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

    locations() {
      return [
        {
          country: 'CA',
          name: '19 Street Studio',
          address: '3803 19 St NW\nCalgary, AB T2L 2B3',
        },
        {
          country: 'CA',
          name: 'Triwood Community Center',
          address: '2244 Chicoutimi Dr NW\nCalgary, AB T2L 0W1',
        },
        {
          country: 'AU',
          name: 'Attadale',
          address: 'Western Australia',
        },
      ].filter(location => location.country === this.country);
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
  async mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  components: {
    EnrollButton,
    VueperSlides,
    VueperSlide,
  },
};
</script>

<style lang="postcss">
@import '../variables.css';

#prices {
  margin-top: 40px;

  & aside {
    margin: 40px 0;
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

p {
  & a:not(.btn) {
    text-decoration: underline;
  }
}
</style>
