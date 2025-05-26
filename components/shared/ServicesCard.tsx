import React from 'react'
import Image from 'next/image'

type TSERVICE = {
    name : string,
    description? : string,
    Image : string,
    category : string
}

function ServicesCard({service} : {service : TSERVICE}) {
    return (
        <div className='flex flex-col justify-center items-center transition-all duration-300 cursor-pointer bg-gray-200 dark:bg-white/10 backdrop-blur-lg rounded-3xl w-[16rem] h-[15rem] hover:scale-105'>
            <div className="w-full flex justify-center items-center mb-4 relative h-[130px]">
                <Image
                    className='drop-shadow-2xl'
                    src={service.Image}
                    alt={service.name}
                    width={130}
                    height={130}
                />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
                <h3 className="text-2xl font-bold text-coffee-dark dark:text-white">{service.name}</h3>
                <p className="text-gray-600 dark:text-white text-center">{service.description}</p>
            </div>
        </div>
    )
}

export default ServicesCard