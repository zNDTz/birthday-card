/**
 * ============================================================================
 * THIỆP SINH NHẬT TƯƠNG TÁC (INTERACTIVE BIRTHDAY CARD)
 * Phiên bản: Cao cấp - Motion & UI/UX Design
 * ============================================================================
 */

// ============================================================================
// 1. CẤU HÌNH CÁ NHÂN HÓA (DỄ DÀNG CHỈNH SỬA TẠI ĐÂY)
// ============================================================================
const CONFIG = {
  // Tên hoặc biệt danh người nhận
  recipientName: "Hạnh",

  // Tên hoặc biệt danh người gửi
  senderName: "Đứa bạn thân của cậu ♡",

  // Ngày sinh nhật hoặc dịp đặc biệt
  birthdayDate: "Hôm nay là ngày đặc biệt của cậu!",

  // Lời chúc chính hiển thị trong thiệp
  mainWish:
    "Chúc cậu tuổi mới luôn vui vẻ, bình an, gặp thật nhiều điều dễ thương và đạt được những điều cậu hằng mong muốn. Cảm ơn vì đã luôn là một người bạn tuyệt vời ở bên tớ qua bao buồn vui. Mong rằng tụi mình sẽ còn tạo thêm thật nhiều kỷ niệm đáng nhớ và cùng nhau già đi nhé! 🧸🌷",

  // Danh sách các quẻ may mắn / lời chúc bất ngờ khi bấm nút "Bốc một quẻ may mắn"
  secretWishes: [
    "Điều ước bí mật: Mong cậu luôn có cả ngàn lý do để mỉm cười mỗi ngày! 🌈✨",
    "Nhiệm vụ tuổi mới: Ăn ngon, ngủ ngoan, vui hết nấc và nhớ luôn rủ tớ đi chơi nhé! 🍰🧋",
    "Thông báo từ vũ trụ: Cậu là một người bạn vô cùng đáng trân quý. Đừng bao giờ quên điều đó nha! 💖",
    "Chúc cậu luôn có đủ dũng khí để theo đuổi ước mơ và đủ may mắn để mọi điều suôn sẻ! 🌟",
    "Tuổi mới ví tiền dày cộm, công việc thuận lợi, người thương cậu thật lòng và tớ mãi là bạn thân cậu! 🎁🍀",
    "Mỗi ngày trôi qua đều là một ngày tuyệt đẹp và tràn ngập những bất ngờ ngọt ngào! 🌸🌻",
  ],

  // Ảnh đại diện cắm trên đỉnh bánh sinh nhật (để trống "" nếu muốn dùng huy hiệu mặc định)
  avatarImage: "assets/cakeAvatar.jpg",

  // Cấu hình âm nhạc
  music: {
    // Đường dẫn tới tệp MP3 (có sẵn trong thư mục assets)
    src: "assets/birthday-song.mp3",
    // Tự động bật nhạc khi người nhận chạm bóc phong bì thư
    autoPlayOnOpen: true,
  },

  // Danh sách ảnh trong album kỷ niệm Polaroid
  memories: [
    {
      src: "assets/memory-1.svg",
      caption: "Trà sữa & những cuộc trò chuyện 🧋",
      date: "Khoảnh khắc ngọt ngào",
      rotation: -3.5,
    },
    {
      src: "assets/memory-2.svg",
      caption: "Đi khắp nơi cùng nhau 🌷",
      date: "Những chuyến đi đáng nhớ",
      rotation: 3,
    },
    {
      src: "assets/memory-3.svg",
      caption: "Món quà từ trái tim 🎁",
      date: "Luôn bên cạnh nhau",
      rotation: -1,
    },
    {
      src: "assets/memory-4.svg",
      caption: "Lưu giữ mọi nụ cười 📸",
      date: "Bạn thân mãi nhé",
      rotation: 2,
    },
  ],

  // Lời nhắn gửi cuối thiệp
  finaleMessage:
    "Mong tuổi mới sẽ đối xử với cậu thật dịu dàng. Dù cuộc sống có bận rộn hay khó khăn đến đâu, hãy luôn nhớ rằng cậu luôn có một đứa bạn sẵn sàng lắng nghe, chia sẻ và đồng hành cùng cậu nhé!",
};

