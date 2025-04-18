require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const connectDB = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');
const logger = require('./config/logger');
const ScheduleStatusJob = require('./jobs/scheduleStatus.job');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const indexRouter = require('./routes/index');

// Khởi tạo ứng dụng Express
const app = express();

// Kết nối database
connectDB();

// Middleware cơ bản
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Phục vụ file tĩnh
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_PATH || 'public/uploads')));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 24 * 60 * 60 // 1 day
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', indexRouter);

// Khởi động job cập nhật trạng thái lịch chiếu
ScheduleStatusJob.start();

// Xử lý lỗi 404
app.use((req, res) => {
    res.status(404).json({ message: 'Không tìm thấy tài nguyên' });
});

// Middleware xử lý lỗi
app.use(errorHandler);

// Xử lý lỗi không được bắt
process.on('uncaughtException', (error) => {
    logger.error('Lỗi không được bắt:', error);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    logger.error('Promise rejection không được xử lý:', error);
    process.exit(1);
});

module.exports = app;
