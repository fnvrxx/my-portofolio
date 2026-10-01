# Deep Dive: Portofolio Vue dari URL sampai animasi Skills

**Dibuat:** 2026-10-01 15:30 WIB  
**Fase:** Redesign Introduction, Experience, Selected Work, dan Contact  
**Fokus:** Memahami kode yang ada dan mengubahnya sendiri

## Overview

Portofolio ini adalah aplikasi Vue 3 yang dibangun dengan Vite. Vue Router memilih halaman berdasarkan URL. Data proyek disimpan sebagai objek JavaScript, sedangkan komponen Vue mengubah data itu menjadi folder kategori, kartu proyek, dan modal detail. CSS global mengatur palet, tata letak, serta animasi. Struktur ini cocok untuk portofolio kecil yang kontennya masih dikelola langsung di repositori.

Alur ketika seseorang membuka sebuah proyek:

```text
/work/
  -> ProjectSection menampilkan tiga folder dari projectSections
  -> klik folder menuju /work/data-analyst, misalnya
  -> RoleWorkPage memilih kategori dan mengirim proyek ke ProjectGrid
  -> klik kartu mengisi selectedProject
  -> ProjectModal menampilkan detail, tautan, dan ikon tools
```

Alur halaman Contact lebih pendek: `/contact` memilih `ContactSection.vue`, lalu CSS menggerakkan dua salinan daftar Skills dari kiri ke kanan. Teks teratas saat ini adalah “Thanks for taking a look at my work.” Panah pada label Skills sudah dihapus.

### Mengapa susunannya seperti ini?

- **Konten terpisah dari tampilan.** Detail proyek berada di `src/data/portfolio.js`, sehingga menambah proyek tidak perlu menyalin markup kartu atau modal.
- **Halaman kecil memakai komponen sendiri.** Introduction, Experience, dan Contact bisa diedit tanpa menyentuh logika proyek.
- **Animasi Skills memakai CSS.** Gerakan tetap berjalan tanpa timer JavaScript. Dua salinan daftar membuat sambungan antar putaran tampak mulus.
- **Palet memakai variabel CSS.** Warna dasar dapat diubah di satu tempat, bukan pada setiap komponen.

## Jalankan dan telusuri alurnya

Di akar proyek, jalankan:

```bash
npm install
npm run dev
```

Buka URL lokal yang dicetak Vite, lalu kunjungi `/`, `/experience`, `/work/`, salah satu halaman `/work/...`, dan `/contact`. `npm run build` membuat keluaran produksi di `dist/`. Edit `src/` dan `public/`, bukan file hasil build di `dist/`.

Repositori ini memiliki instruksi lokal untuk alat terminal Codex: setiap perintah shell yang dijalankan agen diawali `rtk`. Itu aturan alat kerja, bukan bagian dari kode aplikasi yang perlu dipakai pengunjung.

## Code Walkthrough

### 1. Titik masuk dan pemilihan halaman

| File | Bagian penting | Yang terjadi |
| --- | --- | --- |
| [`src/main.js`](../src/main.js) | `createApp(App).use(router)` | Membuat aplikasi, memasang router, mendaftarkan direktif `v-reveal`, lalu memasangnya pada `#app`. |
| [`src/App.vue`](../src/App.vue) | `<SidebarNavigation />` dan `<RouterView />` | Sidebar selalu ada; `RouterView` diganti ketika URL berubah. |
| [`src/router.js`](../src/router.js) | `routes` | Memetakan URL ke komponen halaman. |

Contohnya, rute `/contact` memakai `ContactSection`, sedangkan `/work/data-analyst` memakai `RoleWorkPage` dengan prop `roleId: "data-analyst"`. `RoleWorkPage` membaca prop itu untuk mencari data kategori. Ini adalah **rute eksplisit**: ketika menambah kategori baru, Anda juga perlu menambah rute dan tautan sidebar. Alternatifnya, kategori bisa memakai satu rute dinamis `/work/:roleId`; itu lebih ringkas ketika jumlah kategori bertambah, tetapi perlu penanganan kategori yang tidak dikenal.

