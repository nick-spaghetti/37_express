const express = require('express');
const ExpressError = require('./express-error');
const app = express();

app.use(express.json());
// app.use(express.urlencoded({
//     extended: true
// }));

const {
    convertAndValidateNumsArray,
    findMode,
    findMean,
    findMedian
} = require('./helpers');

/**
|--------------------------------------------------
| 
|--------------------------------------------------
*/

app.get('/mean', (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError('you must pass a query key of nums with a comma-separated list of numbers', 400);
    };
    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.msg);
    };
    let result = {
        operation: 'mean',
        result: findMean(nums)
    };
    return res.send(result);
});

app.get('/median', (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError('you must pass a query key of nums with a comma-separated list of numbers', 400);
    };
    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.msg);
    };
    let result = {
        operation: 'median',
        result: findMedian(nums)
    };
    return res.send(result);
})

app.get('/mode', (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError('you must pass a query key of nums with a comma-separated list of numbers', 400);
    };
    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.msg);
    };
    let result = {
        operation: 'mode',
        result: findMode(nums)
    };
    return res.send(result);
})


// catch-all error route

app.use((req, res, next) => {
    const e = new ExpressError('page not found', 404);
    return next(e);
});

// general error handler

app.use((e, req, res, next) => {
    let status = e.status || 500;
    let msg = e.msg;
    res.status(status).json({
        error: {
            msg,
            status
        }
    });
});

app.listen(3000, () => {
    console.log('server starting on: http://127.0.0.1:3000/');
});