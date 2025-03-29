# Website quản lý rạp chiếu phim

## Vài câu lệnh git
- Git checkout <tên nhánh> # di chuyển ra nhánh
- Git merge <tên nhánh> # hợp nhất nhánh (nhánh chọn vào nhánh hiện tại)
- Git push origin <tên nhánh> # đẩy source lên nhánh
- Git pull origin main # tải các thay đổi từ main về dự án
- Git fetch # Tải về tất cả các thay đổi từ remote mà không tự động hợp nhất (fetch) vào nhánh hiện tại
- Git branch -r # kiểm tra các nhánh cục bộ hiện tại
- Git log --oneline # kiểm tra danh sách commit
- Git reset --hard <id_commit> # về commit chỉ định (Xóa toàn bộ thay đổi sau commit)

## Cấu trúc dự án
```
PROJECTCINEMA/
├── backend/
│   ├── bin/
│   │   └── www                  # Server startup script
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── controllers/            # Business logic handlers
│   │   ├── movieController.js
│   │   ├── bookingController.js
│   │   ├── userController.js
│   │   └── scheduleController.js
│   ├── models/                 # Database models
│   │   ├── Movie.js
│   │   ├── Booking.js
│   │   ├── User.js
│   │   └── Schedule.js
│   ├── middlewares/           # Custom middleware functions
│   │   ├── auth.js
│   │   └── validator.js
│   ├── public/                # Static files
│   │   ├── images/
│   │   └── stylesheets/
│   ├── routes/                # API route definitions
│   │   ├── movieRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── userRoutes.js
│   ├── utils/                 # Helper functions
│   ├── app.js                 # Express app configuration
│   └── package.json           # Backend dependencies
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html        # HTML template
│   │   ├── Logo.jpg         # Website logo
│   │   ├── logo192.png      # React default icons
│   │   ├── logo512.png
│   │   ├── manifest.json    # PWA manifest
│   │   └── robots.txt       # SEO settings
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Header.js    # Site navigation header
│   │   │   ├── Navbar.js    # Navigation menu
│   │   │   └── Sidebar.js   # Admin sidebar menu
│   │   ├── pages/          # Page components
│   │   │   ├── Booking.js           # Ticket booking page
│   │   │   ├── BookingHistory.js    # User booking history
│   │   │   ├── Confirmation.js      # Booking confirmation
│   │   │   ├── Dashboard.js         # Admin dashboard
│   │   │   ├── Login.js             # User login
│   │   │   ├── MainLayout.js        # Main page layout
│   │   │   ├── MovieForm.js         # Movie add/edit form
│   │   │   ├── MovieList.js         # User movie list
│   │   │   ├── MovieListAdmin.js    # Admin movie management
│   │   │   ├── Payment.js           # Payment processing
│   │   │   ├── Profile.js           # User profile
│   │   │   ├── Promotions.js        # Promotional offers
│   │   │   ├── Register.js          # User registration
│   │   │   ├── RoomForm.js          # Theater room form
│   │   │   ├── ScreenRooms.js       # Theater room management
│   │   │   ├── Seats.js             # Seat selection
│   │   │   ├── ShowSchedule.js      # Movie schedule
│   │   │   └── TicketSend.js        # Ticket confirmation
│   │   ├── services/       # API service calls
│   │   ├── App.js         # Root component
│   │   ├── App.css        # Global styles
│   │   ├── index.js       # Entry point
│   │   └── index.css      # Root styles
│   └── package.json       # Frontend dependencies
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
└── README.md              # Project documentation
```

