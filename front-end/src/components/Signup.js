import React, {useEffect, useState} from 'react';
import axios from 'axios'


export default function Form() {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:5000/Register", {
                email,password
            })

        }
        catch(e){
            console.log(e);

        }


    }

    return (
        <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-100'>
            <h1 className='text-5xl font-semibold'>Sign Up</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>Please enter the details.</p>
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

                <div className='mt-8 flex flex-col gap-y-4'>
                    
                    
                    <button onClick={submit} className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-yellow-600 text-white text-lg font-bold'><a href="home">Register</a></button>
                    
                    <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all'>Join As Guest</button>
                </div>
            </div>
        </div>
    )
}