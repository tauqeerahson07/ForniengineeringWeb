"use client"
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'

const FurnaceDetailPage = () => {
  const pathname = usePathname()
  const name = pathname.split('/').pop()
  const decodedName = name ? decodeURIComponent(name) : ''

  return (
    <div className='flex w-screen h-screen justify-center items-center'>
      <div className='text-center space-y-2'>
        <p>Pathname: {pathname}</p>
        <p>Raw name: {name}</p>
        <p>Decoded name: {decodedName}</p>
      </div>
    </div>
  )
}

export default FurnaceDetailPage