import React from 'react'
import { Link } from 'react-router-dom'
import SlideDownImage from '../components/SlideDownImage.component'

const ErrorPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
        <h1 className="mb-4 text-4xl font-bold text-purple-800">Oops!</h1>
        <p className="mb-6 text-xl text-pink-600">Something went wrong</p>
        <div className="mb-8">
          <svg
            className="mx-auto size-24 text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="mb-8 text-gray-600">
          This page does not exist or something went wrong.
        </p>
        <Link to="/">
          <button className="rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition duration-300 ease-in-out hover:from-purple-600 hover:to-pink-600">
            Go Back Home
          </button>
        </Link>
      </div>
      <SlideDownImage altText="home" imageSrc="/error.png" />
    </div>
  )
}

export default ErrorPage
