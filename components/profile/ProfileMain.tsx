import { useSearchParams } from 'next/navigation'
import React from 'react'
import ProfileInfoTab from './ProfileInfoTab'
import ProfileBussinesTab from './ProfileBussinesTab'
import ProfileFinancialTab from './ProfileFinancialTab'
import ProfileDocumentInfo from './ProfileDocumentInfo'

function ProfileMain() {

    const params = useSearchParams()
    const tabName = params.get('tabName')

    return (
        <div className='w-full px-3 py-4 md:m-5 overflow-y-auto'>
            {tabName === 'personal_information' && <ProfileInfoTab/>}
            {tabName === 'account_information' && <ProfileBussinesTab/>}
            {tabName === 'financial_information' && <ProfileFinancialTab/>}
            {tabName === 'documents' && <ProfileDocumentInfo/>}
        </div>
    )
}

export default ProfileMain