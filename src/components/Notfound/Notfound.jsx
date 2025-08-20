import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';

export default function Notfound() {
  return <>
   <Helmet>
        <title>vibe - Notfound</title>
        <meta name="description" content="vibe is your community to connect and share." />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center text-white">
  <h1 className="text-7xl font-bold animate-bounce mb-4">404</h1>
  <p className="text-xl mb-6">Looks like you're lost in space!</p>
  <Link to="/" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full">Take me home</Link>
</div>
  
  </>
   
  
}
