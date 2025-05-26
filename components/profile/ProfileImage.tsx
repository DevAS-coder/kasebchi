import React from 'react'
import { Calendar } from 'lucide-react'
import Image from 'next/image'

interface ProfileImageProps {
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ 
  isEditing, 
  onChange 
}) => {
  return (
    <div className="md:w-1/3 mb-6 md:mb-0 flex flex-col items-center">
      <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-amber-100 mb-4 relative">
        <Image 
          src="/img/placeholder/profile.jpg"
          alt="Profile" 
          fill
          className="object-cover"
        />
      </div>
      {isEditing && (
        <div className="w-full mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Image URL
          </label>
          <input
            type="text"
            name="profileImage"
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
      )}
      <div className="text-center mt-4">
        <p className="text-gray-500 flex items-center justify-center gap-2">
          <Calendar className="h-4 w-4" />
          {/* تاریخ عضویت: {profile.joinDate} */}
        </p>
      </div>
    </div>
  )
}

export default ProfileImage