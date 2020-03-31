const dns = require('dns');
const fs = require('fs');

const emailAssassin =
{
    syntax: ({email, options}) =>
    {

      let defaults = {
        blacklist: false,
        gmailAlias: false,
        rfcLengths: true
      }
      let settings = Object.assign({}, defaults, options);
      email = email.toLowerCase();
      var regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

      // check blank and over length
      if (!email) return {validation:false, reason:'Blank Email'};

      // regex check
      if (!regex.test(email)) return {validation:false, reason:'Invalid Syntax'};

      // additional length validations per RFC 2821
      if (settings.rfcLengths) {
        if (email.length > 256) return {validation:false, reason:'Failed RFC Length Checks'};
        var [accname, domain] = email.split('@');
        if (accname.length > 64) return {validation:false, reason:'Failed RFC Length Checks'};
        var locals = domain.split('.');
        if (locals.some(function (part) {
          return part.length > 63;
        })) return {validation:false, reason:'Failed RFC Length Checks'};
      }

      // check blacklist?
      if (settings.blacklist) {
        if (emailAssassin.blacklist(domain)) return {validation:false, reason:'Blacklisted'};
      }

      // check gmail alias?
      if (settings.gmailAlias) {
        if (emailAssassin.gmailAlias(email)) return {validation:false, reason:'GMail Alias Detected'};
      }

      return {validation: true};

    },

    mxrecords: (email) =>
    {
      return new Promise((resolve, reject) => {
          const domain = email.split('@');
          dns.resolveMx(domain[1], (err, mx) => {
            if (typeof mx != 'undefined') {
              mx
                ? resolve({validation:true})
                : resolve({validation:false, reason:'No MX Records Found'});
            } else {
              resolve({validation:false, reason:'No MX Records Found'});
            }
          });
        });
    },

    blacklist: (domain) =>
    {
      var data = fs.readFileSync('./src/blacklist.txt');
      if (new RegExp("\\b" + domain + "\\b").test(data)) {
        return true;
      } else {
        return false;
      }
    },

    gmailAlias: (email) =>
    {
      const parts = email.split('@');
      if (parts[1] == 'gmail.com' && parts[0].includes('+')) {
        return true;
      } else {
        return false;
      }
    }

}

module.exports = emailAssassin;