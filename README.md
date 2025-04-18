# Dimension
## 🌐 Modern Server Monitoring Dashboard

Dimension is a comprehensive full-stack solution for real-time server health monitoring. With an intuitive dashboard interface, it enables administrators and developers to track critical metrics including CPU utilization, memory usage, storage capacity, and network performance.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/Matrixxx17/dimesnsion)

---

## ✨ Features

- **Real-time Monitoring** – Live tracking of CPU, RAM, disk usage, and network metrics  
- **Interactive Dashboards** – Customizable visualizations and layouts  
- **Alert System** – Configurable thresholds with visual indicators  
- **Multi-server Support** – Monitor multiple servers from a single dashboard  
- **Responsive Design** – Optimized for desktop and mobile devices  

---


[## 📸 Dashboard Preview

Real-time server monitoring dashboard in action  
🔗 [Live Demo](https://dimensionnnnless-n84rd1zxw.vercel.app)](https://dimensionnnless-fyprml92y.vercel.app/)


---

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js
- Tailwind CSS
- Recharts (for graphs)
- Socket.IO Client (for real-time data)

### 🔹 Backend
- Node.js + Express.js
- WebSockets for data streaming
- System monitoring packages (e.g. `os`, `node-os-utils`)

---

## 🚀 Getting Started

### ⚙️ Prerequisites
- Node.js (v14+)
- npm or yarn

### 📦 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Matrixxx17/dimesnsion.git
   cd dimesnsion
   ```

2. **Start Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```
   Runs on: http://localhost:5000

3. **Start Frontend**
   ```bash
   cd ../frontend/dashboard
   npm install
   npm start
   ```
   Runs on: http://localhost:3000

---

## 📁 Project Structure

```
dimension/
├── backend/
│   ├── api/
│   ├── services/
│   ├── utils/
│   └── app.js
├── frontend/
│   └── dashboard/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── services/
│       │   ├── App.js
│       │   └── index.js
├── .gitignore
└── README.md
```

---

## ⚙️ Dashboard Configuration

- Add/remove servers
- Set custom thresholds for alerts
- Choose which metrics are visible
- Select time range filters (1 Day / 7 Days / 30 Days)

---

## 📈 Roadmap

- 🔐 User authentication & role-based access
- 📩 Email/SMS alerts
- 📊 Predictive analytics
- 🐳 Docker/Kubernetes integration
- 🌗 Light/Dark mode toggle

---

## 🤝 Contribution Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'feat: add awesome feature'`)
4. Push to GitHub (`git push origin feature/awesome-feature`)
5. Submit a Pull Request!

---

## 📜 License

Licensed under the MIT License.

---

## 👤 Author

**Matrixxx17**  
GitHub: [@Matrixxx17](https://github.com/Matrixxx17)

---

## ❓ Need Help?

For issues or support, please [open an issue](https://github.com/Matrixxx17/dimesnsion/issues).

---

Monitor with confidence. Monitor with Dimension. 🚀
