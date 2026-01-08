feather.replace();

const navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#menu-btn").onclick = () => {
  navbarNav.classList.toggle("active");
};

const menu = document.querySelector("#menu-btn");

document.addEventListener("click", function (event) {
  if (!menu.contains(event.target) && !navbarNav.contains(event.target)) {
    navbarNav.classList.remove("active");
  }
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

// === LOGIKA MODAL (UPDATED) ===

const journeyModal = document.getElementById("myModal");
const helpModal = document.getElementById("helpModal");

const journeyBtn = document.querySelector(".cta");
const closeJourney = journeyModal.querySelector(".close-btn");
const closeHelp = helpModal.querySelector(".close-help");

// 1. Ambil SEMUA tombol yang punya class 'help-trigger'
const helpButtons = document.querySelectorAll(".help-trigger");

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

// === KLIK DI LUAR KOTAK ===
window.onclick = function (event) {
  if (event.target == journeyModal) {
    journeyModal.style.display = "none";
  }
  if (event.target == helpModal) {
    helpModal.style.display = "none";
  }
};

// === 1. SIMULASI DATA DARI BACKEND (FIREBASE) ===
// Nanti Anda tinggal mengganti array ini dengan fetch dari Firebase Firestore
const organizersData = [
  {
    id: 1,
    name: "Bryan Jericho",
    role: "Lead",
    image: "image/KakJericho.webp", // Pastikan path gambar benar
    description:
      "Bryan is responsible for leading the GDGoc Unhas team, creating strategic plans, and ensuring all divisions work together effectively. He has a strong background in Mobile Development.",
  },
  {
    id: 2,
    name: "Eka Putri Difayanti",
    role: "Ex Co-Lead",
    image: "image/KakEkaPutriDifayanti.webp",
    description:
      "Eka previously served as Co-Lead, helping to manage community operations. She is an expert in UI/UX Design and loves mentoring new students.",
  },
  {
    id: 3,
    name: "Ikrar Gempur Tirani",
    role: "Head of Creative Media",
    image: "image/KakIkrarGempurTirani.webp",
    description:
      "Ikrar manages all creative outputs, from social media designs to video editing. His vision shapes the visual identity of our community.",
  },
  {
    id: 4,
    name: "Fathan Wibowo",
    role: "Head of Public Relation",
    image: "image/KakFathanWibowo.webp", // Ganti sesuai nama file asli
    description:
      "Fathan bridges the gap between GDGoc Unhas and external partners. He excels in communication and networking strategies.",
  },
  {
    id: 5,
    name: "Nabila Salsabila Akbar S",
    role: "Creative Media",
    image: "image/KakNabilaSalsabilaAkbarS.webp",
    description:
      "A creative soul who contributes to our social media designs and visual storytelling, ensuring every post captures the spirit of our community.",
  },
  {
    id: 6,
    name: "Imam Dza Khoir",
    role: "Technical Mentor",
    image: "image/KakImamDzaKhoir.webp",
    description:
      "Provides technical guidance and mentorship to members. An expert in software engineering who loves sharing knowledge about best coding practices.",
  },
  {
    id: 7,
    name: "Arya Gunavaro",
    role: "Technical Mobile",
    image: "image/arya_gunavaro.webp",
    description:
      "Specializes in Mobile Development. Arya is passionate about building seamless mobile applications and sharing insights on the latest Android & Flutter tech.",
  },
  {
    id: 8,
    name: "Gracia Aurelya",
    role: "Event Organizer",
    image: "image/gracia_aurelya.webp",
    description:
      "Ensures the operational success of our events. Gracia is detail-oriented and works behind the scenes to create a comfortable learning environment.",
  },
  {
    id: 9,
    name: "Ryandi Putra Anggara",
    role: "Event Organizer",
    image: "image/ryandi_putra_anggara.webp",
    description:
      "Energetic and resourceful, Ryandi helps in logistics and on-site management to make sure every attendee has a great experience.",
  },
  {
    id: 10,
    name: "Khaerunnisa Nur Mutmainna",
    role: "Public Relation",
    image: "image/khaerunnisa_nur_mutmainna_sQKtcdT.webp",
    description:
      "Helps maintain good relationships with our members and partners. Always ready to communicate our values and assist in public inquiries.",
  },
  {
    id: 11,
    name: "Nabiilah Juwairiyah Adudu",
    role: "Event Organizer",
    image: "image/nabiilah_juwairiyah_adudu_8KOrn6F.webp",
    description:
      "Dedicated to coordinating event schedules and resources. Nabiilah plays a key role in keeping our timeline on track during busy events.",
  },
  {
    id: 12,
    name: "Efraim Parasak",
    role: "Event Organizer",
    image: "image/efraim_parasak.webp",
    description:
      "Passionate about event management. Efraim assists in setting up venues and managing technical requirements for our workshops.",
  },
  {
    id: 13,
    name: "Athifah Tiara",
    role: "Public Relation",
    image: "image/athifah_tiara_6WVBum4.webp",
    description:
      "Active in networking and community outreach. Athifah works hard to expand our reach and ensure our events are known to a wider audience.",
  },
  {
    id: 14,
    name: "Nadia Indriani Sumardi",
    role: "Event Organizer",
    image: "image/nadia_indriani_sumardi_3nYxsLz.webp",
    description:
      "A team player who handles participant registration and inquiries, ensuring everyone feels welcome at our events.",
  },
  {
    id: 15,
    name: "Annisa Latifa Alquraini",
    role: "Creative Media",
    image: "image/annisa_alquraini.webp",
    description:
      "Focuses on content creation and graphic design. Annisa helps visualize complex tech topics into easy-to-understand and engaging visual content.",
  },
  {
    id: 16,
    name: "Admiral Zuhdi",
    role: "Technical Frontend",
    image: "image/zuhdi_ilal_I1VaaGc.webp",
    description:
      "Our Frontend Wizard. Admiral focuses on creating beautiful and responsive web interfaces, sharing tips on modern web frameworks and UI libraries.",
  },
  {
    id: 17,
    name: "Andi Muhammad Abigail",
    role: "Creative Media",
    image: "image/andi_muhammad_abigail_P8TsRKp.webp",
    description:
      "Talented in multimedia and design. Abigail ensures that all our event documentation and promotional materials are visually stunning.",
  },
  {
    id: 18,
    name: "Nahdah Fauziah Chaidir",
    role: "Event Organizer",
    image: "image/nahdah_chaidir_QJXZnF4.webp",
    description:
      "Contributes to creative event concepts and execution. Nahdah ensures that our events are not just educational, but also fun and memorable.",
  },
  {
    id: 19,
    name: "Ramadani",
    role: "Head of Event Organizer",
    image: "image/rezky_ramadani.webp",
    description:
      "The mastermind behind our events. Ramadani oversees the planning and execution of all activities, ensuring every Study Jam and Workshop runs smoothly.",
  },
];

// === 2. LOGIKA MODAL PROFILE ===
const profileModal = document.getElementById("profileModal");
const closeProfile = profileModal.querySelector(".close-profile");

// Ambil elemen-elemen di dalam modal yang mau diubah isinya
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalRole = document.getElementById("modal-role");
const modalDesc = document.getElementById("modal-desc");

// Ambil semua tombol "See Profile"
const profileButtons = document.querySelectorAll(".see-profile-btn");

profileButtons.forEach((btn) => {
  btn.onclick = function (e) {
    e.preventDefault();

    // 1. Ambil ID dari tombol yang diklik (data-id="...")
    const id = btn.getAttribute("data-id");

    // 2. Cari data orang tersebut di array 'organizersData'
    // (Nanti di sini logika fetch firebase by ID)
    const data = organizersData.find((person) => person.id == id);

    // 3. Masukkan data ke dalam elemen HTML Modal
    if (data) {
      modalImg.src = data.image;
      modalName.innerText = data.name;
      modalRole.innerText = data.role;
      modalDesc.innerText = data.description; // Deskripsi dari "Backend"

      // 4. Tampilkan Modal
      profileModal.style.display = "block";
    }
  };
});

// Fungsi Tutup Modal Profile
closeProfile.onclick = function () {
  profileModal.style.display = "none";
};

// Klik luar tutup modal (Gabung dengan logika modal lain yang sudah ada)
// Pastikan Anda update window.onclick yang sebelumnya agar support profileModal juga
window.onclick = function (event) {
  if (event.target == document.getElementById("myModal")) {
    document.getElementById("myModal").style.display = "none";
  }
  if (event.target == document.getElementById("helpModal")) {
    document.getElementById("helpModal").style.display = "none";
  }
  // Tambahan baru:
  if (event.target == profileModal) {
    profileModal.style.display = "none";
  }
};
