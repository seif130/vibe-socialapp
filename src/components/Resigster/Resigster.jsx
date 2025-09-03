import React, { useState } from 'react'
import { Button, Checkbox, Label, Radio, TextInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import z, { email } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from "framer-motion";





export default function Register() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isloading , setisloading] = useState(false);

  const schema = z
    .object({
      name: z.string().min(1, "name is required").max(10, "max length is 10 chars"),
      email: z.string().email("invalid email"),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "must include capital, small, special char, number & min length 8"
        ),
      rePassword: z.string(),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "invalid date")
        .refine((date) => {
          const userdate = new Date(date);
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          return userdate < now;
        }, "cant be future date"),
      gender: z.enum(["male", "female"] , 'requierd'),
    })
    .refine((object) => object.password === object.rePassword, {
      message: "password and repassword not matched",
      path: ["rePassword"],
    });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState } = form;

  function handleRegister(values) {

    setisloading(true)
    axios
      .post("https://linked-posts.routemisr.com/users/signup", values)
      .then((res) => {
        if (res.data.message === "success") {
          setisloading(false)
          navigate("/login");
        }
      })
      .catch((err) => {
        setisloading(false)
        setApiError(err.response.data.error);
      });
  }

  return <>
   <Helmet>
        <title>vibe - resigster</title>
        <meta name="description" content="vibe is your community to connect and share." />
      </Helmet>

      <div className="flex justify-center items-center">
      <motion.form
       initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        onSubmit={handleSubmit(handleRegister)}
         className="flex w-full max-w-md flex-col gap-5 p-8 rounded-2xl shadow-2xl
                     backdrop-blur-xl bg-white/10 border border-white/20 text-white"
      >
        {apiError && (
          <h1 className="text-center bg-red-500 text-white rounded-md my-2 p-3 font-bold">
            {apiError}
          </h1>
        )}

       
        <div>
          <Label htmlFor="name" className="mb-2 block">
            Your name
          </Label>
          <TextInput id="name" type="text" placeholder="your name" {...register("name")} />
          {formState.errors.name && formState.touchedFields.name && (
            <p className="text-red-500 text-center my-2">{formState.errors.name.message}</p>
          )}
        </div>

     
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

      
        <div>
          <Label htmlFor="rePassword" className="mb-2 block">
            Your repassword
          </Label>
          <TextInput id="rePassword" type="password" {...register("rePassword")} />
          {formState.errors.rePassword && formState.touchedFields.rePassword && (
            <p className="text-red-500 text-center my-2">{formState.errors.rePassword.message}</p>
          )}
        </div>

      
        <div>
          <Label htmlFor="dateOfBirth" className="mb-2 block">
            Date of birth
          </Label>
          <TextInput id="dateOfBirth" type="date" {...register("dateOfBirth")} />
          {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth && (
            <p className="text-red-500 text-center my-2">{formState.errors.dateOfBirth.message}</p>
          )}
        </div>

      
        <div className="flex gap-5">
          <div className="flex items-center gap-2">
            <Radio id="male" {...register("gender")} value="male" />
            <Label htmlFor="male">male</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="female" {...register("gender")} value="female" />
            <Label htmlFor="female">female</Label>
          </div>
          {formState.errors.gender && formState.touchedFields.gender && (
            <p className="text-red-500 text-center my-2">{formState.errors.gender.message}</p>
          )}
        </div>

        <Button disabled = {isloading} type="submit">{isloading ? <i className='fas fa-spinner fa-spin'></i> :'submit'}</Button>
       </motion.form>
    </div>


  
  </>
    
}

