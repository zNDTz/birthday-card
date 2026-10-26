# 🎂 Thiệp Sinh Nhật Tương Tác Diệu Kỳ (Interactive Birthday Card) ✨

Một trang web thiệp sinh nhật kỹ thuật số cao cấp, mang phong cách ngọt ngào, dreamy, dễ thương (_cute, romantic friendship, whimsical & playful_). Được xây dựng bằng HTML5, CSS3 và JavaScript hiện đại thuần túy (Vanilla JS), tương thích 100% với **GitHub Pages** hoàn toàn miễn phí.

---

## 🌟 Những Điểm Nổi Bật & Tính Năng Tương Tác

1. **Phong bì thư 3D (Magic 3D Envelope)**:
   - Phong bì có chiều sâu không gian, vân giấy, tem bưu chính cổ điển và con dấu sáp (_wax seal_) dập nổi hình trái tim.
   - Nhấp vào con dấu sáp: sáp mở lấp lánh, nắp thư mở lật 3D 180°, lá thư sinh nhật trượt nhô lên cao và chuyển cảnh mượt mà sang bữa tiệc chính.

2. **Bánh sinh nhật 3 tầng & Nến ước nguyện tương tác**:
   - Bánh kem 3 tầng thiết kế tỉ mỉ với lớp kem chảy (_icing drips_), quả mọng (_berries_), kẹo rắc và khay sứ viền vàng.
   - Ngọn nến lung linh với hiệu ứng ngọn lửa bập bùng chân thực (_flickering flame_) và vầng hào quang ấm áp.
   - **Tương tác Thổi nến**: Nhấp vào nến hoặc nút _“Thổi nến ước nguyện”_ để thổi tắt ngọn lửa. Khói trắng bốc lên mềm mại, phát âm thanh chúc mừng (_fanfare_), đồng thời tự động kích hoạt màn pháo hoa hoành tráng và mưa confetti!
   - Có thể nhấn _“Thắp lại nến”_ để ước tiếp bao nhiêu lần tùy thích.
   - Nhấp vào bánh để bánh nhún nhảy vui nhộn.

3. **Chùm bong bóng bay tương tác**:
   - Bong bóng bồng bềnh tự nhiên theo gió.
   - Nhấp vào bong bóng: bóng nảy và nổ _“POP!”_ với âm thanh vui nhộn và bắn ra các mảnh confetti.
   - Nút _“🎈 Thả thêm bóng bay”_ giúp thả thêm những quả bóng ước nguyện trôi lên bầu trời.

4. **Hệ thống Pháo hoa Canvas & Confetti**:
   - Pháo hoa Canvas 60 FPS: tên lửa vút từ dưới màn hình lên cao, phát nổ bung xòe hoa cúc đa tầng rực rỡ kèm trọng lực và vệt sao rơi.
   - Các mảnh giấy confetti đủ hình thù (vuông, tròn, trái tim ♥, ngôi sao ✦) và cánh hoa đào bay bổng.

5. **Hộp Quẻ May Mắn (Fortune Wish Cookies)**:
   - Rút ngẫu nhiên những thông điệp sinh nhật bất ngờ, dí dỏm và ấm áp.

6. **Album ảnh kỷ niệm Polaroid Scrapbook & Lightbox**:
   - Các khung ảnh Polaroid dán băng dính washi tape đáng yêu, góc xoay tự nhiên, đổ bóng 3D.
   - Có sẵn bộ 4 hình minh họa vector SVG sắc nét, chạy offline 100% không lo lỗi mạng.
   - **Lightbox Modal**: Nhấp vào ảnh để phóng to toàn màn hình, có nút xem ảnh trước/sau (_Previous / Next_), nút đóng (X) và hỗ trợ phím `Escape` / phím mũi tên bàn phím.

7. **Trình phát nhạc nền & Âm thanh Web Audio Native**:
   - Nút điều khiển nhạc phong cách đĩa than vinyl thu nhỏ xoay tròn và các thanh sóng âm (_sound wave_) nhảy múa theo nhịp.
   - Tích hợp sẵn bài hát sinh nhật trong `assets/birthday-song.mp3`.
   - Tự động tạo hiệu ứng âm thanh (tiếng chuông leng keng, tiếng nổ bong bóng, tiếng thổi nến, tiếng nhạc hoan hô) bằng công nghệ Web Audio API nguyên bản, không cần tải thêm bất kỳ file âm thanh nào khác!

