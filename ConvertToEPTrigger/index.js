module.exports = function (context, req) {
    context.log('Converting to External POST ' + JSON.stringify(req.body));

    context.res = {
	message: 'Converted'
    };
    context.done();
};
