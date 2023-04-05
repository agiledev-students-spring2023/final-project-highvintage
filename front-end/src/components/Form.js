import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {useNavigate, Link } from "react-router-dom"


export default function Form() {

    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:5000/", {
                email,password
            })
            .then(res=>{
                if(res.data=="exist"){
                    history("/home",{state:{id:email}})
                }
                else if(res.data=="notexist"){
                    alert("User does not exist")
                }
            })
            .catch(e=>{
                alert("wrong username or password")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }


    }

    return (
        <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-100'>
            <h1 className='text-5xl font-semibold'>Welcome!</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>Please enter your account details.</p>
            <div className='mt-8'>
                <form action="POST">
                    <label className='text-lg font-medium'>Email</label>
                    <input 
                        type="email"
                        className='w-full border-2 border-gray-100 rounded-l p-4 mt-1 bg-transparent'
                        onChange={(e)=>{setEmail(e.target.value)}}
                        placeholder='Enter your Email/Username'
                    />
                </form>
                <div>
                    <label className='text-lg font-medium'>Password</label>
                    <input 
                        type="password"
                        className='w-full border-2 border-gray-100 rounded-l p-4 mt-1 bg-transparent'
                        onChange={(e)=>{setPassword(e.target.value)}}
                        placeholder='Enter your Password'
                    />
                </div>
                <div className='mt-8 flex justify-between items-center'>
                    <div>
                        <input 
                            type="checkbox"
                            id='remember'
                        />
                        <label className='ml-2 font-medium text-base' for="remember">Remember Me</label>
                    </div>
                    <button className='font-medium text-base text-blue-500'>Forgot password</button>
                </div>
                <div onClick={submit} className='mt-8 flex flex-col gap-y-4'>
                    
                    
                    <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-yellow-600 text-white text-lg font-bold'>Sign In</button>
                    
                </div>
                <div className="items-center justify-items-center flex flex-col mt-5">
                    <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all'><a href="/home">Join As Guest</a></button>
                </div>
                <form className='mt-8 flex justify-center items-center'>
                    <p className='font-medium text-base'>Don't have an account?</p>
                    <button className='text-blue-500 text-base font-medium ml-2'><a href="/register">Sign Up</a></button>
                </form>
            </div>
        </div>
    )
}