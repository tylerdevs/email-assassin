// include email-validate
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