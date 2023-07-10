var createError = require('http-errors');
var express = require('express')

const port = 3001
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var authRouter = require('./routes/oauth');
var requestRouter = require('./routes/request')

var app = express()


app.options('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3001');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", ['X-Requested-With', 'content-type', 'credentials']);
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.status(200);
    next()
})

// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/oauth', authRouter);
app.use('/request', requestRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})

// module.exports = app