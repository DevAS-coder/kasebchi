import React from 'react'
import { Edit2, Save } from 'lucide-react'

interface ProfileHeaderProps {
  isEditing: boolean;
  onEditToggle: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ isEditing, onEditToggle }) => {
  return (
    <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">My Profile</h1>
      <button 
        onClick={onEditToggle}
        className="flex items-center gap-2 bg-white text-amber-700 px-4 py-2 rounded-md hover:bg-amber-50 transition-colors"
      >
        {isEditing ? (
          <>
            <Save className="h-5 w-5 text-amber-700" />
            Save
          </>
        ) : (
          <>
            <Edit2 className="h-5 w-5 text-amber-700" />
            Edit
          </>
        )}
      </button>
    </div>
  )
}

export default ProfileHeader