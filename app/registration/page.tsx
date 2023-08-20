'use client'
import axios from 'axios'
import React from 'react'
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'
import { useState } from 'react'

const page = () => {
  const cookies = new Cookies()
  const [userName, setUserName] = useState('')
  const [userEmail, setEmail] = useState('')
  const [userPassword, setPassword] = useState('')
  const register = async () => {
    const response = await axios.post('http://localhost:3000/api/register', {
      userName: userName,
      email: userEmail,
      password: userPassword,
    })
    const data = response.data

    const newToken = data.token
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`

    const decoded: any = await jwt(newToken)
    cookies.set('jwt_authorization', newToken, {
      expires: new Date(decoded.exp * 1000),
    })

    return data
  }

  return (
    <div>
      <input
        onChange={(e) => setUserName(e.target.value)}
        type="text"
        placeholder="name"
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
      />
      <button onClick={() => register()}>Register</button>
    </div>
  )
}

export default page
