


# email-assassin

[![Build Status](https://travis-ci.com/tylerdevs/email-assassin.svg?branch=master)](https://travis-ci.com/tylerdevs/email-assassin) [![dependencies Status](https://david-dm.org/tylerdevs/email-assassin/status.svg)](https://david-dm.org/tylerdevs/email-assassin) [![devDependencies Status](https://david-dm.org/tylerdevs/email-assassin/dev-status.svg)](https://david-dm.org/tylerdevs/email-assassin?type=dev) [![Vulns](https://snyk.io/test/github/tylerdevs/email-assassin/badge.svg)](https://snyk.io/test/github/tylerdevs/email-assassin) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**Lightweight email validation package for Node.js**

# Features

* **Syntax Validation** - Validates email address format / syntax based on RFC standards.
* **Email Blacklisting** - Optionally validate against a list of over 550 disposable / problem email services.
* **MX Record Validation** - Validate whether the email address has valid MX DNS records attached at the domain level.
* **Gmail Alias Detection** - Optional detection of Gmail addresses using an alias address. [More Information](#gmail-alias-addresses)

# Install

```
$ npm install email-assassin
```
To install devDependices for testing run from the project folder:
```
npm install
npm test
```
To run included examples:
```
node ./example/checkEmail.js
node ./example/mxRecords.js
```

# Usage

### emailTools.syntax({email: [address], options: {}})
- Method to validate email addresses directly.
- Valid response object: { validation: true }
- Invalid response object: { validation: false, reason: [ressonString] }

Optional Options Object
* blacklist - \<boolean\>  - Enable to validate against the blacklist, returns invalid if matched. Defaults to false.
* gmailAlias - \<boolean\> - If enabled GMail alias addresses will return invalid. Defaults to false.
* rfcLength - \<boolean\> - Validates the length of various address parts based on RFC standards. Defaults to true.

```
// include email-assassin
var validate = require('email-assassin');

// test an email
var test = validate.syntax({
  email: 'user+name@gmail.com',
  options:{
    blacklist: true,
    gmailAlias: true
  }
});

// output to console
console.log(test);
```

### emailTools.mxrecrods(\<email\>)
 - Used to validate MX records of a given email's domain / service.
 - Valid response object: { validation: true }
 - Invalid response object: { validation:false, reason:'No MX Records Found' }

```
// include email-assassin
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
```

# Gmail Alias Addresses
**What Are They**
Gmail allows users to utilize the '+' symbol in the username position to add aliases to an account name. For instance if your email address was username@gmail.com you could use username+github@gmail.com and any email sent to the address would go to username@gmail.com

**Why Should I Check For Them**
In most cases denying usage for an alias address is not required. They are RFC valid syntax and allow Gmail users to tightly monitor where email is coming from and who might be spamming them. There are some use cases where you may want to disallow usage:
- Users creating multiple accounts for a website using the same address. By quickly adding an alias they can make another account as the email is different.
- Signing up for things like free trials and discounts, users can keep signing up for them easily by using  alias addresses.

# License

MIT © Tyler Colwell 