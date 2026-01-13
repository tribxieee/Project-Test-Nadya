# Project-Test-Nadya: Admin Page & E-Commerce Demo

## Deskripsi
Project ini adalah sistem sederhana admin page untuk toko, memungkinkan:
- Menampilkan daftar produk
- Mengatur stock produk
- Membuat pembelian
- Membatalkan pembelian

Teknologi yang digunakan:
- Node.js + Express
- EJS (templating engine)
- MySQL (database)
- CSS sederhana untuk UI

---

## Fitur
1. **Products Page**
   - List semua produk
   - Menampilkan harga dan stock
   - Tombol "Buy" untuk melakukan pembelian

2. **Purchase Form**
   - Input jumlah pembelian
   - Submit akan mengurangi stock otomatis
   - Pembelian tersimpan di database

3. **Purchase History**
   - Menampilkan daftar pembelian
   - Status ACTIVE / CANCELLED
   - Tombol Cancel untuk membatalkan pembelian
   - Stock otomatis kembali jika dibatalkan

---

## Setup
1. Install dependencies:

```bash
npm install