// ============================================================================
// 2. WEB AUDIO SYNTHESIZER (HIỆU ỨNG ÂM THANH NATIVE KHÔNG CẦN FILE NGOÀI)
// ============================================================================
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  ensureContext() {
    if (!this.ctx) this.initAudioContext();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Tiếng leng keng / chime lấp lánh
  playChime() {
    if (!this.ctx) return;
    this.ensureContext();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(
        0.18,
        this.ctx.currentTime + idx * 0.08 + 0.02,
      );
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        this.ctx.currentTime + idx * 0.08 + 0.5,
      );

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 0.52);
    });
  }

  // Tiếng bóng bay nổ "Pop!"
  playPop() {
    if (!this.ctx) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(380, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.13);
  }

  // Tiếng thổi nến phù nhẹ
  playBlow() {
    if (!this.ctx) return;
    this.ensureContext();
    // Tạo tiếng gió thở / white noise ngắn
    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(150, this.ctx.currentTime + 0.25);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(this.ctx.currentTime);
  }

  // Tiếng hoan hô mừng sinh nhật
  playFanfare() {
    if (!this.ctx) return;
    this.ensureContext();
    const notes = [392.0, 392.0, 440.0, 392.0, 523.25, 493.88]; // Happy Birthday intro notes
    const durations = [0.18, 0.18, 0.35, 0.35, 0.35, 0.6];
    let time = this.ctx.currentTime;
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.18, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, time + durations[i]);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + durations[i] + 0.02);
      time += durations[i] * 1.05;
    });
  }

  // Tiếng tên lửa pháo hoa bay vút lên bầu trời
  playFireworkLaunch() {
    if (!this.ctx) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.14, this.ctx.currentTime + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.38);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.4);
  }

  // Tiếng pháo hoa nổ đì đùng trầm ấm chân thực
  playFireworkBoom() {
    if (!this.ctx) return;
    this.ensureContext();
    // Tiếng nổ bass rền
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(28, this.ctx.currentTime + 0.45);

    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.48);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.5);

    // Tiếng tí tách lách tách tàn pháo hoa
    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.28);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.14;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }
}

const sfx = new SoundEffects();

// ============================================================================
// 3. KHỞI TẠO DỮ LIỆU & GẮN VÀO GIAO DIỆN
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Gắn tên người nhận & người gửi
  const introName = document.getElementById("introRecipientName");
  const friendName = document.getElementById("friendName");
  const slipName = document.getElementById("slipName");
  const wishText = document.getElementById("wishText");
  const finaleMessage = document.getElementById("finaleMessage");
  const senderName = document.getElementById("senderName");

  if (introName) introName.textContent = CONFIG.recipientName;
  if (friendName) friendName.textContent = CONFIG.recipientName;
  if (slipName) slipName.textContent = CONFIG.recipientName;
  if (wishText) wishText.textContent = CONFIG.mainWish;
  if (finaleMessage) finaleMessage.textContent = CONFIG.finaleMessage;
  if (senderName) senderName.textContent = CONFIG.senderName;

  // Cấu hình Avatar trên bánh
  const cakeAvatar = document.getElementById("cakeAvatar");
  const cakeAvatarFallback = document.getElementById("cakeAvatarFallback");
  if (CONFIG.avatarImage && cakeAvatar) {
    cakeAvatar.alt = `Ảnh đại diện của ${CONFIG.recipientName}`;
    cakeAvatar.src = CONFIG.avatarImage;
    cakeAvatar.addEventListener(
      "load",
      () => {
        if (cakeAvatarFallback) cakeAvatarFallback.classList.add("hidden");
        cakeAvatar.classList.remove("hidden");
      },
      { once: true },
    );
    cakeAvatar.addEventListener(
      "error",
      () => {
        cakeAvatar.classList.add("hidden");
        if (cakeAvatarFallback) cakeAvatarFallback.classList.remove("hidden");
      },
      { once: true },
    );
  } else if (cakeAvatar) {
    cakeAvatar.classList.add("hidden");
  }

  // Khởi tạo Album ảnh kỷ niệm
  initMemoriesGallery();

  // Khởi tạo Pháo hoa Canvas
  initFireworks();

  // Khởi tạo Trình phát nhạc
  initAudioPlayer();

  // Khởi tạo Tương tác Phong bì 3D
  initEnvelopeInteraction();

  // Khởi tạo Tương tác Bánh sinh nhật & Nến
  initCakeCandleInteraction();

  // Khởi tạo Tương tác Bong bóng bay
  initBalloons();

  // Khởi tạo Hộp quẻ may mắn
  initFortuneBox();

  // Khởi tạo Lightbox
  initLightbox();

  // Khởi tạo Điều hướng cuộn mượt mà
  initSceneNavigation();

  // Nút ăn mừng lại & Xem lại từ đầu
  initCelebrationButtons();
});

// ============================================================================
// 4. TRÌNH PHÁT NHẠC NỀN & QUẢN LÝ AUDIO
// ============================================================================
const audio = document.getElementById("birthdayAudio");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");

function initAudioPlayer() {
  if (!audio || !musicToggle) return;

  if (CONFIG.music && CONFIG.music.src) {
    audio.src = CONFIG.music.src;
  }

  musicToggle.addEventListener("click", toggleMusic);
}

async function playMusic() {
  if (!audio || !audio.src) return;
  try {
    await audio.play();
    musicToggle.setAttribute("aria-pressed", "true");
    if (musicLabel) musicLabel.textContent = "Tắt nhạc sinh nhật ♫";
  } catch (err) {
    console.warn("Trình duyệt chặn phát nhạc tự động:", err);
  }
}

function pauseMusic() {
  if (!audio) return;
  audio.pause();
  musicToggle.setAttribute("aria-pressed", "false");
  if (musicLabel) musicLabel.textContent = "Bật nhạc sinh nhật ♫";
}

function toggleMusic() {
  sfx.ensureContext();
  if (audio.paused) {
    playMusic();
    showToast("🎵 Đang phát điệu nhạc sinh nhật ngọt ngào!");
  } else {
    pauseMusic();
    showToast("🔇 Đã tạm dừng nhạc.");
  }
}

