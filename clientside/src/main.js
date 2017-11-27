import controller from "controller";

$(document).ready(function () {
    $('.post-json').click(function (e) {
	controller.readFormConvertToEPMessage();
	e.preventDefault();
	return false;
    });
});


