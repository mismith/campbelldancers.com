const ENV = process.env.NODE_ENV || 'production';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const firebase = admin.initializeApp();
const db = firebase.database().ref(`${ENV}/data`);

const moment = require('moment');
const renderEmail = require('./helpers/renderEmail');
const sendEmail = require('./helpers/sendEmail');
const countries = require('./helpers/countries');

function getFirstName(fullName) {
  return fullName.split(' ').slice(0, 1).join(' ');
}
function getUsersEnrolledDancers(userId) {
  return Promise.all([
    db.child(`users/${userId}/dancers`).once('value'),
    db.child(`timeslots`).once('value'),
    db.child(`locations`).once('value'),
    db.child(`seasons`).once('value'),
  ])
    .then((snapshots) => {
      const dancers = snapshots[0].val() || {};
      const timeslots = snapshots[1].val() || {};
      const locations = snapshots[2].val() || {};
      const seasons = snapshots[3].val() || {};

      const enrolledDancers = Object.keys(dancers).map((dancerId) => {
        const dancer = Object.assign({
          '@timeslots': {},
        }, dancers[dancerId]);

        dancer.$timeslots = Object.keys(dancer['@timeslots'])
          .map((timeslotId) => {
            const timeslot = Object.assign({
              '@locations': {},
              '@seasons': {},
            }, timeslots[timeslotId]);

            timeslot.$locations = Object.keys(timeslot['@locations']).map((locationId) => {
              const location = Object.assign({}, locations[locationId]);

              return location;
            });

            timeslot.$seasons = Object.keys(timeslot['@seasons']).map((seasonId) => {
              const props = Object.assign({
                active: true,
                disabled: false,
              }, (seasons[seasonId] || {}).props);
              const season = Object.assign({
                props,
              }, seasons[seasonId]);

              return season;
            });

            return timeslot;
          });

        return dancer;
      });

      return enrolledDancers;
    });
}

const path = `/${ENV}/data/users/{userId}/enrollments/{enrollmentId}/_submitted`;
exports.sendEnrollmentSuccessEmail = functions.database.ref(path)
  .onWrite((change, ctx) => {
    if (!change.after.val()) return null;
    // get parent/enrollment
    return change.after.ref.parent.once('value')
      .then((snap) => {
        const enrollment = snap.val();

        return getUsersEnrolledDancers(ctx.params.userId)
          .then((dancers) => {
            let ol = '<ol>';
            dancers.forEach((dancer) => {
              let li = '<li>';
              li += `<strong>${getFirstName(dancer.name)}</strong><br />`;
              dancer.$timeslots
                // only include timeslots from current season
                .filter((timeslot) => {
                  return timeslot.$seasons.some((season) => {
                    return season.props.active && !season.props.disabled;
                  });
                })
                .forEach((timeslot) => {
                  li += `${moment().day(timeslot.startDay).format('dddd')}, ${moment(timeslot.startTime, 'HH:mm').format('h:mm a')}`;
                  timeslot.$locations.forEach((location) => {
                    li += `, ${location.nickname}`;
                  });
                  li += '<br />';
                });
              li += '</li>';
              ol += li;
            });
            ol += '</ol>';

            const country = countries[enrollment.country || 'CA'];
            const data = Object.assign({
              to: `${enrollment.name} <${enrollment.email}>`,
              subject: 'We received your enrollment  🎉 ',

              title: 'Thank you for enrolling with CSHD!',
              teaser: 'Class times, costs, and more inside.',
              body: `
  <p>We're looking forward to seeing you, ${getFirstName(enrollment.name)}.</p>
  <p>You've booked the following classes:</p>
  ${ol}
  <p>${enrollment.country === 'AU' ? `We will be in touch to discuss your kiddo, <a href="${country.url}/#prices" style="color: #000000">class costs</a>, and location details.` : `Classes start in ${country.startMonth}. We'll be in touch before then with your <a href="${country.url}/#prices" style="color: #000000">class costs</a>, and exact details.`}</p>
  <p>In the meantime, if you have any questions or feedback for us, please contact ${country.phoneContact} at <a href="tel:${country.phone.replace(/[^\d]/g, '')}" style="color: #000000">${country.phone}</a>, or simply <a href="mailto:${country.email}" style="color: #000000">reply</a> to this email.</p>
  <p><strong>Can't wait to dance with you!</strong><br />${country.emailSignature}</p>`,
              button: undefined, /*{
                text: 'Enroll',
                url: 'https://campbelldancers.com/enroll',
              },*/
              image: undefined, /*{
                src: '',
                url: '',
                alt: '',
                width: 500,
                height: 400,
              },*/

              enrollment,
              dancers,
            }, ctx.params);
            return renderEmail('enrollment-success', data)
              .then((email) => {
                return Object.assign(
                  {
                    bcc: [country.email],
                    from: `"Campbell School of Highland Dance" <${country.email}>`,
                  },
                  data,
                  email,
                  {
                    subject: data.subject,
                  }
                );
              });
          })
      })
      .then((config) => {
        console.info(JSON.stringify(config));
        return sendEmail(config);
      })
      .catch((err) => console.error(err));
  });
