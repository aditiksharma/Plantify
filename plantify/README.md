# 🌿 Plantify - Your Personal Plant Care Assistant

Plantify is a comprehensive web application designed to help aspiring gardeners and plant parents in the Bay Area make the most of their space and successfully care for their plants.

## 🌟 Features

### ✅ Completed Features

1. **Local Plant Nursery Finder** - Find nurseries near your ZIP code
2. **User Location and Profile** - Comprehensive profile system with space and lifestyle preferences
3. **Plant Maintenance Guide** - Low maintenance plant recommendations with filtering
4. **Virtual Garden** - Log and track your plants
5. **Native Bay Area Plants** - Database of native plants specific to the Bay Area
6. **Plant Watering Scheduler** - Track watering schedules and maintenance tasks
7. **Plant Image Recognition** - Upload photos to identify plants with Plant.id API integration
8. **Smart Notifications** - Browser notifications for watering reminders
9. **Calendar Integration** - Export watering schedules to calendar
10. **Settings Management** - Configure API keys and notification preferences

### 🎯 Key Functionality

- **Personalized Recommendations**: Get plant suggestions based on your space, experience level, and preferences
- **Bay Area Focus**: Currently supports ZIP codes starting with 94xxx (San Francisco Bay Area)
- **Renter-Friendly**: Special focus on plants that travel well and don't damage rental spaces
- **Pet Safety**: Filter for pet-safe plants
- **Native Plants**: Support local ecosystems with native Bay Area plants
- **Maintenance Tracking**: Never forget to water your plants again
- **Local Nurseries**: Find where to buy plants near you

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for Font Awesome icons
- Bay Area ZIP code (94xxx) for full functionality

### Installation

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Create a Profile** by clicking "Create Your Profile"
4. **Start Exploring** the dashboard features

### API Setup (Optional)

For real plant identification:

