import React, { useContext, useState } from 'react'
import { Button, Checkbox, Label, Radio, TextInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import z, { email } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/CounterContext';
import { Helmet } from 'react-helmet';






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

    setisloading(true)
    axios
      .post("https://linked-posts.routemisr.com/users/signin", values)
      .then((res) => {
        if (res.data.message === "success") {
          setisloading(false);
          localStorage.setItem('usertoken' , res.data.token);
          setuserlogin(res.data.token)
          navigate("/home");
        }
      })
      .catch((err) => {
        setisloading(false)
        setApiError(err.response.data.error);
      });
  }

  return <>
  
  
   <Helmet>
        <title>vibe - login</title>
        <meta name="description" content="vibe is your community to connect and share." />
      </Helmet>

 <div className="flex justify-center items-center my-5">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex text-black w-full max-w-xl flex-col gap-4 p-6 shadow-lg rounded-lg"
      >
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

        

        <Button disabled = {isloading} type="submit">{isloading ? <i className='fas fa-spinner fa-spin'></i> :'submit'}</Button>
      </form>
    </div>
  
  
  
  </>
   
}