// ============================================================================
// 5. TƯƠNG TÁC PHONG BÌ THƯ 3D (OPENING SEQUENCE)
// ============================================================================
function initEnvelopeInteraction() {
  const envelopeScreen = document.getElementById("envelopeScreen");
  const cardScreen = document.getElementById("cardScreen");
  const openEnvelopeBtn = document.getElementById("openEnvelope");

  if (!openEnvelopeBtn || !envelopeScreen || !cardScreen) return;

  const triggerOpen = () => {
    if (openEnvelopeBtn.classList.contains("is-opening")) return;
    openEnvelopeBtn.classList.add("is-opening");

    // Âm thanh leng keng mở thư
    sfx.playChime();

    // Bắn confetti nhỏ từ phong bì
    burstConfetti(45);

    // Phát nhạc nếu được cấu hình
    if (CONFIG.music && CONFIG.music.autoPlayOnOpen) {
      playMusic();
    }

    // Sau khi nắp thư mở và lá thư nhô lên hoàn toàn (khoảng 800ms)
    setTimeout(() => {
      envelopeScreen.classList.add("hidden");
      cardScreen.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Đại tiệc confetti chúc mừng
      burstConfetti(120);
      launchFireworks(4);
      showToast("🎉 Chào mừng đến với bữa tiệc sinh nhật của cậu!");
    }, 850);
  };

  openEnvelopeBtn.addEventListener("click", triggerOpen);

  openEnvelopeBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      triggerOpen();
    }
  });
}

// ============================================================================
// 6. BÁNH SINH NHẬT & NẾN TƯƠNG TÁC
// ============================================================================
let isCandleLit = true;

function initCakeCandleInteraction() {
  const birthdayCake = document.getElementById("birthdayCake");
  const candleFlame = document.getElementById("candleFlame");
  const smokePuff = document.getElementById("smokePuff");
  const blowingGirlStage = document.getElementById("blowingGirlStage");
  const blowCandleHeroBtn = document.getElementById("blowCandleHeroBtn");
  const cakeStatusText = document.getElementById("cakeStatusText");
  const candleStatusIcon = document.getElementById("candleStatusIcon");

  if (!candleFlame) return;

  // Thổi tắt nến hoặc thắp lại
  const toggleCandle = () => {
    if (isCandleLit) {
      // Thổi tắt nến
      isCandleLit = false;
      if (blowingGirlStage) {
        blowingGirlStage.classList.remove("hidden");
        blowingGirlStage.classList.add("is-blowing");
        setTimeout(() => {
          blowingGirlStage.classList.remove("is-blowing");
          blowingGirlStage.classList.add("hidden");
        }, 2100);
      }
      // Luồng gió xuất hiện trước, rồi mới làm tắt ngọn nến.
      setTimeout(() => {
        candleFlame.classList.add("is-blown");
        if (smokePuff) {
          smokePuff.classList.remove("hidden");
          setTimeout(() => smokePuff.classList.add("hidden"), 2000);
        }
      }, blowingGirlStage ? 850 : 0);

      // Phát âm thanh thổi & hoan hô
      sfx.playBlow();
      setTimeout(() => sfx.playFanfare(), 300);

      // Kích hoạt pháo hoa + confetti + hoa bay
      launchFireworks(6);
      burstConfetti(90);
      launchFlowerBurst();

      // Cập nhật giao diện
      if (cakeStatusText) {
        cakeStatusText.textContent = "Ước nguyện thành công! Bấm để thắp lại 🕯️";
      }
      if (candleStatusIcon) candleStatusIcon.textContent = "✨";
      if (blowCandleHeroBtn) {
        blowCandleHeroBtn.textContent = "🕯️ Thắp lại nến để ước tiếp";
      }

      showToast(
        "🌟 Điều ước của cậu đã bay lên dải ngân hà! Mọi ước mơ sẽ thành hiện thực!",
      );
    } else {
      // Thắp lại nến
      isCandleLit = true;
      candleFlame.classList.remove("is-blown");
      sfx.playChime();

      if (cakeStatusText) {
        cakeStatusText.textContent = "Chạm vào ngọn nến để thổi nhé!";
      }
      if (candleStatusIcon) candleStatusIcon.textContent = "🕯️";
      if (blowCandleHeroBtn) {
        blowCandleHeroBtn.textContent = "🎂 Thổi nến ước nguyện";
      }

      showToast("🕯️ Nến đã được thắp sáng lại! Cậu hãy nhắm mắt ước tiếp nha!");
    }
  };

  // Click vào nến
  candleFlame.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleCandle();
  });

  // Click vào nút Hero Thổi nến
  if (blowCandleHeroBtn) {
    blowCandleHeroBtn.addEventListener("click", toggleCandle);
  }

  // Click vào toàn bộ bánh kem để nhún nhảy
  if (birthdayCake) {
    birthdayCake.addEventListener("click", () => {
      birthdayCake.classList.remove("jiggle");
      void birthdayCake.offsetWidth; // Force reflow
      birthdayCake.classList.add("jiggle");
      sfx.playChime();
      burstConfetti(25);
    });

    birthdayCake.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleCandle();
      }
    });
  }
}

