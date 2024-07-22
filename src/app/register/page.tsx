'use client'
import { register } from '@/api/auth'
import Link from 'next/link'
import React from 'react'

const Register = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const handleRegister = async () => {
        const res = await register({email, password, name})
    }
    return (
        <div className='m-auto w-[600px] border mt-9 flex flex-col items-center rounded-md bg-gray-300'>
            <h1 className='mt-4'>Đăng Kí</h1>
            <form action="" className='p-3 mt-8 flex flex-col justify-center gap-6'>
                <div className='flex gap-10'>
                    <label htmlFor="">
                        Tên 
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='flex gap-8'>
                    <label htmlFor="">
                        Email
                    </label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex gap-4'>
                    <label htmlFor="">
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </form>
            <button
                className='bg-blue-500 text-white p-2 rounded-md my-4'
                onClick={handleRegister}
            >Đăng kí</button>
            <div>
                <span>
                    Đã có tài khoản? <Link href={`/login`}><span className='hover:text-red-400'>Đăng nhập ngay</span></Link>
                </span>
            </div>
        </div>
    )
}

export default Register