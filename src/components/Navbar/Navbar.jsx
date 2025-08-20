import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { UserContext } from '../../Context/CounterContext';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';



export function NavbarComponent() {

  let navigate = useNavigate();
  let { userlogin , setuserlogin } = useContext(UserContext);

  function signout() {
    localStorage.removeItem("usertoken");
    setuserlogin(null);
    navigate("/login");
  }


  
  function getUserData() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem('usertoken'),
      },
    });
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["getUserData"],
    queryFn:  getUserData,
    select: (data) => data?.data?.user,
  });




  return (
    <Navbar className='bg-gradient-to-r from-[#9f148d] to-[#0c8a91] text-pink-800'>

      <div className='w-[90%] mx-auto flex justify-between items-center'>

<Link to=""><span className=" items-center whitespace-nowrap text-2xl font-semibold dark:text-pink-300">vibe</span>
      </Link>
      <div className="flex md:order-2">
        {userlogin != null ? (<Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={data?.photo} rounded />} >

              
      <DropdownItem>
        <span className=' block w-full'>{data?.name}</span>
        

      </DropdownItem>
          <DropdownItem>
 
          <span className='block w-full'>{data?.email}</span>

      </DropdownItem>
        <DropdownItem>
         

    <Link to="/profile" className="block w-full">
      Profile
    </Link>
  </DropdownItem>

    <DropdownItem>
    <span onClick={signout}  className="block w-full cursor-pointer">sign out </span>
  </DropdownItem>
   
        </Dropdown>) : (    <ul className='flex gap-4 ml-4 text-white items-center '>
      <li><Link to='login'>login</Link></li>
        <li><Link to='resigster'>resigster</Link></li>
    </ul>)}
        

     
      
      </div>
   

      </div>
      
    </Navbar>
  );
}


