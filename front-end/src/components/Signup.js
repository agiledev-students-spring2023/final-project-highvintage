import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { onboardingURL } from '../onboardingURL';



export default function Form() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    localStorage.setItem('auth', false);
    localStorage.setItem('token', '0');

    async function submit(e) {
        e.preventDefault();

        try {

            await axios.post(onboardingURL + "/register", {
                username, password
            })
                .then(res => {
                    console.log(res)
                    if (res.data.data === "exist") {
                        localStorage.setItem('auth', true)
                        localStorage.setItem("token", res.data.token)
                        navigate("/home");

                    }
                    else if (res.data.data === "notexist") {
                        alert('User does not exist');
                    }
                })
                .catch(e => {
                    alert("User already exists")
                    console.log(e);
                })

        }
        catch (e) {
            console.log(e);

        }


    }

    // const submit = () => {

    //     axios({
    //         method: "POST",
    //         data: {
    //             username: username,
    //             password: password
    //         },
    //         withCredentials: true,
    //         url: "http://localhost:5000/register",
    //     }).then((res) => console.log(res));
    // }

    return (
        <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-100'>
            <h1 className='text-5xl font-semibold'>Sign Up</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>Please enter the details.</p>
            <div className='mt-8'>
                <form action="POST">
                    <label className='text-lg font-medium'>Username</label>
                    <input
                        type="email"
                        className='w-full border-2 border-gray-100 rounded-l p-4 mt-1 bg-transparent'
                        onChange={(e) => { setUsername(e.target.value.toLowerCase()) }}
                        placeholder='Enter your Username'
                    />
                </form>
                <div>
                    <label className='text-lg font-medium'>Password</label>
                    <input
                        type="password"
                        className='w-full border-2 border-gray-100 rounded-l p-4 mt-1 bg-transparent'
                        onChange={(e) => { setPassword(e.target.value) }}
                        placeholder='Enter your Password'
                    />
                </div>

                <div onClick={submit} className='mt-8 flex flex-col gap-y-4'>


                    <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-yellow-600 text-white text-lg font-bold'><a href="/">Register</a></button>


                </div>
                {/* <div className="items-center justify-items-center flex flex-col mt-5">
                    <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all'><a href="/home">Join As Guest</a></button>
                </div> */}
                <form className='mt-8 flex justify-center items-center'>
                    <p className='font-medium text-base'>Back to</p>
                    <button className='text-blue-500 text-base font-medium ml-2'><a href="/signin">Log In</a></button>
                </form>
            </div>
        </div>
    )
}