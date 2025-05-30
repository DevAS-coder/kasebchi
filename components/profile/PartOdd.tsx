import React from 'react'

function PartOdd({title , value}: {title: string, value: string}) {
    return (
        <div className='flex flex-col gap-2 border-l-2 p-5 border-b-2 border-gray-300'>
            <p className="text-gray-500">{title}</p>
            <p>{value}</p>
        </div>
    )
}

export default PartOdd