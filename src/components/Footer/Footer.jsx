import React from 'react'

export default function Footer() {
  return <>
  
   <footer className="bg-black text-gray-200 p-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
      <p className="text-sm">&copy; 2025 SocialApp. All rights reserved.</p>
      <div className="flex gap-4 mt-2 md:mt-0">
        <p className="hover:text-white transition cursor-pointer">Privacy Policy</p>
        <p  className="hover:text-white transition  cursor-pointer">Terms of Service</p>
        <p className="hover:text-white transition  cursor-pointer">Contact</p>
      </div>
    </div>
  </footer>
  
  </>
   
  
}
