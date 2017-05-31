<template>
  <div class="home">
    <section id="about" class="bg-tartan align-center">
      <header>
        <h2><a href="#about">About</a></h2>
      </header>
      <div>
        <p>Welcome! We are a traditional <strong>Scottish Highland dancing studio</strong> for dancers of all ages and abilities. Located in <strong>SW Calgary</strong>, Alberta, Canada, we combine the love of dancing with focused technical development and strength.</p>
        <p>Our values of <strong>athleticism</strong>, <strong>community</strong>, and <strong>mindfulness</strong> foster an environment where dancers can thrive. We believe a strong sense of community encourages balanced and joyful performance.</p>
        <p><strong>Registration</strong> is ongoing throughout the year with classes for new dancers, boys, choreography, recreation, competition, and adults.</p>
      </div>
      <footer class="call-to-action align-center">
        <router-link to="/register" class="btn">Register</router-link>
      </footer>
    </section>
    <section id="instructors">
      <header>
        <h2><a href="#instructors">Instructors</a></h2>
      </header>
      <div>
        <article id="alexandra" class="right">
          <figure>
            <img src="/static/images/alexandra.jpg?v=1" alt="Alexandra Campbell" width="200" height="274" />
          </figure>
          <div>
            <header>
              <h3><a href="#alexandra">Alexandra Campbell</a></h3>
              <h4>Director</h4>
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
            <img src="/static/images/elayna.jpg?v=1" alt="Elayna Campbell" width="200" height="274" />
          </figure>
          <div>
            <header>
              <h3><a href="#elayna">Elayna Campbell</a></h3>
              <h4>Director</h4>
            </header>
            <div>
              <p>Elayna began dancing at the age of 9 and enjoyed competing and performing before realizing her passion lay in teaching. She is currently a Member of both the SDTA and ScotDance Canada. She has danced at multiple international events including the Tattoos at Basel and Edinburgh. Complementing her love of dance, Elayna is also a passionate elementary school teacher with the Calgary Board of Education. Elayna uses her natural positivity and compassionate nature to help each dancer achieve their goals.</p>
            </div>
          </div>
        </article>
      </div>
    </section>
    <section id="classes">
      <header>
        <h2><a href="#classes">Classes</a></h2>
      </header>
      <div class="classes">
        <article>
          <header>
            <h3>Little Leapers</h3>
            <h4>Age: 2-4</h4>
          </header>
          <div>
            <p>The perfect way for little ones to learn how to move and work their muscles! This play based class introduces the kids to the basics of Highland dance through games, activities, and fun in an easy, low pressure environment.</p>
          </div>
          <footer>
            <h5>Mon: 4:10-4:45pm</h5>
          </footer>
        </article>
        <article>
          <header>
            <h3>Primary</h3>
            <h4>Age: 4-6</h4>
          </header>
          <div>
            <p>New dancers or graduates of Tiny Stars. Primaries learn Highland technique and dances through a combination of traditional dance teaching, cross training, and movement based activities. Primaries are eligible to compete at sanctioned competitions if they so choose. We also foster and encourage dance friendships and bonds to begin building a sense of family.</p>
          </div>
          <footer>
            <h5>Mon: 4:45-5:30pm</h5>
          </footer>
        </article>
        <article>
          <header>
            <h3>Beginner</h3>
            <h4>Age: 7+</h4>
          </header>
          <div>
            <p>New dancers, graduates from Primary and those competing at a Beginner level. Beginners develop a high level of technique while learning the 5 basic Highland and National dances. Dancers have a strong focus on building muscle and endurance stamina through cross training, stretching, and activities designed for Highland dancers. Introduction of our core values: athleticism, community, and mindfulness.</p>
          </div>
          <footer>
            <h5>Mon: 5:30-6:15pm</h5>
            <h5>Wed: 5:15-6:15pm</h5>
          </footer>
        </article>
        <article>
          <header>
            <h3>Novice</h3>
          </header>
          <div>
            <p>Novice dancers continue building technique and strive to compete with a high level of precision at a novice level. Cross training and strength training help to develop the whole dancer into a strong, well balanced contender. Dancers continue to develop our core values: athleticism, community, and mindfulness.</p>
          </div>
          <footer>
            <h5>Mon: 6:15-7:15pm</h5>
            <h5>Wed: 6:15-7:15pm</h5>
          </footer>
        </article>
        <article>
          <header>
            <h3>Intermediate/Premier</h3>
          </header>
          <div>
            <p>Classes focus heavily on technique, precision, and strength as we prepare the dancers for championships and competitions at the intermediate and premier level. Graceful embodiment of our core values of athleticism, community, and mindfulness.</p>
          </div>
          <footer>
            <h5>Wed: 7:15-8:15pm</h5>
          </footer>
        </article>
        <article>
          <header>
            <h3>Adult</h3>
          </header>
          <div>
            <p>A recreational class for new and returning dancers. New dancers learn technique and all traditional dances while returning/competitive dancers hone skills. A welcoming atmosphere for any age and ability level!</p>
          </div>
          <footer>
            <h5>Mon: 7:15-8:15pm</h5>
          </footer>
        </article>
      </div>
      <div>
        <hr />
        <article id="prices" class="align-center">
          <header>
            <h3><a href="#prices">Prices</a></h3>
            <h4>Per student</h4>
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
        </article>
        <footer class="call-to-action align-center">
          <router-link to="/register" class="btn">Register</router-link>
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
              <td>Location</td>
              <td>
                <em>Strathcona Community Center</em><br />
                <a href="https://www.google.ca/maps/place/277+Strathcona+Dr+SW,+Calgary,+AB+T3H+2A4" target="_blank">277 Strathcona Dr SW<br />Calgary, AB T3H 2A4</a>
              </td>
            </tr>
            <tr>
              <td>Links</tD>
              <td>
                <ul style="margin: 0;">
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
    </section>
    <section id="calendar" class="bg-tartan">
      <header>
        <h2><a href="#calendar">Calendar</a></h2>
      </header>
      <div>
        <iframe src="https://calendar.google.com/calendar/embed?showTitle=0&showPrint=0&showCalendars=0&showTz=0&height=600&wkst=1&src=campbelldancers.com_6jebcm7ue9tfu0ivbfndqooatk%40group.calendar.google.com&color=%232952A3&ctz=America%2FEdmonton" width="600" height="600" frameborder="0" scrolling="no"></iframe>
      </div>
      <footer class="call-to-action align-center">
        <router-link to="/register" class="btn">Register</router-link>
      </footer>
    </section>
  </div>
</template>

<script>
import Instafeed from 'instafeed.js';

export default {
  name: 'home',
  mounted() {
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
      console.error(err);
    }
  },
};
</script>

<style lang="postcss">
@import '../variables.css';

#classes {
  & .classes {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;

    & article {
      margin-bottom: 40px;

      @media (min-width: 640px) {
        flex-basis: 48%;
      }
    }
  }
  & hr {
    margin-top: 0;
  }
}

#instructors {
  & article {
    & h3 {
      margin-top: 5px;
    }

    @media (min-width: 600px) {
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


#instafeed {
  & > * {
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

    @media (min-width: 600px) {
      flex-basis: calc(50% - 40px);
    }
  }
}
</style>