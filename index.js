const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRouter = require('./routes/authRoute');
const blogRouter = require('./routes/blogRoute');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
dbConnect();
app.use('/api/user',authRouter);
app.use('/api/blog', blogRouter);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
});