`createWebHistory()` membuat URL biasa seperti `/work/`. Saat hosting, server harus mengembalikan `index.html` untuk URL halaman yang dibuka langsung; jika tidak, refresh pada `/work/data-analyst` dapat menghasilkan 404. Baca [panduan history mode Vue Router](https://router.vuejs.org/guide/essentials/history-mode).

`src/main.js` juga mendaftarkan `v-reveal`. Direktif ini memakai `IntersectionObserver` untuk menambahkan kelas `is-visible` saat elemen masuk viewport. Ia langsung menampilkan elemen bila browser tidak mendukung observer atau pengguna memilih pengurangan animasi. Observer dilepas setelah dipakai dan ketika komponen dibongkar. Ini menjaga efek masuk tetap ringan.

### 2. Navigasi dan Introduction

[`src/components/SidebarNavigation.vue`](../src/components/SidebarNavigation.vue) menyimpan keadaan submenu pada `workMenuOpen`. Teks **Selected work** adalah `RouterLink` ke `/work/`; tombol chevron yang terpisah membuka atau menutup kategori. Pemisahan ini penting: satu klik punya satu maksud. `App.vue` menutup sidebar ponsel setelah navigasi dan saat tombol Escape ditekan.

[`src/components/HeroSection.vue`](../src/components/HeroSection.vue) memuat judul, deskripsi, tombol ke Selected Work, unduhan CV, tautan sosial, foto, dan kotak `Built_with = {Laravel, FastAPI, React}`. Foto diimpor dari `src/icon/`, sehingga Vite dapat memprosesnya sebagai aset. CV dan simbol Medium berada di `public/` karena kode memakai URL tetap seperti `/Fajar-Adie-Santosa-CV.pdf` dan `/medium-symbol.svg`.

Untuk mengubah kalimat atau tautan Introduction, edit komponen itu. Untuk mengganti foto, ganti import `portrait` dan pastikan file barunya ada. Teks `Built_with` hanya teks tampilan; ia tidak otomatis mengikuti daftar ikon Skills.

### 3. Experience

[`src/components/ExperienceSection.vue`](../src/components/ExperienceSection.vue) memiliki array `experiences`. Setiap entri berisi `role`, `organization`, `period`, `summary`, dan `detail`. `v-for` menghasilkan empat item linimasa dari array itu. Entri paling atas adalah Software Developer di Nechcode, Februari 2026 hingga sekarang.

```js
const expandedIndex = ref(0);
const toggleExperience = (index) => {
  expandedIndex.value = expandedIndex.value === index ? -1 : index;
};
```

`ref(0)` berarti entri pertama terbuka saat halaman dimuat. Klik entri yang sedang terbuka menghasilkan `-1`, jadi semuanya tertutup. Klik entri lain menyimpan indeks baru. Template memakai `aria-expanded` dan `aria-controls` agar keadaan tersebut juga dapat dibaca teknologi bantu. Kotak **My Work Experience** adalah judul halaman yang berada di atas daftar, dengan lebar desktop 370 px pada `.experience-title-card`.

Untuk menambah pengalaman, tambahkan satu objek ke `experiences`. Tulis hasil yang bisa Anda pertanggungjawabkan; komponen ini tidak memverifikasi fakta atau tanggal secara otomatis. Jika data yang sama nanti dipakai di beberapa halaman, pindahkan array ke `src/data/` agar hanya ada satu sumber.

### 4. Selected Work, dari folder ke modal

[`src/data/portfolio.js`](../src/data/portfolio.js) mengekspor dua hal:

- `projectSections`: kategori dan daftar proyek.
- `toolIcons`: peta nama tool ke URL SVG.

[`src/views/WorkPage.vue`](../src/views/WorkPage.vue) mengirim `projectSections` ke [`ProjectSection.vue`](../src/components/ProjectSection.vue). Komponen itu membuat folder dengan `v-for` dan membentuk tujuan dari `section.id`, misalnya `/work/computer-vision`. Kartu folder adalah tautan, karena aksinya adalah pindah halaman.

Di [`RoleWorkPage.vue`](../src/views/RoleWorkPage.vue), `computed()` mencari kategori yang sesuai `roleId` dan menambahkan nama kategori ke setiap proyek. [`ProjectGrid.vue`](../src/components/ProjectGrid.vue) menampilkan kartu. Kartu adalah tombol karena aksinya membuka detail pada halaman yang sama. Ketika diklik, komponen mengirim event `select`; `RoleWorkPage` menyimpan objek proyek dalam `selectedProject`.

[`ProjectModal.vue`](../src/components/ProjectModal.vue) menerima `selectedProject` sebagai prop. Jika nilainya `null`, modal tidak ada. Jika berisi proyek, modal menampilkan gambar, deskripsi, dan tautan yang memang tersedia:

```vue
<div v-if="project.document || project.certificate || project.url" class="project-links">
  <!-- tautan dokumen, sertifikat, atau situs dibuat hanya bila datanya ada -->
</div>
```

Tautan modal memakai kelas `.project-link`, yang memberi latar biru lembut, border, dan bayangan berbeda dari tombol CV. Proyek **OMITS 17th Website** saat ini tidak memiliki `document`, `certificate`, atau `url`, jadi modalnya memang tidak menampilkan tombol tautan. Tambahkan tujuan yang nyata ke datanya bila kelak tersedia.

Ikon tools disaring lewat `visibleTools()`: hanya nama dalam `project.tools` yang juga ada di `toolIcons` yang menjadi gambar. Karena itu, label **Tools what i used** hanya muncul bila ada setidaknya satu ikon yang dapat ditampilkan. **SPBU Queueing System Analysis** saat ini mempunyai daftar metode, tetapi tidak ada ikon yang cocok dalam `toolIcons`, sehingga bagian ikon tidak muncul. Jika Anda ingin semua metode terlihat, tambahkan representasi yang tepat atau tampilkan nama teks sebagai fallback.

Modal juga mengurus keyboard: tombol close mendapat fokus saat dibuka, Tab tetap berada di dalam modal, Escape menutupnya, dan fokus dikembalikan ke elemen yang tadi membuka modal. Saat modal terbuka, kelas `modal-open` pada `body` menghentikan gulir halaman belakang. Ini adalah perilaku modal, bukan sekadar dekorasi.

### 5. Contact dan marquee Skills terbaru

[`src/components/ContactSection.vue`](../src/components/ContactSection.vue) berisi ucapan terima kasih, ajakan berkontak, tautan email, dan strip Skills. Ucapan “Thanks for taking a look at my work.” sengaja singkat. Ia menyampaikan terima kasih tanpa klaim atau kalimat promosi yang tidak didukung konten.

```js
import { toolIcons } from "../data/portfolio";
const skills = ["Laravel", "Python", "React", "Next.js", "Pandas", "Figma", "OpenCV"];
```

`skills` memilih tool yang ditampilkan. `toolIcons[skill]` mencari SVG yang sesuai. Ini **daftar pilihan**, bukan semua entri dalam `toolIcons`: menambah ikon ke peta belum otomatis menambahkannya ke strip.

Template mencetak daftar dua kali dengan `v-for="copy in 2"`. Salinan kedua memakai `aria-hidden="true"`, sehingga pembaca layar tidak membaca daftar yang sama dua kali. CSS terkait ada di [`src/styles.css`](../src/styles.css):

```css
.skills-track {
  animation: skills-move-right 30s linear infinite;
}

@keyframes skills-move-right {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
```

Setiap daftar memiliki lebar yang sama. Jika lebar satu daftar adalah `W`, lebar track dua daftar adalah `2W`. `-50%` pada track berarti bergeser `-W`. Awal animasi menempatkan salinan kedua di area tampak; akhir animasi menempatkan salinan pertama pada posisi visual yang sama. Ketika animasi mengulang, isinya cocok dan tidak tampak melompat. Nilai transform bertambah dari `-W` ke `0`, jadi gambar bergerak **ke kanan**. `infinite` mengulang tanpa batas saat preferensi gerak normal aktif, termasuk ketika kursor melintas di atasnya.

Saat viewport Skills mendapat fokus keyboard, animasi berhenti agar isinya lebih mudah dibaca. Aturan `@media (prefers-reduced-motion: reduce)` mematikan animasi, menyembunyikan salinan kedua, dan mengizinkan gulir horizontal. Di layar 800 px ke bawah, label Skills pindah dari kolom kiri menjadi baris atas. Tidak ada ikon panah pada label tersebut.

Peta baris untuk membaca implementasi Contact secara berurutan:

| Baris | Mengapa ada |
| --- | --- |
| [`ContactSection.vue:1-5`](../src/components/ContactSection.vue#L1-L5) | Mengimpor komponen ikon email dan peta SVG, lalu memilih tujuh skill yang tampil. |
| [`ContactSection.vue:9-16`](../src/components/ContactSection.vue#L9-L16) | Menulis ucapan, ajakan bicara, dan tujuan `mailto:`. |
| [`ContactSection.vue:17-30`](../src/components/ContactSection.vue#L17-L30) | Membuat label Skills dan dua daftar identik; salinan kedua disembunyikan dari pembaca layar. |
| [`styles.css:1098-1124`](../src/styles.css#L1098-L1124) | Menentukan kolom label dan area yang memangkas konten bergerak. |
| [`styles.css:1125-1171`](../src/styles.css#L1125-L1171) | Mengatur durasi, arah, pengulangan, serta jeda saat fokus keyboard. |
| [`styles.css:1572-1599`](../src/styles.css#L1572-L1599) | Menyediakan versi tanpa animasi untuk preferensi reduced motion. |

### 6. Aset dan CSS

Variabel `--paper`, `--soft`, `--accent`, dan `--ink` didefinisikan di bagian awal [`src/styles.css`](../src/styles.css). Ubah variabel itu jika ingin mengubah palet seluruh situs. Media query `max-width: 800px` menangani perpindahan dari sidebar desktop ke header ponsel dan susunan Contact; `max-width: 480px` memperkecil ruang dan teks untuk ponsel sempit.

Gambar proyek di `src/thumb-porto/` dan PDF di `src/doc/` dipanggil dengan `new URL(..., import.meta.url)` dari `portfolio.js`. SVG dalam `public/tool-icons/` memakai URL tetap `/tool-icons/nama.svg`. Vite memproses aset yang diimpor dari `src/`, sedangkan isi `public/` disalin dengan nama yang tetap. Lihat [panduan aset Vite](https://vite.dev/guide/assets.html).

## Konsep yang perlu dipahami

| Konsep | Apa dan kapan berguna | Alternatif serta konsekuensinya |
| --- | --- | --- |
| Komponen Vue `<script setup>` | Menyatukan logika dan template satu bagian UI. Variabel tingkat atas langsung tersedia di template. | Satu komponen besar lebih sedikit file, tetapi perubahan kecil lebih sulit dilacak. |
| `ref` dan `computed` | `ref` menyimpan keadaan yang berubah, seperti proyek modal terpilih. `computed` menghitung turunan dari prop, seperti proyek dalam satu kategori. | Menghitung manual pada setiap event lebih mudah tidak sinkron. |
| Props dan events | Induk memberi data ke anak lewat prop; anak melaporkan aksi dengan `emit`. Alur data tetap mudah diikuti. | Store global masuk akal jika banyak halaman perlu keadaan bersama, tetapi belum diperlukan untuk modal ini. |
| Data-driven rendering | Satu array membuat banyak folder atau kartu lewat `v-for`. Cocok untuk konten dengan struktur berulang. | Menulis kartu satu per satu membuat perubahan format perlu diulang. |
| CSS animation | Browser menggerakkan strip tanpa state Vue yang terus berubah. Cocok untuk gerakan presentasional sederhana. | `requestAnimationFrame` memberi kontrol interaksi lebih rinci, tetapi menambah kode dan pekerjaan pemeliharaan. |
| Reduced motion | Pengguna yang meminta lebih sedikit gerakan mendapat daftar statis yang bisa digulir. | Memaksa animasi pada semua orang dapat membuat halaman sulit dipakai. |

## Related Code di proyek ini

| File | Hubungan dengan perubahan terbaru |
| --- | --- |
| [`src/components/ContactSection.vue`](../src/components/ContactSection.vue) | Menentukan teks dan urutan Skills. |
| [`src/data/portfolio.js`](../src/data/portfolio.js) | Menyediakan URL ikon yang dipakai Contact dan detail proyek. |
| [`public/tool-icons/`](../public/tool-icons/README.md) | Menyimpan SVG dan keterangan asal aset ikon. |
| [`src/styles.css`](../src/styles.css) | Mengatur palet, ukuran strip, arah animasi, breakpoint, dan reduced motion. |
| [`src/router.js`](../src/router.js) | Memetakan `/contact` ke komponen Contact. |

## Resep pengembangan

### Tambah skill ke strip Contact

1. Pastikan nama tool ada sebagai key di `toolIcons` pada `src/data/portfolio.js`.
2. Jika belum ada, simpan SVG yang sah di `public/tool-icons/`, lalu tambahkan path pada `toolIcons`.
3. Tambahkan key yang sama persis ke array `skills` di `ContactSection.vue`.
4. Jalankan halaman Contact. Pastikan ikon termuat, nama tidak terpotong, dan deret tetap menyambung mulus. Jika daftar terasa terlalu cepat setelah bertambah panjang, ubah durasi `30s` pada `.skills-track`.

### Tambah proyek

1. Taruh gambar di `src/thumb-porto/`. Taruh PDF di `src/doc/` bila ada.
2. Tambahkan objek ke `projects` pada kategori yang tepat di `src/data/portfolio.js`. Isi `title`, `type`, `year`, `image`, `description`, dan `tools`.
3. Isi `document`, `certificate`, atau `url` hanya bila tujuan tersebut ada. Sesuaikan `documentLabel` atau `urlLabel` bila teks default kurang tepat.
4. Periksa kartu dan modal di desktop serta ponsel. Pastikan tautan membuka tujuan yang benar dan ikon tools cocok dengan nama pada `toolIcons`.

### Tambah kategori Selected Work

1. Tambahkan objek kategori baru dengan `id`, `title`, `description`, dan `projects` di `projectSections`.
2. Tambahkan rute `/work/id-baru` di `src/router.js` yang mengirim `roleId` yang sama ke `RoleWorkPage`.
3. Tambahkan kategori itu ke `workNavigation` di `SidebarNavigation.vue`.
4. Cek `/work/` dan klik folder baru. Pastikan folder, rute, judul kategori, dan proyek mengacu pada ID yang sama.

### Ubah Experience atau ucapan Contact

- Tambahkan atau ubah objek di `experiences` pada `ExperienceSection.vue`.
- Edit `.contact-intro` di `ContactSection.vue` untuk ucapan dan `.contact-inner h2` untuk ajakan kontak.
- Edit CSS di `src/styles.css` hanya bila hierarki visual atau ukuran memang perlu berubah. Konten dan tampilan memiliki tanggung jawab berbeda.

## Pemeriksaan sebelum menerbitkan

```bash
npm run build
```

Lalu cek alur ini di browser:

1. Buka `/work/` dan klik setiap folder.
2. Buka satu proyek dengan tautan PDF, satu dengan URL luar, dan satu tanpa tautan. Cek tombol yang muncul.
3. Tutup modal dengan tombol close dan Escape. Cek fokus kembali ke kartu.
4. Buka `/contact` pada desktop dan ponsel. Pastikan Skills bergerak kiri ke kanan terus-menerus, termasuk saat hover, tanpa scrollbar halaman horizontal.
5. Aktifkan preferensi **Reduce motion**. Pastikan Skills menjadi daftar statis yang dapat digulir.
6. Buka sebuah URL dalam langsung setelah refresh, misalnya `/work/data-analyst`, pada hosting tujuan.

Pada pemeriksaan implementasi ini, build Vite berhasil. Pemeriksaan browser pada lebar 1440, 768, dan 375 px menunjukkan tujuh ikon Skills termuat, bergerak ke kanan, terus bergerak saat hover, berhenti pada preferensi reduced motion, dan tidak menyebabkan overflow horizontal. Pemeriksaan ini membuktikan perilaku lokal, bukan konfigurasi hosting produksi.

## Sumber belajar terpilih

- [Vue Single-File Components](https://vuejs.org/guide/scaling-up/sfc): struktur file `.vue` dan alasan memisahkan komponen.
- [Vue `<script setup>`](https://vuejs.org/api/sfc-script-setup.html): mengapa import, props, dan variabel bisa dipakai langsung di template.
- [Vue reactivity fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html): bagaimana `ref` menyimpan keadaan yang memicu pembaruan tampilan.
- [Vue computed properties](https://vuejs.org/guide/essentials/computed): memahami data turunan di `RoleWorkPage`.
- [Vue Router Getting Started](https://router.vuejs.org/guide/): hubungan `RouterLink`, `RouterView`, dan plugin router.
- [Vue Router route matching](https://router.vuejs.org/guide/essentials/route-matching-syntax): perilaku `/work` dan `/work/`, serta rute dinamis jika kategori bertambah.
- [Vite static assets](https://vite.dev/guide/assets.html): beda aset dari `src/` dan `public/`.
- [MDN CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using): keyframes, durasi, dan pengulangan `infinite`.
- [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion): alasan dan cara menyediakan versi tanpa animasi.
- [MDN IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/observe): dasar efek `v-reveal`.

## Latihan berikutnya

1. Tambahkan satu skill yang memang dipakai pada proyek, lalu jelaskan mengapa key pada `toolIcons` dan nama pada `skills` harus identik.
2. Tambahkan satu proyek dengan gambar dan tautan yang nyata. Prediksi dulu bagian mana yang berubah di folder, kartu, dan modal.
3. Coba ubah durasi animasi dari `30s` menjadi `45s`. Ukur apakah kecepatan masih nyaman pada lebar ponsel.
4. Jika kategori bertambah banyak, coba ganti tiga rute eksplisit dengan `/work/:roleId` dan sediakan tampilan untuk ID yang tidak ditemukan.

Dokumen ini menjelaskan keadaan kode pada 2026-10-01. Saat Anda mengubah struktur data atau rute, perbarui contoh dan resep di sini agar tetap sesuai aplikasi.
