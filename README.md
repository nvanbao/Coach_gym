# Gym Coach: đóng gói thành file APK

Ý tưởng: GitHub tự dựng file APK cho bạn (miễn phí), bạn chỉ việc tải về và cài lên điện thoại Android.

## Làm một lần

1. **Firebase**: Authentication, Sign-in method, bật thêm **Email/Password** (Google có thể để bật). Firestore Database và `firestore.rules` đã làm ở bước trước. Đảm bảo `FB_CONFIG` trong `index.html` đã được điền.
2. **Đưa các file này vào repo `Coach_gym`**, đặt cùng chỗ với `index.html`:
   - `index.html` (bản đã điền `FB_CONFIG`), `manifest.webmanifest`, `sw.js`, `icon-180.png`, `icon-192.png`, `icon-512.png`
   - `package.json`, `package-lock.json`, `capacitor.config.json`, `.gitignore`
   - thư mục `scripts/`, `signing/`, `.github/workflows/`
   - Nếu GitHub không nhận thư mục ẩn `.github` khi kéo thả: bấm Add file, Create new file, gõ tên `.github/workflows/build-apk.yml` rồi dán nội dung file.
3. Vào tab **Actions** của repo, chọn **Build Android APK**, bấm **Run workflow**.
4. Chờ khoảng 5 đến 10 phút. Xong thì mở lần chạy đó, kéo xuống mục **Artifacts**, tải **GymCoach-apk**, giải nén ra `app-debug.apk`.
5. Gửi file APK sang điện thoại, mở lên và cho phép cài ứng dụng từ nguồn này.

## Cập nhật app về sau

Sửa `index.html` trên GitHub, commit vào nhánh `main` (hoặc `master`). Workflow tự chạy và tạo APK mới. Cài đè lên bản cũ: dữ liệu được giữ nguyên vì cùng khóa ký và số phiên bản tăng dần.

## Quan trọng để không mất dữ liệu

- **Không đổi hoặc xóa `signing/debug.keystore`.** Đổi khóa thì Android bắt gỡ app cũ trước khi cài, và dữ liệu trên máy mất.
- Khóa này nằm trong repo. Nếu repo công khai, về lý thuyết ai cũng có thể ký một APK giả cùng khóa. Với app dùng cá nhân thì rủi ro thấp; nếu muốn chắc hơn, để repo ở chế độ riêng tư.
- Tiến độ được lưu trên máy (dùng được khi không có mạng) và đồng bộ lên Firebase khi có mạng. Gỡ app sẽ mất bản trên máy, nhưng đăng nhập lại là tải được bản đã đồng bộ. Nên thỉnh thoảng bấm "Sao chép bản sao lưu" trong tab Hồ sơ.
- Tính năng camera Form AI cần mạng ít nhất lần đầu để tải mô hình nhận diện tư thế.

## iPhone (iOS)

File APK chỉ dành cho Android. Trên iPhone, cài app nguyên bản cần tài khoản Apple Developer (99 USD mỗi năm) và máy Mac. Cách miễn phí là cài bản web như một app:

1. Mở `https://nvanbao.github.io/Coach_gym/` bằng **Safari**.
2. Bấm nút Chia sẻ, chọn **Thêm vào Màn hình chính**, rồi bấm Thêm.
3. Mở app từ biểu tượng mới trên màn hình chính, đăng nhập bằng email và mật khẩu.

Bản này có biểu tượng riêng, chạy toàn màn hình, mở được khi không có mạng và dùng cùng tài khoản Firebase với bản Android. Mỗi lần bạn đưa `index.html` mới lên GitHub, app trên iPhone tự lấy bản mới ở lần mở có mạng.
