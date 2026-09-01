import type { Dict } from "./en";

const id: Dict = {
  appName: "Time With God",
  tagline: "Ruang tenang untuk bersama Tuhan.",
  philosophy: "Kamu membawa hatimu. Kami membantumu memberi ruang bagi Tuhan.",

  common: {
    begin: "Mulai",
    continueBtn: "Lanjut",
    back: "Kembali",
    skip: "Lewati",
    customize: "Sesuaikan",
    save: "Simpan",
    saved: "Tersimpan",
    finish: "Selesai",
    pause: "Jeda",
    resume: "Lanjutkan",
    optional: "Opsional",
    minutes: "menit",
    minuteShort: "mnt",
    on: "Nyala",
    off: "Mati",
    close: "Tutup",
  },

  nav: {
    today: "Hari Ini",
    journal: "Jurnal",
    moments: "Momen",
    settings: "Pengaturan",
  },

  welcome: {
    subtitle: "Kamu tidak butuh saat yang sempurna. Mulai saja.",
    haveAccount: "Saya sudah punya akun",
  },

  time: {
    question: "Berapa lama kamu ingin bersama Tuhan hari ini?",
    help: "Kami bantu kamu memanfaatkan waktu yang kamu punya.",
    unit: "menit",
  },

  intention: {
    question: "Bagaimana kamu datang kepada Tuhan hari ini?",
    help: "Kamu boleh memilih lebih dari satu.",
  },

  suggest: {
    timeLine: "Kamu punya {n} menit.",
    intentionIntro: "Hari ini, kamu datang dengan:",
    oneWay: "Inilah salah satu cara untuk mengisi waktumu bersama Tuhan hari ini.",
    heading: "Perjalanan Hari Ini",
    begin: "Mulai Perjalanan",
  },

  customize: {
    title: "Sesuaikan perjalananmu",
    help: "Atur waktu untuk setiap bagian sesukamu.",
    total: "Total",
    save: "Simpan & Mulai",
    reset: "Kembali ke saran",
  },

  sections: {
    "be-still": "Diam",
    scripture: "Firman",
    worship: "Penyembahan",
    reflection: "Refleksi",
    gratitude: "Syukur",
    prayer: "Doa",
    closing: "Penutup",
  },

  journey: {
    letsBegin: "Mari mulai",
    noRush: "Nikmati waktumu. Tidak perlu terburu-buru.",
  },

  beStill: {
    lines: [
      "Tarik napas dalam-dalam.",
      "Lepaskan beban yang kamu bawa.",
      "Kamu ada di hadirat Tuhan.",
    ],
  },

  scripture: {
    take: "Nikmati waktumu.",
    readFull: "Baca satu pasal penuh",
    prompt: "Apa yang menonjol bagimu?",
    placeholder: "Tuliskan pikiranmu\u2026",
    translationNote:
      "Ditampilkan dalam {translation}. Ketuk \u201cBaca satu pasal penuh\u201d untuk membaca bagian ini dalam terjemahan lain.",
  },

  worship: {
    line: "Gunakan saat ini untuk memuji Tuhan.",
    songLabel: "Sebuah lagu untuk saat ini",
    adjustTime: "Atur waktu",
    unavailable:
      "Audio belum tersedia saat ini. Kamu tetap bisa memakai waktu ini untuk menyembah dengan caramu sendiri.",
  },

  reflection: {
    intro: "Luangkan waktu untuk merenungkan apa yang telah kamu baca.",
    consider: "Kamu boleh merenungkan:",
    placeholder: "Tuliskan refleksimu\u2026",
  },

  gratitude: {
    question: "Apa yang kamu syukuri hari ini?",
    consider: "Kamu boleh mensyukuri kepada Tuhan untuk:",
    placeholder: "Tuliskan rasa syukurmu\u2026",
  },

  prayer: {
    intro: "Luangkan waktu untuk berbicara kepada Tuhan dengan kata-katamu sendiri.",
    consider: "Kamu boleh membawa hal-hal ini ke hadapan-Nya:",
    placeholder: "Tuliskan doamu\u2026",
  },

  closing: {
    intro: "Mari menutup waktu ini bersama dengan sebuah doa sederhana.",
    blessingLabel: "Sebuah berkat",
    amen: "Amin",
  },

  complete: {
    title: "Waktu yang berharga",
    spent: "Kamu telah menghabiskan {n} menit bersama Tuhan hari ini.",
    wellDone: "Kerja yang baik.",
    viewSummary: "Lihat Ringkasan",
  },

  summary: {
    title: "Ringkasan Hari Ini",
    yourNote: "Catatanmu untuk hari ini",
    notePlaceholder: "Tuliskan catatan untuk mengenang hari ini\u2026",
    saveNote: "Simpan Catatan",
    scripture: "Firman",
    thoughts: "Pikiranku",
    reflection: "Refleksiku",
    gratitude: "Syukurku",
    prayer: "Doaku",
    empty: "\u2014",
    done: "Selesai",
  },

  today: {
    heading: "Hari Ini",
    greeting: "Ruang tenang untuk bersama Tuhan.",
    start: "Mulai waktu bersama Tuhan",
    continueSession: "Lanjutkan dari yang tertunda",
    recent: "Momen terakhir",
    viewAll: "Lihat semua",
    none: "Kamu belum meluangkan waktu hari ini. Kapan pun kamu siap.",
  },

  moments: {
    title: "Momen bersama Tuhan",
    subtitle: "Catatan lembut atas waktumu \u2014 bukan rekor untuk dijaga.",
    empty: "Momen kebersamaanmu dengan Tuhan akan muncul di sini.",
  },

  journal: {
    title: "Jurnal",
    subtitle: "Ruang pribadi untuk pikiran, doa, dan refleksimu.",
    all: "Semua",
    notes: "Catatan",
    prayers: "Doa",
    reflections: "Refleksi",
    empty: "Refleksi dan doamu akan muncul di sini.",
    private: "Hanya kamu yang bisa melihat apa yang kamu tulis di sini.",
  },

  settings: {
    title: "Pengaturan",
    account: "Akun",
    guest: "Kamu memakai Time With God sebagai tamu.",
    guestNote: "Catatanmu disimpan di perangkat ini.",
    signedInAs: "Masuk sebagai {email}",
    signIn: "Masuk",
    signOut: "Keluar",
    preferences: "Preferensi",
    language: "Bahasa",
    musicLanguage: "Bahasa musik",
    musicSameAsApp: "Sama dengan bahasa aplikasi",
    defaultDuration: "Durasi bawaan",
    backgroundMusic: "Musik latar",
    reminders: "Pengingat lembut",
    reminderNote: "Ajakan halus, bukan rasa bersalah.",
    about: "Tentang",
    aboutTitle: "Tentang Time With God",
    aboutText:
      "Time With God menawarkan satu kemungkinan cara untuk meluangkan waktu pribadi bersama Tuhan, disesuaikan dengan waktu dan niat yang kamu bawa. Ini bukan gereja, bukan pendeta, dan bukan pengganti Firman maupun persekutuan \u2014 hanya ruang tenang untuk membantumu memberi ruang. Kamu membawa hatimu. Kami membantumu memberi ruang bagi Tuhan.",
    privacy: "Privasi",
    privacyTitle: "Privasimu",
    privacyText:
      "Refleksi, doa, dan catatanmu bersifat pribadi. Semuanya tidak pernah dibagikan, tidak pernah dipublikasikan, dan tidak pernah dipakai untuk memprofilkanmu. Tidak ada linimasa, tidak ada suka, dan tidak ada rekor di sini.",
    languageLabels: {
      en: "English",
      id: "Bahasa Indonesia",
    },
    musicOptions: {
      same: "Sama dengan bahasa aplikasi",
      en: "Inggris",
      id: "Indonesia",
    },
  },
};

export default id;
