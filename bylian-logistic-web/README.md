# 🚚 Bylian Logistic - Corporate Web Portal & Administrative ERP

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js Badge" />
  <img src="https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react&logoColor=white" alt="React Badge" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge" />
  <img src="https://img.shields.io/badge/Tailwind--CSS-v4-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind Badge" />
  <img src="https://img.shields.io/badge/Framer--Motion-12.4-ff69b4?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion Badge" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2C8EBB?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma Badge" />
</div>

---

**Bylian Logistic** adalah portal digital korporat dan platform ERP (*Enterprise Resource Planning*) logistik terintegrasi berskala produksi. Dirancang khusus untuk industri logistik modern, aplikasi ini menggabungkan profil web publik yang estetik dengan panel kontrol administratif yang tangguh untuk memantau pengiriman barang, mengelola penawaran harga (*quotes*), memproses pesan masuk, memodifikasi konten pemasaran via CMS terintegrasi, serta melacak audit keamanan sistem secara real-time.

---

## 🌟 Fitur Utama & Inovasi Teknologi

### 1. Hybrid Server-Side Database Persistence (Fase 1)
Sistem menggunakan arsitektur basis data hybrid di mana data dimuat secara asinkron langsung dari server saat pertama kali dimuat menggunakan **Next.js Server Actions**, dipadukan dengan *Optimistic UI* pada client-side (`localStorage`) untuk performa instan tanpa jeda pemrosesan. Data di server disimpan secara persisten di file lokal `src/data/db-store.json` sehingga tidak hilang meskipun server di-restart atau browser di-refresh.

### 2. Role-Based Access Control - RBAC (Fase 2)
Panel admin dilindungi oleh sistem otorisasi berlapis berbasis peran staf:
* **Super Admin & Admin**: Akses mutlak ke seluruh modul dan konfigurasi sistem.
* **Shipment Operator**: Hanya diizinkan memperbarui status kargo pengiriman.
* **Customer Support**: Khusus melayani peninjauan formulir *quotes* (penawaran) dan pesan pelanggan.
* **Marketing & Content Editor**: Mengelola pembaruan CMS (layanan, studi kasus, blog, FAQ, dan langganan buletin).
* **Proteksi URL Manual**: Sistem secara aktif menghadang peretasan URL dengan mengarahkan pengguna yang tidak sah kembali ke Dashboard secara otomatis.

### 3. Live Cargo Transit Route Map (Fase 3)
Halaman pelacakan kargo `/track-shipment` dilengkapi dengan **Peta Rute Vektor Interaktif (SVG)** yang menampilkan kurva jalur pengiriman (*glowing bezier curve*) antara asal dan tujuan, lengkap dengan efek sonar radar berdenyut (*pulsing sonar*) dan ikon armada pengiriman (truk/kapal/kontainer) yang bergerak animatif sesuai koordinat riil pengiriman.

### 4. Instant Pricing Estimation Engine (Fase 4)
Formulir `/request-quote` mengadopsi tata letak dua kolom interaktif. Ketika calon pelanggan mengisi variabel pengiriman (layanan, berat kargo, perlakuan khusus kargo, serta rute kota asal dan tujuan), modul kalkulator terapung di sisi kanan akan **secara dinamis menghitung estimasi biaya instan** dalam format **Rupiah (IDR)** yang presisi.

### 5. Outbound Communication Notification Gateway (Fase 5)
Sistem dilengkapi dengan mock API terstandarisasi untuk **WhatsApp Gateway** dan **Premium HTML Email Service** yang terpicu secara otomatis pada saat pelanggan mengirimkan *quotes* baru (konfirmasi pesanan) maupun ketika staf memperbarui status checkpoint kargo. Semua aktivitas pengiriman notifikasi ini dicatat secara aman dalam log audit keamanan.

### 6. Dashboard Analytics Modern (Fase 6)
Visualisasi performa bisnis di dashboard menggunakan grafik kurva bersinar SVG Bezier Path untuk melacak grafik tren pengajuan quotes mingguan, dipadukan dengan **Circular Segment Donut Chart** geometris presisi untuk menampilkan porsi alokasi status kargo aktif (*delivered*, *in-transit*, *delayed*).

### 7. Google SEO Rich Snippets (Fase 7)
Website dilengkapi dengan injeksi skema metadata terstruktur **JSON-LD (LogisticsBusiness)** ke dalam tag `<head>` global untuk memastikan profil bisnis, rute, kontak, dan layanan terindeks secara optimal di peringkat teratas hasil pencarian Google.

