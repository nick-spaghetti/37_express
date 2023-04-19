const express = require('express');
const morgan = require('morgan');
const ExpressError = require('./express-error');
const app = express();
const itemsRoutes = require('./routes/items');
// const middleware = require('./middleware');

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));
app.use('/items', itemsRoutes);

app.use(morgan('dev'));

app.use((req, res, next) => {
	const e = new ExpressError('page not found', 404);
	next(e);
});

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

module.exports = app;