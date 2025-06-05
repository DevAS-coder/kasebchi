import { useSearchParams } from 'next/navigation'
import React from 'react'
import ProfileInfoTab from './ProfileInfoTab'
import ProfileBussinesTab from './ProfileBussinesTab'
import ProfileFinancialTab from './ProfileFinancialTab'
import ProfileDocumentsTab from './ProfileDocumentTab'

function ProfileMain() {
    const params = useSearchParams()
    const tabName = params.get('tabName') || 'personal_information'

    return (
        <div className='w-full h-full p-4 md:p-6'>
            <div className="max-w-5xl mx-auto">
                {tabName === 'personal_information' && <ProfileInfoTab/>}
                {tabName === 'account_information' && <ProfileBussinesTab/>}
                {tabName === 'financial_information' && <ProfileFinancialTab/>}
                {tabName === 'documents' && <ProfileDocumentsTab/>}
            </div>
        </div>
    )
}

export default ProfileMain