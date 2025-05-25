import React, { useContext, useEffect, useState } from 'react'
import { User, Mail, Phone, MapPin } from 'lucide-react'

interface ProfileDetailsProps {
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  isEditing, 
  onChange 
}) => {

  const [data, setdata] = useState<{ phoneNumber: string } | undefined>()
  useEffect(() => {
    const storedData = localStorage.getItem('auth');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setdata(parsedData.users);
    }
  }, [])

  return (
    <div className="md:w-2/3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <User className="h-4 w-4" />
            نام و نام خانوادگی
          </label>
          {isEditing ? (
            <input
              type="text"
              name="fullName"
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            />
          ) : (
            <p className="text-gray-900 font-medium"></p>
          )}
        </div>
        
        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Mail className="h-4 w-4" />
            ایمیل
          </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            />
          ) : (
            <p className="text-gray-900"></p>
          )}
        </div>
        
        {/* Phone */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Phone className="h-4 w-4" />
            تلفن
          </label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            />
          ) : (
            <p className="text-gray-900">{data?.phoneNumber}</p>
          )}
        </div>
        
        {/* Address */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            آدرس
          </label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            />
          ) : (
            <p className="text-gray-900"></p>
          )}
        </div>
      </div>
      
      {/* Bio */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          درباره
        </label>
        {isEditing ? (
          <textarea
            name="bio"
            onChange={onChange}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
          />
        ) : (
          <p className="text-gray-700"></p>
        )}
      </div>
    </div>
  )
}
export default ProfileDetails