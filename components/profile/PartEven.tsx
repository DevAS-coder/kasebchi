import React from 'react'

function PartEven({title , value}: {title: string, value: string}) {
    return (
        <div className='flex flex-col border-b-2 p-5 border-gray-300 gap-2'>
            <p className="text-gray-500">{title}</p>
            <p>{value}</p>
        </div>
    )
}

export default PartEven