// ============================================================================
// 7. HỆ THỐNG BONG BÓNG BAY TƯƠNG TÁC
// ============================================================================
function initBalloons() {
  const balloons = document.querySelectorAll(".balloon");
  balloons.forEach((balloon) => {
    const pop = (e) => {
      if (balloon.classList.contains("popping")) return;
      balloon.classList.add("popping");

      sfx.playPop();
      burstConfetti(16);
      showToast("Pop! 🎈 Một chiếc bóng bay gửi muôn lời chúc đến cậu!");

      // Tự động mọc lại sau vài giây
      setTimeout(() => {
        balloon.classList.remove("popping");
      }, 5000);
    };

    balloon.addEventListener("click", pop);
    balloon.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        pop();
      }
    });
  });

  // Nút "Thả thêm bóng bay"
  const spawnBalloonBtn = document.getElementById("spawnBalloonBtn");
  if (spawnBalloonBtn) {
    spawnBalloonBtn.addEventListener("click", () => {
      spawnFlyingBalloons(26);
      sfx.playChime();
      showToast("🎈 Cơn bão bóng bay ước nguyện đang rực rỡ bay lên bầu trời!");
    });
  }
}

// Thả đàn bóng bay rực rỡ trôi từ đáy màn hình lên trời
function spawnFlyingBalloons(count = 25) {
  const layer = document.getElementById("balloonsFlyingLayer");
  if (!layer) return;

  const palettes = [
    { bg: "radial-gradient(circle at 35% 35%, #ffaec9, #ff75a8)", c: "#ff75a8" },
    { bg: "radial-gradient(circle at 35% 35%, #fff0a8, #ffd166)", c: "#ffd166" },
    { bg: "radial-gradient(circle at 35% 35%, #d8ccff, #8d78d8)", c: "#8d78d8" },
    { bg: "radial-gradient(circle at 35% 35%, #bbf2de, #5ac7a0)", c: "#5ac7a0" },
    { bg: "radial-gradient(circle at 35% 35%, #ffd0b8, #ff9e79)", c: "#ff9e79" },
    { bg: "radial-gradient(circle at 35% 35%, #c5e3ff, #74c0fc)", c: "#74c0fc" },
    { bg: "radial-gradient(circle at 35% 35%, #ffc2d1, #ff5376)", c: "#ff5376" },
    { bg: "radial-gradient(circle at 35% 35%, #fff6d6, #ffe066)", c: "#ffe066" },
  ];

  for (let i = 0; i < count; i++) {
    const b = document.createElement("div");
    b.className = "flying-balloon";

    const p = palettes[Math.floor(Math.random() * palettes.length)];
    const width = 36 + Math.floor(Math.random() * 26); // 36px - 62px
    const height = Math.floor(width * 1.25);
    const left = 3 + Math.random() * 92; // 3% - 95%
    const duration = 6.5 + Math.random() * 5; // 6.5s - 11.5s
    const delay = Math.random() * 3.5; // 0s - 3.5s
    const driftX = 15 + Math.random() * 30; // 15px - 45px

    b.style.width = `${width}px`;
    b.style.height = `${height}px`;
    b.style.background = p.bg;
    b.style.color = p.c;
    b.style.left = `${left}%`;
    b.style.setProperty("--duration", `${duration}s`);
    b.style.setProperty("--delay", `${delay}s`);
    b.style.setProperty("--drift-x", `${driftX}px`);

    // Dây bóng uốn lượn
    const stringEl = document.createElement("span");
    stringEl.className = "flying-string";
    stringEl.style.height = `${Math.floor(height * 1.15)}px`;
    b.appendChild(stringEl);

    // Tương tác chạm hoặc click để làm nổ bóng giữa trời
    const popBalloon = (e) => {
      e.stopPropagation();
      if (b.classList.contains("popping")) return;
      b.classList.add("popping");
      sfx.playPop();
      burstConfetti(14);
      showToast("Pop! 🎈 Cậu vừa đón nhận một niềm vui bất ngờ!");
      setTimeout(() => b.remove(), 260);
    };

    b.addEventListener("click", popBalloon);
    b.addEventListener("touchstart", popBalloon, { passive: true });

    layer.appendChild(b);
    b.addEventListener("animationend", () => b.remove(), { once: true });
  }
}

// ============================================================================
// 8. HỘP QUẺ MAY MẮN / LỜI CHÚC BÍ MẬT
// ============================================================================
function initFortuneBox() {
  const surpriseBtn = document.getElementById("surpriseButton");
  const surpriseMsg = document.getElementById("surpriseMessage");
  const fireworksBtn = document.getElementById("fireworksButton");

  let lastIndex = -1;

  if (surpriseBtn && surpriseMsg) {
    surpriseBtn.addEventListener("click", () => {
      const list = CONFIG.secretWishes;
      if (!list || !list.length) return;

      let idx;
      do {
        idx = Math.floor(Math.random() * list.length);
      } while (list.length > 1 && idx === lastIndex);
      lastIndex = idx;

      const pContent = surpriseMsg.querySelector(".fortune-message-content");
      if (pContent) {
        pContent.textContent = list[idx];
      }
      surpriseMsg.classList.remove("hidden");

      sfx.playChime();
      burstConfetti(35);
      showToast("✨ Cậu vừa nhận được một thông điệp bí mật!");
    });
  }

  if (fireworksBtn) {
    fireworksBtn.addEventListener("click", () => {
      launchGrandFireworks(15);
      burstConfetti(120);
      launchFlowerBurst();
      showToast("🎆 Đại tiệc pháo hoa rực sáng mừng tuổi mới của cậu!");
    });
  }
}

