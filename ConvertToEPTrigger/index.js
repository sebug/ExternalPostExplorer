module.exports = function (context, req) {
    context.log('Converting to External POST ' + JSON.stringify(req.body));

    context.log('The pre-shared key is ' + process.env.PreSharedKey);

    context.res = {
	message: 'Converted'
    };
    context.done();
};
