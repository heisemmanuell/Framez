# Framez - Social Media App

Framez is a React Native social media application built with Expo, inspired by Instagram. It allows users to register, log in, create posts with text and images, view a feed of posts, and manage their profiles. The app features persistent authentication, real-time updates, and a responsive design optimized for Android and iOS.

## Features Implemented

### Authentication
- **User Registration**: Secure sign-up process using email and password.
- **Login and Logout**: Seamless authentication flow with session persistence across app restarts.
- **Persistent Sessions**: Users remain logged in after closing and reopening the app, leveraging Supabase's session management.

### Posts
- **Create Posts**: Users can create posts containing text and/or images. Images are uploaded to Supabase Storage.
- **Feed Display**: A chronological feed (most recent first) showing posts from all users, including author's name and timestamp.
- **Post Details**: Detailed view of individual posts with comments and likes.

### Profile
- **User Profile**: Displays logged-in user's information (name, email, avatar if available).
- **User Posts**: Shows all posts created by the current user.

### Additional Features
- **Comments**: Users can comment on posts.
- **Likes**: Like/unlike posts with real-time updates.
- **Rich Text Editor**: For creating posts with formatted text.
- **Image Picker**: Select images from device gallery or camera.
- **Responsive Layout**: Smooth navigation with bottom tabs and responsive UI components.
- **Real-time Updates**: Leveraging Supabase's real-time capabilities for live feed and interactions.

## Technical Requirements

### Framework
- **React Native**: Built with Expo for easy development and deployment.

### Backend
- **Supabase**: Chosen for its comprehensive backend-as-a-service features, including authentication, real-time database, and file storage.
  - **Authentication**: Handles user sign-up, login, logout, and session persistence using Supabase Auth.
  - **Database**: PostgreSQL-based real-time database for storing users, posts, comments, and likes.
  - **Storage**: File storage for post images and videos using supabase.
  - **Real-time**: Enables live updates for feeds, likes, and comments without manual polling.
  - **Why Supabase?**: Provides a scalable, secure, and easy-to-integrate solution. It eliminates the need for separate servers, reduces development time, and offers built-in features like row-level security and automatic API generation.

### Database Schema
- **Users Table**: Stores user information (id, name, email, image).
- **Posts Table**: Stores post data (id, userId, body, file, created_at).
- **Comments Table**: Stores comments on posts.
- **PostLikes Table**: Tracks likes on posts.

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/heisemmanuell/Framez.git
   cd framez
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Supabase**:
   - Create a Supabase project at [supabase.com](https://supabase.com).
   - Obtain your project URL and anon key.
   - Add them to `constants/index.ts`:
     ```typescript
     export const supabaseUrl = 'your-supabase-url';
     export const supabaseAnonKey = 'your-anon-key';
     ```

4. **Start the App**:
   ```bash
   npx expo start
   ```

5. **Run on Devices**:
   - Use Expo Go app on Android/iOS for testing.
   - Or run on simulators/emulators.

## Usage

- **Welcome Screen**: Initial screen for new users.
- **Sign Up/Login**: Register or log in to access the app.
- **Home Feed**: View posts from all users.
- **New Post**: Create a new post with text and images.
- **Profile**: View and edit your profile, see your posts.
- **Post Details**: Interact with individual posts (like, comment).

## Deployment

- **Testing**: Use Expo Go for quick testing on Android and iOS simulators/devices.
- **Production Build**: Use EAS Build for optimized builds.
- **Hosting**: The app is hosted on [appetize.io](https://appetize.io/app/b_2qal4l7u2phu2dvlrwlcfez4vq) for web-based testing and sharing.

## Tech Stack

- **Frontend**: React Native, Expo, TypeScript
- **Backend**: Supabase (Auth, Database, Storage)
- **UI Components**: Custom components with React Native Elements, Expo Vector Icons
- **State Management**: React Context for authentication
- **Image Handling**: Expo Image Picker, Supabase Storage
- **Navigation**: Expo Router with file-based routing

