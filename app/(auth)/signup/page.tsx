"use client";

import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/Ai";
import { AiOutlineEyeInvisible } from "react-icons/Ai";
import axios from "axios";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

type signUpInput = {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
};
export default function SignUp() {
  const cookies = new Cookies();
  const [input, setInput] = useState<signUpInput>({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<signUpInput>({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const handleToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsVisible((prevState) => !prevState);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(event);
  };
  const validateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setError((prev) => {
      const newErrorState = { ...prev, [name]: "" };
      switch (name) {
        case "username":
          if (!value) {
            newErrorState[name] = "Please enter userName";
          }
          break;

        case "password":
          if (!value) {
            newErrorState[name] = "Please enter password";
          } else if (input.confirmPassword && input.confirmPassword !== value) {
            newErrorState["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            newErrorState["confirmPassword"] = "";
          }
          break;

        case "confirmPassword":
          if (!value) {
            newErrorState[name] = "Please enter Confirm Password.";
          } else if (input.password && input.password !== value) {
            newErrorState[name] =
              "Password and Confirm Password does not match.";
          }
          break;
      }
      return newErrorState;
    });
  };

  const handleRegisteration = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        userName: input.username,
        email: input.email,
        password: input.password,
      });
      const data = response.data;
      const newToken = data.token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      const decoded: any = await jwt(newToken);
      cookies.set("jwt_authorization", newToken, {
        expires: new Date(decoded.exp * 1000),
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="m-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username*
          </label>
          <input
            className="shadow appearance-none  rounded md:w-[30vw]   py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500"
            id="username"
            name="username"
            type="text"
            value={input.username}
            placeholder="Username"
            onChange={handleInput}
            onBlur={validateInput}
          />
          {error.username && (
            <p className="text-red-500 text-xs italic">{error.username}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Email"
          >
            Email*
          </label>
          <input
            className="shadow appearance-none  rounded md:w-[30vw]   py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500"
            id="email"
            name="email"
            type="text"
            value={input.email}
            placeholder="Email"
            onChange={handleInput}
            onBlur={validateInput}
          />
          {error.username && (
            <p className="text-red-500 text-xs italic">{error.username}</p>
          )}
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
              className={`shadow appearance-none border  rounded md:w-[30vw] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              name="password"
              type={isVisible ? "text" : "password"}
              value={input.password}
              placeholder="******************"
              onChange={handleInput}
              onBlur={validateInput}
            />
            {Boolean(input.password.length) && (
              <button
                className="absolute right-4 top-[20%]"
                onClick={handleToggle}
              >
                {isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            )}
            {error.password && (
              <p className="text-red-500 text-xs italic">{error.password}</p>
            )}
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Confirm Password*
          </label>
          <div className="relative">
            <input
              className={`shadow appearance-none border rounded md:w-[30vw] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="confirmPassword"
              name="confirmPassword"
              type={isVisible ? "text" : "password"}
              value={input.confirmPassword}
              placeholder="******************"
              onChange={handleInput}
              onBlur={validateInput}
            />
            {Boolean(input.password.length) && (
              <button
                className="absolute right-4 top-[15%]"
                onClick={handleToggle}
              >
                {isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            )}
            {error.confirmPassword && (
              <p className="text-red-500 text-xs italic w-40 lg:w-full">
                {error.confirmPassword}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap">
          <button
            className="text-black disabled:bg-slate-50 disabled:text-slate-400  disabled:shadow-none shadow shadow-slate-500 bg-white border-slate-300 font-bold py-2 px-4 rounded  w-full sm:w-1/2"
            type="button"
            disabled={
              input.password !== input.confirmPassword ||
              !Boolean(input.username)
            }
            onClick={handleRegisteration}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
