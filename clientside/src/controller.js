/* global fetch, $ */

async function convertToEPMessage(formContent) {
    var res = await fetch('/api/ConvertToEPTrigger', {
	credentials: 'include',
	method: 'POST',
	headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json'
	},
	body: formContent
    });
    return res.json();
}

function readFormConvertToEPMessage() {
    const formContent = $('form #jsonpayload').val();
    console.log(formContent);
    $('.post-json').addClass('loading');
    convertToEPMessage(formContent).then(function (fc) {
	$('.post-json').removeClass('loading');

	$('#submitform').remove();

	let resultContent = '<form method="POST" action="' + fc.PostURL + '" name="submitform" id="submitform">';

	Object.keys(fc).forEach(function (k) {
	    resultContent += '<input type="hidden" name="' + k +
		'" value="' + fc[k] + '" />';
	});
	
	resultContent += '</form>';

	$('body').append(resultContent);

	document.forms['submitform'].submit();
    });
}

export default {
    readFormConvertToEPMessage: readFormConvertToEPMessage
};
