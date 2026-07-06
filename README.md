# Heli Ring - Landing Page & Admin Dashboard

Dự án phát triển Website giới thiệu sản phẩm nhẫn thông minh (Smart Ring) của Helicorp. Bao gồm trang Landing Page cho khách hàng và trang Admin để quản lý lượt đăng ký.

## 🌟 Tính Năng Nổi Bật

### 1. Landing Page (Trang chủ)
- **Giao diện hiện đại**: Thiết kế tối ưu UX/UI với Tailwind CSS, đem lại trải nghiệm mượt mà, chuyên nghiệp.
- **Header & Hero Section**: Giới thiệu nổi bật về sản phẩm Heli Ring.
- **Features & Specs**: Trình bày chi tiết các tính năng, thông số kỹ thuật của sản phẩm.
- **Size Guide**: Hướng dẫn đo kích thước tay để chọn nhẫn phù hợp.
- **Form Đăng Ký**: Cho phép khách hàng điền thông tin (Họ tên, SĐT, Email) để đăng ký nhận tư vấn hoặc đặt hàng.
- **AI Floating Chat**: Tích hợp trợ lý ảo (AI Chatbot) sử dụng Vercel AI SDK và Google Generative AI (Gemini) để hỗ trợ giải đáp thắc mắc của người dùng trực tiếp trên website.

### 2. Admin Dashboard
- **Đăng nhập bảo mật**: Yêu cầu mật khẩu để truy cập trang quản trị.
- **Quản lý danh sách đăng ký**: Xem danh sách khách hàng đã đăng ký từ Landing Page theo thời gian thực (Lấy dữ liệu từ Supabase).

## 🚀 Công Nghệ Sử Dụng

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Ngôn ngữ**: TypeScript
- **Styling**: Tailwind CSS v4, tw-animate-css
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/), Base UI, Lucide React
- **Cơ Sở Dữ Liệu**: [Supabase](https://supabase.com/)
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/docs), Google Generative AI
- **Package Manager**: pnpm

## 📁 Cấu Trúc Thư Mục

```text
helicorp-test/
├── app/
│   ├── admin/       # Trang quản trị Admin (Đăng nhập, Danh sách đăng ký)
│   ├── api/         # Các route API nội bộ (Chatbot AI, Đăng ký, Tracking)
│   ├── globals.css  # Style CSS toàn cục
│   ├── layout.tsx   # Root Layout của Next.js
│   └── page.tsx     # Landing Page chính (Giao diện người dùng)
├── components/      # Các UI component tái sử dụng (Hero, Features, Header, Forms, AI Chat,...)
├── lib/             # Các utility functions, cấu hình Supabase,...
├── public/          # Chứa các file assets tĩnh (hình ảnh, icons,...)
├── .env.local       # File chứa các biến môi trường
├── package.json     # Cấu hình project và dependencies
└── next.config.mjs  # Cấu hình Next.js
```

## ⚙️ Hướng Dẫn Cài Đặt Và Chạy Local

### Yêu Cầu Môi Trường
- [Node.js](https://nodejs.org/) (Khuyến nghị phiên bản LTS, >= 18)
- [pnpm](https://pnpm.io/) (để quản lý packages)

### Các Bước Cài Đặt

1. **Clone repository và di chuyển vào thư mục dự án:**
   ```bash
   git clone <repo_url>
   cd helicorp-test
   ```

2. **Cài đặt các thư viện phụ thuộc:**
   ```bash
   pnpm install
   ```

3. **Cấu hình Biến Môi Trường (Environment Variables):**
   Tạo một file `.env.local` ở thư mục gốc của dự án và điền các thông tin sau (tham khảo mẫu dưới đây hoặc xin thông tin từ người quản lý):
   ```env
   # Webhook (Ví dụ Make.com) để xử lý các event (tùy chọn)
   WEBHOOK_URL="your_webhook_url"
   
   # Supabase Database (Dùng lưu trữ Data Đăng ký & kết nối DB)
   NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your_supabase_anon_key"
   SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key" # Cần thiết cho Server-side fetch ở trang Admin
   
   # Quản trị (Admin)
   ADMIN_PASSWORD="your_admin_password" # Mật khẩu truy cập trang /admin
   
   # Trợ lý ảo AI (Google Gemini AI)
   GOOGLE_GENERATIVE_AI_API_KEY="your_google_api_key"
   ```

4. **Khởi chạy môi trường phát triển (Development):**
   ```bash
   pnpm dev
   ```
   Sau đó mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)

5. **Build cho môi trường Production:**
   ```bash
   pnpm build
   pnpm start
   ```

## 🔐 Hướng Dẫn Truy Cập Trang Admin

1. Khởi chạy dự án thành công.
2. Truy cập vào đường dẫn: [http://localhost:3000/admin](http://localhost:3000/admin)
3. Điền mật khẩu (tương ứng với biến `ADMIN_PASSWORD` trong file `.env.local`)
4. Đăng nhập để xem danh sách khách hàng đã đăng ký.
