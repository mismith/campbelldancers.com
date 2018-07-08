const EmailTemplate = require('email-templates').EmailTemplate;

module.exports = (templateName, data, options) => {
  const template = new EmailTemplate(`./emails/${templateName}`, Object.assign({
    disableJuice: true,
  }, options));
  return template.render(data);
};
