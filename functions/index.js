const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const sendEmail = require('./sendEmail');

exports.sendEnrollmentSuccessEmail = functions.database.ref('development/users/{userId}/enrollments/{enrollmentId}/_submitted').onWrite(e => {
  if (e && e.data && e.data.val()) {
    // get parent/enrollment
    return e.data.ref.parent.once('value')
      .then(snap => snap.val())
      .then((enrollment) => {
        const firstName = enrollment.name.split(' ').slice(0, 1);
        return sendEmail({
          to: enrollment.email,
          subject: 'We received your enrollment',
          text: `Thanks ${firstName}!`,
          html: `<em>Thanks</em> ${firstName}!`,
        });
      });
  }
});