# CatBloat HOS

CatBloat HOS is a Magisk module for removing bloatware from Xiaomi devices running HyperOS. It provides a modern, secure web interface using ksuwebui for managing applications without needing command-line operations. Works with Magisk, KernelSU, Apatch, and MMRL.

---

## 🌟 Features

- 🎨 Modern UI: Clean design with dark/light mode support
- ⚡ Instant Operations: Disable/enable apps with one click
- 📱 Single App Control: Manage individual apps without affecting others
- 📋 Disabled Apps List: View all disabled apps with re-enable option
- 🖥️ Terminal Emulator: Real-time command output like a terminal
- 🔒 100% Safe: Doesn't delete apps, only disables them temporarily
- ⚙️ Full Compatibility: Works efficiently with Magisk, KernelSU, Apatch, and MMRL
- 🌐 ksuwebui Framework: Modern web interface framework

---

## 📸 Screenshots

---

## 📋 Requirements

- 📱 Xiaomi device running HyperOS
- 🔓 Magisk, KernelSU, Apatch, or MMRL installed
- 🔧 Active Root access
- 🛠️ Magisk Module enabled

---

## 📦 Installation

### Method 1: Via Magisk App (Recommended)
1. Open Magisk app
2. Go to Modules section
3. Tap Install from storage
4. Select `CatBloat-HOS.zip` file
5. Reboot your device

### Method 2: Via KernelSU/MMRL/Apatch
1. Open your root manager app (KernelSU, MMRL, or Apatch)
2. Go to Modules section
3. Tap Install from storage
4. Select `CatBloat-HOS.zip` file
5. Reboot your device

### Method 3: Manual Installation
1. Download `CatBloat-HOS.zip`
2. Extract to `/data/adb/modules/`
3. Ensure files structure:

```
/data/adb/modules/CatBloat-HOS/
  ├── disable.sh
  ├── enable.sh
  ├── module.prop
  ├── webroot/
  │   ├── index.html
  │   ├── styles.css
  │   └── scripts.js
```

### 4. Reboot your device

---

## 🚀 Usage

1. After installation, open your root manager app (Magisk, KernelSU, Apatch, or MMRL)
2. Find CatBloat HOS in modules list
3. Tap WebUI or الواجهة (ksuwebui will launch)
4. The main interface will appear

Available Options:

- Disable All Bloatware: Disable all apps in the blacklist
- Enable All Bloatware: Re-enable all disabled apps
- Single App Control: Enter Package ID to control specific app
- Refresh: Update the disabled apps list

---

## 📂 File Structure

```
CatBloat-HOS/
├── disable.sh          # Disable apps script
├── enable.sh           # Re-enable apps script
├── module.prop         # Module information
├── README.md           # This file
├── screenshots/        # Screenshots
├── LICENSE             # Project license
└── webroot/
    ├── index.html      # Main interface
    ├── styles.css      # CSS styling
    └── scripts.js      # JavaScript functions
```

---

# ⚠️ Important Notes

- 🔄 Safe Process: Apps are not deleted, only disabled
- 📱 Settings: App settings won't be lost when re-enabled
- 🔧 Updates: Some apps may re-enable after system updates
- 💾 Backup: It's recommended to backup before starting

---

# 👨‍💻 Contributing

Contributions are welcome! You can:

- 🐛 Report bugs
- 💡 Suggest new features
- 🔧 Fix issues and send Pull Requests

---

## 📄 Credits

- [Magisk](https://github.com/topjohnwu/Magisk) - Root solution
- [KernelSU](https://github.com/tiann/KernelSU) - Root engine
- [Apatch](https://github.com/bmax121/APatch) - Root solution
- [MMRL](https://github.com/DerGoogler/MMRL) - Module manager
- [ksuwebui](https://github.com/KernelSU/ksuwebui) - WebUI framework
- Xiaomi - For HyperOS 😄

---

# 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---