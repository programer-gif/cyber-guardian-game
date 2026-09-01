# Cyber Guardian — Setup GitHub Pages + Firebase

## Kenapa berubah dari PHP ke Firebase?
GitHub Pages cuma hosting **statis** (HTML/CSS/JS) — file `.php` di folder
`admin/` dan `api/` **tidak akan pernah jalan** di sana (akan didownload
sebagai teks, bukan dieksekusi). Karena itu backend leaderboard, save
progress, co-op, dan panel admin dipindah ke **Firebase Realtime Database**
(gratis, tanpa kartu kredit, cukup untuk game kecil–menengah).

File PHP lama masih disimpan di folder `legacy-php-backend/` kalau suatu saat
kamu pindah ke hosting yang mendukung PHP — tapi untuk GitHub Pages, folder
itu tidak perlu diupload.

## 1. Setup Firebase (sekali saja, ±5 menit)
1. Buka https://console.firebase.google.com → **Add project** → beri nama
   bebas (mis. `cyber-guardian`) → lanjutkan (Google Analytics boleh dimatikan).
2. Di sidebar kiri: **Build → Realtime Database → Create Database**.
   - Pilih lokasi server (mis. Singapore/asia-southeast1).
   - Mode: pilih **locked mode** (aman dulu, rules diisi manual di langkah 4).
3. Di sidebar kiri: **Build → Authentication → Get started → Sign-in method
   → Email/Password → Enable**.
   Lalu tab **Users → Add user**, isi:
   - Email: email kamu sendiri (bebas, tidak harus email asli aktif)
   - Password: `Sw@W@yJfGfAlQ*k&`  ← password admin yang sudah dibuatkan,
     **segera ganti** lewat menu "forgot password" Firebase Auth kalau mau,
     atau ganti langsung saat Add User.
4. Balik ke **Realtime Database → tab Rules**, hapus isinya, ganti dengan isi
   file `database.rules.json` di project ini, lalu **Publish**.
5. Di sidebar kiri klik ⚙️ **Project settings → General → scroll ke "Your apps"
   → klik ikon `</>` (Web)** → beri nama app → **Register app**.
   Firebase akan menampilkan blok `firebaseConfig = {...}` — copy semua
   nilainya ke file **`firebase-config.js`** di project ini (ganti semua
   tulisan `GANTI...`).

## 2. Upload ke GitHub
```bash
cd htdocs
git init
git add .
git commit -m "Cyber Guardian - Firebase backend"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```
Lalu di repo GitHub: **Settings → Pages → Source: Deploy from branch →
Branch: main / (root) → Save**. Tunggu 1–2 menit, game bisa diakses di
`https://USERNAME.github.io/NAMA-REPO/`.

## 3. Login admin
Buka `https://USERNAME.github.io/NAMA-REPO/admin.html`, login pakai email +
password yang dibuat di langkah 1.3. Dari situ bisa tambah/hapus soal kuis
dan reset leaderboard — tanpa PHP sama sekali.

## Catatan keamanan
- Isi `firebase-config.js` **aman dipublish ke GitHub** — config Firebase
  memang terlihat di browser siapa pun; yang menjaga keamanan data adalah
  `database.rules.json` (pemain biasa cuma bisa *menambah* skor & baca data,
  tidak bisa hapus/ubah punya orang lain; hanya akun admin yang login lewat
  Firebase Auth yang bisa reset leaderboard & ubah soal kuis).
- Kalau `firebase-config.js` belum diisi, game tetap bisa dimainkan (fallback
  otomatis ke penyimpanan lokal di browser), tapi leaderboard/co-op tidak
  akan tersinkron antar pemain sampai Firebase-nya di-setup.
