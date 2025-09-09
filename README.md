# 🌱 Harvest Assistant – Smart Pest Management & Grain Production Platform

A full-stack agricultural management system designed to support farmers and agricultural administrators with pest identification, yield forecasting, and training management. Built for the farming communities of General Santos City, this system integrates web and mobile technologies to improve decision-making, promote sustainable farming, and enhance food security.

## 📖 Overview

Harvest Assistant combines AI-powered pest management, farmer record monitoring, and data-driven reporting into a single platform. It helps administrators oversee agricultural activities while equipping farmers with tools for pest detection, insecticide guidance, and income estimation.

The system was developed as part of a research initiative at STI College – General Santos, focusing on the challenges faced by local grain producers, particularly rice and corn farmers.

## 🏗️ Project Structure

```
Harvest/
├── Harvest-Frontend/          # Next.js React frontend
│   ├── app/                   # App router pages and configuration
│   ├── components/            # Reusable React components
│   ├── assets/               # Static assets and dummy data
│   └── public/               # Public assets
└── Harvest-Backend/          # Node.js backend
    ├── models/               # Database models
    └── ...                   # Additional backend files
```

## ✨ Features

### 🔬 Smart Pest Management
- AI-powered pest identification system
- Insecticide recommendation engine
- Pest damage assessment tools
- Disease pattern recognition

### 📊 Administrative Dashboard
- Real-time analytics and data visualization
- Interactive charts and graphs
- Notification system
- Quick overview of key agricultural metrics

### 👨‍🌾 Farmer Management
- Comprehensive farmer records with RSBSA numbers
- Crop type tracking (Rice, Corn, etc.)
- Area and barangay information for General Santos City
- Contact management and communication tools
- Tabbed interface for organized data viewing

### 📈 Yield Forecasting & Reports
- Interactive bar charts and pie charts
- Data filtering and search capabilities
- Income estimation tools
- Visual data representation with tooltips
- Export functionality for reports

### 🎓 Training Management
- Training session tracking
- Pest and disease identification training
- Progress monitoring
- Training reports and analytics
- Educational content delivery

### 👤 User Management
- Admin authentication system
- User profiles and settings
- Secure login/logout functionality
- Role-based access control

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14+ with App Router
- **UI Library**: React 18+
- **Styling**: Tailwind CSS with custom CSS variables
- **Charts**: Recharts for data visualization
- **Icons**: Iconify React
- **Animations**: Framer Motion
- **Fonts**: Lato, Quicksand, Geist

### Backend
- **Runtime**: Node.js
- **Database**: MongoDB with native driver
- **Authentication**: Custom admin authentication system
- **AI Integration**: Ready for machine learning model integration

### Development Tools
- **Linting**: ESLint with Next.js configuration
- **Package Manager**: npm/yarn/pnpm/bun support

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Harvest
   ```

2. **Frontend Setup**
   ```bash
   cd Harvest-Frontend
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Backend Setup**
   ```bash
   cd ../Harvest-Backend
   npm install
   ```

4. **Environment Configuration**
   Create environment files for both frontend and backend with necessary configuration variables.

### Development

1. **Start the backend server**
   ```bash
   cd Harvest-Backend
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   cd Harvest-Frontend
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Key Components

### Navigation
- **Sidebar**: Collapsible navigation with tooltips
- **Main Menu**: Dashboard, Farmers, Reports, Pest Management, Training, Profile
- **Settings**: Configuration and logout functionality

### Data Visualization
- **Bar Charts**: Agricultural analytics with interactive tooltips
- **Pie Charts**: Farmer distribution by crop type and region
- **Progress Indicators**: Training completion and yield tracking

### Smart Agriculture Tools
- **Pest Detection Interface**: AI-powered pest identification
- **Yield Calculator**: Income estimation based on crop data
- **Training Modules**: Interactive learning content

### Tables & Lists
- **Farmer Records**: Searchable and filterable farmer database
- **Tab Interface**: Organized data presentation
- **Responsive Design**: Mobile-friendly layouts

## 🎨 Design System

The application uses a comprehensive design system with:
- **Custom CSS Variables**: Consistent color scheme and theming
- **Responsive Grid**: Flexible layouts for all screen sizes
- **Interactive Elements**: Hover states and smooth transitions
- **Accessibility**: Screen reader support and keyboard navigation

### Color Palette
- Primary colors for branding and navigation
- Chart-specific colors for data visualization
- Semantic colors for different agricultural data categories
- High contrast ratios for accessibility

## 🔧 Configuration

### Sidebar Configuration
The sidebar is configurable through [`sidebarConfig.js`](Harvest-Frontend/app/config/sidebarConfig.js):
- Main navigation items
- Bottom utility items
- Icon and routing configuration

### Tailwind Configuration
Custom Tailwind setup with extended color palette and font families defined in [`tailwind.config.js`](Harvest-Frontend/tailwind.config.js).

## 📊 Database Models

### RegisterModel
- Admin user management
- Username and email-based authentication
- MongoDB collection integration

### Future Models
- Farmer profiles and crop data
- Pest identification records
- Training progress tracking
- Yield and income data

## 🎓 Research Background

This project was developed as part of a research initiative at **STI College – General Santos**, addressing the specific agricultural challenges in General Santos City:

- **Target Communities**: Rice and corn farmers in General Santos City
- **Research Focus**: Smart pest management and grain production optimization
- **Academic Institution**: STI College – General Santos
- **Goal**: Improve food security and promote sustainable farming practices

## 🚢 Deployment

### Vercel (Recommended for Frontend)
The frontend is optimized for deployment on Vercel:

1. Push your code to a Git repository
2. Connect to Vercel
3. Deploy with automatic builds

For detailed deployment instructions, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

### Backend Deployment
Deploy the backend to your preferred Node.js hosting service with MongoDB connection.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the component examples in the codebase

## 🏫 Academic Partnership

**STI College – General Santos**  
Research Initiative for Agricultural Technology Development

---

Built with ❤️ for the farming communities of General Santos City using modern web technologies and AI-powered solutions.
