"use client"

import ProfileMain from "@/components/profile/ProfileMain"
import ProfileTabs from "@/components/profile/ProfileTabs"

function Profile() {
  return (
    <div className="pt-[70px] flex flex-col md:flex-row bg-gray-50 min-h-screen">
      <div className="md:sticky md:top-[70px] md:h-[calc(100vh-70px)]">
        <ProfileTabs/>
      </div>
      <div className="flex-1 bg-white rounded-none md:rounded-tl-2xl md:rounded-bl-2xl shadow-sm">
        <ProfileMain/>
      </div>
    </div>
  )
}

export default Profile
