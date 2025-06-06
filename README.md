# FoodShare - Campus Food Waste Reduction Platform

A React-based web application that connects students with available food from campus cafeterias to reduce waste and help students access free meals.

## Features

- **User Authentication**: Secure login/signup with email and password
- **Role-based Access**: Student and Cafeteria staff roles with different permissions
- **Real-time Food Listings**: Live updates when food becomes available
- **Smart Ordering System**: Instant food claiming with pickup details
- **Analytics Dashboard**: Comprehensive waste reduction metrics
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast notifications)

## Prerequisites

- Node.js 18+ and npm
- Visual Studio Code (recommended)
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd foodshare
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

The project is already configured with Supabase. No additional environment variables needed.

### 4. Database Setup

The database is already configured with the following tables:
- `profiles` - User profile information
- `food_items` - Available food listings
- `orders` - Food claim records
- `analytics` - Usage analytics

### 5. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn UI components
│   ├── AddFoodModal.tsx # Modal for adding food items
│   ├── FoodCard.tsx     # Food item display card
│   ├── Header.tsx       # Application header
│   └── StatsCard.tsx    # Statistics display card
├── hooks/               # Custom React hooks
├── integrations/        # External service integrations
│   └── supabase/        # Supabase client and types
├── lib/                 # Utility functions
├── pages/               # Page components
│   ├── Auth.tsx         # Authentication page
│   ├── Index.tsx        # Main dashboard
│   └── NotFound.tsx     # 404 page
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## Usage Guide

### For Students

1. **Sign Up/Login**: Create an account or login with existing credentials
2. **Browse Food**: View available food items from various campus locations
3. **Claim Food**: Click "Claim Food" on items you want
4. **Pickup**: Follow the pickup instructions sent to your email

### For Cafeteria Staff

1. **Switch Role**: Use the role toggle in the header to switch to "Cafeteria" mode
2. **Add Food**: Click the "Add Food" button to list available items
3. **Monitor Claims**: View which items have been claimed
4. **Analytics**: Track waste reduction metrics

## Development in Visual Studio Code

### Recommended Extensions

Install these VS Code extensions for the best development experience:

```
# Essential Extensions
- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer 2
- GitLens

# Optional but Helpful
- Thunder Client (for API testing)
- Error Lens
- Material Icon Theme
- One Dark Pro (theme)
```

### VS Code Settings

Create a `.vscode/settings.json` file in your project root:

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "tailwindCSS.experimental.classRegex": [
    "cva\\(([^)]*)\\)",
    "cx\\(([^)]*)\\)"
  ]
}
```

### Debugging in VS Code

Create a `.vscode/launch.json` file for debugging:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "pwa-chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMaps": true
    }
  ]
}
```

## Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Type Checking
npm run type-check   # Check TypeScript types
```

## Database Schema

### Tables

1. **profiles**
   - `id` (uuid, primary key)
   - `user_id` (uuid, references auth.users)
   - `full_name` (text)
   - `role` (enum: student, cafeteria_staff, admin)
   - `created_at`, `updated_at` (timestamps)

2. **food_items**
   - `id` (uuid, primary key)
   - `title`, `description` (text)
   - `quantity` (integer)
   - `location` (text)
   - `dietary_restrictions` (text array)
   - `expires_at` (timestamp)
   - `created_by` (uuid, references profiles)
   - `status` (enum: available, claimed, expired)

3. **orders**
   - `id` (uuid, primary key)
   - `food_item_id` (uuid, references food_items)
   - `student_id` (uuid, references profiles)
   - `pickup_code` (text)
   - `status` (enum: pending, completed, cancelled)

4. **analytics**
   - `id` (uuid, primary key)
   - `event_type` (text)
   - `user_id` (uuid)
   - `metadata` (jsonb)

## Authentication Flow

1. Users sign up with email/password
2. Profile is automatically created via database trigger
3. Role-based access controls what users can see/do
4. Session management handled by Supabase Auth

## Real-time Features

- Food listings update in real-time when new items are added
- Claim status updates instantly across all connected clients
- Analytics update in real-time

## Deployment

### Using Lovable (Recommended)

1. Click the "Publish" button in the Lovable interface
2. Your app will be deployed automatically

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure your domain in Supabase Auth settings

## Troubleshooting

### Common Issues

1. **Authentication not working**: Check Supabase URL configuration in Auth settings
2. **Data not loading**: Verify Row Level Security policies are set correctly
3. **Real-time not working**: Ensure tables are added to the realtime publication

### Development Tips

- Use React Developer Tools for debugging components
- Check browser Network tab for API issues
- Monitor Supabase logs for backend errors
- Use the database through Supabase dashboard for direct data access

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add some feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Check the troubleshooting section above
- Review Supabase documentation
- Create an issue in the repository

---

Built with ❤️ for reducing food waste on campus