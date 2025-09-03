import React, { useContext, useState } from 'react'
import { Button, Checkbox, Label, Radio, TextInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import z, { email } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/CounterContext';
import { Helmet } from 'react-helmet';
import { motion } from "framer-motion";
import {jwtDecode} from "jwt-decode";







export default function Login() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isloading , setisloading] = useState(false);
 const { userlogin, setuserlogin } = useContext(UserContext);
 
  const schema = z
    .object({
      email: z.string().email("invalid email"),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "must include capital, small, special char, number & min length 8"
        ),
     
    })
  

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState } = form;

function handleLogin(values) {
  setisloading(true);

  axios
    .post("https://linked-posts.routemisr.com/users/signin", values)
    .then((res) => {
      if (res.data.message === "success") {
        setisloading(false);
        localStorage.setItem("usertoken", res.data.token);

        const decoded = jwtDecode(res.data.token);
        setuserlogin({
          token: res.data.token,
          id: decoded.id,
          name: decoded.name,
        });

        navigate("/home");
      }
    })
    .catch((err) => {
      setisloading(false);
      setApiError(err.response?.data?.error || "Login failed");
    });
}


  return <>
  
  
   <Helmet>
        <title>vibe - login</title>
        <meta name="description" content="vibe is your community to connect and share." />
      </Helmet>

 <div className="flex justify-center items-center my-24">
      <motion.form
          onSubmit={handleSubmit(handleLogin)}
          initial={{ x: "-100vw", opacity: 0 }}   
          animate={{ x: 0, opacity: 1 }}          
         transition={{ 
    type: "spring", 
    stiffness: 50,   
    damping: 20,    
    duration: 1.2   
  }}

          className="flex w-full max-w-md flex-col gap-5 p-8 rounded-2xl shadow-2xl
                     backdrop-blur-xl bg-white/10 border border-white/20 text-white"
        >
           <h2 className="text-2xl font-bold text-center">Welcome Back 👋</h2>
          <p className="text-sm text-center text-gray-200">
            Login to continue to your account
          </p>
        {apiError && (
          <h1 className="text-center bg-red-500 text-white rounded-md my-2 p-3 font-bold">
            {apiError}
          </h1>
        )}

      
        <div>
          <Label htmlFor="email" className="mb-2 block">
            Your email
          </Label>
          <TextInput id="email" type="email" placeholder="name@flowbite.com" {...register("email")} />
          {formState.errors.email && formState.touchedFields.email && (
            <p className="text-red-500 text-center my-2">{formState.errors.email.message}</p>
          )}
        </div>

       
        <div>
          <Label htmlFor="password" className="mb-2 block">
            Your password
          </Label>
          <TextInput id="password" type="password" {...register("password")} />
          {formState.errors.password && formState.touchedFields.password && (
            <p className="text-red-500 text-center my-2">{formState.errors.password.message}</p>
          )}
        </div>

        

        <Button disabled = {isloading} type="submit">{isloading ? <i className='fas fa-spinner fa-spin'></i> :'log in'}</Button>
     </motion.form>
    </div>
  
  
  
  </>
   
}
