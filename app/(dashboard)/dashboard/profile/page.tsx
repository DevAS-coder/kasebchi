"use client"
import Navbar from '@/components/dashboard/DashNavbar'
import React, { useState, useEffect } from 'react'
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileImage from '@/components/profile/ProfileImage'
import ProfileDetails from '@/components/profile/ProfileDetails'

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  bio: string;
  profileImage: string;
}

function Profile() {

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Here you would fetch the user profile data from your API
    // For now, we're using the default state
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      // setProfile(editedProfile);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = () => {
    // const { name, value } = e.target;
    // setEditedProfile({
    //   ...editedProfile,
    //   [name]: value
    // });
  };

  return (
    <div className="mt-16 bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ProfileHeader isEditing={isEditing} onEditToggle={handleEditToggle} />
          
          <div className="p-6 md:flex gap-8">
            <ProfileImage 
              isEditing={isEditing}
              onChange={handleInputChange}
            />
            
            <ProfileDetails 
              isEditing={isEditing}
              onChange={handleInputChange}
            />
          </div>
          
          {/* <AccountPreferences /> */}
        </div>
      </div>
    </div>
  )
}

export default Profile