### 8. Isolated Multi-Port Access Control (Fase Bonus)
Mendukung pemisahan akses portal dengan Next.js Middleware:
* **Port 3344**: Hanya menyajikan Web Publik. Rute administratif `/admin` akan diblokir dengan halaman respons *Access Denied* (403).
* **Port 4455**: Khusus menyajikan Terminal Admin. Akses ke halaman luar akan otomatis dialihkan ke portal masuk admin.

---

## 🛠️ Tech Stack & Dependensi

* **Framework Inti**: [Next.js 16.2.6](https://nextjs.org/) (App Router, Turbopack Engine)
* **Library UI**: [React 19.2.4](https://react.dev/) & [React DOM](https://reactjs.org/)
* **Bahasa Pemrograman**: [TypeScript 5.x](https://www.typescriptlang.org/)
* **Desain & Styling**: [TailwindCSS v4](https://tailwindcss.com/) & [Clsx / Tailwind-Merge](https://github.com/dcastil/tailwind-merge)
* **Animasi Interaktif**: [Framer Motion 12.4](https://www.framer.com/motion/)
* **Iconography**: [Lucide React 1.16](https://lucide.dev/)
* **Validasi & Formulir**: [Zod 4.4](https://zod.dev/) & [React Hook Form 7.76](https://react-hook-form.com/)
* **Database ORM (Referensi)**: [Prisma Client 5.x](https://www.prisma.io/)

---

## 📂 Struktur Direktori Proyek

Berikut adalah peta struktur seluruh file dan folder penting di dalam proyek **Bylian Logistic**:

```text
bylian-logistic-web/
├── public/                 # File aset statis publik (gambar, favicon, logo)
├── src/
│   ├── app/                # Next.js App Router (Halaman, Rute, & Middleware)
│   │   ├── about/          # Halaman profil perusahaan (About Us)
│   │   ├── admin/          # Seluruh modul ERP Panel Admin
│   │   │   ├── blogs/      # CMS Manajemen Artikel Berita
│   │   │   ├── dashboard/  # Tampilan Utama Dashboard & Analytics SVG
│   │   │   ├── faq/        # CMS Manajemen FAQ Akordion
│   │   │   ├── login/      # Portal Autentikasi Gating Keamanan Staf
│   │   │   ├── messages/   # Modul Inbox Surat Pelanggan
│   │   │   ├── projects/   # CMS Manajemen Studi Kasus Proyek
│   │   │   ├── quotes/     # Modul Peninjauan Penawaran Harga Kargo
│   │   │   ├── services/   # CMS Manajemen Layanan Logistik
│   │   │   ├── settings/   # Konfigurasi Sistem Perusahaan & Log Audit
│   │   │   ├── shipments/  # Manajemen Checkpoint Pengiriman Kargo
│   │   │   ├── subscribers/# Database Email Pelanggan Buletin
│   │   │   ├── users/      # Manajemen Akun Staf & RBAC
│   │   │   ├── layout.tsx  # Tata Letak Dashboard Admin (RBAC Menu & Route Gate)
│   │   │   └── page.tsx    # Halaman Indeks Admin (Auto-session Redirect)
│   │   ├── blog/           # Halaman publik daftar artikel & dinamis [slug]
│   │   ├── contact/        # Formulir kontak masuk pelanggan
│   │   ├── faq/            # Halaman daftar FAQ publik bersensor pencarian
│   │   ├── privacy-policy/ # Dokumen hukum kebijakan privasi
│   │   ├── projects/       # Daftar studi kasus logistik publik & dinamis [slug]
│   │   ├── request-quote/  # Formulir kalkulator estimasi harga Rupiah (IDR)
│   │   ├── services/       # Katalog layanan logistik & detail dinamis [slug]
│   │   ├── terms-and-conditions/ # Dokumen hukum syarat & ketentuan
│   │   ├── track-shipment/ # Pelacakan kargo live dengan Peta Visual SVG
│   │   ├── globals.css     # CSS Global (TailwindCSS v4 Core Directive & Font Variables)
│   │   ├── layout.tsx      # Kerangka utama global HTML (Injeksi JSON-LD & Font)
│   │   └── providers.tsx   # Pembungkus Provider (AdminStateProvider)
│   ├── components/         # Komponen Modular React Terbagi
│   │   ├── home/           # Seksi khusus Homepage (Hero, Why Choose Us, dll.)
│   │   ├── layout/         # Komponen global tata letak (Navbar, Footer, TopBar)
│   │   ├── shared/         # Komponen berbagi (PageHeader, JSON-LD Schema Markup)
│   │   └── ui/             # Komponen visual UI terkustomisasi (Accordion, Input, Button, Card)
│   ├── context/            # React Context State Management
│   │   └── AdminStateContext.tsx # Pengelola state internal, mutasi data, & sinkronisasi database
│   ├── data/               # Mock data awal logistik korporat (Layanan, FAQ, Blog, Proyek)
│   ├── lib/                # Kode pustaka, utilitas, & Server Actions
│   │   ├── db-store.ts     # Mesin database lokal berbasis file JSON server-side ("use server")
│   │   ├── notification.ts # Gateway notifikasi otomatis (WhatsApp API & Email HTML)
│   │   └── utils.ts        # Utilitas helper CSS merging (Tailwind Merge / Clsx)
│   └── middleware.ts       # Next.js Port Isolation & Routing Gating Controller
├── eslint.config.mjs       # Konfigurasi analisis kualitas kode ESLint
├── next.config.ts          # Konfigurasi Next.js Compiler & Turbopack
├── package.json            # Daftar dependensi modul & pintasan perintah NPM
├── postcss.config.mjs      # Konfigurasi pemrosesan CSS PostCSS
├── tsconfig.json           # Konfigurasi kompiler aturan TypeScript
└── schema.prisma           # [Referensi Scratch] Skema Basis Data Relasional ORM Prisma
```

---

## 🚀 Panduan Memulai & Instalasi Lokal

### 1. Prasyarat Sistem
Pastikan komputer Anda sudah terinstal **Node.js** (versi 18.x atau yang lebih baru) dan **npm** (versi 9.x atau yang lebih baru).

### 2. Kloning Repositori & Instalasi
Masuk ke dalam folder proyek dan instal seluruh modul dependensi yang dibutuhkan:
```bash
cd bylian-logistic-web
npm install
```

### 3. Jalankan Server Pengembangan

Anda memiliki tiga opsi skrip untuk menyalakan server lokal:

#### Opsi A: Server Terpadu Unified Server (Port 3000) — *Sangat Direkomendasikan*
Menjalankan satu server dev terpadu untuk mengakses halaman publik dan dashboard admin sekaligus tanpa konflik compiler:
```bash
npm run dev
```
* **Web Publik**: Buka [http://localhost:3000](http://localhost:3000)
* **Panel Admin**: Buka [http://localhost:3000/admin](http://localhost:3000/admin)

#### Opsi B: Web Publik Saja (Port 3344)
Menjalankan server yang **khusus melayani web publik**. Akses ke `/admin/*` akan diblokir dengan status 403:
```bash
npm run dev:web
```
* Buka: [http://localhost:3344](http://localhost:3344)

#### Opsi C: Terminal Admin Saja (Port 4455)
Menjalankan server yang **khusus melayani admin**. Akses ke halaman luar akan otomatis dialihkan ke halaman login admin:
```bash
npm run dev:admin
```
* Buka: [http://localhost:4455/admin](http://localhost:4455/admin)

---

## 🛠️ Penyelesaian Masalah Port yang Terkunci (Windows)

Jika Anda mendapatkan kesalahan **`ERR_CONNECTION_REFUSED`**, **`EADDRINUSE`**, atau *"Situs ini tidak dapat dijangkau"*, itu berarti ada proses Node.js yang membeku di latar belakang sistem Anda dan mengunci port jaringan.

Untuk mematikan seluruh proses Node.js yang membeku dan membebaskan port jaringan di Windows, jalankan perintah berikut pada terminal Anda:
```powershell
taskkill /F /IM node.exe
```
Setelah port terbebaskan, jalankan kembali perintah `npm run dev`!

---

## 💾 Panduan Migrasi ke Cloud Database (Supabase / PostgreSQL)

Proyek ini telah dilengkapi dengan berkas [schema.prisma](file:///C:/Users/Abyma/.gemini/antigravity-ide/brain/25ece8cd-162d-4c2f-ae4c-595e43818c95/scratch/schema.prisma) relasional yang lengkap. Jika Anda ingin beralih dari file JSON lokal ke database cloud yang permanen untuk skala produksi:

1. Buat database PostgreSQL gratis di **[Supabase](https://supabase.com)**.
2. Buat file `.env` di folder root `bylian-logistic-web/` dan isi dengan URL database Anda:
   ```env
   DATABASE_URL="postgresql://postgres:password@db-host:5432/postgres"
   ```
3. Sinkronisasikan skema Prisma ke database cloud Anda secara otomatis dengan satu perintah:
   ```bash
   npx prisma db push
   ```
4. Ubah pemanggilan `fetchAllDataAction` dan `syncDatabaseAction` di `src/lib/db-store.ts` untuk memanggil database Prisma Client secara langsung.

---

<div align="center">
  <p><strong>Bylian Logistic - Transport Services</strong></p>
  <p><em>"Reliable Logistics & Integrated Digital ERP Solutions for Global Freight."</em></p>
</div>
