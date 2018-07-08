const ENV = process.env.NODE_ENV || 'production';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const firebase = admin.initializeApp();
const dba = firebase.database().ref(`${ENV}/admin`);
const db = firebase.database().ref(`${ENV}/data`);

const moment = require('moment');
const renderEmail = require('./helpers/renderEmail');
const sendEmail = require('./helpers/sendEmail');

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

let queued = Promise.resolve();
[
  'Dancers',
  'Contacts',
  'Enrollments',
].forEach((Collection) => {
  const collection = Collection.toLowerCase();
  const path = `/${ENV}/data/users/{userId}/${collection}/{itemId}`;
  exports[`syncAdmin${Collection}`] = functions.database.ref(path)
    .onWrite((change, ctx) => {
      const userId = ctx.params.userId;
      const itemId = ctx.params.itemId;

      let data = change.after.val();
      if (data) {
        const userIds = {};
        userIds[userId] = userId;

        data = Object.assign({
          '@users': userIds,
        }, data);
      }
      queued = queued.then(dba.child(`${collection}/${itemId}`).set(data));

      return queued;
    });
});

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

            const data = Object.assign({
              to: `${enrollment.name} <${enrollment.email}>`,
              subject: 'We received your enrollment  🎉 ',

              title: 'Thank you for enrolling with CSHD!',
              teaser: 'Class times, start dates, costs, and more inside.',
              body: `
  <p>We're looking forward to seeing you, ${getFirstName(enrollment.name)}.</p>
  <p>You've booked the following classes:</p>
  ${ol}
  <p>Classes start the week of Sept 17, 2018. You will receive another email before then with your <a href="https://campbelldancers.com/#pricing" style="color: #000000">class costs</a> and exact details.</p>
  <p>In the meantime, if you have any questions or feedback for us, please contact Elayna at <a href="tel:+14039980111" style="color: #000000">403-998-0111</a>, or simply <a href="mailto:elayna@campbelldancers.com" style="color: #000000">reply</a> to this email.</p>
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
              
              enrollment,
              dancers,
            }, ctx.params);
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
  });
