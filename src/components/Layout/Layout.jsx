import React from 'react'
import  { NavbarComponent } from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './../Footer/Footer';

export default function Layout() {
  return <>
  
 <div className="flex flex-col min-h-screen">
      
      
      <div className="sticky top-0 w-full z-50">
        <NavbarComponent />
      </div>

  
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>

    
      <Footer />

    </div>
  </>
}
