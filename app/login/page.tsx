'use client'

import React from 'react'
import cookies from 'js-cookie'
const page = () => {
  return (
    <div>
      <button onClick={() => cookies.set('token', 'name', { expires: 1 / 24 })}>
        load up
      </button>
    </div>
  )
}

export default page
