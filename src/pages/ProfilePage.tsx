// src/pages/ProfilePage.tsx
import React from 'react';
import UserProfile from '../components/UserProfile';

const ProfilePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium text-fiori-text mb-6">Perfil de Usuario</h1>
      <UserProfile />
    </div>
  );
};

export default ProfilePage;