// ============================================================================
// 9. ALBUM ẢNH POLAROID SCRAPBOOK & LIGHTBOX
// ============================================================================
let currentPhotoIndex = 0;

function initMemoriesGallery() {
  const gallery = document.getElementById("scrapbookGallery");
  if (!gallery || !CONFIG.memories || !CONFIG.memories.length) return;

  // Render động danh sách ảnh từ CONFIG nếu có
  gallery.innerHTML = "";
  CONFIG.memories.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = `polaroid-card`;
    figure.style.transform = `rotate(${item.rotation || (index % 2 === 0 ? -3 : 3)}deg)`;
    figure.dataset.index = index;
    figure.setAttribute("role", "button");
    figure.setAttribute("tabindex", "0");
    figure.setAttribute(
      "aria-label",
      `Xem ảnh kỷ niệm: ${item.caption || "Ảnh kỷ niệm"}`,
    );

    const tape = document.createElement("div");
    tape.className = `washi-tape ${index % 2 === 0 ? "tape-top-left" : "tape-top-right"}`;
    tape.setAttribute("aria-hidden", "true");

    const frame = document.createElement("div");
    frame.className = "polaroid-frame";
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.caption || "Ảnh kỷ niệm";
    img.loading = "lazy";
    frame.appendChild(img);

    const figcaption = document.createElement("figcaption");
    const captionSpan = document.createElement("span");
    captionSpan.className = "caption-handwriting";
    captionSpan.textContent = item.caption;
    const dateSmall = document.createElement("small");
    dateSmall.className = "caption-date";
    dateSmall.textContent = item.date || "";

    figcaption.appendChild(captionSpan);
    figcaption.appendChild(dateSmall);

    figure.appendChild(tape);
    figure.appendChild(frame);
    figure.appendChild(figcaption);

    figure.addEventListener("click", () => openLightbox(index));
    figure.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });

    gallery.appendChild(figure);
  });
}

function initLightbox() {
  const modal = document.getElementById("lightboxModal");
  const closeBtn = document.getElementById("lightboxCloseBtn");
  const backdrop = document.getElementById("lightboxBackdrop");
  const prevBtn = document.getElementById("lightboxPrevBtn");
  const nextBtn = document.getElementById("lightboxNextBtn");

  if (!modal) return;

  const close = () => {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", close);
  if (backdrop) backdrop.addEventListener("click", close);

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const total = CONFIG.memories.length;
      currentPhotoIndex = (currentPhotoIndex - 1 + total) % total;
      updateLightboxContent(currentPhotoIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const total = CONFIG.memories.length;
      currentPhotoIndex = (currentPhotoIndex + 1) % total;
      updateLightboxContent(currentPhotoIndex);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("hidden")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft" && prevBtn) prevBtn.click();
    if (e.key === "ArrowRight" && nextBtn) nextBtn.click();
  });
}

function openLightbox(index) {
  const modal = document.getElementById("lightboxModal");
  if (!modal || !CONFIG.memories[index]) return;

  currentPhotoIndex = index;
  updateLightboxContent(index);
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Khóa cuộn màn hình
}

function updateLightboxContent(index) {
  const img = document.getElementById("lightboxImage");
  const caption = document.getElementById("lightboxCaption");
  const date = document.getElementById("lightboxDate");
  const counter = document.getElementById("lightboxCounter");

  const item = CONFIG.memories[index];
  if (!item) return;

  if (img) {
    img.src = item.src;
    img.alt = item.caption || "Ảnh kỷ niệm lớn";
  }
  if (caption) caption.textContent = item.caption || "";
  if (date) date.textContent = item.date || "";
  if (counter)
    counter.textContent = `${index + 1} / ${CONFIG.memories.length}`;
}

// ============================================================================
// 10. CANVAS FIREWORKS ENGINE CHUYÊN NGHIỆP
// ============================================================================
let fireworksCanvas = null;
let fireworksCtx = null;
let fireworksWidth = 0;
let fireworksHeight = 0;
let fireworksRockets = [];
let fireworksParticles = [];
let fireworksAnimId = null;
let screenFlashAlpha = 0;

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function initFireworks() {
  fireworksCanvas = document.getElementById("fireworksCanvas");
  if (!fireworksCanvas) return;
  fireworksCtx = fireworksCanvas.getContext("2d");

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    fireworksWidth = window.innerWidth;
    fireworksHeight = window.innerHeight;
    fireworksCanvas.width = Math.round(fireworksWidth * dpr);
    fireworksCanvas.height = Math.round(fireworksHeight * dpr);
    fireworksCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  window.addEventListener("resize", resize, { passive: true });
  resize();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && fireworksCtx) {
      fireworksCtx.clearRect(0, 0, fireworksWidth, fireworksHeight);
      fireworksRockets = [];
      fireworksParticles = [];
      screenFlashAlpha = 0;
    }
  });
}