1. **Get Plant.id API Key**:
   - Visit [Plant.id API Access](https://web.plant.id/api-access-request/)
   - Sign up for a free account
   - Copy your API key

2. **Configure in App**:
   - Go to Settings in the dashboard
   - Paste your API key in the Plant Identification section
   - Test the connection

3. **Enable Notifications**:
   - Allow browser notifications when prompted
   - Configure notification preferences in Settings

### Quick Start Guide

1. **Landing Page** (`index.html`)
   - Learn about Plantify's features
   - Click "Create Your Profile" to get started

2. **Profile Creation** (`profile.html`)
   - Enter your name and Bay Area ZIP code
   - Describe your living space and gardening experience
   - Set preferences for pet safety, moving plans, and native plants

3. **Dashboard** (`dashboard.html`)
   - View personalized plant recommendations
   - Find local nurseries
   - Manage your virtual garden
   - Track maintenance tasks
   - Identify plants with photos

## 📱 App Structure

```
plantify/
├── index.html              # Landing page
├── profile.html            # Profile creation form
├── profile-view.html       # Profile display
├── dashboard.html          # Main application dashboard
├── settings.html           # Settings and API configuration
├── css/
│   └── style.css          # Complete styling
├── js/
│   ├── database.js        # Plant and nursery data
│   ├── profile.js         # Profile form handling
│   ├── profile-view.js    # Profile display logic
│   ├── dashboard.js       # Main dashboard functionality
│   ├── plant-id-api.js    # Plant.id API integration
│   ├── notifications.js   # Notification system
│   ├── settings.js        # Settings management
│   └── main.js           # Utility functions
├── sw.js                  # Service worker for notifications
└── assets/
    └── images/            # Plant images (placeholder)
```

## 🌱 Plant Database

The app includes a comprehensive database of:

- **Houseplants**: Snake Plant, Pothos, ZZ Plant, Spider Plant, Peace Lily, Succulents, Aloe Vera, Chinese Evergreen
- **Native Bay Area Plants**: California Poppy, Douglas Iris, Coyote Mint, Yarrow, California Sagebrush
- **Local Nurseries**: Real Bay Area nurseries with contact information and specialties

### Plant Information Includes:
- Care requirements (water, light, maintenance level)
- Space suitability (indoor, balcony, yard)
- Pet safety
- Travel-friendliness
- Native status
- Watering schedules

## 🏪 Nursery Finder

Find local nurseries with:
- Contact information
- Operating hours
- Specialties
- Ratings
- Distance from your location

## 🏡 Virtual Garden

Track your plants with:
- Plant details and care history
- Watering schedules
- Location tracking
- Maintenance reminders
- Growth progress

## 📅 Maintenance System

- **Today's Tasks**: Plants that need immediate attention
- **Weekly Schedule**: Upcoming maintenance tasks
- **Calendar Export**: Download watering schedule to your calendar
- **Smart Reminders**: Based on each plant's specific needs

## 🆔 Plant Identification

- Upload photos of unknown plants
- Get real identification results using Plant.id API
- Fallback to simulation if API key not configured
- Add identified plants to your garden
- Find nurseries that carry the plant
- Multiple identification suggestions with confidence scores

## 🔔 Smart Notifications

- **Browser Notifications**: Receive watering reminders even when app is closed
- **Service Worker**: Background notification processing
- **Customizable Timing**: Set preferred notification times
- **Action Buttons**: Mark as watered or snooze directly from notifications
- **Permission Management**: Easy setup and testing

## 📅 Calendar Integration

- **ICS Export**: Download watering schedules as calendar files
- **Google Calendar**: Direct integration (requires setup)
- **Multiple Formats**: Support for various calendar applications
- **Recurring Events**: Automatic scheduling based on plant needs

## 🎨 Design Features

- **Modern UI**: Clean, intuitive interface
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessibility**: Clear navigation and readable fonts
- **Visual Feedback**: Hover effects and animations
- **Color Scheme**: Green theme reflecting the plant care focus

## 🔧 Technical Details

### Frontend Technologies
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **Vanilla JavaScript**: No frameworks required
- **Font Awesome**: Icons for better UX
- **Local Storage**: Data persistence
- **Service Workers**: Background notifications and offline support

### API Integration
- **Plant.id API**: Real plant identification (requires free API key)
- **Google Calendar API**: Calendar integration (optional)
- **Browser Notifications API**: Native notification support

### Data Management
- **Client-side Database**: Comprehensive plant and nursery data
- **Local Storage**: User profiles and garden data
- **Real-time Validation**: ZIP code and form validation

## 🌍 Bay Area Focus

Currently optimized for the San Francisco Bay Area:
- **ZIP Code Validation**: Only accepts 94xxx ZIP codes
- **Local Nurseries**: Real Bay Area nursery data
- **Native Plants**: Plants native to the region
- **Climate Considerations**: Recommendations based on local conditions

## 🚧 Future Enhancements

### Planned Features
- **Real Plant ID API**: Integration with Plant.id or similar service
- **Push Notifications**: Browser notifications for watering reminders
- **Social Features**: Share gardens and plant care tips
- **Plant Marketplace**: Buy/sell plants with other users
- **Care Logging**: Photo documentation of plant progress
- **Weather Integration**: Adjust watering based on local weather
- **Expanded Regions**: Support for more geographic areas

### Technical Improvements
- **Backend Integration**: Server-side data management
- **User Accounts**: Persistent user profiles
- **Mobile App**: Native iOS/Android applications
- **Offline Support**: Work without internet connection
- **Data Analytics**: Plant care success tracking

## 🤝 Contributing

This is a demonstration project, but suggestions and improvements are welcome:

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

## 📄 License

This project is for educational and demonstration purposes.

## 🙏 Acknowledgments

- **Plant Data**: Curated from various horticultural resources
- **Nursery Information**: Real Bay Area nursery data
- **Design Inspiration**: Modern plant care and gardening apps
- **Icons**: Font Awesome for the icon set

## 📞 Support

For questions or issues:
- Check the browser console for error messages
- Ensure you're using a Bay Area ZIP code (94xxx)
- Try refreshing the page if features don't load
- Clear browser cache if experiencing issues

---

**Happy Planting! 🌱**

*Plantify - Making plant care accessible and enjoyable for everyone in the Bay Area.* 