const functions = require('firebase-functions');
const sendEmail = require('gmail-send')({
  user: functions.config()['gmail-send'].user,
  pass: functions.config()['gmail-send'].pass,
  bcc: ['elayna@campbelldancers.com'],
  from: '"Campbell School of Highland Dance" <hello@campbelldancers.com>',
});

module.exports = (options) => {
  // promisify
  return new Promise((resolve, reject) => {
    sendEmail(options, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};