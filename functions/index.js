const ENV = 'production';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = admin.initializeApp(functions.config().firebase);
const db = firebase.database().ref(ENV);

const moment = require('moment');
const renderEmail = require('./helpers/renderEmail');
const sendEmail = require('./helpers/sendEmail');

function getUsersEnrolledDancers(userId) {
  return Promise.all([
    db.child(`users/${userId}/dancers`).once('value'),
    db.child(`timeslots`).once('value'),
    db.child(`locations`).once('value'),
  ])
    .then((snapshots) => {
      const dancers = snapshots[0].val() || {};
      const timeslots = snapshots[1].val() || {};
      const locations = snapshots[2].val() || {};

      const enrolledDancers = [];
      Object.keys(dancers).forEach((dancerId) => {
        const dancer = Object.assign({
          '@timeslots': {},
          '$timeslots': [],
        }, dancers[dancerId]);

        Object.keys(dancer['@timeslots']).forEach((timeslotId) => {
          const timeslot = Object.assign({
            '@locations': {},
            $locations: [],
          }, timeslots[timeslotId]);

          Object.keys(timeslot['@locations']).forEach((locationId) => {
            const location = Object.assign({}, locations[locationId]);

            timeslot.$locations.push(location);
          });
          dancer.$timeslots.push(timeslot);
        });
        enrolledDancers.push(dancer);
      });
      return enrolledDancers;
    });
}
function getFirstName(fullName) {
  return fullName.split(' ').slice(0, -1).join(' ');
}

exports.sendEnrollmentSuccessEmail = functions.database.ref(`${ENV}/users/{userId}/enrollments/{enrollmentId}/_submitted`).onWrite(e => {
  if (e.data && e.data.val()) {
    // get parent/enrollment
    return e.data.ref.parent.once('value')
      .then((snap) => {
        const enrollment = snap.val();

        return getUsersEnrolledDancers(e.params.userId)
          .then((dancers) => {
            let ol = '<ol>';
            dancers.forEach((dancer) => {
              let li = '<li>';
              li += `<strong>${getFirstName(dancer.name)}</strong>`;
              dancer.$timeslots.forEach((timeslot) => {
                li += `<br />${moment().day(timeslot.startDay).format('dddd')}, ${moment(timeslot.startTime, 'HH:mm').format('h:mm a')}`;
                timeslot.$locations.forEach((location) => {
                  li += `, ${location.nickname}`;
                });
              });
              li += '</li>';
              ol += li;
            });
            ol += '</ol>';

            const data = Object.assign({
              to: `${enrollment.name} <${enrollment.email}>`,
              subject: 'We received your enrollment  🎉 ',

              title: 'Thank you for enrolling with CSHD!',
              teaser: `Class times, start dates, costs, and more inside.`,
              body: `<p>We're looking forward to seeing you, ${getFirstName(enrollment.name)}.</p>
              <p>You've booked the following classes:</p>
              ${ol}
              <p>Classes start the week of Sept 18, 2017. You will receive another email in August with your <a href="https://campbelldancers.com/#pricing" style="color: #000000">class costs</a> and exact details.</p>
              <p>In the meantime, if you have any questions or feedback for us, please contact Elayna at <a href="tel:+14039980111" style="color: #000000">403-998-0111</a>, or simply reply to this email.</p>
              <p><strong>Can't wait to dance with you!</strong><br />Alexandra and Elayna</p>`,
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

              dancers,
            }, e.params);
            return renderEmail('enrollment-success', data)
              .then((email) => {
                return Object.assign(
                  {},
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
        console.log(config);
        return sendEmail(config);
      })
      .catch((err) => console.error(err));
  }
});