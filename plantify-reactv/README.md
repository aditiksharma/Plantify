# 🌱 Plantify

A React + Vite web application to help aspiring gardeners who rent their living space make the most of their plants.

## 🚀 Quick Start

1. **Navigate to the React project:**
   ```bash
   cd plantify-react
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit `http://localhost:5173`

## 📁 Project Structure

```
plantify/
├── plantify-react/          # React + Vite application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React Context providers
│   │   ├── data/           # Plant database and data
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main application component
│   │   ├── App.css         # Global styles
│   │   └── main.jsx        # Application entry point
│   ├── public/             # Static assets
│   ├── package.json        # Dependencies and scripts
│   └── vite.config.js      # Vite configuration
├── README.md               # This file
└── .gitignore             # Git ignore rules
```

## ✨ Features

### 🌿 Plant Management
- **Personalized Recommendations**: Get plant suggestions based on your space, experience level, and preferences
- **Virtual Garden**: Track your plants with a beautiful shelf-like interface
- **Plant Database**: Comprehensive database of houseplants and Bay Area native plants
- **Smart Filtering**: Filter plants by maintenance level, light requirements, space type, and more

### 🏠 User Profile System
- **Profile Creation**: Set up your gardening profile with space type, experience level, and preferences
- **Location-Based**: Bay Area specific recommendations (94xxx ZIP codes)
- **Preference Tracking**: Pet-safe, travel-friendly, and native plant preferences

### 💧 Plant Care
- **Watering Scheduler**: Track watering schedules for your plants
- **Maintenance Tasks**: View today's tasks, upcoming tasks, and recently watered plants
- **Care Reminders**: Never forget to water your plants

### 🏪 Local Features (Coming Soon)
- **Nursery Finder**: Find local nurseries with specific plants in stock
- **Plant Identification**: AI-powered plant identification using photos
- **Location Services**: Enable device location for nearby nursery searches

## 🛠️ Tech Stack

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: React Context API
- **Styling**: CSS with modern features
- **Icons**: Lucide React
- **Data Storage**: localStorage for user data

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Interface**: Clean, intuitive design with smooth animations
- **Accessibility**: Keyboard navigation and screen reader support
- **Loading States**: Beautiful loading animations and feedback
- **Error Handling**: Graceful error states and user feedback

## 📱 Key Components

### Home Page
- Welcome message with user profile summary
- Feature highlights and call-to-action buttons
- Navigation to create profile or browse plants

### Dashboard
- **Recommendations Tab**: Personalized plant suggestions with filtering
- **My Garden Tab**: Shelf-like interface for tracking your plants
- **Maintenance Tab**: Watering schedules and care tasks
- **Nurseries Tab**: Local nursery finder (coming soon)
- **Identify Plant Tab**: AI plant identification (coming soon)

### Profile Page
- Comprehensive profile creation form
- Validation for Bay Area ZIP codes
- Experience level and preference settings
- Beautiful loading animation

## 🔧 Development

### Project Structure
- **Components**: Reusable UI components in `src/components/`
- **Context**: State management in `src/context/`
- **Data**: Plant database and utilities in `src/data/`
- **Pages**: Main page components in `src/pages/`

### Key Features
- **Plant Database**: Static data for houseplants and native plants
- **User Context**: Manages user profile and preferences
- **Plant Context**: Manages garden data and plant operations
- **Responsive Design**: Mobile-first approach with breakpoints

### Data Flow
1. User creates profile → stored in localStorage
2. Profile data → used for plant recommendations
3. User adds plants to garden → stored in localStorage
4. Garden data → used for maintenance scheduling

## 🚀 Deployment

### Build for Production
```bash
cd plantify-react
npm run build
```

### Deploy Options
- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automatic deployment

## 🔮 Future Features

### Planned Integrations
- **Plant.id API**: Real plant identification
- **Google Calendar**: Watering reminders
- **Email Notifications**: Care tips and reminders
- **Geolocation API**: Local nursery finder
- **Service Workers**: Offline functionality

### Enhanced Features
- **Plant Photos**: Real plant images from APIs
- **Care Tips**: Detailed care instructions
- **Seasonal Recommendations**: Weather-based suggestions
- **Community Features**: Share garden photos and tips

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**🌱 Happy Gardening!** 

Plantify helps you create the perfect garden for your space, no matter how small or temporary it might be. 