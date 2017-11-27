module.exports = function (context, req) {
    context.log('Converting to External POST ' + JSON.stringify(req.body));

    context.log('The pre-shared key is ' + process.env.PreSharedKey);
    context.log('The external application code is ' + process.env.ExternalApplicationCode);
    context.log('The POST URL is ' + process.env.PostURL);

    context.res = {
	message: 'Converted'
    };
    context.done();
};
