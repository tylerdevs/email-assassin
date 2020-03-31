// include email-validate
var validate = require('email-assassin');

// make async request
(async () => {
  try {
    const response = await validate.mxrecords('username@gmail.com');
    console.log(response);
  } catch (e) {
    console.log(e);
  }
})();