// Bắn pháo hoa tiêu chuẩn
function launchFireworks(burstCount = 6) {
  if (!fireworksCtx) {
    burstConfetti(50);
    return;
  }

  const styles = ["peony", "doubleRing", "willow", "heart"];

  for (let i = 0; i < burstCount; i++) {
    setTimeout(
      () => {
        const startX = fireworksWidth * (0.15 + Math.random() * 0.7);
        const targetX = startX + (Math.random() - 0.5) * 120;
        const targetY = fireworksHeight * (0.14 + Math.random() * 0.32);
        const style = styles[Math.floor(Math.random() * styles.length)];

        sfx.playFireworkLaunch();

        fireworksRockets.push({
          x: startX,
          y: fireworksHeight,
          targetX,
          targetY,
          speed: 9 + Math.random() * 4,
          style,
        });

        if (!fireworksAnimId) {
          fireworksAnimId = requestAnimationFrame(updateFireworksLoop);
        }
      },
      i * (180 + Math.random() * 140),
    );
  }
}

// Bắn đại tiệc pháo hoa liên hoàn hoành tráng (Dành cho 2 nút chúc mừng đặc biệt)
function launchGrandFireworks(rounds = 18) {
  if (!fireworksCtx) {
    burstConfetti(120);
    return;
  }

  const styles = ["heart", "doubleRing", "willow", "peony", "willow", "peony"];

  // Bắn chia thành các đợt liên tục trải dài màn hình
  for (let i = 0; i < rounds; i++) {
    // Thời điểm bắn xen kẽ tạo giai điệu rộn ràng
    const delay = i * 220 + Math.random() * 120;

    setTimeout(() => {
      // Vị trí bắn: trải khắp từ trái, giữa đến phải
      let startX;
      if (i % 3 === 0) {
        startX = fireworksWidth * (0.08 + Math.random() * 0.25); // Cánh trái
      } else if (i % 3 === 1) {
        startX = fireworksWidth * (0.68 + Math.random() * 0.25); // Cánh phải
      } else {
        startX = fireworksWidth * (0.35 + Math.random() * 0.3); // Trung tâm
      }

      const targetX = startX + (Math.random() - 0.5) * 160;
      const targetY = fireworksHeight * (0.12 + Math.random() * 0.35);
      const style = styles[i % styles.length];

      sfx.playFireworkLaunch();

      fireworksRockets.push({
        x: startX,
        y: fireworksHeight,
        targetX,
        targetY,
        speed: 10 + Math.random() * 4.5,
        style,
      });

      if (!fireworksAnimId) {
        fireworksAnimId = requestAnimationFrame(updateFireworksLoop);
      }
    }, delay);
  }

  // Đợt nổ bùng nổ đồng loạt cuối cùng (Grand Finale Salvo)
  setTimeout(() => {
    const salvoPositions = [0.2, 0.4, 0.6, 0.8];
    salvoPositions.forEach((posRatio) => {
      const startX = fireworksWidth * posRatio;
      const targetX = startX + (Math.random() - 0.5) * 60;
      const targetY = fireworksHeight * (0.12 + Math.random() * 0.25);

      sfx.playFireworkLaunch();

      fireworksRockets.push({
        x: startX,
        y: fireworksHeight,
        targetX,
        targetY,
        speed: 11 + Math.random() * 3,
        style: "peony",
      });
    });

    if (!fireworksAnimId) {
      fireworksAnimId = requestAnimationFrame(updateFireworksLoop);
    }
  }, rounds * 220 + 300);
}

