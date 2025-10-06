# Article Project

Một ứng dụng quản lý bài viết được xây dựng với Express.js, GraphQL và MongoDB.
Dùng cho demo project graphql, Chỉ đang phát triển các tính năng chính, chưa hoàn thiện


## 🚀 Tính năng

- **Quản lý Bài viết**: Tạo, đọc, cập nhật và xóa bài viết
- **Quản lý Danh mục**: Quản lý các danh mục bài viết
- **Quản lý Người dùng**: Đăng ký, đăng nhập và quản lý người dùng
- **Xác thực**: Middleware xác thực cho các API endpoints
- **GraphQL API**: Sử dụng Apollo Server cho GraphQL API
- **MongoDB**: Lưu trữ dữ liệu với Mongoose ODM

## 🛠️ Công nghệ sử dụng

- **Backend**: Express.js, TypeScript
- **GraphQL**: Apollo Server
- **Database**: MongoDB với Mongoose
- **Authentication**: Custom middleware
- **Deployment**: Vercel

## 📦 Cài đặt

### Yêu cầu hệ thống

- Node.js (phiên bản 14 trở lên)
- MongoDB
- npm hoặc yarn

### Các bước cài đặt

1. **Clone repository**
```bash
git clone <repository-url>
cd ArticleProject
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Cấu hình môi trường**
Tạo file `.env` trong thư mục gốc và thêm các biến môi trường:
```env
PORT=port
MONGO_URL=your_mongodb_connection_string
API_SECRET=your_api_secret_key
API_KEY=your_api_key
CLOUD_NAME=your_cloud_name

```

4. **Chạy ứng dụng**
```bash
npm start
```

Ứng dụng sẽ chạy tại `http://localhost:{port}/graphql`