## Cách chạy dự án
### Frontend
1. **Cài đặt môi trường**
   - Cài đặt Node.js từ [nodejs.org](https://nodejs.org/)
   - Kiểm tra Node.js và npm đã cài đặt thành công:
   ```bash
   node --version
   npm --version
   ```

2. **Khởi tạo dự án**
   ```bash
   cd frontend
   npm install
   ```

3. **Cài đặt các thư viện cần thiết**
   ```bash
   # UI Components
   npm install @mui/material @emotion/react @emotion/styled
   npm install @mui/icons-material

   # Routing
   npm install react-router-dom

   # Forms
   npm install react-hook-form

   # Charts
   npm install recharts

   # API Calls
   npm install axios
   ```

4. **Cấu hình môi trường**
   - Tạo file `.env` trong thư mục frontend:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   PORT=3000
   ```

5. **Chạy ứng dụng**
   ```bash
   npm start
   ```

6. **Truy cập ứng dụng**
   - Mở trình duyệt và truy cập: `http://localhost:3000`
   - Các route có sẵn:
     - `/movies` - Danh sách phim
     - `/login` - Đăng nhập
     - `/register` - Đăng ký
     - `/booking` - Đặt vé
     - `/admin` - Trang quản trị

**Lưu ý:**
- Đảm bảo backend đã chạy trước khi khởi động frontend
- Kiểm tra console trong Developer Tools của trình duyệt để xem lỗi (nếu có)
- Nếu port 3000 bị trùng, có thể thay đổi trong file `.env`

### Backend
- cd backend
- npm update
- npm start

## Mô tả
### 1. Quản Lý Phim
- Thêm, sửa, xóa phim.
- Cập nhật thông tin phim: tên, thể loại, đạo diễn, diễn viên, mô tả, thời lượng, hình ảnh, trailer.
- Quản lý trạng thái phim: Đang chiếu, Sắp chiếu, Ngừng chiếu.
- Đánh giá & bình luận của người dùng.

### 2. Quản Lý Lịch Chiếu
- Tạo và cập nhật lịch chiếu cho từng phim.
- Chọn phòng chiếu, ngày giờ chiếu, định dạng phim (2D, 3D, IMAX...).
- Quản lý suất chiếu & số lượng ghế trống.
- Hủy hoặc thay đổi lịch chiếu khi cần thiết.

### 3. Quản Lý Phòng Chiếu & Ghế Ngồi
- Quản lý số lượng phòng chiếu, sức chứa từng phòng.
- Thiết lập sơ đồ ghế ngồi cho từng phòng.
- Cập nhật trạng thái ghế (trống, đã đặt, VIP, hỏng).
- Hỗ trợ đặt ghế online.

### 4. Đặt Vé & Thanh Toán
- Khách hàng chọn phim, suất chiếu, số lượng vé và ghế ngồi.
- Kiểm tra tình trạng ghế trống và giữ ghế tạm thời.
- Xử lý thanh toán qua các cổng (Momo, thẻ ngân hàng, ví điện tử...).
- Gửi vé điện tử qua email/SMS.
- Hỗ trợ hủy vé theo chính sách hoàn tiền.

### 5. Quản Lý Khách Hàng & Thành Viên
- Đăng ký, đăng nhập tài khoản khách hàng.
- Lưu lịch sử đặt vé, tích điểm thành viên.
- Chương trình ưu đãi, khuyến mãi cho khách hàng thân thiết.
- Hỗ trợ đánh giá phim và phản hồi dịch vụ.

### 6. Báo Cáo & Doanh Thu
- Thống kê doanh thu theo ngày, tuần, tháng.
- Báo cáo số lượng vé bán ra, suất chiếu có lượng khách cao.
- Đánh giá hiệu suất phòng chiếu.
- Quản lý chi phí vận hành rạp.

### 7. Hỗ Trợ & Chăm Sóc Khách Hàng (Mở rộng sau)
- Quản lý yêu cầu hỗ trợ từ khách hàng.
- Hỗ trợ đổi vé, hoàn tiền theo chính sách.
- Xử lý sự cố liên quan đến suất chiếu, thanh toán, đặt vé.
- Tích hợp chatbot hoặc tổng đài hỗ trợ khách hàng.

