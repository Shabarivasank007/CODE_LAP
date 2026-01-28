import React from 'react';

export default function ProfileCard({ name = 'User' }) {
  return (
    <div className="profile-card">
      <p>{name}</p>
    </div>
  );
}
