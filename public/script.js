feather.replace();

const navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#menu-btn").onclick = (e) => {
  e.preventDefault(); // <--- INI KUNCINYA (Mencegah loncat ke atas)
  navbarNav.classList.toggle("active");
};

const menu = document.querySelector("#menu-btn");

document.addEventListener("click", function (event) {
  if (!menu.contains(event.target) && !navbarNav.contains(event.target)) {
    navbarNav.classList.remove("active");
  }
});

// === LOGIKA TUTUP MENU SAAT LINK DITEKAN (MOBILE) ===
// Ambil semua link yang ada di dalam navbar
const navLinks = document.querySelectorAll(".navbar-nav a");

// Untuk setiap link, tambahkan perintah:
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Hilangkan class 'active' agar menu tertutup kembali
    navbarNav.classList.remove("active");
  });
});

let posisiSlide = 0;
const totalSlides = 2;

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const track = document.getElementById("sliderTrack");
const eventSection = document.getElementById("menu"); // Target yang dipantau

// === 1. FUNGSI UPDATE TOMBOL ===
function updateButtons() {
  if (posisiSlide === 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
  }

  if (posisiSlide === totalSlides - 1) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "block";
  }
}

// === 2. FUNGSI GESER (Sama seperti sebelumnya) ===
function geserKanan() {
  if (posisiSlide < totalSlides - 1) {
    posisiSlide++;
    updateSlider();
  }
}

function geserKiri() {
  if (posisiSlide > 0) {
    posisiSlide--;
    updateSlider();
  }
}

function updateSlider() {
  // Jika user klik manual, hapus efek nudge agar tidak ganggu
  track.classList.remove("nudge-effect");

  const translateValue = -posisiSlide * 100;
  track.style.transform = `translateX(${translateValue}%)`;
  updateButtons();
}

// === 3. LOGIKA BARU: DETEKSI SCROLL ===
// Kita buat "Observer" (Pengamat)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Jika section #menu terlihat di layar (isIntersecting = true)
      if (entry.isIntersecting) {
        // Jalankan timer 3 detik
        setTimeout(() => {
          // Cek lagi: Apakah masih di slide 0?
          if (posisiSlide === 0) {
            track.classList.add("nudge-effect");

            // Bersihkan class setelah animasi selesai (0.8s)
            setTimeout(() => {
              track.classList.remove("nudge-effect");
            }, 800);
          }
        }, 5000); // Tunggu 3 detik setelah terlihat

        // PENTING: Matikan pengamat setelah terpicu sekali
        // Agar animasi tidak berulang-ulang setiap kali scroll naik-turun
        observer.unobserve(eventSection);
      }
    });
  },
  { threshold: 0.5 }
); // threshold 0.5 artinya: Trigger saat 50% section terlihat

// Mulai memantau section Events
observer.observe(eventSection);

// Inisialisasi tombol saat load
updateButtons();

// === HERO BACKGROUND SLIDER ===
const heroImages = document.querySelectorAll(".hero-slider img");
let currentHeroIndex = 0;
const slideInterval = 5000; // 3000ms = 3 detik

function changeHeroBackground() {
  // 1. Hapus class 'active' dari gambar yang sedang tampil
  heroImages[currentHeroIndex].classList.remove("active");

  // 2. Pindah ke index berikutnya (looping kembali ke 0 jika sudah habis)
  currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;

  // 3. Tambahkan class 'active' ke gambar baru
  heroImages[currentHeroIndex].classList.add("active");
}

// Jalankan fungsi changeHeroBackground setiap 3 detik
setInterval(changeHeroBackground, slideInterval);

// === LOGIKA UNTUK MULTIPLE MODALS ===

const journeyModal = document.getElementById("myModal");
const helpModal = document.getElementById("helpModal");
const profileModal = document.getElementById("profileModal");

const journeyBtn = document.querySelector(".cta");
const helpButtons = document.querySelectorAll(".help-trigger");

const closeJourney = journeyModal.querySelector(".close-btn");
const closeHelp = helpModal.querySelector(".close-help");
const closeProfile = profileModal.querySelector(".close-profile");

// === FUNGSI BUKA MODAL ===

// Tombol Start Journey (Cuma satu, jadi langsung)
journeyBtn.onclick = function (e) {
  e.preventDefault();
  journeyModal.style.display = "block";
};

// Tombol Help (Karena ada banyak, kita pakai forEach)
helpButtons.forEach((btn) => {
  btn.onclick = function (e) {
    e.preventDefault(); // Mencegah loncat
    helpModal.style.display = "block"; // Buka modal
  };
});

// === FUNGSI TUTUP MODAL (X) ===
closeJourney.onclick = function () {
  journeyModal.style.display = "none";
};

closeHelp.onclick = function () {
  helpModal.style.display = "none";
};

closeProfile.onclick = function () {
  profileModal.style.display = "none";
};

// === KLIK DI LUAR KOTAK ===
window.onclick = function (event) {
  if (event.target == journeyModal) {
    journeyModal.style.display = "none";
  }
  if (event.target == helpModal) {
    helpModal.style.display = "none";
  }
  if (event.target == profileModal) {
    profileModal.style.display = "none";
  }
};
