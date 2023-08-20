'use client'

import axios from 'axios'
import React, { useState } from 'react'
import { AiOutlineEye } from 'react-icons/Ai'
import { AiOutlineEyeInvisible } from 'react-icons/Ai'
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'
export default function Login() {
  const [password, setPassword] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const handleToggle = (event: React.MouseEvent) => {
    event.preventDefault()

    setIsVisible((prevState) => !prevState)
  }

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setPassword(value)
  }
  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setUserName(value)
  }

  const cookies = new Cookies()
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email: userName,
        password,
      })
      const data = response.data
      const newToken = data.token
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      const decoded: any = await jwt(newToken)
      cookies.set('jwt_authorization', newToken, {
        expires: new Date(decoded.exp * 1000),
      })
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username*
          </label>
          <input
            className="shadow appearance-none  rounded sm:w-[30vw]  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500"
            id="username"
            type="text"
            value={userName}
            placeholder="Username"
            onChange={handleUserName}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password*
          </label>
          <div className="relative">
            <input
              className={`shadow appearance-none  sm:w-[30vw]  border ${
                Boolean(password.length) ? 'border-green-500' : 'border-red-500'
              } rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              type={isVisible ? 'text' : 'password'}
              value={password}
              placeholder="******************"
              onChange={handlePassword}
            />
            {Boolean(password.length) && (
              <button
                className="absolute right-4 top-[20%]"
                onClick={handleToggle}
              >
                {isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            )}
          </div>

          {!Boolean(password.length) && (
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          )}
        </div>
        <div className="flex flex-wrap">
          <button
            onClick={() => handleLogin()}
            className="text-black disabled:bg-slate-50 disabled:text-slate-400  disabled:shadow-none shadow shadow-slate-500 bg-white border-slate-300 font-bold py-2 px-4 rounded  w-full sm:w-1/2"
            type="button"
            disabled={!Boolean(password.length) || !Boolean(userName)}
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-2 sm:ml-4"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  )
}
