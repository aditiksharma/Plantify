# Plantify React App 🌱

A modern React application for Bay Area plant enthusiasts who rent their living spaces. Plantify helps you discover, manage, and care for plants that fit your lifestyle and space constraints.

## Features

### 🌿 **Personalized Plant Recommendations**
- Get plant suggestions based on your space type (indoor, balcony, yard)
- Filter by experience level, time commitment, and preferences
- Pet-safe and travel-friendly plant options
- Bay Area native plant recommendations

### 🏠 **Virtual Garden Management**
- Add plants to your virtual garden
- Track watering schedules and maintenance tasks
- View plant details and care instructions
- Remove and edit garden plants

### 💧 **Smart Watering System**
- Automatic watering reminders based on plant needs
- Visual indicators for urgent watering tasks
- Weekly maintenance overview
- Email and browser notification options

### 🔍 **Plant Discovery**
- Browse houseplants and native plants
- Search and filter by various criteria
- Detailed plant information and care guides
- Plant identification (with Plant.id API integration)

### ⚙️ **Settings & Customization**
- API key management for plant identification
- Notification preferences
- Data export and management
- Profile customization

## Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Context API** - State management
- **LocalStorage** - Data persistence
- **CSS3** - Modern styling with responsive design

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd plantify-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar.jsx     # Navigation component
│   └── PlantCard.jsx  # Plant display component
├── context/           # React Context providers
│   ├── PlantContext.jsx  # Plant data and garden management
│   └── UserContext.jsx   # User profile management
├── data/              # Static data and utilities
│   └── plantDatabase.js  # Plant database with houseplants and natives
├── pages/             # Page components
│   ├── Home.jsx       # Landing page
│   ├── Dashboard.jsx  # Main app dashboard
│   ├── Profile.jsx    # User profile creation
│   └── Settings.jsx   # App settings
├── App.jsx            # Main app component
├── App.css            # Global styles
└── main.jsx          # App entry point
```

## Key Components

### PlantContext
Manages plant data, user garden, and plant-related operations:
- Plant database access
- Garden management (add, remove, water plants)
- Recommendation engine
- Data persistence

### UserContext
Handles user profile and preferences:
- Profile creation and management
- User preferences storage
- Profile validation

### PlantCard
Reusable component for displaying plant information:
- Plant images and details
- Recommendation badges
- Add to garden functionality
- Responsive design

## Data Structure

### Plant Object
```javascript
{
  id: number,
  name: string,
  scientificName: string,
  maintenance: "Low" | "Medium" | "High",
  light: string,
  water: string,
  space: string[],
  travelFriendly: boolean,
  petSafe: boolean,
  description: string,
  wateringSchedule: number,
  image: string,
  nativeTo?: string[]  // For native plants
}
```

### User Profile
```javascript
{
  name: string,
  zip: string,
  email: string,
  space: string,
  light: string,
  level: string,
  timeCommitment: string,
  movingSoon: boolean,
  petSafe: boolean,
  interestedInNative: boolean,
  createdAt: string
}
```

## API Integration

### Plant.id API
For plant identification features:
1. Get your API key from [Plant.id](https://web.plant.id/api-access-key)
2. Add the key in Settings page
3. Enable plant identification features

## Features in Detail

### Recommendation Engine
The app uses a scoring system to recommend plants based on:
- Space compatibility (indoor/outdoor)
- Light conditions
- Experience level
- Time commitment
- Pet safety
- Moving plans

### Watering System
- Calculates next watering date based on plant schedule
- Shows urgent tasks (watering due today)
- Weekly maintenance overview
- Visual indicators for different urgency levels

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Accessible design patterns

## Customization

### Adding New Plants
Edit `src/data/plantDatabase.js` to add new plants:
```javascript
{
  id: uniqueId,
  name: "Plant Name",
  scientificName: "Scientific Name",
  maintenance: "Low",
  light: "Bright Indirect",
  water: "Medium",
  space: ["No Outdoor Space", "Balcony"],
  travelFriendly: true,
  petSafe: false,
  description: "Plant description",
  wateringSchedule: 7,
  image: "plant-image-name"
}
```

### Styling
The app uses CSS custom properties for easy theming. Main colors:
- Primary: `#059669` (green)
- Secondary: `#64748b` (gray)
- Success: `#065f46` (dark green)
- Error: `#dc2626` (red)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.

---

**Plantify** - Making plant parenthood easier for Bay Area renters! 🌱✨
