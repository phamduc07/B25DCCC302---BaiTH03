# B25DCCC302 - BaiTH03 (ShopMini)

## Phân chia quản lý State và Lý do

1. **useState (Local State)**
   - **Dữ liệu:** Từ khóa tìm kiếm sản phẩm (`searchTerm` ở `HomePage`), dữ liệu form đăng nhập (`username`, `password`, `error` ở `LoginPage`), trạng thái xác nhận đã đặt hàng (`isOrdered` ở `CheckoutPage`).
   - **Lý do:** Các state này chỉ phục vụ nội bộ trong phạm vi một component duy nhất, không cần chia sẻ cho các component khác nên dùng `useState` giúp tối ưu hiệu năng và giữ code gọn nhẹ.

2. **Context API (Global UI & Authentication State)**
   - **Dữ liệu:** Giao diện sáng/tối (`ThemeContext`) và thông tin phiên đăng nhập người dùng (`AuthContext`).
   - **Lý do:** Dữ liệu này cần truy cập ở nhiều cấp component khác nhau (`Header`, `ProtectedRoute`, `LoginPage`, `CheckoutPage`) nhưng tần suất cập nhật thấp, sử dụng Context API giúp giải quyết triệt để vấn đề prop-drilling.

3. **Redux Toolkit (Global Business & Async State)**
   - **Dữ liệu:** Danh sách sản phẩm gọi từ API và trạng thái tải (`productsSlice`), dữ liệu giỏ hàng và tính toán tổng số lượng/tổng tiền (`cartSlice`).
   - **Lý do:** Đây là các dữ liệu nghiệp vụ cốt lõi được đọc và cập nhật liên tục từ nhiều trang khác nhau (`HomePage`, `ProductDetailPage`, `CartPage`, `CheckoutPage`, `Header`), đồng thời cần `createAsyncThunk` để quản lý các trạng thái bất đồng bộ (`loading`, `succeeded`, `failed`) và selector để tính toán dữ liệu dẫn xuất.