---

## 🛠️ Hướng Dẫn Tùy Chỉnh Nhanh (Cá Nhân Hóa Trong 1 Phút)

Mọi thông tin cá nhân hóa đều được gom gọn gàng tại biến `CONFIG` ở ngay đầu tệp `script.js`:

```javascript
const CONFIG = {
  // 1. Tên hoặc biệt danh người nhận
  recipientName: " 🌸", // Đổi thành tên bạn của bạn

  // 2. Tên hoặc biệt danh người gửi
  senderName: "Đứa bạn thân của cậu ♡",

  // 3. Lời chúc chính
  mainWish:
    "Chúc cậu tuổi mới luôn vui vẻ, bình an, gặp thật nhiều điều dễ thương...",

  // 4. Các thông điệp bí mật khi bốc quẻ may mắn
  secretWishes: [
    "Điều ước bí mật: Mong cậu luôn có cả ngàn lý do để mỉm cười mỗi ngày! 🌈✨",
    "Nhiệm vụ tuổi mới: Ăn ngon, ngủ ngoan, vui hết nấc và nhớ luôn rủ tớ đi chơi nhé! 🍰🧋",
    // Thêm các câu chúc riêng của bạn vào đây...
  ],

  // 5. Ảnh đại diện cắm trên đỉnh bánh (tùy chọn)
  avatarImage: "assets/avatar.jpg", // Đặt ảnh vào thư mục assets và điền tên file

  // 6. Nhạc nền
  music: {
    src: "assets/birthday-song.mp3",
    autoPlayOnOpen: true, // Tự động phát nhạc khi mở phong bì
  },

  // 7. Danh sách ảnh trong album kỷ niệm Polaroid
  memories: [
    {
      src: "assets/ky-niem-1.jpg", // Đổi đường dẫn tới ảnh của bạn
      caption: "Trà sữa & những cuộc trò chuyện 🧋",
      date: "Khoảnh khắc ngọt ngào",
      rotation: -3.5,
    },
    // ...
  ],
};
```

---

## 🚀 Cách Chạy Thử Trên Máy Tính

1. Nhấp đúp chuột vào tệp `index.html` để mở trực tiếp trong bất kỳ trình duyệt nào (Chrome, Edge, Safari, Firefox).
2. Hoặc mở thư mục dự án bằng VS Code, nhấp chuột phải vào `index.html` và chọn **Open with Live Server**.

---

## 🌐 Cách Xuất Bản Miễn Phí Lên GitHub Pages

Trang web được thiết kế thuần Front-end tĩnh (Static Web), đường dẫn tương đối hoàn chỉnh, hoàn hảo để triển khai trên GitHub Pages miễn phí:

1. Đăng nhập vào [GitHub](https://github.com/).
2. Nhấn **New repository** (đặt tên ví dụ: `happy-birthday-bestie`), chọn chế độ **Public**.
3. Tải toàn bộ các tệp trong thư mục này lên repository (`index.html`, `style.css`, `script.js`, thư mục `assets/`).
4. Truy cập **Settings** của repository -> Chọn mục **Pages** (ở cột bên trái).
5. Trong mục **Build and deployment**:
   - **Source**: Chọn `Deploy from a branch`.
   - **Branch**: Chọn `main` (hoặc `master`) và thư mục `/(root)`.
   - Nhấn **Save**.
6. Chờ khoảng 1-2 phút, GitHub sẽ cung cấp cho bạn một đường link trang web có dạng:  
   `https://<ten-tai-khoan>.github.io/<ten-repo>/`
7. Mở link trên điện thoại hoặc máy tính để kiểm tra, sau đó gửi tặng người bạn thân yêu của mình! 💌🎁

---

_Chúc người nhận có một ngày sinh nhật thật ấm áp, ngập tràn tiếng cười và hạnh phúc!_ 🎂🎉✨
