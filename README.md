# 🌱 VerdiGo - Environmental Impact Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-000000.svg)](https://expressjs.com/)

VerdiGo is a comprehensive environmental impact platform that empowers users to track, reduce, and offset their carbon footprint while promoting sustainable living practices.

## 🚀 Features

- **🧮 Carbon Footprint Calculator** - Calculate your environmental impact across home, travel, food, and waste
- **🌬️ Air Quality Monitoring (AirBuddy)** - Real-time air quality data and health recommendations
- **🗺️ Green Lane Navigation** - Eco-friendly route planning and green transportation options
- **🥬 Local Harvest** - Discover local, sustainable food sources and farmers markets
- **♻️ WasteLess** - Waste reduction tips, recycling guidance, and sustainability practices
- **📊 Interactive Dashboard** - Comprehensive overview of your environmental impact
- **🗺️ Interactive Maps** - Location-based environmental data and services

## 🛠️ Tech Stack

**Frontend:**
- React 19.1.0 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Radix UI components
- Leaflet for interactive maps
- Recharts for data visualization

**Backend:**
- Node.js with Express 5.1.0
- CORS for cross-origin requests
- Multer for file uploads
- Dotenv for environment management

## 📦 Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn package manager
- Git

## 🚀 Quick Start

### 🌐 Deploy to Vercel (One-click)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMeghali54%2FVerdigo_Eco-friendly_Project&project-name=verdigo-eco-platform&framework=vite&root-directory=frontend)

### 1. Clone the repository
```bash
git clone  https://github.com/Meghali54/Verdigo_Eco-friendly_Project.git
cd verdi-go
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Set up environment variables
```bash
# In the backend directory, create a .env file
cd backend
cp .env.example .env
# Edit .env with your configuration
```

### 4. Start the development servers

**Terminal 1 - Backend (Port 3001):**
```bash
cd backend
npm run dev
# or
PORT=3001 node index.js
```

**Terminal 2 - Frontend (Port 3000):**
```bash
cd frontend
npm run dev
```

### 5. Open your browser
Navigate to `http://localhost:3000` to see the application.

## 🗂️ Project Structure

```
verdi-go/
├── backend/                 # Express.js backend
│   ├── index.js            # Main server file
│   ├── package.json        # Backend dependencies
│   └── .env.example        # Environment variables template
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/           # Utility libraries
│   │   ├── types/         # Type definitions
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── package.json           # Root package.json
└── vercel.json           # Deployment configuration
```

## 🌍 Features Overview

### Carbon Footprint Calculator
Calculate your environmental impact across multiple categories:
- **Home Energy Usage** - Electricity, heating, and cooling
- **Transportation** - Car, public transit, flights
- **Food Consumption** - Diet choices and food waste
- **Waste Generation** - Recycling and disposal habits

### Air Quality Monitoring
- Real-time air quality index (AQI) data
- Health recommendations based on air quality
- Historical air quality trends
- Location-based alerts

### Green Transportation
- Eco-friendly route suggestions
- Carbon footprint comparison between transport modes
- Electric vehicle charging station locations
- Public transportation integration

### Local Food Networks
- Farmers market locations and schedules
- Local sustainable food producers
- Seasonal produce availability
- Community garden locations

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to get started.

### Ways to Contribute:
- 🐛 **Bug Reports** - Found a bug? Let us know!
- ✨ **Feature Requests** - Have an idea? We'd love to hear it!
- 🔧 **Code Contributions** - Help us build new features
- 📚 **Documentation** - Improve our docs
- 🧪 **Testing** - Help us test new features

## 📋 Development Guidelines

### Code Style
- Follow ESLint configuration
- Use meaningful variable and function names
- Write comments for complex logic
- Follow React best practices

### Commit Convention
We use conventional commits:
```
feat: add new carbon calculator component
fix: resolve map rendering issue
docs: update installation instructions
style: format code with prettier
```

## 🐛 Issue Reporting

Found a bug? Please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- System information (OS, browser, Node version)

## 🗺️ Roadmap

- [ ] **Mobile App** - React Native mobile application
- [ ] **API Integration** - External environmental data APIs
- [ ] **Gamification** - Achievement system and challenges
- [ ] **Community Features** - User forums and sharing
- [ ] **AI Recommendations** - Personalized sustainability suggestions
- [ ] **Offset Marketplace** - Carbon offset purchasing platform

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/Meghali54)

## 🙏 Acknowledgments

- Thanks to all contributors who help make this project better
- Environmental data providers and APIs
- Open source community for the amazing tools and libraries


## 🌟 Star History

If you find this project helpful, please consider giving it a star! ⭐

---

**Made with 💚 for a sustainable future**