// Tạo chùm hạt nổ đa tầng với các kiểu dáng nghệ thuật
function createBurst(x, y, style = "peony") {
  sfx.playFireworkBoom();
  screenFlashAlpha = Math.min(0.24, screenFlashAlpha + 0.12);

  const palettes = [
    ["#ff75a8", "#ffd166", "#fffaf5", "#ff4d8d"], // Hồng dâu & Vàng kim
    ["#8d78d8", "#c2b2ff", "#ffe894", "#ffffff"], // Tím Lavender & Trăng sao
    ["#5ac7a0", "#bbf2de", "#ffd0b8", "#ff9e79"], // Bạc hà & San hô
    ["#74c0fc", "#ffd166", "#ff75a8", "#ffffff"], // Baby blue & Pastel
    ["#ffd166", "#fff3bf", "#ffa94d", "#f08c00"], // Vàng kim hoàng gia
  ];
  const colors = palettes[Math.floor(Math.random() * palettes.length)];

  if (style === "heart") {
    // Pháo hoa hình trái tim
    const heartParticles = 75;
    for (let i = 0; i < heartParticles; i++) {
      const t = (Math.PI * 2 * i) / heartParticles;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      const speed = 0.22 + Math.random() * 0.08;

      fireworksParticles.push({
        x,
        y,
        vx: hx * speed,
        vy: hy * speed,
        life: 60 + Math.random() * 25,
        maxLife: 85,
        radius: 2 + Math.random() * 1.8,
        color: Math.random() > 0.3 ? "#ff75a8" : "#ffd166",
        sparkle: true,
      });
    }
  } else if (style === "doubleRing") {
    // Pháo hoa hai vòng đồng tâm
    const innerCount = 35;
    const outerCount = 55;
    const innerColor = "#ffd166";
    const outerColor = colors[0];

    // Vòng trong
    for (let i = 0; i < innerCount; i++) {
      const angle = (Math.PI * 2 * i) / innerCount;
      const speed = 1.8 + Math.random() * 1.2;
      fireworksParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 55 + Math.random() * 25,
        maxLife: 80,
        radius: 2,
        color: innerColor,
        sparkle: true,
      });
    }

    // Vòng ngoài
    for (let i = 0; i < outerCount; i++) {
      const angle = (Math.PI * 2 * i) / outerCount;
      const speed = 3.6 + Math.random() * 2;
      fireworksParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 65 + Math.random() * 25,
        maxLife: 90,
        radius: 2.2,
        color: outerColor,
        sparkle: false,
      });
    }
  } else if (style === "willow") {
    // Pháo hoa liễu rủ vàng óng sao sa (rơi chậm thướt tha)
    const willowCount = 90;
    for (let i = 0; i < willowCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 4.6;
      fireworksParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 80 + Math.random() * 40,
        maxLife: 120,
        radius: 1.8 + Math.random() * 1.6,
        color: Math.random() > 0.4 ? "#ffd166" : "#fff8db",
        gravity: 0.028,
        friction: 0.985,
        sparkle: true,
      });
    }
  } else {
    // Pháo hoa hoa cúc (Peony) nhiều tầng
    const count = 95;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
      const speed = 1.6 + Math.random() * 5.2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      fireworksParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 60 + Math.random() * 30,
        maxLife: 90,
        radius: 1.8 + Math.random() * 2.2,
        color,
        sparkle: Math.random() > 0.4,
      });
    }
  }
}

function updateFireworksLoop() {
  if (!fireworksCtx) return;

  fireworksCtx.clearRect(0, 0, fireworksWidth, fireworksHeight);

  // Hiệu ứng chớp sáng nền khi pháo nổ (Flash glow)
  if (screenFlashAlpha > 0.005) {
    fireworksCtx.save();
    fireworksCtx.fillStyle = `rgba(255, 245, 250, ${screenFlashAlpha})`;
    fireworksCtx.fillRect(0, 0, fireworksWidth, fireworksHeight);
    fireworksCtx.restore();
    screenFlashAlpha *= 0.82;
  }

  // Cập nhật Rockets bay lên
  for (let i = fireworksRockets.length - 1; i >= 0; i--) {
    const r = fireworksRockets[i];
    const dx = r.targetX - r.x;
    const dy = r.targetY - r.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 14 || r.y <= r.targetY) {
      createBurst(r.x, r.y, r.style || "peony");
      fireworksRockets.splice(i, 1);
    } else {
      r.x += (dx / dist) * r.speed;
      r.y += (dy / dist) * r.speed;

      // Vẽ vệt đuôi rực rỡ của tên lửa
      fireworksCtx.beginPath();
      fireworksCtx.arc(r.x, r.y, 3, 0, Math.PI * 2);
      fireworksCtx.fillStyle = "#ffffff";
      fireworksCtx.shadowColor = "#ffd166";
      fireworksCtx.shadowBlur = 12;
      fireworksCtx.fill();

      // Vệt khói lấp lánh phía sau
      fireworksCtx.beginPath();
      fireworksCtx.arc(r.x - (dx / dist) * 8, r.y - (dy / dist) * 8, 2, 0, Math.PI * 2);
      fireworksCtx.fillStyle = "rgba(255, 209, 102, 0.6)";
      fireworksCtx.fill();
    }
  }

  // Cập nhật Particles pháo nổ
  for (let i = fireworksParticles.length - 1; i >= 0; i--) {
    const p = fireworksParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= p.friction || 0.975;
    p.vy = p.vy * (p.friction || 0.975) + (p.gravity || 0.042);
    p.life -= 1;

    if (p.life <= 0) {
      fireworksParticles.splice(i, 1);
    } else {
      const alpha = Math.max(0, p.life / p.maxLife);
      const twinkle = p.sparkle && Math.random() > 0.4 ? 1.4 : 1;

      fireworksCtx.globalAlpha = alpha;
      fireworksCtx.fillStyle = p.color;
      fireworksCtx.shadowColor = p.color;
      fireworksCtx.shadowBlur = 8;
      fireworksCtx.beginPath();
      fireworksCtx.arc(p.x, p.y, p.radius * alpha * twinkle, 0, Math.PI * 2);
      fireworksCtx.fill();
    }
  }

  fireworksCtx.globalAlpha = 1;
  fireworksCtx.shadowBlur = 0;

  if (fireworksRockets.length > 0 || fireworksParticles.length > 0 || screenFlashAlpha > 0.005) {
    fireworksAnimId = requestAnimationFrame(updateFireworksLoop);
  } else {
    fireworksCtx.clearRect(0, 0, fireworksWidth, fireworksHeight);
    fireworksAnimId = null;
  }
}

