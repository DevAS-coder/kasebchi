import React from 'react'

const AccountPreferences: React.FC = () => {
  return (
    <div className="border-t border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Preferences</h2>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            id="notifications"
            type="checkbox"
            className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
          />
          <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
            Receive email notifications
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="marketing"
            type="checkbox"
            className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
          />
          <label htmlFor="marketing" className="ml-2 block text-sm text-gray-700">
            Receive marketing emails
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="darkMode"
            type="checkbox"
            className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
          />
          <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-700">
            Enable dark mode
          </label>
        </div>
      </div>
    </div>
  )
}

export default AccountPreferences