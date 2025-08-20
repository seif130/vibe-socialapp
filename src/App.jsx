import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Resigster from './components/Resigster/Resigster';
import Notfound from './components/Notfound/Notfound';
import UserContextProvider from "./Context/CounterContext";
import ProtectedRout from './components/protectedrout/protectedrout';
import PostContextProvider from './Context/PostContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostDetails from './components/PostDetails/PostDetails';
import toast, { Toaster } from 'react-hot-toast';





const query = new QueryClient();


const x = createBrowserRouter([
  {path: "/" , element : <Layout/> , children :[
    {index : true, element : <ProtectedRout> <Home/></ProtectedRout>},
     {path : 'home', element : <ProtectedRout> <Home/></ProtectedRout>},
    {path: "profile" , element : <ProtectedRout><Profile/></ProtectedRout> },
     {path: "postdetails/:id" , element : <ProtectedRout><PostDetails/></ProtectedRout> },
    {path: "login" , element : <Login/>},
    {path: "resigster" , element : <Resigster/>},
    {path: "*" , element : <Notfound/>}

  ]}
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <
      
    >
      <UserContextProvider>
        <PostContextProvider>
          <QueryClientProvider client={query}>
            <RouterProvider router={x} />
            <Toaster />
          </QueryClientProvider>
        </PostContextProvider>
      </UserContextProvider>
    </>
  )
}

export default App
