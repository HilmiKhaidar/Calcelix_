# Calcetix

**Beautiful calculator made simple - by Lunetix**

*Precision in every calculation*

## 🎯 About

Calcetix adalah aplikasi kalkulator Android yang mengikuti brand guidelines Lunotes dari Lunetix. Aplikasi ini menggabungkan desain yang indah dengan fungsionalitas yang powerful untuk memberikan pengalaman menghitung yang menyenangkan dalam format full-screen.

## ✨ Features

### 📱 Android Experience
- **Full Screen Design**: Optimized untuk penggunaan Android dengan layout full-screen
- **Splash Screen**: Animasi pembuka yang indah seperti Lunotes
- **PWA Support**: Dapat diinstall sebagai aplikasi Android native
- **Haptic Feedback**: Getaran halus saat menekan tombol (Android)
- **Orientation Support**: Mendukung portrait dan landscape mode

### 🎨 Design & UX
- **Beautiful Design**: Mengikuti brand guidelines Lunotes dengan warna kuning-orange yang khas
- **Dark Theme**: Interface gelap yang nyaman untuk mata
- **Smooth Animations**: Animasi yang halus dan menyenangkan
- **Touch Optimized**: Tombol besar dan mudah ditekan untuk layar sentuh

### ⚡ Functionality
- **Keyboard Support**: Mendukung input keyboard untuk penggunaan yang lebih cepat
- **Error Handling**: Penanganan error yang user-friendly
- **Precision**: Kalkulasi akurat dengan penanganan floating point yang baik
- **Accessibility**: Desain yang accessible untuk semua pengguna

### 🧮 Advanced Features
- **History Panel**: Riwayat perhitungan dengan penyimpanan lokal
- **Scientific Mode**: Fungsi trigonometri, logaritma, akar kuadrat, faktorial
- **Memory Functions**: M+, M-, MR, MC untuk menyimpan nilai
- **Copy/Paste**: Copy hasil ke clipboard dengan satu tap
- **Sound Effects**: Feedback audio untuk setiap interaksi (dapat dimatikan)
- **Theme Switcher**: Mode gelap dan terang
- **Gesture Support**: Swipe untuk navigasi (kanan: history, atas: scientific mode)
- **Constants**: π (pi) dan e (euler) built-in

## 🎨 Brand Guidelines

Calcetix mengikuti brand guidelines Lunotes:

### Colors
- **Primary**: Brand Yellow (#FBBF24) dan Brand Orange (#F59E0B)
- **Neutral**: Gray scale untuk text dan backgrounds
- **Accent**: Warna kategori untuk berbagai elemen UI

### Typography
- **Font**: Inter (400, 500, 600, 700, 900)
- **Hierarchy**: Konsisten dengan guidelines Lunotes

### Voice & Tone
- **Friendly Professional**: Approachable yet competent
- **Clear**: Simple, direct language
- **Helpful**: Actionable guidance

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Android device untuk pengalaman optimal
- Node.js (opsional, untuk development server)

### Installation

#### Method 1: PWA Installation (Recommended)
1. Buka aplikasi di browser Android
2. Tap menu browser → "Add to Home Screen" atau "Install App"
3. Aplikasi akan terinstall seperti aplikasi native Android

#### Method 2: Development Setup
1. Clone atau download project ini
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Buka browser dan akses `http://localhost:3000`

#### Method 3: Direct Access
Anda juga bisa langsung membuka file `index.html` di browser modern.

### 📱 Android Installation
Untuk pengalaman terbaik di Android:
1. Buka di Chrome Android
2. Aplikasi akan menampilkan splash screen dengan logo Calcetix
3. Setelah loading, akan muncul kalkulator full-screen
4. Install sebagai PWA untuk akses cepat dari home screen

## 🎮 Usage

### Basic Calculator
#### Mouse/Touch
- Klik tombol angka untuk input
- Klik operator (+, −, ×, ÷, %) untuk operasi
- Klik = untuk menghitung hasil
- Klik AC untuk clear semua
- Klik ⌫ untuk delete digit terakhir

#### Keyboard
- **0-9**: Input angka
- **+, -, *, /**: Operasi matematika
- **%**: Modulo
- **Enter atau =**: Hitung hasil
- **Escape atau C**: Clear semua
- **Backspace**: Delete digit terakhir

### Advanced Features
#### Top Bar Controls
- **🕐 History**: Lihat riwayat perhitungan
- **🧮 Scientific**: Toggle mode scientific calculator
- **☀️ Theme**: Switch antara dark/light theme
- **🔊 Sound**: Toggle sound effects on/off

#### Scientific Mode
- **Trigonometry**: sin, cos, tan (dalam derajat)
- **Logarithms**: log (base 10), ln (natural log)
- **Powers**: x², xʸ, √ (square root)
- **Constants**: π (pi), e (euler's number)
- **Other**: x! (factorial), ± (sign toggle)

#### Memory Functions
- **MC**: Memory Clear
- **MR**: Memory Recall
- **M+**: Memory Add
- **M−**: Memory Subtract

#### Gestures (Touch)
- **Swipe Right**: Buka history panel
- **Swipe Left**: Tutup history panel
- **Swipe Up**: Toggle scientific mode

## 🏗️ Project Structure

```
calcetix/
├── index.html              # Main HTML file dengan splash screen
├── styles.css              # CSS dengan brand guidelines & Android optimization
├── script.js               # Calculator logic dengan PWA support
├── sw.js                   # Service Worker untuk PWA
├── manifest.json           # PWA manifest untuk Android installation
├── favicon.svg             # Icon aplikasi
├── package.json            # Project configuration
├── BRAND_GUIDELINES.md     # Brand guidelines khusus Calcetix
└── README.md              # Documentation
```

## 🎨 Design System

### Color Palette
```css
--brand-yellow: #FBBF24;
--brand-orange: #F59E0B;
--gray-900: #1F2937;
--gray-700: #374151;
--gray-500: #6B7280;
--white: #FFFFFF;
```

### Typography Scale
- **H1**: 24px / Bold (Brand name)
- **Body**: 16px / Regular
- **Display**: 36px / Semibold (Calculator display)
- **Buttons**: 20px / Semibold

## 🔧 Customization

Untuk menyesuaikan aplikasi:

1. **Colors**: Edit CSS variables di `:root` dalam `styles.css`
2. **Typography**: Ganti font atau ukuran di CSS variables
3. **Layout**: Modifikasi grid layout di `.buttons-grid`
4. **Functionality**: Tambah fitur di `Calculator` class dalam `script.js`

## 📱 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 🤝 Contributing

Untuk berkontribusi:

1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Buat Pull Request

## 📄 License

MIT License - lihat file LICENSE untuk detail.

## 👥 Team

**Lunetix Team**
- Website: https://lunetix.com
- Email: brand@lunetix.com

## 🙏 Acknowledgments

- Brand guidelines dari Lunotes
- Inter font dari Google Fonts
- Inspirasi dari modern calculator designs

---

**© 2025 Lunetix. All rights reserved.**

*Beautiful tools for everyday tasks*