// ============================================================================
// 11. CONFETTI & CÁNH HOA BAY
// ============================================================================
function burstConfetti(count = 80) {
  const layer = document.getElementById("confettiLayer");
  if (!layer) return;

  const colors = [
    "#ff75a8",
    "#ffd166",
    "#8d78d8",
    "#7ee0be",
    "#ff9e79",
    "#ffffff",
    "#ffccd5",
  ];
  const shapes = ["square", "circle", "heart", "star"];

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty("--duration", `${2.4 + Math.random() * 2.2}s`);
    piece.style.setProperty("--drift", `${(Math.random() - 0.5) * 260}px`);
    piece.style.animationDelay = `${Math.random() * 0.4}s`;

    const color = colors[Math.floor(Math.random() * colors.length)];

    if (shape === "heart") {
      piece.textContent = "♥";
      piece.style.color = color;
      piece.style.fontSize = `${12 + Math.random() * 10}px`;
    } else if (shape === "star") {
      piece.textContent = "✦";
      piece.style.color = color;
      piece.style.fontSize = `${10 + Math.random() * 10}px`;
    } else {
      piece.style.width = `${8 + Math.random() * 6}px`;
      piece.style.height = `${10 + Math.random() * 8}px`;
      piece.style.backgroundColor = color;
      piece.style.borderRadius = shape === "circle" ? "50%" : "2px";
    }

    layer.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove(), {
      once: true,
    });
  }
}

function launchFlowerBurst() {
  const layer = document.getElementById("flowerLayer");
  if (!layer) return;

  const flowers = ["🌸", "🌷", "🌺", "💮", "✨", "💖"];
  const count = 22;

  for (let i = 0; i < count; i++) {
    const flower = document.createElement("span");
    flower.className = "flower-particle";
    flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    flower.style.left = `${15 + Math.random() * 70}%`;
    flower.style.bottom = "80px";
    flower.style.setProperty("--drift", `${(Math.random() - 0.5) * 220}px`);
    flower.style.setProperty("--rise", `${200 + Math.random() * 320}px`);
    flower.style.setProperty("--duration", `${1.8 + Math.random() * 1.2}s`);
    layer.appendChild(flower);
    flower.addEventListener("animationend", () => flower.remove(), {
      once: true,
    });
  }
}

// ============================================================================
// 12. TOAST THÔNG BÁO TƯƠNG TÁC
// ============================================================================
let toastTimer = null;

function showToast(message) {
  const toast = document.getElementById("effectToast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove("hidden");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 2800);
}

// ============================================================================
// 13. ĐIỀU HƯỚNG NHANH & NÚT REPLAY
// ============================================================================
function initSceneNavigation() {
  const chips = document.querySelectorAll(".nav-chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = chip.getAttribute("data-target");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        chips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
      }
    });
  });
}

function initCelebrationButtons() {
  // Nút Ăn mừng lại
  const celebrateAgain = document.getElementById("celebrateAgain");
  if (celebrateAgain) {
    celebrateAgain.addEventListener("click", () => {
      launchGrandFireworks(22);
      burstConfetti(180);
      launchFlowerBurst();
      spawnFlyingBalloons(26);
      sfx.playFanfare();

      const birthdayCake = document.getElementById("birthdayCake");
      if (birthdayCake) {
        birthdayCake.classList.remove("jiggle");
        void birthdayCake.offsetWidth;
        birthdayCake.classList.add("jiggle");
      }

      showToast("🎊 Đại tiệc sinh nhật bùng nổ cùng Hạnh! 🎉✨");
    });
  }

  // Hộp quà nhảy nhót ở finale
  const giftBoxAnim = document.getElementById("giftBoxAnim");
  if (giftBoxAnim) {
    giftBoxAnim.addEventListener("click", () => {
      burstConfetti(60);
      launchFlowerBurst();
      sfx.playChime();
      showToast("🎁 Bất ngờ chưa! Một nụ cười thật tươi dành cho cậu đó!");
    });
  }

  // Nút Xem lại từ đầu (Đóng thiệp và quay về mở phong bì)
  const reopenEnvelopeBtn = document.getElementById("reopenEnvelopeBtn");
  if (reopenEnvelopeBtn) {
    reopenEnvelopeBtn.addEventListener("click", () => {
      const envelopeScreen = document.getElementById("envelopeScreen");
      const cardScreen = document.getElementById("cardScreen");
      const openEnvelopeBtn = document.getElementById("openEnvelope");

      if (openEnvelopeBtn) {
        openEnvelopeBtn.classList.remove("is-opening");
      }
      if (cardScreen) cardScreen.classList.add("hidden");
      if (envelopeScreen) {
        envelopeScreen.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      showToast("💌 Cậu có thể mở lại phong bì bất cứ khi nào!");
    });
  }
}


