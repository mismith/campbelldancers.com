const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const renderEmail = require('./helpers/renderEmail');
const sendEmail = require('./helpers/sendEmail');

exports.sendEnrollmentSuccessEmail = functions.database.ref('development/users/{userId}/enrollments/{enrollmentId}/_submitted').onWrite(e => {
  if (e.data && e.data.val()) {
    // get parent/enrollment
    return e.data.ref.parent.once('value')
      .then((snap) => {
        const enrollment = snap.val();

        const firstName = enrollment.name.split(' ').slice(0, 1);
        const data = Object.assign({}, {
          title: 'Secure your spot:',
          teaser: `Don't forget: you must pay the $25 enrollment fee (per dancer).`,
          body: `<p><strong>To pay your $25 enrollment fee (per dancer)</strong>, choose one of the following options:</p>
            <ol>
              <li>E-transfer to <a href="mailto:alexandra@campbelldancers.com" style="color: #333333; text-decoration: underline;">alexandra@campbelldancers.com</a></li>
              <li>Cheque made payable to "Campbell School of Highland Dance"</li>
              <li>Cash</li>
            </ol>
            <p>We'll email you again once payment is received.</p>
          ${new Date() <= new Date(2017, 5, 30, 0, 0, 0) ? '<p>Enroll <strong>before June 30</strong> and your enrollment fee will be applied towards your September class fees!</p>' : ''}`,
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
        });
        const email = renderEmail('enrollment-success', data)
          .then((email) => {
            const options = Object.assign({}, email, data, {
              to: 'murray@mismith.info', // @DEBUG: enrollment.email,
              subject: 'We received your enrollment  🎉',
            });
            return sendEmail(options);
          });
      })
      .catch((err) => console.error(err));
  }
});