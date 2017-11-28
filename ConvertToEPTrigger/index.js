const md5 = require('md5');

function convertTitle(titleText) {
    if (!titleText) {
	return titleText;
    }
    titleText = titleText.replace('.','');
    titleText = titleText.toUpperCase();
    return titleText;
}

module.exports = function (context, req) {
    context.log('Converting to External POST ' + JSON.stringify(req.body));

    context.log('The pre-shared key is ' + process.env.PreSharedKey);
    context.log('The external application code is ' + process.env.ExternalApplicationCode);
    context.log('The POST URL is ' + process.env.PostURL);


    const identifier = '';
    const preSharedKey = process.env.PreSharedKey;
    const firstName = req.body.firstname;
    const lastName = req.body.surname;
    const curdate = new Date();
    const utcYear = curdate.getUTCFullYear();
    let utcMonth = curdate.getUTCMonth() + 1;
    if (utcMonth < 10) {
	utcMonth = "0" + utcMonth;
    }
    let utcDay = curdate.getUTCDate();
    if (utcDay < 10) {
	utcDay = "0" + utcDay;
    }
    let utcHour = curdate.getUTCHours();
    if (utcHour < 10) {
	utcHour = "0" + utcHour;
    }
    const dateTimeShort = "" + utcYear + utcMonth + utcDay + utcHour;
    
    const textToHash = '' + preSharedKey + firstName + lastName + '' + identifier + '' + dateTimeShort;

    context.log('Text to hash is ' + textToHash);

    const hashed = md5(textToHash);

    context.log('hashed ' + hashed);

    const result = {
	ExternalReferrerHash: hashed
    };

    const mapping = {
	firstname: 'Contact_FirstName',
	surname: 'Contact_LastName',
	email: 'Contact_Email',
	street: 'Address_Street1',
	zip: 'Address_ZipCode',
	city: 'Address_City',
	country_iso: 'Address_Country_ISO',
	phone: 'Contact_BusinessPhone'
    };

    Object.keys(req.body).forEach(function (k) {
	if (mapping[k]) {
	    result[mapping[k]] = req.body[k];
	}
    });

    if (req.body.academic_title) {
	result.Contact_Title_Code = convertTitle(req.body.academic_title);
    }

    result.ExternalApplicationCode = process.env.ExternalApplicationCode;
    result.PostURL = process.env.PostURL;

    context.res = result;
    context.done();
};
