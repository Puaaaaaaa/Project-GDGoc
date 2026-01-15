// firebase-logic.js

// 1. Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. Konfigurasi (PASTE CONFIG DARI CONSOLE DI SINI)
const firebaseConfig = {
  apiKey: "AIzaSyBPiTax-mw8QoM_7K6Z3bTpTEI-UdQeILU",
  authDomain: "gdgoc-unhas-final.firebaseapp.com",
  projectId: "gdgoc-unhas-final",
  storageBucket: "gdgoc-unhas-final.firebasestorage.app",
  messagingSenderId: "32427036148",
  appId: "1:32427036148:web:1c157eb584a5c83054bda1",
};

// 3. Inisialisasi
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("Firebase Connected!");

// ... (Import dan Config di atas BIARKAN SAJA) ...

// === LOGIKA BARU: FETCH + RENDER HTML ===
async function tampilkanOrganizers() {
  const container = document.getElementById("organizer-list");

  try {
    const querySnapshot = await getDocs(collection(db, "organizers"));

    let organizers = [];
    querySnapshot.forEach((doc) => {
      // Ambil data, lalu pasang pengaman jika lupa kasih nomor urutan
      const data = doc.data();
      // Jika field 'urutan' kosong, kita kasih nilai 999 biar dia muncul paling belakang
      if (!data.urutan) {
        data.urutan = 999;
      }
      organizers.push(data);
    });

    // === SORTING BERDASARKAN FIELD 'urutan' ===
    organizers.sort((a, b) => {
      return a.urutan - b.urutan;
    });

    // 2. Bersihkan container (Hapus tulisan "Sedang memuat...")
    container.innerHTML = "";

    // 3. LOOPING: Buat Kartu HTML untuk setiap orang
    organizers.forEach((orang) => {
      // Kita pakai Backticks (``) untuk membuat HTML template
      const htmlCard = `
        <div class="contact-card">
          <img src="${orang.image}" alt="${orang.name}" />
          <h4 class="contact-name">${orang.name}</h4>
          <p class="contact-position">${orang.role}</p>
          <a href="#" class="see-profile-btn" data-id="${orang.id}">See Profile</a>
        </div>
      `;

      // Masukkan ke dalam HTML
      container.innerHTML += htmlCard;
    });

    // 4. PASANG EVENT LISTENER KE TOMBOL BARU
    // Karena tombol baru dibuat oleh JS, kita harus pasang logikanya DI SINI
    attachModalEvents(organizers);

    console.log("Berhasil menampilkan", organizers.length, "organizers.");
  } catch (error) {
    console.error("Error:", error);
    container.innerHTML = "<p>Gagal memuat data. Silakan refresh.</p>";
  }
}

// Fungsi Tambahan: Agar Modal tetap jalan
function attachModalEvents(dataOrganizers) {
  const modal = document.getElementById("profileModal");
  const modalImg = document.getElementById("modal-img");
  const modalName = document.getElementById("modal-name");
  const modalRole = document.getElementById("modal-role");
  const modalDesc = document.getElementById("modal-desc");

  // Ambil semua tombol yang BARUSAN kita buat
  const buttons = document.querySelectorAll(".see-profile-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-id");

      // Cari data orang yang diklik
      // (Gunakan == karena id di HTML itu string, di DB mungkin number)
      const orang = dataOrganizers.find((p) => p.id == id);

      if (orang) {
        modalImg.src = orang.image;
        modalName.innerText = orang.name;
        modalRole.innerText = orang.role;
        modalDesc.innerText = orang.description;
        modal.style.display = "block";
      }
    });
  });
}

// Jalankan fungsi utama
tampilkanOrganizers();

// ... (Logika Form Join & Help biarkan tetap ada di bawah sini) ...

// 4. Logika Form JOIN (Pastikan ID form di HTML sudah ditambahkan: id="joinForm")
const joinForm = document.getElementById("joinForm");

if (joinForm) {
  joinForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Ubah teks tombol jadi loading
    const btn = joinForm.querySelector("button");
    const originalText = btn.innerText;
    btn.innerText = "Sending...";

    try {
      await addDoc(collection(db, "members"), {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        university: document.getElementById("university").value,
        timestamp: new Date(),
      });

      alert("Berhasil Join! Selamat datang.");
      joinForm.reset();
      document.getElementById("myModal").style.display = "none";
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal mengirim data.");
    } finally {
      btn.innerText = originalText;
    }
  });
}

// 5. Logika Form HELP (Pastikan ID form di HTML sudah ditambahkan: id="helpForm")
const helpForm = document.getElementById("helpForm");

if (helpForm) {
  helpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = helpForm.querySelector("button");
    const originalText = btn.innerText;
    btn.innerText = "Sending...";

    try {
      await addDoc(collection(db, "inquiries"), {
        name: document.getElementById("ask-name").value,
        question: document.getElementById("question").value,
        timestamp: new Date(),
      });

      alert("Pertanyaan terkirim!");
      helpForm.reset();
      document.getElementById("helpModal").style.display = "none";
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal mengirim pesan.");
    } finally {
      btn.innerText = originalText;
    }
  });
}
