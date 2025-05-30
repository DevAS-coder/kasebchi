"use client"

import ProfileMain from "@/components/profile/ProfileMain"
import ProfileTabs from "@/components/profile/ProfileTabs"

function Profile() {

  return (
    <div className="pt-[70px] flex flex-row bg-gray-50 h-screen">
      <ProfileTabs/>
      <ProfileMain/>
    </div>
  )
}

export default Profile
