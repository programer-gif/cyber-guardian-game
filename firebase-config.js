const firebaseConfig = {
  apiKey: "AIzaSyBFNat3_W6bQB8nRbWQseYQG4DIBPMcuvg",
  authDomain: "cyber-guardian-38145.firebaseapp.com",
  databaseURL: "https://cyber-guardian-38145-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cyber-guardian-38145",
  storageBucket: "cyber-guardian-38145.firebasestorage.app",
  messagingSenderId: "84351314197",
  appId: "1:84351314197:web:ae4d0af03c2e4f2772a11c"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (e) {
  console.warn('Firebase belum dikonfigurasi — isi firebase-config.js. Game tetap jalan pakai localStorage sementara.', e);
}